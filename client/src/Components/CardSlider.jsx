import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const cards = [
  { id: 1, title: "Card 1", content: "This is the first card." },
  { id: 2, title: "Card 2", content: "This is the second card." },
  { id: 3, title: "Card 3", content: "This is the third card." },
];

const CardSlider = () => {
  const [index, setIndex] = useState(0); // Current card index

  const [{ x }, api] = useSpring(() => ({ x: 0 })); // Animation for movement

  const nextCard = () => {
    if (index < cards.length - 1) {
      setIndex((prev) => prev + 1);
      api.start({ x: -(index + 1) * 300 }); // Move left
    }
   
  };

  const prevCard = () => {

    if (index > 0) {
      setIndex((prev) => prev - 1);
      api.start({ x: -(index - 1) * 300 }); // Move right
    }
  };

  const bind = useDrag(({ movement: [mx], down, direction: [dx], velocity }) => {
    if (!down) {
      if (dx < 0 && index < cards.length - 1) {
        nextCard();
      } else if (dx > 0 && index > 0) {
        prevCard();
      }
    } else {
      api.start({ x: -index * 300 + mx });
    }
  });

  return (
    <div className="carousel-container">
      <animated.div
        {...bind()} // Enables dragging
        style={{ display: "flex", x }}
        className="card-wrapper"
      >
        {
       
          <div key={cards[index].id} className="card-container">
            <Card title={cards[index].title}>{cards[index].content}</Card>
          </div>
        
        }
      </animated.div>
      <div className="buttons">
        <Button label="Previous" onClick={prevCard} disabled={index === 0} />
        <Button label="Next" onClick={nextCard} disabled={index === cards.length - 1} />
      </div>
    </div>
  );
};

export default CardSlider;

