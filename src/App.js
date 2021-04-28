import { useState } from 'react';
import './App.css';
import FlashCardList from './Flash/FlashCardList';

function App() {

  const [flashCards, setFlashCards] = useState(SAMPLE_FLASHCARDS)
  return (
    <div className="container">
      <FlashCardList flashCards={flashCards}/>
    </div>
  );
}


const SAMPLE_FLASHCARDS = [
  {
    id:1,
    question:'What is 2+2?',
    answer: '4',
    options:[
      '2',
      '3',
      '4',
      '1.5'
    ]
  },
  {
    id:2,
    question:'Question 2?',
    answer: 'Answer',
    options:[
      'Answer',
      'Answer 1',
      'Answer 2',
      'Answer 3'
    ]
  }
]

export default App;
