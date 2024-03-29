import { useCallback, useEffect, useRef, useState } from "react";
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

  const [cardDisplayRef, setCardDisplayRef] = useState<HTMLDivElement | null>(
    null
  );

  const [isDraggingAvailable, setIsDraggingAvailable] = useState<boolean>(true);

  const { contextSafe } = useGSAP();

  const setTranslation = contextSafe(() => {
    if (!movableCardRef.current) return;

    gsap.to(movableCardRef.current, {
      x: `+=${movableCardTranslation.x}`,
      y: `+=${movableCardTranslation.y}`,
      duration: 0,
    });
  });

  const clearTranslationPosition = useCallback(
    (x: { x: number; y: number }) =>
      contextSafe(({ x, y }: { x: number; y: number }) => {
        if (!movableCardRef.current) return;

        gsap.to(movableCardRef.current, {
          x: 0,
          y: 0,
          left: x,
          top: y,
          duration: 0.25,
          onComplete: () => {
            movableCardRef.current!.style.opacity = "0";
            cardDisplayRef?.classList.remove("dragging");
            setIsDraggingAvailable(true);
          },
        });
      })(x),
    [contextSafe, cardDisplayRef]
  );

  const beginDragging = useCallback(
    (x: { x: number; y: number }) =>
      contextSafe(({ x, y }: { x: number; y: number }) => {
        if (!movableCardRef.current) return;

        setIsDraggingAvailable(false);
        gsap.to(movableCardRef.current, {
          left: x,
          top: y,
          opacity: 1,
          duration: 0,
        });
      })(x),
    [contextSafe]
  );

  useEffect(setTranslation, [movableCardTranslation, setTranslation]);

  return (
    <>
      <div className="card-container">
        {cards.map((x, i) => (
          <CardDisplay
            id={`card-${x.id}`}
            key={`card-${x.id}`}
            onDragStart={(rect, cardDisplay) => {
              if (!isDraggingAvailable) return;

              SetdraggingCardId(i);
              setMovableCardContent(x.text);

              beginDragging({ x: rect.left, y: rect.top });
              setCardDisplayRef(cardDisplay);
              cardDisplay.classList.add("dragging");
            }}
            onDragEnd={(rect) => {
              SetdraggingCardId(-1);
              clearTranslationPosition({ x: rect.left, y: rect.top });
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
