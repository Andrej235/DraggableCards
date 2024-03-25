import React from "react";
import "./Card.scss";
import gsap from "gsap";
import Observer from "gsap/Observer";
import { CSSRulePlugin } from "gsap/all";

type CardProps = {
  children: string;
  id: string;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onMouseOver?: () => void;
};

type CardState = {};

class Card extends React.Component<CardProps, CardState> {
  observer: Observer | null = null;

  constructor(props: CardProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    gsap.registerPlugin(Observer);
    gsap.registerPlugin(CSSRulePlugin);

    const rule = CSSRulePlugin.getRule(".card.dragging:after");

    this.observer = Observer.create({
      target: this.ref.current,
      type: "touch,pointer",
      onDragStart: () => {
        this.ref.current?.classList.add("dragging");
        this.props.onDragStart?.();

        gsap.to(this.ref.current, {
          opacity: 0,
          duration: 0.25,
        });
      },
      onDragEnd: () => {
        this.props.onDragEnd?.();
        this.ref.current?.classList.remove("dragging");

/*         gsap.to(rule, {
          cssRule: {
            y: 0,
          },
          duration: 0.15,
        }); */

        gsap.to(this.ref.current, {
          opacity: 1,
          duration: 0.25,
        });
      },
      onDrag: (/* x */) => {
        /*         gsap.to(rule, {
          cssRule: {
            y: `+=${x.deltaY}`,
          },
          duration: 0,
        }); */
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

export default Card;
