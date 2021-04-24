import React from "react";

import { Title, Container, CloseTasks, TaskListItem } from "./Styled";

const TaskList = ({ allTasks, handleClick, handleClose }) => {
  return (
    <>
      <Container>
        <Title>Task list</Title>
        <CloseTasks onClick={handleClose}>X</CloseTasks>
        <div>
          {allTasks.current.map(({ taskId, taskName }) => (
            <TaskListItem
              key={taskId}
              onClick={() => {
                handleClick(taskId);
                handleClose();
              }}>
              {taskName}
            </TaskListItem>
          ))}
        </div>
      </Container>
    </>
  );
};

export default TaskList;
