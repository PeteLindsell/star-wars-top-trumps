import styled from "styled-components";

const Button = styled.button`
  background-color: white;
  border: 2px solid;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 8px;
  padding: 8px;
  text-align: left;
  width: 100%;

  :hover,
  :focus {
    background-color: #70c770;
    box-shadow: 0px 0px 3px #000000;
  }
`;

export default Button;
