import React, { useState, useEffect, useCallback } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";

let socket = null;

function App() {
  const [roomName, setRoomName] = useState("");
  const [size, setSize] = useState("");
  const [allSizes, setAllSizes] = useState([]);
  const [currentRoom, setCurrentRoom] = useState("");
  const [username, setUsername] = useState("");
  const [usernameIsSaved, setUsernameIsSaved] = useState(false);

  useEffect(() => {
    socket = socketIOClient(ENDPOINT);

    // socket.on("connect", function () {
    //   // socket.emit("room", "test");
    //   // setIsConnected(true);
    // });

    socket.on("room", function (msg) {
      console.log(msg);
    });

    socket.on("message", function (data) {
      console.log("Incoming message:", data);
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

  const submitSize = useCallback(() => {
    socket.emit("size", { size, username, roomName: currentRoom });
  }, [size, username, currentRoom]);

  console.log(allSizes);

  return (
    <div className="App">
      {!usernameIsSaved && (
        <>
          <h2>Create username</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={saveUsername}>Save username</button>
        </>
      )}

      {usernameIsSaved && !currentRoom && (
        <>
          <h2>Join/Create room</h2>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button onClick={connectRoom}>Join/Create</button>
        </>
      )}

      {currentRoom && username && (
        <>
          <p>
            {username} is currently in {currentRoom}
          </p>
          <h3>Submit size vote</h3>
          <input
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <button onClick={submitSize}>Submit size</button>
          <h3>All sizes: {allSizes.join(", ")}</h3>
        </>
      )}
    </div>
  );
}

export default App;
