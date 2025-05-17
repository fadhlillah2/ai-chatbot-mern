import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";
import { IconButton, Menu, MenuItem, useMediaQuery, useTheme, Box } from "@mui/material";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

const Header = () => {
  const auth = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    if (auth?.logout) {
      await auth.logout();
      handleClose();
    }
  };

  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Logo />
        
        {isMobile ? (
          <Box>
            <IconButton
              className="cosmic-glow"
              onClick={handleClick}
              sx={{ color: "#64f3d5" }}
            >
              <FiMenu />
            </IconButton>
            
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                sx: { 
                  backgroundColor: "rgba(17, 29, 39, 0.95)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(100, 243, 213, 0.3)",
                  borderRadius: "10px",
                  boxShadow: "0 0 15px rgba(66, 135, 255, 0.3)",
                  minWidth: "160px",
                }
              }}
            >
              {auth?.isLoggedIn ? (
                <>
                  <MenuItem 
                    onClick={() => {
                      handleClose();
                      window.location.href = "/chat";
                    }}
                    sx={{ 
                      color: "#64f3d5",
                      fontFamily: "Orbitron, sans-serif",
                      fontSize: "0.9rem"
                    }}
                  >
                    CHAT CONSOLE
                  </MenuItem>
                  <MenuItem 
                    onClick={handleLogout}
                    sx={{ 
                      color: "#e142ff",
                      fontFamily: "Orbitron, sans-serif",
                      fontSize: "0.9rem"
                    }}
                  >
                    DISCONNECT
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem 
                    onClick={() => {
                      handleClose();
                      window.location.href = "/login";
                    }}
                    sx={{ 
                      color: "#64f3d5",
                      fontFamily: "Orbitron, sans-serif",
                      fontSize: "0.9rem"
                    }}
                  >
                    LOGIN
                  </MenuItem>
                  <MenuItem 
                    onClick={() => {
                      handleClose();
                      window.location.href = "/signup";
                    }}
                    sx={{ 
                      color: "#e142ff",
                      fontFamily: "Orbitron, sans-serif",
                      fontSize: "0.9rem"
                    }}
                  >
                    SIGNUP
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        ) : (
          <Box sx={{ display: "flex" }}>
            {auth?.isLoggedIn ? (
              <>
                <NavigationLink
                  bg="rgba(100, 243, 213, 0.2)"
                  to="/chat"
                  text="CHAT CONSOLE"
                  textColor="#64f3d5"
                  glow="cosmic-glow"
                />
                <NavigationLink
                  bg="rgba(225, 66, 255, 0.2)"
                  textColor="#e142ff"
                  to="/"
                  text="DISCONNECT"
                  onClick={auth.logout}
                  glow="nebula-glow"
                />
              </>
            ) : (
              <>
                <NavigationLink
                  bg="rgba(100, 243, 213, 0.2)"
                  to="/login"
                  text="LOGIN"
                  textColor="#64f3d5"
                  glow="cosmic-glow"
                />
                <NavigationLink
                  bg="rgba(225, 66, 255, 0.2)"
                  textColor="#e142ff"
                  to="/signup"
                  text="SIGNUP"
                  glow="nebula-glow"
                />
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
