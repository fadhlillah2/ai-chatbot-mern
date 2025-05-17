import { Link } from "react-router-dom";

type Props = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  glow?: string;
  onClick?: () => Promise<void>;
};

const NavigationLink = (props: Props) => {
  return (
    <Link
      onClick={props.onClick}
      className={`nav-link ${props.glow || ""}`}
      to={props.to}
      style={{ 
        background: props.bg, 
        color: props.textColor,
        border: `1px solid ${props.textColor}`,
        fontFamily: "Orbitron, sans-serif",
        fontSize: "0.9rem",
        letterSpacing: "1px"
      }}
    >
      {props.text}
    </Link>
  );
};

export default NavigationLink;
