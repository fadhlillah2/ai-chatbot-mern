import axios from "axios";

// Tipe untuk model yang didukung
export type SupportedLLM = "openai" | "mistral" | "local-llm" | "fallback";

// Fungsi interface untuk model berbeda
export interface LLMProvider {
  generateResponse: (messages: any[]) => Promise<string>;
}

// Implementasi Mistral AI
export class MistralProvider implements LLMProvider {
  private apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  async generateResponse(messages: any[]): Promise<string> {
    try {
      const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: "mistral-small-latest",
          messages: messages
        })
      });
      
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error calling Mistral API:", error);
      throw error;
    }
  }
}

// Implementasi untuk model lokal menggunakan Ollama
export class LocalLLMProvider implements LLMProvider {
  private endpoint: string;
  private model: string;
  
  constructor(endpoint: string = "http://localhost:11434", model: string = "mistral") {
    this.endpoint = endpoint;
    this.model = model;
  }
  
  async generateResponse(messages: any[]): Promise<string> {
    try {
      // Format pesan untuk Ollama
      const prompt = messages.map(msg => 
        `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`
      ).join("\n");
      
      const response = await fetch(`${this.endpoint}/api/generate`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: this.model,
          prompt: prompt,
          stream: false
        })
      });
      
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Error calling local LLM:", error);
      throw error;
    }
  }
}

// Factory untuk membuat provider yang sesuai
export function createLLMProvider(type: SupportedLLM): LLMProvider {
  switch (type) {
    case "mistral":
      const mistralApiKey = process.env.MISTRAL_API_KEY;
      if (!mistralApiKey) {
        throw new Error("MISTRAL_API_KEY tidak ditemukan di environment variables");
      }
      return new MistralProvider(mistralApiKey);
      
    case "local-llm":
      const endpoint = process.env.LOCAL_LLM_ENDPOINT || "http://localhost:11434";
      const model = process.env.LOCAL_LLM_MODEL || "mistral";
      return new LocalLLMProvider(endpoint, model);
      
    case "fallback":
      return {
        generateResponse: async (messages) => {
          // Find the last user message
          let lastUserMessage = "";
          for (let i = messages.length - 1; i >= 0; i--) {
            if (messages[i].role === "user") {
              lastUserMessage = messages[i].content || "";
              break;
            }
          }
          
          if (lastUserMessage.toLowerCase().includes("hello") || 
              lastUserMessage.toLowerCase().includes("hi")) {
            return "Hello! I'm the local fallback assistant.";
          }
          
          return "I'm a simple fallback assistant that works without external API calls. My responses are predefined and limited, but I don't have any rate limits!";
        }
      };
      
    default:
      throw new Error(`LLM type ${type} tidak didukung`);
  }
} 