import styled from "styled-components";

const Button = styled.button`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 1.5rem;
  font-weight: 700;
  width: 14rem;
  height: 3rem;
  background: #ede2d3;
  border: 2px solid white;
  color: white;
  border-radius: 10px;
  padding: 0 0.5rem;
  cursor: pointer;
  color: ${(props) => props.theme.button.text};
  background-color: ${(props) => props.theme.button.background};
`;

const Title = styled.h1`
  font-size: 2.5em;
  font-weight: 600;
  text-align: center;
  color: ${(props) => props.theme.text};
  line-height: 2.5rem;
  margin: 0;
  padding: 1rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ padding }) => (padding ? padding : `0`)};
`;

const Input = styled.input`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 1.5rem;
  width: 20rem;
  height: 3rem;
  background: ${(props) => props.theme.input.background};
  border: 0;
  color: ${(props) => props.theme.input.text};
  border-radius: 10px;
  padding: 0.5rem;
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 1.5rem;
  width: 20rem;
  height: 6rem;
  background: ${(props) => props.theme.input.background};
  border: 0;
  color: ${(props) => props.theme.input.text};
  border-radius: 10px;
`;

const ViewActionButton = styled(Button)`
  font-size: 1rem;
  width: 6rem;
  margin: 0.25rem;
`;

const Small = styled.p`
  color: ${(props) => props.theme.text};
  font-size: 0.9rem;
  padding: 0;
  margin: 0 0 0 0.3rem;
  font-weight: 700;
`;
const TasksLink = styled.p`
  color: ${(props) => props.theme.text};
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
  color: ${(props) => props.theme.text};
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
  // background-color: ${(props) => props.theme.secondaryBackground};
  width: 16rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.text};
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
  color: ${(props) => props.theme.text};
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
  color: ${(props) => props.theme.text};
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-items: space-around;
`;

const TaskListItem = styled.div`
  color: ${(props) => props.theme.text};
  font-weight: 700;
  font-size: 2rem;
  margin: 1rem;
  cursor: pointer;
  text-align: center;
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
