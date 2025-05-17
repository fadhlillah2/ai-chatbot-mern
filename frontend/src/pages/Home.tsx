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
              <img
                src="robot.png"
                alt="Advanced AI"
                style={{ width: "60%", height: "60%" }}
              />
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
              <img
                src="openai.png"
                alt="openai"
                style={{ width: "60%" }}
                className="image-inverted"
              />
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
              <img
                src="chat.png"
                alt="Secure Chat"
                style={{ width: "60%", borderRadius: "10px" }}
              />
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
              src="chat.png"
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
