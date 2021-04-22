import React, { useState, useEffect, useCallback } from "react";
import socketIOClient from "socket.io-client";
import styled from "styled-components";
const ENDPOINT = "http://127.0.0.1:5000";

let socket = null;

const Title = styled.h1`
  font-size: 2.5em;
  font-weight: 700;
  text-align: center;
  color: palevioletred;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ padding }) => (padding ? padding : `0`)};
`;

const Input = styled.input`
  font-family: "Roboto Slab";
  font-size: 1.5rem;
  width: 20rem;
  height: 3rem;
  background: #ede2d3;
  border: 2px solid white;
  color: palevioletred;
  border-radius: 10px;
`;

const Textarea = styled.textarea`
  font-family: "Roboto Slab";
  font-size: 1.5rem;
  width: 20rem;
  height: 6rem;
  background: #ede2d3;
  border: 2px solid white;
  color: palevioletred;
  border-radius: 10px;
`;

const Button = styled.button`
  font-family: "Roboto Slab";
  font-size: 2rem;
  width: 14rem;
  height: 3rem;
  background: #ede2d3;
  border: 2px solid white;
  background: palevioletred;
  color: white;
  border-radius: 10px;
  padding: 0 0.5rem;
`;

function App() {
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [size, setSize] = useState("");
  const [allSizes, setAllSizes] = useState([]);
  const [currentRoom, setCurrentRoom] = useState("");
  const [username, setUsername] = useState("");
  const [usernameIsSaved, setUsernameIsSaved] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [currentTask, setCurrentTask] = useState(null);
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    socket = socketIOClient(ENDPOINT);

    // socket.on("connect", function () {
    //   socket.emit("room", "test");
    //   // setIsConnected(true);
    // });

    socket.on("room", function ({ roomId }) {
      console.log(roomId);
      setRoomId(roomId);
    });

    socket.on("message", function (msg) {
      console.log("Incoming message:", msg);
    });

    socket.on("task", function (task) {
      console.log("new task created:", task);
      setAllTasks((allTasks) => {
        return [...allTasks, task];
      });
    });

    socket.on("size", function (incomingSize) {
      setAllSizes((allSizes) => {
        return [...allSizes, incomingSize];
      });
    });
  }, [allSizes]);

  const connectRoom = useCallback(() => {
    socket.emit("room", { roomName, username });
    setCurrentRoom(roomName);
  }, [roomName, username]);

  const saveUsername = useCallback(() => {
    setUsernameIsSaved(true);
  }, []);

  const createTask = useCallback(() => {
    socket.emit("task", { roomId, roomName, taskName, taskDescription });
    setTaskName("");
    setTaskDescription("");
  }, [roomId, roomName, taskName, taskDescription]);

  const submitSize = useCallback(() => {
    socket.emit("size", {
      size,
      taskId: currentTask,
      username,
      roomName: currentRoom,
      roomId,
    });
  }, [size, username, currentRoom, currentTask, roomId]);

  if (!currentRoom) {
    return (
      <>
        <Title>Join or Create a Meeting Room</Title>
        <Container padding="2rem 0">
          <Container padding="0 0 1rem">
            <Input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </Container>
          <Container>
            <Button onClick={connectRoom}>Join/Create</Button>
          </Container>
        </Container>
      </>
    );
  }

  if (!usernameIsSaved) {
    return (
      <>
        <Title>Create username</Title>
        <Container padding="2rem 0">
          <Container padding="0 0 1rem">
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Container>
          <Button onClick={saveUsername}>Save</Button>
        </Container>
      </>
    );
  }

  if (currentTask) {
    return (
      <>
        <p>
          {username} is currently in {currentRoom}
        </p>
        <Title>Submit size vote</Title>
        <h3>{currentTask.taskName}</h3>
        <p>{currentTask.taskDescription}</p>
        <Container padding="2rem 0">
          <Container padding="0 0 1rem">
            <Input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </Container>
          <Button onClick={submitSize}>Submit size</Button>
        </Container>
        <h3>All sizes for task {currentTask.taskName}:</h3>
        <ul>
          {allSizes
            .filter(({ taskId }) => taskId === currentTask)
            .map(({ username, size }) => {
              console.log(size);
              return <li key={username + size}>{size}</li>;
            })}
        </ul>
      </>
    );
  }

  return (
    <>
      <p>
        {username} is currently in {currentRoom}
      </p>
      <Title>Add Task</Title>
      <Container padding="2rem 0">
        <Container padding="0 0 1rem">
          <Input
            type="text"
            placeholder="enter task title..."
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </Container>
        <Container padding="0 0 1rem">
          <Textarea
            value={taskDescription}
            onChange={(e) => {
              setTaskDescription(e.target.value);
            }}
            placeholder="enter task description..."
          />
        </Container>
        <Button onClick={createTask}>Save Task</Button>
      </Container>
      <ul>
        {allTasks.map(({ taskId, taskName }) => (
          <li key={taskId} onClick={() => setCurrentTask(taskId)}>
            {taskName}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
