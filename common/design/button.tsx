import React, { FC, MouseEventHandler } from "react";
import { Button as Matbutton } from "@mui/material";

interface ButtonProps {
  style: React.CSSProperties;
  text: string;
  variant: any;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = ({ style, text, variant, onClick }) => {
  return (
    <Matbutton variant={variant} onClick={onClick} style={style}>
      {text}
    </Matbutton>
  );
};

export default Button;
