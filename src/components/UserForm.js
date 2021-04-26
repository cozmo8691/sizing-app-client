import React from "react";
import InputForm from "./InputForm";
import { Title } from "./Styled";

const UserForm = ({ setUsername, saveUsername, username }) => {
  return (
    <InputForm
      handleChange={setUsername}
      handleClick={saveUsername}
      value={username}
      label="Save">
      <Title>Create a nickname</Title>
    </InputForm>
  );
};

export default UserForm;
