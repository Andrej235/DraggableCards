import { useMemo } from "react";
import CardContainer from "./Components/CardContainer";
import UseCard from "./Hooks/UseCardsHook";

function App() {
  const cardsText = useMemo(
    () => [
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam, reiciendis!",
      "Reprehenderit temporibus asperiores aspernatur dicta sunt explicabo, aut eligendi adipisci!",
      "Cupiditate magni, ut saepe impedit alias unde eum quo eligendi?",
      "Velit eligendi ea cumque obcaecati doloremque amet. Libero, excepturi eos!",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil veritatis rem temporibus dolore unde dolorem!",
    ],
    []
  );
  const { cards, setCards } = UseCard(cardsText);

  return (
    <CardContainer
      cards={cards}
      onReorder={setCards}
      onRemoveCard={(cards) =>
        setCards({ items: cards, changedIds: null, state: null })
      }
    />
  );
}

export default App;
