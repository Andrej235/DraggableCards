import { useState } from "react";
import CardDisplay from "./Components/CardDisplay/CardDisplay";
import CardContainer, { CardsProps } from "./Components/CardContainer";

function App() {
  const [cards, setCards] = useState<CardsProps>({
    items: [
      <CardDisplay key={1} id="card-1">
        Lorem ipsum dolor sit amet.
      </CardDisplay>,
      <CardDisplay key={2} id="card-2">
        Corrupti nisi dolore debitis veniam?
      </CardDisplay>,
      <CardDisplay key={3} id="card-3">
        Voluptatibus adipisci a repudiandae maiores!
      </CardDisplay>,
      <CardDisplay key={4} id="card-4">
        Architecto cum harum culpa doloremque.
      </CardDisplay>,
      <CardDisplay key={5} id="card-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, fugit.
      </CardDisplay>,
    ],
    changedIds: [],
    state: null,
  });

  return <CardContainer cards={cards} onReorder={setCards} />;
}

export default App;
