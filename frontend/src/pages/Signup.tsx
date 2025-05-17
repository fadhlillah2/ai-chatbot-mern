import React, { useEffect } from "react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import { FiUserPlus } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import CustomizedInput from "../components/shared/CustomizedInput";

const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    try {
      toast.loading("Creating cosmic identity...", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Welcome to the cosmos, explorer!", { id: "signup" });
    } catch (error) {
      console.log(error);
      toast.error("Identity creation failed. Please try again.", { id: "signup" });
    }
  };
  
  useEffect(() => {
    if (auth?.isLoggedIn) {
      return navigate("/chat");
    }
  }, [auth]);
  
  // Generate random stars for background
  const renderStars = () => {
    const starElements = [];
    for (let i = 0; i < 70; i++) {
      const size = Math.random() * 3;
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
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 8,
          position: "relative"
        }}
      >
        {/* Decorative nebula */}
        <Box 
          className="nebula-glow pulse"
          sx={{
            position: "absolute",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle at 30% 30%, #a04fad, #4a1259)",
            opacity: 0.15,
            zIndex: -1,
            top: "-120px",
            left: "-80px",
          }}
        />
        
        {/* Signup Form Card */}
        <Paper 
          className="cosmic-card"
          component="form"
          onSubmit={handleSubmit}
          sx={{ 
            p: 5, 
            width: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Star background animation */}
          {renderStars()}
          
          {/* Signup header */}
          <Box 
            sx={{ 
              textAlign: "center",
              mb: 4,
              position: "relative",
              zIndex: 1
            }}
          >
            <Typography 
              className="cosmic-text"
              variant="h4" 
              sx={{ 
                mb: 1.5,
                fontFamily: "Orbitron, sans-serif",
                fontWeight: "800",
                letterSpacing: 2
              }}
            >
              JOIN THE COSMOS
            </Typography>
            <Typography 
              variant="body1"
              sx={{ 
                color: "rgba(255, 255, 255, 0.7)",
                fontFamily: "Work Sans, sans-serif"
              }}
            >
              Create your cosmic explorer identity
            </Typography>
          </Box>
          
          {/* Input Fields */}
          <Box sx={{ mb: 2, position: "relative", zIndex: 1 }}>
            <CustomizedInput
              name="name"
              type="text"
              label="Cosmic Identity"
              placeholder="Your cosmic name"
            />
          </Box>
          
          <Box sx={{ mb: 2, position: "relative", zIndex: 1 }}>
            <CustomizedInput
              name="email"
              type="email"
              label="Communication Channel"
              placeholder="cosmic.explorer@universe.io"
            />
          </Box>
          
          <Box sx={{ mb: 3, position: "relative", zIndex: 1 }}>
            <CustomizedInput
              name="password"
              type="password"
              label="Security Key"
              placeholder="Create your secret key"
            />
          </Box>
          
          {/* Submit Button */}
          <Button 
            className="nebula-glow"
            type="submit"
            fullWidth
            sx={{
              py: 1.5,
              mt: 1,
              mb: 3,
              background: "linear-gradient(90deg, rgba(225, 66, 255, 0.8), rgba(100, 66, 225, 0.8))",
              color: "white",
              fontWeight: "600",
              fontSize: "1rem",
              borderRadius: "30px",
              fontFamily: "Orbitron, sans-serif",
              letterSpacing: 1,
              border: "none",
              position: "relative",
              zIndex: 1,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 10px 20px rgba(225, 66, 255, 0.3)"
              }
            }}
            startIcon={<FiUserPlus />}
          >
            CREATE IDENTITY
          </Button>
          
          {/* Login link */}
          <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
              Already part of the cosmos?{" "}
              <Box 
                component="span" 
                onClick={() => navigate("/login")}
                sx={{ 
                  color: "#e142ff",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    textShadow: "0 0 8px rgba(225, 66, 255, 0.7)"
                  }
                }}
              >
                Log In
              </Box>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Signup;
