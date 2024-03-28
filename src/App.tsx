import { useState } from "react";
import CardContainer, { CardsProps } from "./Components/CardContainer";
import Card from "./Components/Card";

function App() {
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });

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

  return (
    <div
      id="app"
      onMouseMove={(x) => setMousePosition({ x: x.pageX, y: x.pageY })}
    >
      <CardContainer
        cards={cards}
        onReorder={setCards}
        mousePosition={mousePosition}
      />
    </div>
  );
}

export default App;
