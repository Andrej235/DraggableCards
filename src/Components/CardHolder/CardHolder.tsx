import { useCallback, useRef, useState } from "react";
import "./CardHolder.scss";
import CardDisplay from "../CardDisplay/CardDisplay";
import Card from "../Card";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useHover from "../../Hooks/UseHoverHook";

type CardHolderProps = {
  cards: Card[];
  onReorder: (from: number, to: number) => void;
  onRemoveCard: (id: number) => void;
};

export default function CardHolder({
  cards,
  onReorder,
  onRemoveCard,
}: CardHolderProps) {
  const [draggingCardIndex, SetdraggingCardId] = useState<number>(-1);
  const [movableCardContent, setMovableCardContent] = useState<string>("");

  const movableCardRef = useRef<HTMLDivElement>(null);
  const cardHolderRef = useRef<HTMLDivElement>(null);

  const [cardDisplayRef, setCardDisplayRef] = useState<HTMLDivElement | null>(
    null
  );

  const [isDraggingAvailable, setIsDraggingAvailable] = useState<boolean>(true);

  const { contextSafe } = useGSAP();

  const isHoveringOver = useHover({ x: cardHolderRef.current });

  const setTranslation = useCallback(
    (x: { x: number; y: number }) =>
      contextSafe(({ x, y }: { x: number; y: number }) => {
        if (!movableCardRef.current) return;

        gsap.to(movableCardRef.current, {
          x: `+=${x}`,
          y: `+=${y}`,
          duration: 0,
        });
      })(x),
    [contextSafe]
  );

  const endDragging = useCallback(
    (x: { x: number; y: number }) => {
      if (!isHoveringOver) {
        console.log(cards);
        
        onRemoveCard(cards[draggingCardIndex].id);
        movableCardRef.current!.style.opacity = "0";
        cardDisplayRef?.classList.remove("dragging");
        setIsDraggingAvailable(true);
        return;
      }

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
      })(x);
    },
    [contextSafe, cardDisplayRef, draggingCardIndex, onRemoveCard, isHoveringOver]
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

  return (
    <>
      <div className="card-holder" ref={cardHolderRef}>
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
              endDragging({ x: rect.left, y: rect.top });
            }}
            onDrag={(xDelta, yDelta) => {
              setTranslation({ x: xDelta, y: yDelta });
            }}
            onMouseOver={() => {
              if (draggingCardIndex === -1 || draggingCardIndex === i) return;

              onReorder(draggingCardIndex, i);
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
