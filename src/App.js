import Axios from "axios";
import { useState, useRef, useEffect } from "react";
import "./App.css";
import FlashCardList from "./Flash/FlashCardList";
const CATEGORY_API = "https://opentdb.com/api_category.php";

function App() {
  const categoryEl = useRef();
  const amountEl = useRef();
  const [flashCards, setFlashCards] = useState([]);

  const [categories, setCategories] = useState([]);

  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    Axios.get("https://opentdb.com/api.php", {
      params: {
        amount: amountEl.current.value,
        category: categoryEl.current.value,
      },
    }).then((res) => {
      setFlashCards(
        res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer);
          const options = [
            ...questionItem.incorrect_answers.map((a) => decodeString(a)),
            answer,
          ];
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer,
            options: options.sort(() => Math.random() - 0.5),
          };
        })
      );
    });
  }
  useEffect(() => {
    Axios.get(CATEGORY_API).then((res) => {
      setCategories(res.data.trivia_categories);
    });
  }, []);
  useEffect(() => {}, []);

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input
            type="number"
            id="amount"
            min="1"
            step="1"
            defaultValue={10}
            ref={amountEl}
          />
        </div>
        <div className="form-group">
          <div className="btn-class">
            <button className="btn">Generate</button>
          </div>
        </div>
      </form>
      <div className="container">
        <FlashCardList flashCards={flashCards} />
      </div>
    </>
  );
}

export default App;
