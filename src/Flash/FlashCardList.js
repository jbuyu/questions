import React from 'react'
import FlashCard from './FlashCard'

export default function FlashCardList({flashCards}) {
    return (
       <div>
           {flashCards &&  flashCards.map(card=>(
               <FlashCard key={card.id} {...card} />
               
           )) }
       </div>
    )
}
