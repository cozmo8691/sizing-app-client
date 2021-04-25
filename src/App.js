import React, { useState, useEffect, useCallback, useRef } from "react";
import socketIOClient from "socket.io-client";
import { v4 as uuid } from "uuid";

import InputForm from "./components/InputForm";
import TaskList from "./components/TaskList";
import TaskMain from "./components/TaskMain";

const ENDPOINT = "http://127.0.0.1:5000";

let socket = null;

function App() {
  const [roomName, setRoomName] = useState("");
  const [createRoomName, setCreateRoomName] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");
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

  useEffect(() => {
    socket = socketIOClient(ENDPOINT);

    socket.on("createRoomSuccess", function ({ roomId, roomName }) {
      console.log("roomCreated", roomId, roomName);
      setRoomId(roomId);
      setRoomName(roomName);
      setCurrentRoom(roomName);
    });

    socket.on("joinRoomSuccess", function ({ roomId, roomName }) {
      console.log("roomJoined", roomId, roomName);
      setRoomId(roomId);
      setRoomName(roomName);
      setCurrentRoom(roomName);
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

  const createRoom = useCallback(() => {
    socket.emit("createRoom", { roomName: createRoomName, username });
  }, [createRoomName, username]);

  const joinRoom = useCallback(() => {
    socket.emit("joinRoom", { roomId: joinRoomId, username });
  }, [joinRoomId, username]);

  const saveUsername = useCallback(() => {
    setUsernameIsSaved(true);
  }, []);

  const createTask = useCallback(() => {
    const taskId = uuid();
    const newTask = { taskId, roomId, roomName, taskName, taskDescription };
    console.log("creating new task", newTask);
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

  // console.log("allSizes", allSizes);
  // console.log("currentTask:", currentTask);
  // console.log("allTasks:", allTasks.current);

  if (!currentRoom) {
    return (
      <>
        <InputForm
          handleChange={setCreateRoomName}
          handleClick={createRoom}
          value={createRoomName}
          title="Create a Meeting Room"
          label="Create"
        />
        <InputForm
          handleChange={setJoinRoomId}
          handleClick={joinRoom}
          value={joinRoomId}
          title="Join a Meeting Room"
          label="Join"
        />
      </>
    );
  }

  if (!usernameIsSaved) {
    return (
      <InputForm
        handleChange={setUsername}
        handleClick={saveUsername}
        value={username}
        title="Create a username"
        label="Save"
      />
    );
  }

  if (showTaskList) {
    return (
      <TaskList
        allTasks={allTasks}
        handleClick={handleSetCurrentTask}
        handleClose={() => setShowTaskList(false)}
      />
    );
  }

  return (
    <TaskMain
      username={username}
      currentRoom={currentRoom}
      toggleTaskList={() => setShowTaskList(true)}
      getCurrentTaskSize={getCurrentTaskSize}
      currentTask={currentTask}
      size={size}
      setSize={setSize}
      submitSize={submitSize}
      setSizeView={setSizeView}
      setCurrentTask={setCurrentTask}
      sizeView={sizeView}
      allSizes={allSizes}
      setTaskName={setTaskName}
      setTaskDescription={setTaskDescription}
      createTask={createTask}
    />
  );
}

export default App;
