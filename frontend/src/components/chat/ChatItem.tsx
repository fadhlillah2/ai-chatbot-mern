import React from "react";
import { Box, Avatar, Typography, Paper } from "@mui/material";
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
  
  return role == "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        gap: 2,
        borderRadius: 2,
        my: 1,
        maxWidth: "85%",
        position: "relative"
      }}
    >
      {/* AI Avatar with cosmic glow */}
      <Box className="cosmic-glow" sx={{ 
        borderRadius: "50%", 
        width: 42, 
        height: 42,
        flexShrink: 0
      }}>
        <Avatar sx={{ 
          width: "100%", 
          height: "100%",
          backgroundColor: "rgba(100, 243, 213, 0.2)",
          border: "1px solid rgba(100, 243, 213, 0.5)" 
        }}>
          <img src="openai.png" alt="AI" width={"30px"} className="image-inverted" />
        </Avatar>
      </Box>
      
      {/* Message content with cosmic styling */}
      <Paper 
        elevation={0}
        className="cosmic-card"
        sx={{
          p: 2,
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
            <Typography sx={{ fontSize: "16px", lineHeight: 1.6, color: "#eee" }}>{content}</Typography>
          )}
          {messageBlocks &&
            messageBlocks.length &&
            messageBlocks.map((block, index) =>
              isCodeBlock(block) ? (
                <Box key={index} sx={{ 
                  borderRadius: "8px", 
                  overflow: "hidden", 
                  my: 2,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                  border: "1px solid rgba(66, 135, 255, 0.3)"
                }}>
                  <SyntaxHighlighter style={coldarkDark} language="javascript">
                    {block}
                  </SyntaxHighlighter>
                </Box>
              ) : (
                <Typography key={index} sx={{ fontSize: "16px", lineHeight: 1.6, color: "#eee", mb: 1 }}>{block}</Typography>
              )
            )}
        </Box>
      </Paper>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 2,
        gap: 2,
        borderRadius: 2,
        my: 1,
        maxWidth: "85%",
        marginLeft: "auto",
        flexDirection: "row-reverse",
        position: "relative"
      }}
    >
      {/* User Avatar */}
      <Box className="nebula-glow" sx={{ 
        borderRadius: "50%", 
        width: 42, 
        height: 42,
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
          p: 2,
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
            <Typography sx={{ fontSize: "16px", lineHeight: 1.6, color: "#eee" }}>{content}</Typography>
          )}
          {messageBlocks &&
            messageBlocks.length &&
            messageBlocks.map((block, index) =>
              isCodeBlock(block) ? (
                <Box key={index} sx={{ 
                  borderRadius: "8px", 
                  overflow: "hidden", 
                  my: 2,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                  border: "1px solid rgba(225, 66, 255, 0.3)"
                }}>
                  <SyntaxHighlighter style={coldarkDark} language="javascript">
                    {block}
                  </SyntaxHighlighter>
                </Box>
              ) : (
                <Typography key={index} sx={{ fontSize: "16px", lineHeight: 1.6, color: "#eee", mb: 1 }}>{block}</Typography>
              )
            )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatItem;
