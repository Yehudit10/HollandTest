import { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./TestComponent.css";

const questions = [
  { id: 1, text: "What is your favorite color?" },
  { id: 2, text: "Do you enjoy working in a team?" },
  { id: 3, text: "Would you like to work outdoors?" },
];

const TestComponent = () => {
  const [index, setIndex] = useState(0);

  const nextQuestion = () => {
    if (index < questions.length - 1) setIndex(index + 1);
  };

  const prevQuestion = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div className="test-container">
      <div className="card-wrapper">
        {questions.map((q, i) => (
          <Card key={q.id} className={`question-card ${i === index ? "active" : ""}`}>
            <h3>{q.text}</h3>
          </Card>
        ))}
      </div>

      <div className="buttons">
        <Button label="Previous" onClick={prevQuestion} disabled={index === 0} />
        <Button label="Next" onClick={nextQuestion} disabled={index === questions.length - 1} />
      </div>
    </div>
  );
};

export default TestComponent;




