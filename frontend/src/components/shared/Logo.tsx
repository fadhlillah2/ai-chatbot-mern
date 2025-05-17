import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <Link to={"/"}>
        <div className="logo-container cosmic-glow" style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "linear-gradient(45deg, #4287ff, #e142ff)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden"
        }}>
          <div className="planet" style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "radial-gradient(circle at 30% 30%, #64f3d5, #4287ff)",
            position: "relative",
            overflow: "hidden"
          }}>
            <div className="planet-ring" style={{
              position: "absolute",
              width: "50px",
              height: "10px",
              background: "rgba(255, 255, 255, 0.2)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(30deg)",
              borderRadius: "50%"
            }}></div>
          </div>
        </div>
      </Link>{" "}
      <Typography
        className="cosmic-text"
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          mr: "auto",
          fontWeight: "900",
          fontFamily: "Orbitron, sans-serif",
          textShadow: "0 0 10px rgba(100, 243, 213, 0.7)",
          letterSpacing: "2px"
        }}
      >
        <span style={{ fontSize: "20px" }}>COSMIC</span>-AI
      </Typography>
    </div>
  );
};

export default Logo;
