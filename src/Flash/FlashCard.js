import React, { useState, useEffect, useRef } from "react";

export default function FlashCard({ question, answer, options }) {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState('initial')
  const frontEl = useRef()
  const backEl = useRef()

  function setMaxHeight(){
    const frontHeight = frontEl.current.getBoundingClientRect().height
    const backHeight = backEl.current.getBoundingClientRect().height
    setHeight(Math.max(frontHeight, backHeight, 100))
  }
  useEffect(() => {
   setMaxHeight()
  }, [question, answer, options])

  return (
    <div
      className={`card ${flip ? "flip" : ""}`}
      style={{height:height}}
      onClick={() => {
        setFlip(!flip);
      }}
    >
      <div className="front" ref={frontEl}>
        {question}
        <div className="flashcard-options">
          {options.map((option) => (
            <div className="flashcard-option">{option}</div>
          ))}
        </div>
      </div>
      <div className="back" ref={backEl}>
          {answer}
      </div>
    </div>
  );
}
