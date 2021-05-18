import styled from "styled-components";

type BoxType = {
  highlighted?: boolean;
};

const Box = styled.div<BoxType>`
  border: 2px solid;
  font-size: 1rem;
  margin-bottom: 8px;
  padding: 8px;
  text-align: left;
  background-color: ${({ highlighted }) =>
    highlighted ? "#f3baba;" : "white"};
`;

export default Box;
