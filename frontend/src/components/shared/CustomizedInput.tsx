import React from "react";
import TextField from "@mui/material/TextField";

type Props = {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
};

const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin="normal"
      fullWidth
      className="cosmic-input"
      name={props.name}
      label={props.label}
      type={props.type}
      placeholder={props.placeholder}
      InputLabelProps={{ 
        style: { 
          color: "#64f3d5",
          fontFamily: "Work Sans, sans-serif"
        } 
      }}
      InputProps={{
        style: {
          borderRadius: 10,
          fontSize: 16,
          color: "white",
          fontFamily: "Work Sans, sans-serif",
          letterSpacing: "0.5px",
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "rgba(100, 243, 213, 0.3)",
            borderRadius: "12px",
          },
          "&:hover fieldset": {
            borderColor: "rgba(100, 243, 213, 0.6)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#64f3d5",
            boxShadow: "0 0 12px rgba(100, 243, 213, 0.3)",
          },
        },
        mb: 1.5
      }}
    />
  );
};

export default CustomizedInput;
