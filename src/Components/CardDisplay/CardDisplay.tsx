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
  mousePosition: {
    x: number;
    y: number;
  };
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
      },
      onDragEnd: () => {
        this.props.onDragEnd?.();
        this.ref.current?.classList.remove("dragging");

        this.ref.current!.style.pointerEvents = "all";
        gsap.to(this.ref.current, {
          x: 0,
          y: 0,
          duration: 0.25,
        });
      },
      onDrag: (x) => {
        this.ref.current!.style.pointerEvents = "none";
        const deltaX = x.deltaX;
        const deltaY = x.deltaY;

        //@ts-expect-error
        const newX = gsap.getProperty(this.ref.current, "x") + deltaX;

        //@ts-expect-error
        const newY = gsap.getProperty(this.ref.current, "y") + deltaY;

        console.log(this.props);

        gsap.to(this.ref.current, {
          x: newX + (this.props.mousePosition!.x - x.startX!),
          y: newY + (this.props.mousePosition!.y - x.startY!),
          duration: 0,
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
