import { useState } from "react";
import CardContainer, { CardsProps } from "./Components/CardContainer";
import Card from "./Components/Card";

function App() {
  const [cards, setCards] = useState<CardsProps>({
    items: [
      Card.create("Lorem ipsum dolor sit amet"),
      Card.create("Corrupti nisi dolore debitis veniam"),
      Card.create("Voluptatibus adipisci a repudiandae maiores"),
      Card.create("Architecto cum harum culpa doloremque"),
      Card.create("Lorem ipsum dolor sit amet consectetur adipisicing elit"),
    ],
    changedIds: [],
    state: null,
  });

  return <CardContainer cards={cards} onReorder={setCards} />;
}

export default App;
