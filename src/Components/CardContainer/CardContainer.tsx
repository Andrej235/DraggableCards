import React from "react";
import './CardContainer.scss';

type CardContainerProps = {
  children: React.JSX.Element[];
};

const CardContainer: React.FC<CardContainerProps> = ({ children }) => {
  return <div className="card-container">{children}</div>;
};
export default CardContainer;
