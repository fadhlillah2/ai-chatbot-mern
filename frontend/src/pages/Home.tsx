import { Box, Button, Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import TypingAnim from "../components/typer/TypingAnim";
import Footer from "../components/footer/Footer";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  const auth = useAuth();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
          position: "relative",
          overflow: "hidden",
          minHeight: "80vh",
        }}
      >
        {/* Cosmic planets floating in background */}
        <Box sx={{
          position: "absolute",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, #1a4999, #090a0f)",
          opacity: 0.4,
          zIndex: -1,
          top: "10%",
          left: "5%",
          animation: "float 30s infinite ease-in-out"
        }} className="planet-glow"></Box>
        
        <Box sx={{
          position: "absolute",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "radial-gradient(circle at 60% 40%, #a04fad, #4a1259)",
          opacity: 0.3,
          zIndex: -1,
          bottom: "15%",
          right: "10%",
          animation: "float 25s infinite ease-in-out reverse"
        }} className="nebula-glow"></Box>
        
        <Box sx={{
          position: "absolute",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, #64f3d5, #2a9f8a)",
          opacity: 0.6,
          zIndex: -1,
          top: "60%",
          left: "15%",
          animation: "float 15s infinite ease-in-out"
        }} className="cosmic-glow"></Box>

        {/* Hero heading */}
        <Box sx={{ 
          textAlign: "center", 
          mb: 6,
          mt: 4,
          p: 2,
          borderRadius: "15px",
          maxWidth: "800px"
        }}>
          <Typography variant="h1" 
            className="cosmic-text"
            sx={{ 
              fontSize: { xs: "2rem", md: "3.5rem" },
              fontWeight: 800,
              mb: 2,
              fontFamily: "Orbitron, sans-serif",
              textTransform: "uppercase",
              letterSpacing: "3px"
            }}>
            Explore The Cosmos With AI
          </Typography>
          
          <Typography variant="h2" 
            sx={{ 
              fontSize: { xs: "1.2rem", md: "1.8rem" },
              fontWeight: 400,
              mb: 4,
              color: "rgba(255, 255, 255, 0.8)",
              maxWidth: "700px",
              mx: "auto"
            }}>
            Embark on an intergalactic journey of knowledge with our advanced AI assistant
          </Typography>

          <Box>
            <TypingAnim />
          </Box>
          
          {/* Call to action buttons */}
          <Box sx={{ mt: 6, display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap" }}>
            {auth?.isLoggedIn ? (
              <Button 
                component={Link} 
                to="/chat" 
                variant="contained" 
                className="cosmic-glow pulse"
                sx={{
                  py: 2,
                  px: 4, 
                  fontSize: "1.1rem",
                  borderRadius: "30px",
                  background: "linear-gradient(90deg, #64f3d5, #4287ff)",
                  transition: "all 0.3s ease",
                  border: "none",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 20px rgba(100, 243, 213, 0.4)"
                  }
                }}
              >
                Start Exploring Now
              </Button>
            ) : (
              <>
                <Button 
                  component={Link} 
                  to="/login" 
                  variant="contained" 
                  className="cosmic-glow"
                  sx={{
                    py: 2,
                    px: 4, 
                    fontSize: "1.1rem",
                    borderRadius: "30px",
                    background: "linear-gradient(90deg, #4287ff, #64f3d5)",
                    transition: "all 0.3s ease",
                    border: "none",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 10px 20px rgba(66, 135, 255, 0.4)"
                    }
                  }}
                >
                  Begin Journey
                </Button>
                <Button 
                  component={Link} 
                  to="/signup" 
                  variant="outlined" 
                  sx={{
                    py: 2,
                    px: 4, 
                    fontSize: "1.1rem",
                    borderRadius: "30px",
                    borderColor: "#e142ff",
                    color: "#e142ff",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "#e142ff",
                      backgroundColor: "rgba(225, 66, 255, 0.1)",
                      transform: "translateY(-5px)"
                    }
                  }}
                >
                  Create Account
                </Button>
              </>
            )}
          </Box>
        </Box>

        {/* Feature showcase */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: { md: "row", xs: "column", sm: "column" },
            gap: { xs: 3, md: 5 },
            my: { xs: 6, md: 10 },
          }}
        >
          <Box className="cosmic-card pulse" sx={{
            p: 3,
            borderRadius: "15px",
            textAlign: "center",
            width: { xs: "90%", md: "30%" },
          }}>
            <Box className="cosmic-glow" sx={{
              width: { xs: "80px", sm: "100px" },
              height: { xs: "80px", sm: "100px" },
              borderRadius: "50%",
              background: "linear-gradient(45deg, #4287ff, #64f3d5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto 20px",
              position: "relative",
            }}>
              <Box className="rotate" sx={{
                position: "absolute",
                width: { xs: "100px", sm: "120px" },
                height: { xs: "100px", sm: "120px" },
                border: "1px solid rgba(100, 243, 213, 0.5)",
                borderRadius: "50%",
              }}></Box>
              <svg
                width="60%"
                height="60%"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Planet with rings */}
                <circle cx="50" cy="50" r="25" fill="url(#planetGradient)" />
                <ellipse cx="50" cy="50" rx="40" ry="10" fill="none" stroke="#64f3d5" strokeWidth="1.5" strokeOpacity="0.8" transform="rotate(25, 50, 50)" />
                <ellipse cx="50" cy="50" rx="35" ry="8" fill="none" stroke="#4287ff" strokeWidth="1" strokeOpacity="0.6" transform="rotate(25, 50, 50)" />
                
                {/* Moon */}
                <circle cx="75" cy="40" r="6" fill="#64f3d5" opacity="0.8" />
                
                {/* Stars */}
                <circle cx="20" cy="30" r="1.5" fill="#ffffff" />
                <circle cx="25" cy="70" r="1" fill="#ffffff" />
                <circle cx="80" cy="75" r="1.2" fill="#ffffff" />
                <circle cx="65" cy="20" r="1" fill="#ffffff" />
                
                {/* Gradient definition */}
                <defs>
                  <radialGradient id="planetGradient" cx="40%" cy="40%" r="60%" fx="40%" fy="40%">
                    <stop offset="0%" stopColor="#64f3d5" />
                    <stop offset="100%" stopColor="#4287ff" />
                  </radialGradient>
                </defs>
              </svg>
            </Box>
            <Typography variant="h5" sx={{ mb: 1, fontFamily: "Orbitron, sans-serif", fontSize: { xs: "1.2rem", sm: "1.5rem" } }}>Advanced Intelligence</Typography>
            <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: { xs: "0.9rem", sm: "1rem" } }}>
              Powered by cutting-edge AI models from across the galaxy
            </Typography>
          </Box>
          
          <Box className="cosmic-card pulse" sx={{
            p: 3,
            borderRadius: "15px",
            textAlign: "center",
            width: { xs: "90%", md: "30%" },
          }}>
            <Box className="nebula-glow" sx={{
              width: { xs: "80px", sm: "100px" },
              height: { xs: "80px", sm: "100px" },
              borderRadius: "50%",
              background: "linear-gradient(45deg, #e142ff, #ff4b4b)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto 20px",
              position: "relative",
            }}>
              <Box className="rotate" sx={{
                position: "absolute",
                width: { xs: "100px", sm: "120px" },
                height: { xs: "100px", sm: "120px" },
                border: "1px solid rgba(225, 66, 255, 0.5)",
                borderRadius: "50%",
              }}></Box>
              <svg
                width="60%"
                height="60%"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Nebula background */}
                <circle cx="50" cy="50" r="30" fill="url(#nebulaGradient)" />
                
                {/* Stars */}
                <circle cx="30" cy="30" r="1.5" fill="#ffffff" opacity="0.8" />
                <circle cx="60" cy="35" r="1" fill="#ffffff" opacity="0.8" />
                <circle cx="70" cy="60" r="1.2" fill="#ffffff" opacity="0.8" />
                <circle cx="35" cy="65" r="1" fill="#ffffff" opacity="0.8" />
                
                {/* Cosmic models visualization */}
                <path d="M35,40 Q50,30 65,40 Q80,50 65,60 Q50,70 35,60 Q20,50 35,40" 
                      fill="none" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.6" />
                <circle cx="35" cy="40" r="3" fill="#e142ff" />
                <circle cx="65" cy="40" r="3" fill="#ff4b4b" />
                <circle cx="65" cy="60" r="3" fill="#e142ff" />
                <circle cx="35" cy="60" r="3" fill="#ff4b4b" />
                
                {/* Gradient definition */}
                <defs>
                  <radialGradient id="nebulaGradient" cx="40%" cy="40%" r="60%" fx="40%" fy="40%">
                    <stop offset="0%" stopColor="#e142ff" />
                    <stop offset="100%" stopColor="#ff4b4b" />
                  </radialGradient>
                </defs>
              </svg>
            </Box>
            <Typography variant="h5" sx={{ mb: 1, fontFamily: "Orbitron, sans-serif", fontSize: { xs: "1.2rem", sm: "1.5rem" } }}>Multiple Models</Typography>
            <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: { xs: "0.9rem", sm: "1rem" } }}>
              Choose from various AI models to suit your interstellar needs
            </Typography>
          </Box>
          
          <Box className="cosmic-card pulse" sx={{
            p: 3,
            borderRadius: "15px",
            textAlign: "center",
            width: { xs: "90%", md: "30%" },
          }}>
            <Box className="planet-glow" sx={{
              width: { xs: "80px", sm: "100px" },
              height: { xs: "80px", sm: "100px" },
              borderRadius: "50%",
              background: "linear-gradient(45deg, #4287ff, #0426ab)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto 20px",
              position: "relative",
            }}>
              <Box className="rotate" sx={{
                position: "absolute",
                width: { xs: "100px", sm: "120px" },
                height: { xs: "100px", sm: "120px" },
                border: "1px solid rgba(66, 135, 255, 0.5)",
                borderRadius: "50%",
              }}></Box>
              <svg
                width="60%"
                height="60%"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Planet background */}
                <circle cx="50" cy="50" r="30" fill="url(#chatPlanetGradient)" />
                
                {/* Message bubble design */}
                <path d="M30,40 L70,40 C75,40 80,45 80,50 L80,65 C80,70 75,75 70,75 L60,75 L55,85 L50,75 L30,75 C25,75 20,70 20,65 L20,50 C20,45 25,40 30,40 Z" 
                      fill="none" stroke="#ffffff" strokeWidth="1.5" />
                      
                {/* Secure lock symbol */}
                <circle cx="50" cy="58" r="8" fill="none" stroke="#ffffff" strokeWidth="1.5" />
                <rect x="46" y="50" width="8" height="8" fill="#4287ff" rx="2" />
                <rect x="48" y="54" width="4" height="8" fill="#4287ff" rx="1" />
                
                {/* Stars */}
                <circle cx="25" cy="35" r="1" fill="#ffffff" />
                <circle cx="75" cy="35" r="1.2" fill="#ffffff" />
                <circle cx="85" cy="55" r="1" fill="#ffffff" />
                <circle cx="20" cy="65" r="1.5" fill="#ffffff" />
                
                {/* Gradient definition */}
                <defs>
                  <radialGradient id="chatPlanetGradient" cx="40%" cy="40%" r="60%" fx="40%" fy="40%">
                    <stop offset="0%" stopColor="#4287ff" />
                    <stop offset="100%" stopColor="#0426ab" />
                  </radialGradient>
                </defs>
              </svg>
            </Box>
            <Typography variant="h5" sx={{ mb: 1, fontFamily: "Orbitron, sans-serif", fontSize: { xs: "1.2rem", sm: "1.5rem" } }}>Secure Conversations</Typography>
            <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: { xs: "0.9rem", sm: "1rem" } }}>
              Encrypted transmissions keep your cosmic conversations private
            </Typography>
          </Box>
        </Box>

        {/* Screen preview */}
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%", mt: 5 }}>
          <Box 
            className="cosmic-glow"
            sx={{
              position: "relative",
              width: isBelowMd ? "90%" : "70%",
              borderRadius: 6,
              overflow: "hidden",
              p: "4px",
              background: "linear-gradient(45deg, #64f3d5, #4287ff, #e142ff)",
              animation: "cosmic-text-animation 10s infinite",
            }}
          >
            <img
              src="app-preview.svg"
              alt="AI Chat Interface"
              style={{
                width: "100%",
                borderRadius: "20px",
                display: "block",
              }}
            />
            <Box 
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "linear-gradient(45deg, rgba(66,135,255,0.3), rgba(100,243,213,0.3))",
                opacity: 0.3,
                borderRadius: "20px",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
