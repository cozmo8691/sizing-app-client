import React from "react";
import { Title, Container, Input, Button } from "./Styled";

const Join = ({ handleChange, handleClick, value, title, label }) => {
  return (
    <>
      <Title>{title}</Title>
      <Container padding="2rem 0">
        <Container padding="0 0 1rem">
          <Input
            type="text"
            value={value}
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
