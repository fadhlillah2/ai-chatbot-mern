import React from "react";
import { Box, Avatar, Typography, Paper, useMediaQuery, useTheme } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  return role == "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: isMobile ? 1 : 2,
        gap: isMobile ? 1 : 2,
        borderRadius: 2,
        my: 1,
        maxWidth: isMobile ? "95%" : "85%",
        position: "relative"
      }}
    >
      {/* AI Avatar with cosmic glow */}
      <Box className="cosmic-glow" sx={{ 
        borderRadius: "50%", 
        width: isMobile ? 36 : 42, 
        height: isMobile ? 36 : 42,
        flexShrink: 0
      }}>
        <Avatar sx={{ 
          width: "100%", 
          height: "100%",
          backgroundColor: "rgba(100, 243, 213, 0.2)",
          border: "1px solid rgba(100, 243, 213, 0.5)" 
        }}>
          <svg
            width={isMobile ? "24px" : "30px"}
            height={isMobile ? "24px" : "30px"}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Planet with ring */}
            <circle cx="32" cy="32" r="16" fill="url(#cosmicAiGradient_chatItem)" />
            <ellipse cx="32" cy="32" rx="24" ry="8" fill="none" stroke="#64f3d5" strokeWidth="1.5" strokeOpacity="0.8" transform="rotate(25, 32, 32)" />
            <ellipse cx="32" cy="32" rx="20" ry="6" fill="none" stroke="#4287ff" strokeWidth="1" strokeOpacity="0.6" transform="rotate(25, 32, 32)" />
            
            {/* Moon */}
            <circle cx="48" cy="24" r="4" fill="#64f3d5" opacity="0.8" />
            
            {/* Gradient definition */}
            <defs>
              <radialGradient id="cosmicAiGradient_chatItem" cx="40%" cy="40%" r="60%" fx="40%" fy="40%">
                <stop offset="0%" stopColor="#4287ff" />
                <stop offset="100%" stopColor="#1a2333" />
              </radialGradient>
            </defs>
          </svg>
        </Avatar>
      </Box>
      
      {/* Message content with cosmic styling */}
      <Paper 
        elevation={0}
        className="cosmic-card"
        sx={{
          p: isMobile ? 1.5 : 2,
          position: "relative",
          background: "rgba(17, 29, 39, 0.6)",
          border: "1px solid rgba(100, 243, 213, 0.3)",
          borderRadius: "2px 18px 18px 18px",
          overflow: "hidden",
          maxWidth: "100%",
        }}
      >
        {/* Glowing accent line */}
        <Box 
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "3px",
            height: "100%",
            background: "linear-gradient(to bottom, #64f3d5, transparent)",
          }}
        />
        
        <Box sx={{ pl: 1 }}>
          {!messageBlocks && (
            <Typography sx={{ fontSize: isMobile ? "14px" : "16px", lineHeight: 1.6, color: "#eee" }}>{content}</Typography>
          )}
          {messageBlocks &&
            messageBlocks.length &&
            messageBlocks.map((block, index) =>
              isCodeBlock(block) ? (
                <Box key={index} sx={{ 
                  borderRadius: "8px", 
                  overflow: "hidden", 
                  my: isMobile ? 1 : 2,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                  border: "1px solid rgba(66, 135, 255, 0.3)",
                  fontSize: isMobile ? "12px" : "14px"
                }}>
                  <SyntaxHighlighter 
                    style={coldarkDark} 
                    language="javascript"
                    customStyle={{ 
                      fontSize: isMobile ? "12px" : "14px",
                      padding: isMobile ? "0.8rem" : "1rem"  
                    }}
                  >
                    {block}
                  </SyntaxHighlighter>
                </Box>
              ) : (
                <Typography key={index} sx={{ fontSize: isMobile ? "14px" : "16px", lineHeight: 1.6, color: "#eee", mb: 1 }}>{block}</Typography>
              )
            )}
        </Box>
      </Paper>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: isMobile ? 1 : 2,
        gap: isMobile ? 1 : 2,
        borderRadius: 2,
        my: 1,
        maxWidth: isMobile ? "95%" : "85%",
        marginLeft: "auto",
        flexDirection: "row-reverse",
        position: "relative"
      }}
    >
      {/* User Avatar */}
      <Box className="nebula-glow" sx={{ 
        borderRadius: "50%", 
        width: isMobile ? 36 : 42, 
        height: isMobile ? 36 : 42,
        flexShrink: 0
      }}>
        <Avatar sx={{ 
          width: "100%", 
          height: "100%",
          backgroundColor: "rgba(225, 66, 255, 0.2)",
          color: "white",
          fontFamily: "Orbitron, sans-serif",
          border: "1px solid rgba(225, 66, 255, 0.5)" 
        }}>
          {auth?.user?.name[0]}
          {auth?.user?.name.split(" ")[1] ? auth?.user?.name.split(" ")[1][0] : ""}
        </Avatar>
      </Box>
      
      {/* Message content with cosmic styling */}
      <Paper 
        elevation={0}
        className="cosmic-card"
        sx={{
          p: isMobile ? 1.5 : 2,
          position: "relative",
          background: "rgba(30, 20, 60, 0.6)",
          border: "1px solid rgba(225, 66, 255, 0.3)",
          borderRadius: "18px 2px 18px 18px",
          overflow: "hidden",
          maxWidth: "100%",
        }}
      >
        {/* Glowing accent line */}
        <Box 
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "3px",
            height: "100%",
            background: "linear-gradient(to bottom, #e142ff, transparent)",
          }}
        />
        
        <Box sx={{ pr: 1 }}>
          {!messageBlocks && (
            <Typography sx={{ fontSize: isMobile ? "14px" : "16px", lineHeight: 1.6, color: "#eee" }}>{content}</Typography>
          )}
          {messageBlocks &&
            messageBlocks.length &&
            messageBlocks.map((block, index) =>
              isCodeBlock(block) ? (
                <Box key={index} sx={{ 
                  borderRadius: "8px", 
                  overflow: "hidden", 
                  my: isMobile ? 1 : 2,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                  border: "1px solid rgba(225, 66, 255, 0.3)"
                }}>
                  <SyntaxHighlighter 
                    style={coldarkDark} 
                    language="javascript"
                    customStyle={{ 
                      fontSize: isMobile ? "12px" : "14px",
                      padding: isMobile ? "0.8rem" : "1rem"  
                    }}
                  >
                    {block}
                  </SyntaxHighlighter>
                </Box>
              ) : (
                <Typography key={index} sx={{ fontSize: isMobile ? "14px" : "16px", lineHeight: 1.6, color: "#eee", mb: 1 }}>{block}</Typography>
              )
            )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatItem;
