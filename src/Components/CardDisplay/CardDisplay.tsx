import React from "react";
import "./CardDisplay.scss";
import gsap from "gsap";
import Observer from "gsap/Observer";

type CardDisplayProps = {
  children: string;
  id: string;
  onDragStart?: (rect: DOMRect, ref: HTMLDivElement) => void;
  onDragEnd?: (rect: DOMRect, ref: HTMLDivElement) => void;
  onDrag?: (xDelta: number, yDelta: number) => void;
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
      target: this.cardDisplayRef.current,
      type: "touch,pointer",
      onDragStart: () => {
        if (!this.cardDisplayRef.current) return;

        this.props.onDragStart?.(
          this.cardDisplayRef.current.getBoundingClientRect(),
          this.cardDisplayRef.current
        );
      },
      onDragEnd: () => {
        if (!this.cardDisplayRef.current) return;

        this.props.onDragEnd?.(
          this.cardDisplayRef.current.getBoundingClientRect(),
          this.cardDisplayRef.current
        );

        gsap.to(this.cardDisplayRef.current, {
          x: 0,
          y: 0,
          duration: 0.25,
        });
      },
      onDrag: (x) => {
        this.props.onDrag?.(x.deltaX, x.deltaY);
      },
    });
  }

  componentWillUnmount() {
    this.observer?.kill();
  }

  cardDisplayRef = React.createRef<HTMLDivElement>();

  render() {
    return (
      <div
        className="card"
        ref={this.cardDisplayRef}
        onMouseOver={this.props.onMouseOver}
        id={this.props.id}
      >
        {this.props.children}
      </div>
    );
  }
}

export default CardDisplay;
