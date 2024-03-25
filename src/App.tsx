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
    changedId: string | null;
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
    changedId: null,
  });

  useGSAP(
    () => {
      if (!cards.state) return;

      Flip.from(cards.state, {
        targets: cards.changedId ? `#${cards.changedId}` : ".card",
        absolute: false,
        ease: "power1.inOut",
        simple: true,
        duration: 0.33,
      });

      // This has to be done with .to instead of .from because from will always have a state for all cards
    },
    {
      dependencies: [cards],
    }
  );

  function onReorder(from: number, to: number) {
    let cardsCopy = cards.items.slice();

    let state: Flip.FlipState;

    if (from < to) {
      state = Flip.getState("#" + cards.items[from].props.id);
      for (let i = from + 1; i <= to; i++) {
        state.add(Flip.getState("#" + cards.items[i].props.id));
      }
    } else {
      state = Flip.getState("#" + cards.items[to].props.id);
      for (let i = to + 1; i <= from; i++) {
        state.add(Flip.getState("#" + cards.items[i].props.id));
      }
    }

    const temp = cardsCopy[to];
    cardsCopy[to] = cardsCopy[from];
    cardsCopy[from] = temp;

    setCards({
      // items: reorderArray(cards.items, from, to),
      items: cardsCopy,
      state: state,
      changedId: temp.props.id,
    });

    //TODO: test this function with more 'normal' / basic inputs, ex: letters or numbers. It seems to duplicate some elements
    function reorderArray<T>(array: T[], from: number, to: number) {
      const newArray = [];
      if (from < to) {
        // Move elements from 'from' to 'to' in the original array
        newArray.push(...array.slice(0, from));
        console.log(newArray.length);
        newArray.push(...array.slice(from, to + 1));
        console.log(newArray.length);
        newArray.push(array[from]);
        console.log(newArray.length);
        newArray.push(...array.slice(to + 1));
        console.log(newArray.length);
      } else {
        // Move elements from 'to' to 'from' in the original array
        newArray.push(...array.slice(0, to));
        newArray.push(array[from]);
        newArray.push(...array.slice(from, to));
        newArray.push(...array.slice(to));
      }

      return newArray;
    }
  }

  return (
    <>
      <CardContainer onReorder={onReorder}>{cards.items}</CardContainer>

      <button
        onClick={() => {
          setCards({
            state: Flip.getState(".card"),
            items: gsap.utils.shuffle(cards.items),
            changedId: null,
          });
        }}
      >
        Shuffle
      </button>
    </>
  );
}

export default App;
