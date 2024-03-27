import React, { useState } from "react";
import "./CardHolder.scss";
import CardDisplay from "../CardDisplay/CardDisplay";
import Card from "../Card";

type CardHolderProps = {
  cards: Card[];
  onReorder: (from: number, to: number) => void;
};

export default function CardHolder({ cards, onReorder }: CardHolderProps) {
  const [draggingCardId, SetdraggingCardId] = useState<number>(-1);

  return (
    <div className="card-container">
      {cards.map((x, i) => (
        <CardDisplay
          id={`card-${x.id}`}
          key={`card-${x.id}`}
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
          {x.text}
        </CardDisplay>
      ))}
    </div>
  );
}
