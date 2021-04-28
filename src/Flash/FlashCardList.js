import React, { useEffect, useState } from "react";
import FlashCard from "./FlashCard";
import Axios from "axios";
const BASE_URL = "";

export default function FlashCardList() {
  const [flashCards, setFlashCards] = useState([]);

  useEffect(() => {
    Axios.get("https://opentdb.com/api.php?amount=10").then((res) => {
      setFlashCards(
        res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer);
          const options = [...questionItem.incorrect_answers.map(a=>decodeString(a)), answer];
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question) ,
            answer,
            options: options.sort(() => Math.random() - 0.5),
          };
        })
      );
    });
  }, []);

  function decodeString(str){
      const textArea = document.createElement('textarea')
      textArea.innerHTML = str
      return textArea.value;
  }
  return (
    <div className="card-grid">
      {flashCards &&
        flashCards.map((card) => <FlashCard key={card.id} {...card} />)}
    </div>
  );
}
