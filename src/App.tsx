import { useState } from "react";
import Card from "./Components/Card/Card";
import CardContainer, { CardsProps } from "./Components/CardContainer";

function App() {
  const [cards, setCards] = useState<CardsProps>({
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
    changedIds: [],
    state: null,
  });

  return <CardContainer cards={cards} onReorder={setCards} />;
}

export default App;
