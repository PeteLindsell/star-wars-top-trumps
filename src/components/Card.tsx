import { FC } from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 8px #000000;
  height: 300px;
  margin: 8px;
  max-width: 300px;
  padding: 8px;
`;

type CardType = {
  title: string;
  subtitle: string;
};

const Card: FC<CardType> = ({ title, subtitle, children }) => (
  <CardWrapper>
    <h2>{title}</h2>
    <h3>{subtitle}</h3>
    {children}
  </CardWrapper>
);

export default Card;
