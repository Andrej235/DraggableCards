import React, { useState } from "react";
import "./CardContainer.scss";
import Card from "../Card/Card";

type CardContainerProps = {
  children: React.JSX.Element[];
  onReorder: (from: number, to: number) => void;
};

export default function CardContainer({
  children,
  onReorder,
}: CardContainerProps) {
  const [draggingCardId, SetdraggingCardId] = useState<number>(-1);

  return (
    <div className="card-container">
      {children
        .filter((x) => x.type === Card)
        .map((x, i) => (
          <Card
            id={x.props.id}
            key={x.key}
            onDragStart={() => {
              SetdraggingCardId(i);
            }}
            onDragEnd={() => {
              SetdraggingCardId(-1);
            }}
            onMouseOver={() => {
              if (draggingCardId === -1) return;

              if (draggingCardId === i) return;

              //TODO Reorder children so that i and draggingCardId swap places

              /*               const temp = children[draggingCardId];
              children[draggingCardId] = children[i];
              children[i] = temp; */
              onReorder(draggingCardId, i);
              SetdraggingCardId(i);
            }}
          >
            {x.props.children}
          </Card>
        ))}
    </div>
  );
}
