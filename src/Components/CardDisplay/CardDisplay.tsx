import React from "react";
import "./CardDisplay.scss";
import gsap from "gsap";
import Observer from "gsap/Observer";

type CardDisplayProps = {
  children: string;
  id: string;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onMouseOver?: () => void;
};

type CardState = {};

class CardDisplay extends React.Component<CardDisplayProps, CardState> {
  observer: Observer | null = null;

  constructor(props: CardDisplayProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    gsap.registerPlugin(Observer);

    this.observer = Observer.create({
      target: this.ref.current,
      type: "touch,pointer",
      onDragStart: () => {
        this.props.onDragStart?.();
        this.ref.current?.classList.add("dragging");

        gsap.to(this.ref.current, {
          opacity: 0,
          duration: 0.25,
        });
      },
      onDragEnd: () => {
        this.props.onDragEnd?.();
        this.ref.current?.classList.remove("dragging");

        gsap.to(this.ref.current, {
          opacity: 1,
          duration: 0.25,
        });
      },
    });
  }

  componentWillUnmount() {
    this.observer?.kill();
  }

  ref = React.createRef<HTMLDivElement>();

  render() {
    return (
      <div
        className="card"
        ref={this.ref}
        onMouseOver={this.props.onMouseOver}
        id={this.props.id}
      >
        {this.props.children}
      </div>
    );
  }
}

export default CardDisplay;
