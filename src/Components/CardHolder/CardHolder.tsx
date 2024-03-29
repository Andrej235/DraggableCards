import { useEffect, useRef, useState } from "react";
import "./CardHolder.scss";
import CardDisplay from "../CardDisplay/CardDisplay";
import Card from "../Card";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type CardHolderProps = {
  cards: Card[];
  onReorder: (from: number, to: number) => void;
};

export default function CardHolder({ cards, onReorder }: CardHolderProps) {
  const [draggingCardId, SetdraggingCardId] = useState<number>(-1);
  const [movableCardContent, setMovableCardContent] = useState<string>("");

  const movableCardRef = useRef<HTMLDivElement>(null);

  const [movableCardTranslation, setMovableCardTranslation] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });

  const [movableCardAbsolutePosition, setMovableCardAbsolutePosition] =
    useState<{
      x: number;
      y: number;
    }>({
      x: 0,
      y: 0,
    });

  const [cardDisplayRef, setCardDisplayRef] = useState<HTMLDivElement | null>(
    null
  );

  const { contextSafe } = useGSAP();

  const setTranslation = contextSafe(() => {
    if (!movableCardRef.current) return;

    gsap.to(movableCardRef.current, {
      x: `+=${movableCardTranslation.x}`,
      y: `+=${movableCardTranslation.y}`,
      duration: 0,
    });
  });

  const clearTranslationPosition = contextSafe(() => {
    if (!movableCardRef.current) return;

    gsap.to(movableCardRef.current, {
      x: 0,
      y: 0,
      left: movableCardAbsolutePosition.x,
      top: movableCardAbsolutePosition.y,
      duration: 0.35,
      onComplete: () => {
        movableCardRef.current!.style.opacity = "0";
        cardDisplayRef?.classList.remove("dragging");
      },
    });
  });

  useEffect(setTranslation, [movableCardTranslation, setTranslation]);
  useEffect(clearTranslationPosition, [
    movableCardAbsolutePosition,
    clearTranslationPosition,
  ]);

  return (
    <>
      <div className="card-container">
        {cards.map((x, i) => (
          <CardDisplay
            id={`card-${x.id}`}
            key={`card-${x.id}`}
            onDragStart={(rect, cardDisplay) => {
              SetdraggingCardId(i);
              setMovableCardContent(x.text);

              if (movableCardRef.current) {
                movableCardRef.current.style.left = `${rect.left}px`;
                movableCardRef.current.style.top = `${rect.top}px`;
                movableCardRef.current.style.opacity = "1";
              }

              setCardDisplayRef(cardDisplay);
              cardDisplay.classList.add("dragging");
            }}
            onDragEnd={(rect, cardDisplayRef) => {
              SetdraggingCardId(-1);
              setMovableCardAbsolutePosition({ x: rect.left, y: rect.top });
            }}
            onDrag={(xDelta, yDelta) => {
              setMovableCardTranslation({ x: xDelta, y: yDelta });
            }}
            onMouseOver={() => {
              if (draggingCardId === -1 || draggingCardId === i) return;

              onReorder(draggingCardId, i);
              SetdraggingCardId(i);
            }}
          >
            {x.text}
          </CardDisplay>
        ))}
      </div>

      <div className="card" ref={movableCardRef} id="movable-card">
        {movableCardContent}
      </div>
    </>
  );
}
