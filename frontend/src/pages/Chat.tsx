import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Avatar, Typography, Button, IconButton, Container, Tooltip, Chip, Drawer, useMediaQuery, useTheme } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { CgSpinner } from "react-icons/cg";
import { FiMenu, FiTrash2 } from "react-icons/fi";
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
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
      if (isMobile) {
        setDrawerOpen(false);
      }
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
    
    // Tambahkan CSS untuk animasi khusus
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rotateGradient {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      
      @keyframes shootingStar {
        0% {
          transform: translateY(0) translateX(0);
          opacity: 0;
        }
        50% {
          opacity: 0.8;
        }
        100% {
          transform: translateY(150px) translateX(-100px);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [auth, navigate]);
  
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

  // Sidebar content
  const sidebarContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: isMobile ? "100%" : "100%",
        height: isMobile ? "100vh" : "60vh",
        borderRadius: isMobile ? 0 : 5,
        p: isMobile ? 2 : 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated mini stars in the background */}
      {renderStars()}
      
      {/* Floating orbs - repositioned for better balance */}
      <Box
        sx={{
          position: "absolute",
          top: "60%",
          left: "70%",
          width: "35px",
          height: "35px",
          borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, rgba(66, 135, 255, 0.6), rgba(66, 135, 255, 0.1))",
          opacity: 0.5,
          zIndex: 0
        }}
        style={{ animation: "float 7s infinite ease-in-out" }}
      />
      
      <Box
        sx={{
          position: "absolute",
          bottom: "25%",
          right: "15%",
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, rgba(100, 243, 213, 0.6), rgba(100, 243, 213, 0.1))",
          opacity: 0.5,
          zIndex: 0
        }}
        style={{ animation: "float 5s infinite ease-in-out reverse" }}
      />
      
      <Box
        sx={{
          position: "absolute",
          top: "35%",
          right: "25%",
          width: "18px",
          height: "18px",
          borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, rgba(225, 66, 255, 0.6), rgba(225, 66, 255, 0.1))",
          opacity: 0.5,
          zIndex: 0
        }}
        style={{ animation: "float 4s infinite ease-in-out" }}
      />
      
      {/* Orbital ring decoration - positioned to the left */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "30%",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          border: "1px solid rgba(66, 135, 255, 0.2)",
          transform: "none",
          opacity: 0.5,
          zIndex: 0
        }}
        className="rotate"
      />
      <Box
        sx={{
          position: "absolute",
          top: "7%",
          left: "25%",
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          border: "1px dashed rgba(100, 243, 213, 0.2)",
          transform: "none",
          opacity: 0.5,
          zIndex: 0
        }}
        className="rotate"
        style={{ animationDuration: "30s" }}
      />
      
      {/* Extra orbit with different rotation */}
      <Box
        sx={{
          position: "absolute",
          top: "15%",
          left: "35%",
          width: "110px",
          height: "110px",
          borderRadius: "50%",
          border: "1px dotted rgba(225, 66, 255, 0.2)",
          transform: "none",
          opacity: 0.4,
          zIndex: 0
        }}
        className="rotate"
        style={{ animationDirection: "reverse", animationDuration: "15s" }}
      />
      
      {/* Header section - improved spacing */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          position: "relative",
          zIndex: 1,
          mb: 2.5,
          mt: 1,
          pt: 1,
          pl: "1%",
          width: "100%"
        }}
      >
        {/* Profile avatar with cosmic glow - adjusted size */}
        <Box
          sx={{
            position: "relative",
            width: "72px",
            height: "72px",
            margin: "0 0 18px 0",
            "&::before": {
              content: "''",
              position: "absolute",
              top: "-5px",
              left: "-5px",
              right: "-5px",
              bottom: "-5px",
              borderRadius: "50%",
              background: "linear-gradient(45deg, rgba(100, 243, 213, 0.3), rgba(66, 135, 255, 0.3))",
              opacity: 0.6,
              zIndex: -1
            }
          }}
          className="cosmic-glow avatar-pulse"
        >
          <Avatar
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "rgba(100, 243, 213, 0.8)",
              color: "black",
              fontWeight: 700,
              fontSize: "1.4rem",
              fontFamily: "Orbitron, sans-serif",
              border: "2px solid rgba(66, 135, 255, 0.6)",
            }}
          >
            {auth?.user?.name[0]}
            {auth?.user?.name.split(" ")[1] ? auth?.user?.name.split(" ")[1][0] : ""}
          </Avatar>
        </Box>
        
        {/* Title with cosmic styling - improved positioning */}
        <Box
          sx={{
            position: "relative",
            textAlign: "left",
            mb: 1.5,
            width: "80%",
            ml: 0
          }}
        >
          {/* Decorative underline - adjusted width and position */}
          <Box
            className="cosmic-shine"
            sx={{
              position: "absolute",
              bottom: "-6px",
              left: "0%",
              height: "2px",
              width: "80%",
              background: "linear-gradient(90deg, rgba(100, 243, 213, 0.7), transparent)",
            }}
          />
          
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: "Orbitron, sans-serif",
              fontWeight: 700,
              letterSpacing: 2,
              fontSize: "1rem",
              textShadow: "0 0 10px rgba(100, 243, 213, 0.5)"
            }}
            className="cosmic-text"
          >
            COSMIC DIALOGUE
          </Typography>
        </Box>
        
        {/* Divider for visual separation */}
        <Box
          sx={{
            width: "80%",
            height: "1px",
            background: "linear-gradient(to right, rgba(100, 243, 213, 0.3), transparent)",
            my: 1.5,
            ml: "0%",
            mr: "20%",
            opacity: 0.6
          }}
        />
        
        {/* AI model chip - refined size and positioning */}
        <Box sx={{ 
          display: "flex", 
          width: "100%", 
          justifyContent: "flex-start", 
          pl: "1%"
        }}>
          <Chip 
            label="OMNISCIENT AI" 
            sx={{
              mt: 1,
              mb: 2.5,
              backgroundColor: "rgba(66, 135, 255, 0.2)",
              border: "1px solid rgba(66, 135, 255, 0.5)",
              color: "#64f3d5",
              fontFamily: "Orbitron, sans-serif",
              letterSpacing: 1,
              fontSize: "0.65rem",
              height: "28px",
              "& .MuiChip-label": {
                padding: "0 12px"
              }
            }}
          />
        </Box>
      </Box>
      
      {/* Description text in stylized container - refined box */}
      <Box
        className="cosmic-shine"
        sx={{
          position: "relative",
          mb: 2.5,
          ml: "1%",
          mr: "19%",
          p: 1.5,
          pt: 2,
          borderRadius: "8px",
          background: "linear-gradient(180deg, rgba(17, 29, 39, 0.8), rgba(17, 29, 39, 0.5))",
          border: "1px solid rgba(66, 135, 255, 0.3)",
          backdropFilter: "blur(5px)",
          zIndex: 1,
          width: "80%",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "4px",
            background: "linear-gradient(90deg, transparent, rgba(100, 243, 213, 0.4), transparent)",
            opacity: 0.8,
            pointerEvents: "none"
          }
        }}
      >
        {/* Icon decoration */}
        <Box 
          sx={{ 
            position: "relative",
            width: "16px", 
            height: "16px", 
            ml: 0.5,
            mr: "auto",
            mb: 1,
            opacity: 0.7,
            overflow: "hidden"
          }}
        >
          <Box 
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "12px",
              height: "12px",
              background: "linear-gradient(135deg, #64f3d5, #4287ff)",
              borderRadius: "3px",
              transform: "translate(-50%, -50%) rotate(45deg)",
              boxShadow: "0 0 8px rgba(100, 243, 213, 0.5)"
            }}
            className="pulse"
          />
        </Box>
        
        {/* Divider dots */}
        <Box sx={{ 
          display: "flex", 
          justifyContent: "flex-start", 
          mb: 1.2,
          mt: 0.2,
          ml: 0.5
        }}>
          {[0, 1, 2].map((i) => (
            <Box 
              key={i} 
              sx={{ 
                width: "3px", 
                height: "3px", 
                borderRadius: "50%", 
                backgroundColor: "#64f3d5", 
                mr: 0.7,
                opacity: 0.8
              }} 
            />
          ))}
        </Box>

        <Typography sx={{ 
          fontFamily: "Work Sans, sans-serif", 
          textAlign: "left",
          fontSize: "0.78rem", 
          letterSpacing: "0.4px",
          lineHeight: 1.5,
          pl: 0.5,
          pr: 1.5,
          pb: 0.5,
          color: "rgba(255, 255, 255, 0.9)",
          "& span": {
            color: "#64f3d5",
            fontWeight: 500
          }
        }}>
          Explore the universe of <span>knowledge</span> through this cosmic interface. Your queries traverse <span>galaxies</span> to reach our AI constellation.
        </Typography>
      </Box>
      
      {/* Divider before action button */}
      <Box
        sx={{
          width: "60%",
          height: "1px",
          background: "linear-gradient(to right, rgba(225, 66, 255, 0.3), transparent)",
          mb: 2,
          mt: "auto",
          ml: "1%",
          mr: "39%",
          opacity: 0.6
        }}
      />
      
      {/* Action button section - refined button */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", zIndex: 1, mb: 1.5, pl: "1%" }}>
        <Button
          onClick={handleDeleteChats}
          className="nebula-glow cosmic-shine"
          startIcon={<FiTrash2 style={{ fontSize: "1.1rem" }} />}
          sx={{
            px: 3,
            py: 0.8,
            color: "white",
            fontWeight: "600",
            borderRadius: "20px",
            background: "linear-gradient(45deg, rgba(225, 66, 255, 0.2), rgba(175, 66, 225, 0.3))",
            border: "1px solid rgba(225, 66, 255, 0.5)",
            fontFamily: "Orbitron, sans-serif",
            letterSpacing: "1px",
            fontSize: "0.75rem",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden",
            "&:hover": {
              background: "linear-gradient(45deg, rgba(225, 66, 255, 0.4), rgba(175, 66, 225, 0.5))",
              transform: "translateY(-3px)",
              boxShadow: "0 5px 15px rgba(225, 66, 255, 0.4)"
            },
            "&:active": {
              transform: "translateY(-1px)",
              boxShadow: "0 2px 8px rgba(225, 66, 255, 0.5)"
            }
          }}
        >
          CLEAR HISTORY
        </Button>
      </Box>

      {/* Version indicator */}
      <Typography
        sx={{
          textAlign: "left",
          fontSize: "0.65rem",
          color: "rgba(255,255,255,0.4)",
          fontFamily: "Orbitron, sans-serif",
          letterSpacing: "1px",
          mt: 0.5,
          pl: "1%"
        }}
      >
        COSMIC OS v1.0.1
        </Typography>
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ pb: 6 }}>
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
        {/* Left Sidebar - Desktop Version */}
        {!isMobile && (
          <Box
            className="cosmic-card"
            sx={{
              display: { md: "flex", xs: "none", sm: "none" },
              flex: 0.2,
              flexDirection: "column",
            }}
          >
            {sidebarContent}
          </Box>
        )}
        
        {/* Drawer for Mobile */}
        {isMobile && (
          <Drawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            anchor="left"
            PaperProps={{
              sx: {
                width: "85%",
                maxWidth: "320px",
                backgroundColor: "rgba(17, 29, 39, 0.95)",
                backdropFilter: "blur(10px)",
                border: "none"
              }
            }}
          >
            <Box 
              sx={{ 
                display: "flex", 
                flex: 1, 
                flexDirection: "column", 
                height: "100%",
                borderRight: "1px solid rgba(100, 243, 213, 0.2)",
                position: "relative"
              }}
            >
              <IconButton
                onClick={() => setDrawerOpen(false)}
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  color: "#64f3d5",
                  zIndex: 10
                }}
              >
                <Box 
                  sx={{ 
                    fontSize: "1.5rem", 
                    lineHeight: 1, 
                    width: 24, 
                    height: 24, 
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  ×
                </Box>
              </IconButton>
              {sidebarContent}
            </Box>
          </Drawer>
        )}
        
        {/* Chat Area */}
        <Box
          sx={{
            display: "flex",
            flex: { md: 0.8, xs: 1, sm: 1 },
            flexDirection: "column",
            px: { xs: 1, sm: 2, md: 3 },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
            {isMobile && (
              <IconButton 
                onClick={() => setDrawerOpen(true)}
                className="cosmic-glow"
                sx={{ color: "#64f3d5" }}
              >
                <FiMenu />
              </IconButton>
            )}
            <Typography
              className="cosmic-text"
              sx={{
                fontSize: { xs: "1.3rem", sm: "1.8rem", md: "2rem" },
                mb: { xs: 1, sm: 2 },
                mx: "auto",
                fontWeight: "800",
                fontFamily: "Orbitron, sans-serif",
                letterSpacing: { xs: "2px", md: "3px" },
                position: "relative"
              }}
            >
              COSMIC AI EXPLORER
            </Typography>
          </Box>
          
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
              p: { xs: 1, sm: 2 },
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
                  p: { xs: 2, sm: 3 }
                }}
              >
                <Box 
                  className="cosmic-glow pulse"
                  sx={{
                    width: { xs: "120px", sm: "150px", md: "180px" },
                    height: { xs: "120px", sm: "150px", md: "180px" },
                    borderRadius: "50%",
                    background: "linear-gradient(180deg, rgba(17, 29, 39, 0.8), rgba(17, 29, 39, 0.5))",
                    border: "2px solid rgba(100, 243, 213, 0.3)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 3,
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: "-50%",
                      left: "-50%",
                      width: "200%",
                      height: "200%",
                      background: "conic-gradient(from 0deg, transparent, rgba(100, 243, 213, 0.3), transparent 40%)",
                      animation: "rotateGradient 8s linear infinite",
                      zIndex: 0,
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      inset: "6px",
                      borderRadius: "50%",
                      background: "radial-gradient(circle at center, rgba(17, 29, 39, 0.9), rgba(17, 29, 39, 0.7))",
                      zIndex: 0,
                    }
                  }}
                >
                  {/* Cosmic Logo - SVG dibuat langsung */}
                  <Box 
                    sx={{
                      position: "relative", 
                      zIndex: 2, 
                      width: "75%", 
                      height: "75%",
                      animation: "pulse 3s ease-in-out infinite alternate"
                    }}
                  >
                    <svg 
                      viewBox="0 0 200 200" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ width: "100%", height: "100%" }}
                    >
                      {/* Planetary Ring */}
                      <ellipse 
                        cx="100" 
                        cy="100" 
                        rx="70" 
                        ry="20" 
                        stroke="rgba(100, 243, 213, 0.8)" 
                        strokeWidth="1.5"
                        transform="rotate(-25, 100, 100)"
                        strokeDasharray="3,3"
                      />
                      <ellipse 
                        cx="100" 
                        cy="100" 
                        rx="60" 
                        ry="16" 
                        stroke="rgba(66, 135, 255, 0.7)" 
                        strokeWidth="1"
                        transform="rotate(-25, 100, 100)"
                      />
                      
                      {/* Main Planet */}
                      <circle 
                        cx="100" 
                        cy="100" 
                        r="40" 
                        fill="url(#planetGradient)" 
                      />
                      
                      {/* Small Moon */}
                      <circle 
                        cx="140" 
                        cy="70" 
                        r="12" 
                        fill="url(#moonGradient)"
                        style={{ filter: "drop-shadow(0 0 3px rgba(100, 243, 213, 0.5))" }} 
                      />
                      
                      {/* Glow Spots on Planet */}
                      <circle cx="85" cy="85" r="10" fill="url(#glowSpot)" opacity="0.7" />
                      <circle cx="110" cy="95" r="12" fill="url(#glowSpot2)" opacity="0.6" />
                      
                      {/* Stars */}
                      <circle cx="50" cy="50" r="1.5" fill="white" />
                      <circle cx="150" cy="40" r="1.8" fill="#64f3d5" />
                      <circle cx="30" cy="150" r="1" fill="white" />
                      <circle cx="170" cy="130" r="1.3" fill="#4287ff" />
                      <circle cx="65" cy="160" r="1" fill="white" />
                      
                      {/* Cosmic Ray */}
                      <path 
                        d="M100 60C130 0 160 40 180 30" 
                        stroke="url(#rayGradient)" 
                        strokeWidth="1.5" 
                        strokeLinecap="round"
                      />
                      
                      {/* Gradients */}
                      <defs>
                        <radialGradient id="planetGradient" cx="0.5" cy="0.5" r="0.5">
                          <stop offset="0%" stopColor="#4287ff" />
                          <stop offset="70%" stopColor="#2a3e60" />
                          <stop offset="100%" stopColor="#1a2333" />
                        </radialGradient>
                        
                        <radialGradient id="moonGradient" cx="0.5" cy="0.5" r="0.5">
                          <stop offset="0%" stopColor="#64f3d5" />
                          <stop offset="90%" stopColor="#3a9a87" />
                        </radialGradient>
                        
                        <radialGradient id="glowSpot" cx="0.5" cy="0.5" r="0.5">
                          <stop offset="0%" stopColor="rgba(100, 243, 213, 0.9)" />
                          <stop offset="100%" stopColor="rgba(100, 243, 213, 0)" />
                        </radialGradient>
                        
                        <radialGradient id="glowSpot2" cx="0.5" cy="0.5" r="0.5">
                          <stop offset="0%" stopColor="rgba(66, 135, 255, 0.8)" />
                          <stop offset="100%" stopColor="rgba(66, 135, 255, 0)" />
                        </radialGradient>
                        
                        <linearGradient id="rayGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="rgba(100, 243, 213, 0)" />
                          <stop offset="50%" stopColor="rgba(100, 243, 213, 0.8)" />
                          <stop offset="100%" stopColor="rgba(100, 243, 213, 0)" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </Box>
                  
                  {/* Animasi bintang jatuh di belakang logo */}
                  <Box 
                    sx={{
                      position: "absolute",
                      top: "-10%",
                      left: "60%",
                      width: "2px",
                      height: "20px",
                      background: "linear-gradient(to bottom, rgba(255,255,255,0), white)",
                      animation: "shootingStar 2.5s linear infinite",
                      zIndex: 1,
                      opacity: 0.7,
                      animationDelay: "1.5s"
                    }}
                  />
                  
                  <Box 
                    sx={{
                      position: "absolute",
                      top: "30%",
                      left: "20%",
                      width: "1px",
                      height: "15px",
                      background: "linear-gradient(to bottom, rgba(255,255,255,0), #64f3d5)",
                      animation: "shootingStar 3s linear infinite",
                      zIndex: 1,
                      opacity: 0.7,
                      animationDelay: "0.7s"
                    }}
                  />
                </Box>
                
                <Typography 
                  className="cosmic-text"
                  sx={{ 
                    fontFamily: "Orbitron, sans-serif",
                    fontWeight: 700,
                    fontSize: { xs: "1rem", sm: "1.2rem" },
                    mb: 2
                  }}
                >
                  BEGIN COSMIC DIALOGUE
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.7)", maxWidth: "500px", fontSize: { xs: "0.9rem", sm: "1rem" } }}>
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
              p: { xs: 0.5, sm: 1 },
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
                padding: isMobile ? "12px 15px" : "18px 20px",
              border: "none",
              outline: "none",
              color: "white",
                fontSize: isMobile ? "0.9rem" : "1rem",
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
