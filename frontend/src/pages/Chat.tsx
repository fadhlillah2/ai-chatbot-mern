import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Avatar, Typography, Button, IconButton, Container, Tooltip, Chip } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { CgSpinner } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (!content || content.trim() === "") return;
    
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);
    
    try {
      const chatData = await sendChatRequest(content);
      setChatMessages([...chatData.chats]);
    } catch (error) {
      toast.error("Something went wrong during chat.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  
  const handleDeleteChats = async () => {
    try {
      toast.loading("Clearing cosmic transmissions", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("All transmissions cleared successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Failed to clear transmissions", { id: "deletechats" });
    }
  };
  
  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Receiving cosmic transmissions", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Cosmic connection established", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to receive transmissions", { id: "loadchats" });
        });
    }
  }, [auth]);
  
  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);
  
  // Generate random stars for background
  const renderStars = () => {
    const starElements = [];
    for (let i = 0; i < 50; i++) {
      const size = Math.random() * 2;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const animationDuration = 2 + Math.random() * 3;
      
      starElements.push(
        <div
          key={i}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            position: 'absolute',
            borderRadius: '50%',
            backgroundColor: 'white',
            opacity: 0.7,
            animation: `twinkle ${animationDuration}s infinite ease-in-out`
          }}
        />
      );
    }
    return starElements;
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          flex: 1,
          width: "100%",
          height: "100%",
          mt: 3,
          gap: 3,
          position: "relative",
        }}
      >
        {/* Left Sidebar */}
        <Box
          className="cosmic-card"
          sx={{
            display: { md: "flex", xs: "none", sm: "none" },
            flex: 0.2,
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "60vh",
              borderRadius: 5,
              flexDirection: "column",
              p: 3,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Animated mini stars in the background */}
            {renderStars()}
            
            {/* Profile avatar with cosmic glow */}
            <Box 
              sx={{
                position: "relative",
                width: "80px",
                height: "80px",
                margin: "0 auto 15px",
              }}
              className="cosmic-glow"
            >
              <Avatar
                sx={{
                  width: "100%",
                  height: "100%",
                  mx: "auto",
                  bgcolor: "rgba(100, 243, 213, 0.8)",
                  color: "black",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  fontFamily: "Orbitron, sans-serif",
                  border: "2px solid rgba(66, 135, 255, 0.6)",
                }}
              >
                {auth?.user?.name[0]}
                {auth?.user?.name.split(" ")[1] ? auth?.user?.name.split(" ")[1][0] : ""}
              </Avatar>
            </Box>
            
            <Typography 
              variant="h6" 
              sx={{ 
                mx: "auto", 
                fontFamily: "Orbitron, sans-serif",
                mb: 2,
                letterSpacing: 1
              }}
              className="cosmic-text"
            >
              COSMIC DIALOGUE
            </Typography>
            
            {/* AI model chip */}
            <Chip 
              label="OMNISCIENT AI" 
              sx={{
                mx: "auto",
                mb: 3,
                backgroundColor: "rgba(66, 135, 255, 0.2)",
                border: "1px solid rgba(66, 135, 255, 0.5)",
                color: "#64f3d5",
                fontFamily: "Orbitron, sans-serif",
                letterSpacing: 1,
                fontSize: "0.7rem"
              }}
            />
            
            <Typography sx={{ mx: "auto", fontFamily: "Work Sans", textAlign: "center", mb: 4, p: 1, fontSize: "0.9rem", letterSpacing: "0.5px" }}>
              Explore the universe of knowledge through this cosmic interface. Your queries traverse galaxies to reach our AI constellation.
            </Typography>
            
            <Box sx={{ mt: "auto", display: "flex", justifyContent: "center" }}>
              <Button
                onClick={handleDeleteChats}
                className="nebula-glow"
                sx={{
                  px: 4,
                  py: 1.5,
                  my: "auto",
                  color: "white",
                  fontWeight: "500",
                  borderRadius: "30px",
                  mx: "auto",
                  background: "rgba(225, 66, 255, 0.2)",
                  border: "1px solid rgba(225, 66, 255, 0.5)",
                  fontFamily: "Orbitron, sans-serif",
                  letterSpacing: "1px",
                  fontSize: "0.8rem",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "rgba(225, 66, 255, 0.4)",
                    transform: "translateY(-3px)"
                  },
                }}
              >
                CLEAR HISTORY
              </Button>
            </Box>
          </Box>
        </Box>
        
        {/* Chat Area */}
        <Box
          sx={{
            display: "flex",
            flex: { md: 0.8, xs: 1, sm: 1 },
            flexDirection: "column",
            px: 3,
          }}
        >
          <Typography
            className="cosmic-text"
            sx={{
              fontSize: "2rem",
              mb: 2,
              mx: "auto",
              fontWeight: "800",
              fontFamily: "Orbitron, sans-serif",
              letterSpacing: "3px",
              position: "relative"
            }}
          >
            COSMIC AI EXPLORER
          </Typography>
          
          {/* Messages container */}
          <Box
            ref={chatContainerRef}
            className="cosmic-card"
            sx={{
              width: "100%",
              height: "60vh",
              borderRadius: 3,
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              overflow: "auto",
              p: 2,
              position: "relative"
            }}
          >
            {chatMessages.map((chat, index) => (
              <ChatItem content={chat.content} role={chat.role} key={index} />
            ))}
            
            {isLoading && (
              <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
                <Box sx={{ 
                  ml: "auto",
                  mr: 2, 
                  bgcolor: "rgba(100, 243, 213, 0.1)",
                  borderRadius: "50%", 
                  p: 1,
                  display: "inline-flex"
                }}>
                  <CgSpinner size={20} className="rotate" />
                </Box>
                <Typography variant="body2" sx={{ fontStyle: "italic", color: "rgba(255,255,255,0.7)" }}>
                  AI processing your query across the cosmos...
                </Typography>
              </Box>
            )}
            
            {/* Start message for empty chat */}
            {chatMessages.length === 0 && !isLoading && (
              <Box 
                sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  flexDirection: "column",
                  height: "100%",
                  textAlign: "center",
                  p: 3
                }}
              >
                <Box 
                  className="cosmic-glow pulse"
                  sx={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    background: "linear-gradient(45deg, rgba(66, 135, 255, 0.2), rgba(100, 243, 213, 0.2))",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 3
                  }}
                >
                  <img 
                    src="robot.png" 
                    alt="AI" 
                    style={{ width: "70px", height: "70px" }}
                  />
                </Box>
                <Typography 
                  className="cosmic-text"
                  sx={{ 
                    fontFamily: "Orbitron, sans-serif",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    mb: 2
                  }}
                >
                  BEGIN COSMIC DIALOGUE
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.7)", maxWidth: "500px" }}>
                  Your adventure through the cosmos of knowledge starts with a simple message. What would you like to explore today?
                </Typography>
              </Box>
            )}
          </Box>
          
          {/* Input area */}
          <Box
            className="cosmic-card"
            sx={{
              width: "100%",
              borderRadius: 3,
              mt: 3,
              p: 1,
              display: "flex",
              alignItems: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Type your message to the cosmos..."
              className="cosmic-input"
              onKeyDown={handleKeyDown}
              style={{
                width: "100%",
                padding: "18px 20px",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: "1rem",
                borderRadius: "8px",
                fontFamily: "Work Sans, sans-serif"
              }}
            />
            <Tooltip title="Send Message">
              <IconButton 
                onClick={handleSubmit} 
                className="cosmic-glow"
                disabled={isLoading}
                sx={{ 
                  color: "#64f3d5", 
                  mx: 1,
                  background: "rgba(66, 135, 255, 0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "rgba(66, 135, 255, 0.4)",
                    transform: "translateY(-2px)"
                  }
                }}
              >
                {isLoading ? <CgSpinner className="rotate" /> : <IoMdSend />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Chat;
