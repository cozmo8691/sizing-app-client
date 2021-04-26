import React from "react";
import InputForm from "./InputForm";
import { Title, SubHeading } from "./Styled";

const RoomForm = ({
  setCreateRoomName,
  createRoom,
  createRoomName,
  setJoinRoomId,
  joinRoom,
  joinRoomId,
}) => {
  return (
    <>
      <InputForm
        handleChange={setJoinRoomId}
        handleClick={joinRoom}
        value={joinRoomId}
        label="Join"
        placeholder="Enter a room Id">
        <Title>Join a Meeting Room</Title>
      </InputForm>
      <InputForm
        handleChange={setCreateRoomName}
        handleClick={createRoom}
        value={createRoomName}
        label="Create"
        placeholder="Enter a room name">
        <SubHeading>Create a Meeting Room</SubHeading>
      </InputForm>
    </>
  );
};

export default RoomForm;
