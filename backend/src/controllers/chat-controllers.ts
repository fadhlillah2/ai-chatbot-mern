import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";

// Helper function for delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fallback responses when OpenAI API is unavailable
const getFallbackResponse = (message: string) => {
  // Simple response logic based on message content
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    return "Hello! I'm a fallback assistant. The OpenAI API is currently unavailable due to rate limiting. Please try again later.";
  }
  
  if (lowerMessage.includes("help")) {
    return "I'm currently in fallback mode due to OpenAI API limitations. You can try: 1) Waiting a few minutes before sending another message, 2) Checking if your API key has enough quota, or 3) Using fewer, shorter messages.";
  }
  
  if (lowerMessage.includes("who are you") || lowerMessage.includes("what are you")) {
    return "I'm a fallback assistant that responds when the OpenAI API is unavailable. I have limited functionality compared to the full AI.";
  }
  
  // Default fallback response
  return "I'm sorry, but the OpenAI API is currently unavailable due to rate limiting. Please try again later. This is a fallback response.";
};

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });
    // grab chats of user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    // send all chats with new one to openAI API
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);
    
    // Add retry mechanism with exponential backoff
    let retries = 0;
    const maxRetries = 3;
    let chatResponse;
    
    while (retries < maxRetries) {
      try {
        // Introducing a delay to avoid rate limiting
        if (retries > 0) {
          const delayTime = Math.pow(2, retries) * 1000; // Exponential backoff: 2s, 4s, 8s
          console.log(`Retrying in ${delayTime}ms...`);
          await sleep(delayTime);
        }
        
        // get latest response
        chatResponse = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: chats,
        });
        
        // If successful, break the loop
        break;
      } catch (error) {
        if (error.response && error.response.status === 429 && retries < maxRetries - 1) {
          console.log(`Rate limit exceeded. Retry ${retries + 1}/${maxRetries}`);
          retries++;
        } else {
          // If it's not a 429 error or we've exhausted retries, throw the error
          throw error;
        }
      }
    }
    
    // If API call failed after all retries, use fallback
    if (!chatResponse) {
      console.log("Using fallback response mechanism");
      const fallbackContent = getFallbackResponse(message);
      const fallbackMessage = { role: "assistant", content: fallbackContent };
      user.chats.push(fallbackMessage);
      await user.save();
      return res.status(200).json({ chats: user.chats });
    }
    
    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    
    // Use fallback for 429 errors
    if (error.response && error.response.status === 429) {
      console.log("Rate limit error, using fallback response");
      try {
        const fallbackContent = getFallbackResponse(message);
        const fallbackMessage = { role: "assistant", content: fallbackContent };
        const user = await User.findById(res.locals.jwtData.id);
        user.chats.push(fallbackMessage);
        await user.save();
        return res.status(200).json({ chats: user.chats });
      } catch (saveError) {
        console.log("Error saving fallback message:", saveError);
        return res.status(500).json({ message: "Error saving fallback response" });
      }
    }
    
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
