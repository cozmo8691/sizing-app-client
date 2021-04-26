import React from "react";
import { Container, Input, Button } from "./Styled";

const Join = ({
  handleChange,
  handleClick,
  value,
  label,
  children,
  placeholder,
}) => {
  return (
    <>
      {children}
      <Container padding="2rem 0">
        <Container padding="0 0 1rem">
          <Input
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={(e) => handleChange(e.target.value)}
          />
        </Container>
        <Container>
          <Button onClick={handleClick}>{label}</Button>
        </Container>
      </Container>
    </>
  );
};

export default Join;
