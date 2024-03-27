import React, { useState } from "react";
import "./CardHolder.scss";
import CardDisplay from "../CardDisplay/CardDisplay";

type CardHolderProps = {
  children: React.JSX.Element[];
  onReorder: (from: number, to: number) => void;
};

export default function CardHolder({
  children,
  onReorder,
}: CardHolderProps) {
  const [draggingCardId, SetdraggingCardId] = useState<number>(-1);

  return (
    <div className="card-container">
      {children
        .filter((x) => x.type === CardDisplay)
        .map((x, i) => (
          <CardDisplay
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

              onReorder(draggingCardId, i);
              SetdraggingCardId(i);
            }}
          >
            {x.props.children}
          </CardDisplay>
        ))}
    </div>
  );
}
