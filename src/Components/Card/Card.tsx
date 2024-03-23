import React, { Component, useCallback, useRef } from "react";
import "./Card.scss";
import gsap from "gsap";
import Observer from "gsap/Observer";
import useMousePosition from "../../UseMousePosition";
import { CSSRulePlugin } from "gsap/all";

type CardProps = {
  children: string;
};

export default function Card({ children }: CardProps) {
  gsap.registerPlugin(Observer);
  gsap.registerPlugin(CSSRulePlugin);

  const cardRef = useCallback((node: HTMLDivElement) => {
    const rule = CSSRulePlugin.getRule(".card.dragging:after");
    //Maybe use a state to check if dragging is possible? So that when onDragEnd starts the state gets set to false when onDragEnd animation finished it gets set to true

    Observer.create({
      target: node,
      type: "touch,pointer",
      onDragStart: () => {
        node.classList.add("dragging");
      },
      onDragEnd: () => {
        gsap.to(rule, {
          cssRule: {
            y: 0,
          },
          duration: 0.5,
          onComplete: () => node.classList.remove("dragging"),
        });
      },
      onDrag: (x) => {
        gsap.to(rule, {
          cssRule: {
            y: `+=${x.deltaY}`,
          },
          duration: 0,
        });
      },
    });
  }, []);

  return (
    <div className="card" ref={cardRef}>
      {children}
    </div>
  );
}
