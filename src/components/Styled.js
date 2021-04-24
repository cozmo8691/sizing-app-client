import styled from "styled-components";

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

export {
  Title,
  Container,
  Input,
  Textarea,
  Button,
  ViewActionButton,
  Small,
  TasksLink,
  CloseTasks,
  ViewActions,
  TaskDescription,
  TaskTitle,
  TaskListItem,
  ResultsContainer,
  UserCard,
  VoteCard,
  TaskInfo,
};
