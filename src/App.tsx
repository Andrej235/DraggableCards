import { useState } from "react";
import Card from "./Components/Card/Card";
import CardContainer from "./Components/CardContainer/CardContainer";
import gsap from "gsap";
import Flip from "gsap/Flip";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(Flip);

function App() {
  const [cards, setCards] = useState<{
    items: JSX.Element[];
    state: Flip.FlipState | null;
    changedIds: string[] | null;
  }>({
    items: [
      <Card key={1} id="card-1">
        Lorem ipsum dolor sit amet.
      </Card>,
      <Card key={2} id="card-2">
        Corrupti nisi dolore debitis veniam?
      </Card>,
      <Card key={3} id="card-3">
        Voluptatibus adipisci a repudiandae maiores!
      </Card>,
      <Card key={4} id="card-4">
        Architecto cum harum culpa doloremque.
      </Card>,
      <Card key={5} id="card-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, fugit.
      </Card>,
    ],
    state: null,
    changedIds: null,
  });

  useGSAP(
    () => {
      if (!cards.state || !cards.changedIds) return;

      Flip.from(cards.state, {
        targets: cards.changedIds,
        absolute: false,
        ease: "power1.inOut",
        simple: true,
        duration: 0.33,
      });
    },
    {
      dependencies: [cards],
    }
  );

  function onReorder(from: number, to: number) {
    const newArray = reorderArray(cards.items, from, to);

    setCards({
      items: newArray.array,
      state: Flip.getState(newArray.changedIds),
      changedIds: newArray.changedIds,
      // changedIds: ["#" + cards.items[to].props.id],
    });
  }

  function reorderArray<T extends React.JSX.Element>(
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
        ...array.slice(from + 1, to + 1).map((x) => `#${x.props.id}`)
      );
    } else {
      // Move elements from 'to' to 'from' in the original array
      newArray.push(...array.slice(0, to));
      newArray.push(array[from]);
      newArray.push(...array.slice(to, from));
      newArray.push(...array.slice(from + 1));

      changedIds.push(...array.slice(to, from).map((x) => `#${x.props.id}`));
    }

    return {
      array: newArray,
      changedIds: changedIds,
    };
  }

  return (
    <>
      <CardContainer onReorder={onReorder}>{cards.items}</CardContainer>

      {/*       <button
        onClick={() => {
          console.log(reorderArray(["a", "b", "c", "d", "e"], 3, 1));
        }}
      >
        Change
      </button> */}
    </>
  );
}

export default App;
