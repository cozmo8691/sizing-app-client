import React, { useState, useEffect, useCallback, useRef } from "react";
import socketIOClient from "socket.io-client";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
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
  font-weight: 700;
  width: 14rem;
  height: 3rem;
  background: #ede2d3;
  border: 2px solid white;
  background: palevioletred;
  color: white;
  border-radius: 10px;
  padding: 0 0.5rem;
  cursor: pointer;
`;

const ViewActionButton = styled(Button)`
  font-size: 1rem;
  width: 6rem;
`;

const Small = styled.p`
  color: palevioletred;
  font-size: 0.9rem;
  padding: 0;
  margin: 0 0 0 0.3rem;
  font-weight: 700;
`;
const TasksLink = styled.p`
  color: palevioletred;
  font-size: 0.9rem;
  font-weight: 700;
  padding: 0;
  margin: 0;
  position: absolute;
  right: 0.3rem;
  top: 0;
  cursor: pointer;
`;

const CloseTasks = styled.p`
  color: palevioletred;
  font-size: 2rem;
  padding: 0;
  margin: 0;
  position: absolute;
  right: 0.5rem;
  top: 0;
  cursor: pointer;
`;

const ViewActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: space-around;
`;

const TaskInfo = styled.div`
  background: white;
  width: 16rem;
  padding: 1.5rem;
`;

const UserCard = styled.div`
  background: white;
  display: flex;
  font-weight: 700;
  font-size: 1rem;
  align-content: center;
  justify-content: center;
  margin: 1rem;
  padding: 1rem;
  width: 6rem;
  color: CornflowerBlue;
`;

const VoteCard = styled.div`
  background: white;
  display: flex;
  font-weight: 700;
  font-size: 3rem;
  align-content: center;
  justify-content: center;
  margin: 1rem;
  padding: 1rem;
  width: 4rem;
  color: CornflowerBlue;
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-items: space-around;
`;

const TaskListItem = styled.div`
  color: palevioletred;
  font-weight: 700;
  font-size: 2rem;
  margin: 1rem;
  cursor: pointer;
`;

const TaskTitle = styled.p`
  margin: 0;
  padding: 0;
  font-weight: 700;
  font-size: 1rem;
`;
const TaskDescription = styled.p`
  margin: 0;
  padding: 0;
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
  const allTasks = useRef([]);
  const [sizeView, setSizeView] = useState("users");
  const [showTaskList, setShowTaskList] = useState(false);

  // enter room name - creates room with that name - returns roomId
  // checks room collection keys for match
  // if not found - creates the room

  // enter roomId
  // checks for key match
  // found - join that room

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
      allTasks.current = [...allTasks.current, task];

      setCurrentTask(task);
    });

    socket.on("currentTask", function (taskId) {
      setCurrentTask(() => {
        const currTask = allTasks.current.find((t) => t.taskId === taskId);
        return currTask;
      });
      // setCurrentTask(currTask);
    });

    socket.on("size", function (incomingSize) {
      setAllSizes((allSizes) => {
        return [...allSizes, incomingSize];
      });
    });

    socket.on("updateTasks", function (incomingTasks) {
      console.log("updateTasks", incomingTasks);
      allTasks.current = incomingTasks;
    });

    socket.on("updateSizes", function (incomingSizes) {
      console.log("updateSizes", incomingSizes);
      setAllSizes(incomingSizes);
    });
  }, [allSizes, allTasks]);

  const connectRoom = useCallback(() => {
    socket.emit("room", { roomName, username });
    setCurrentRoom(roomName);
  }, [roomName, username]);

  const saveUsername = useCallback(() => {
    setUsernameIsSaved(true);
  }, []);

  const createTask = useCallback(() => {
    const taskId = uuid();
    const newTask = { taskId, roomId, roomName, taskName, taskDescription };
    socket.emit("task", newTask);
    setTaskName("");
    setTaskDescription("");
  }, [roomId, roomName, taskName, taskDescription]);

  const submitSize = useCallback(() => {
    socket.emit("size", {
      size,
      taskId: currentTask.taskId,
      username,
      roomName: currentRoom,
      roomId,
    });
    setSize("");
  }, [size, username, currentRoom, currentTask, roomId]);

  const handleSetCurrentTask = useCallback(
    (taskId) => {
      socket.emit("currentTask", { taskId, roomName: currentRoom });
    },
    [currentRoom]
  );

  const getCurrentTaskSize = useCallback(() => {
    const sizeRecord = allSizes.find(
      (s) => s.username === username && s.taskId === currentTask.taskId
    );
    return sizeRecord?.size;
  }, [allSizes, username, currentTask]);

  console.log("allSizes", allSizes);
  console.log("currentTask:", currentTask);
  console.log("allTasks:", allTasks.current);

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

  if (showTaskList) {
    return (
      <>
        <Container>
          <Title>Task list</Title>
          <CloseTasks onClick={() => setShowTaskList(false)}>X</CloseTasks>
          <ul>
            {allTasks.current.map(({ taskId, taskName }) => (
              <TaskListItem
                key={taskId}
                onClick={() => {
                  handleSetCurrentTask(taskId);
                  setShowTaskList(false);
                }}>
                {taskName}
              </TaskListItem>
            ))}
          </ul>
        </Container>
      </>
    );
  }

  if (currentTask) {
    return (
      <>
        <Small>
          {username} is currently in {currentRoom}
        </Small>
        <TasksLink>
          <span onClick={() => setShowTaskList(true)}>Tasks</span>
        </TasksLink>
        {!getCurrentTaskSize() ? (
          <Title>Submit size vote</Title>
        ) : (
          <Title>You sized this task as a: {getCurrentTaskSize()}</Title>
        )}
        <Container padding="0">
          <TaskInfo>
            <TaskTitle>{currentTask.taskName}</TaskTitle>
            <TaskDescription>{currentTask.taskDescription}</TaskDescription>
          </TaskInfo>
        </Container>
        {!getCurrentTaskSize() && (
          <Container padding="2rem 0">
            <Container padding="0 0 1rem">
              <Input
                type="text"
                value={size}
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              />
            </Container>
            <Button onClick={submitSize}>Submit size</Button>
          </Container>
        )}
        <Container padding="2rem 0">
          <ViewActions>
            <ViewActionButton onClick={() => setSizeView("users")}>
              Voting
            </ViewActionButton>
            <ViewActionButton onClick={() => setSizeView("results")}>
              Results
            </ViewActionButton>
            <ViewActionButton onClick={() => setSizeView("summary")}>
              Summary
            </ViewActionButton>
            <ViewActionButton
              onClick={() => {
                setCurrentTask(null);
                setSizeView("users");
              }}>
              Done
            </ViewActionButton>
          </ViewActions>
          {sizeView === "users" && (
            <>
              <h3>Users who have sized task {currentTask.taskName}:</h3>
              <ResultsContainer>
                {allSizes
                  .filter(({ taskId }) => taskId === currentTask.taskId)
                  .map(({ taskId, username }) => {
                    return (
                      <UserCard key={taskId + username}>{username}</UserCard>
                    );
                  })}
              </ResultsContainer>
            </>
          )}
          {sizeView === "results" && (
            <>
              <h3>All sizes for task {currentTask.taskName}:</h3>
              <ResultsContainer>
                {allSizes
                  .filter(({ taskId }) => taskId === currentTask.taskId)
                  .map(({ taskId, username, size }) => {
                    return <VoteCard key={taskId + username}>{size}</VoteCard>;
                  })}
              </ResultsContainer>
            </>
          )}
          {sizeView === "summary" && <>calculate avg mean range</>}
        </Container>
      </>
    );
  }

  return (
    <>
      <Small>
        {username} is currently in {currentRoom}
      </Small>
      <TasksLink>
        <span onClick={() => setShowTaskList(true)}>Tasks</span>
      </TasksLink>
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
    </>
  );
}

export default App;
