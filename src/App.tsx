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

      // Flip.to
    },
    {
      dependencies: [cards],
    }
  );

  function onReorder(from: number, to: number) {
    const state = Flip.getState(".card");

    let cardsCopy = cards.items.slice();

    const temp = cardsCopy[to];
    cardsCopy[to] = cardsCopy[from];
    cardsCopy[from] = temp;

    console.log(temp.props.id);
    
    setCards({ items: cardsCopy, state: state, changedId: temp.props.id });
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
