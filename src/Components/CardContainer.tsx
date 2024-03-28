import { useGSAP } from "@gsap/react";
import CardHolder from "./CardHolder/CardHolder";
import gsap from "gsap";
import Flip from "gsap/Flip";
import Card from "./Card";
gsap.registerPlugin(Flip);

export type CardsProps = {
  items: Card[];
  state: Flip.FlipState | null;
  changedIds: string[] | null;
};

type CardContainerProps = {
  cards: CardsProps;
  onReorder: (cards: CardsProps) => void; //? Callback function should update props in the parent (specifically cards)
  mousePosition: {
    x: number;
    y: number;
  };
};

export default function CardContainer({
  cards: { items, state, changedIds },
  onReorder,
  mousePosition,
}: CardContainerProps) {
  useGSAP(
    () => {
      if (!state || !changedIds) return;

      Flip.from(state, {
        targets: changedIds,
        ease: "power1.inOut",
        duration: 0.25,
      });
    },
    {
      dependencies: [items, state, changedIds],
    }
  );

  function reorder(from: number, to: number) {
    const newArray = reorderArray(items, from, to);

    onReorder({
      items: newArray.array,
      state: Flip.getState(newArray.changedIds),
      changedIds: newArray.changedIds,
    });
  }

  function reorderArray<T extends Card>(
    array: T[],
    from: number,
    to: number
  ): {
    array: T[];
    changedIds: string[];
  } {
    const newArray: T[] = [];
    const changedIds: string[] = [];

    if (from < to) {
      // Move elements from 'from' to 'to' in the original array
      newArray.push(...array.slice(0, from));
      newArray.push(...array.slice(from + 1, to + 1));
      newArray.push(array[from]);
      newArray.push(...array.slice(to + 1));

      changedIds.push(
        ...array.slice(from + 1, to + 1).map((x) => `#card-${x.id}`)
      );
    } else {
      // Move elements from 'to' to 'from' in the original array
      newArray.push(...array.slice(0, to));
      newArray.push(array[from]);
      newArray.push(...array.slice(to, from));
      newArray.push(...array.slice(from + 1));

      changedIds.push(...array.slice(to, from).map((x) => `#card-${x.id}`));
    }

    return {
      array: newArray,
      changedIds: changedIds,
    };
  }

  return (
    <CardHolder
      cards={items}
      onReorder={reorder}
      mousePosition={mousePosition}
    />
  );
}
