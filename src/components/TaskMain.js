import React from "react";

import {
  Title,
  Container,
  Input,
  Button,
  ViewActionButton,
  Small,
  TasksLink,
  ViewActions,
  TaskDescription,
  TaskTitle,
  ResultsContainer,
  UserCard,
  VoteCard,
  TaskInfo,
} from "./Styled";

const TaskMain = ({
  username,
  currentRoom,
  currentTask: { taskId, taskName, taskDescription },
  getCurrentTaskSize,
  toggleTaskList,
  size,
  setSize,
  submitSize,
  sizeView,
  setSizeView,
  setCurrentTask,
  allSizes,
}) => {
  return (
    <>
      <Small>
        {username} is currently in {currentRoom}
      </Small>
      <TasksLink>
        <span onClick={toggleTaskList}>Tasks</span>
      </TasksLink>
      {!getCurrentTaskSize() ? (
        <Title>Submit size vote</Title>
      ) : (
        <Title>Your size: {getCurrentTaskSize()}</Title>
      )}
      <Container padding="0">
        <TaskInfo>
          <TaskTitle>{taskName}</TaskTitle>
          <TaskDescription>{taskDescription}</TaskDescription>
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
            <h3>Users who have sized {taskName}:</h3>
            <ResultsContainer>
              {allSizes
                .filter((t) => t.taskId === taskId)
                .map((t) => {
                  return (
                    <UserCard key={t.taskId + t.username}>
                      {t.username}
                    </UserCard>
                  );
                })}
            </ResultsContainer>
          </>
        )}
        {sizeView === "results" && (
          <>
            <h3>All sizes for task {taskName}:</h3>
            <ResultsContainer>
              {allSizes
                .filter((t) => t.taskId === taskId)
                .map((t) => {
                  return (
                    <VoteCard key={t.taskId + t.username}>{t.size}</VoteCard>
                  );
                })}
            </ResultsContainer>
          </>
        )}
        {sizeView === "summary" && <>calculate avg mean range</>}
      </Container>
    </>
  );
};

export default TaskMain;
