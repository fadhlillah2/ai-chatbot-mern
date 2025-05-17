import React, { useEffect } from "react";
import { Box, Typography, Button, TextField, Container, Paper, useTheme, useMediaQuery } from "@mui/material";
import { IoMdLogIn } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import CustomizedInput from "../components/shared/CustomizedInput";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    try {
      toast.loading("Establishing cosmic connection...", { id: "login" });
      await auth?.login(email, password);
      toast.success("Welcome back, cosmic explorer!", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Connection failed. Please check your credentials.", { id: "login" });
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
    for (let i = 0; i < (isMobile ? 40 : 70); i++) {
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
          mt: isMobile ? 4 : 8,
          position: "relative"
        }}
      >
        {/* Decorative planet */}
        <Box 
          className="planet-glow pulse"
          sx={{
            position: "absolute",
            width: isMobile ? "120px" : "180px",
            height: isMobile ? "120px" : "180px",
            borderRadius: "50%",
            background: "radial-gradient(circle at 30% 30%, #1a4999, #090a0f)",
            opacity: 0.15,
            zIndex: -1,
            top: isMobile ? "-60px" : "-100px",
            right: isMobile ? "-30px" : "-50px",
          }}
        />
        
        {/* Login Form Card */}
        <Paper 
          className="cosmic-card"
          component="form"
          onSubmit={handleSubmit}
          sx={{ 
            p: isMobile ? 3 : 5, 
            width: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Star background animation */}
          {renderStars()}
          
          {/* Login header */}
          <Box 
            sx={{ 
              textAlign: "center",
              mb: isMobile ? 2 : 4,
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
                letterSpacing: 2,
                fontSize: isMobile ? "1.8rem" : "2.125rem"
              }}
            >
              COSMIC LOGIN
            </Typography>
            <Typography 
              variant="body1"
              sx={{ 
                color: "rgba(255, 255, 255, 0.7)",
                fontFamily: "Work Sans, sans-serif",
                fontSize: isMobile ? "0.9rem" : "1rem"
              }}
            >
              Initiate sequence to access your intergalactic dashboard
            </Typography>
          </Box>
          
          {/* Input Fields */}
          <Box sx={{ mb: 3, position: "relative", zIndex: 1 }}>
            <CustomizedInput
              name="email"
              type="email"
              label="Email Address"
              placeholder="stargazer@cosmos.io"
            />
          </Box>
          
          <Box sx={{ mb: 4, position: "relative", zIndex: 1 }}>
            <CustomizedInput
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your cosmic key"
            />
          </Box>
          
          {/* Submit Button */}
          <Button 
            className="cosmic-glow"
            type="submit"
            fullWidth
            sx={{
              py: 1.5,
              mt: 1,
              mb: 3,
              background: "linear-gradient(90deg, rgba(66, 135, 255, 0.8), rgba(100, 243, 213, 0.8))",
              color: "white",
              fontWeight: "600",
              fontSize: isMobile ? "0.9rem" : "1rem",
              borderRadius: "30px",
              fontFamily: "Orbitron, sans-serif",
              letterSpacing: 1,
              border: "none",
              position: "relative",
              zIndex: 1,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 10px 20px rgba(100, 243, 213, 0.3)"
              }
            }}
            startIcon={<IoMdLogIn />}
          >
            INITIATE LOGIN
          </Button>
          
          {/* Sign up link */}
          <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
              No cosmic credentials yet?{" "}
              <Box 
                component="span" 
                onClick={() => navigate("/signup")}
                sx={{ 
                  color: "#64f3d5",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    textShadow: "0 0 8px rgba(100, 243, 213, 0.7)"
                  }
                }}
              >
                Register Now
              </Box>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
