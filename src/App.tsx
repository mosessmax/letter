import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import { gsap } from 'gsap';

interface Card {
  id: number;
  title: string;
  content: string;
  color: string;
}

const cardData: Card[] = [
  { id: 1, title: "DEAR MR PRESIDENT", content: "This letter is written specifically for you. I look at the prices of things, everything is extremely expensive for the common man to afford. A lot of things are expensive. People can hardly afford basic meal, even accomodation is expensive. Students can't even afford education. Things have become harder, nothing seems right, we urge you to look into this", color: "#FFA500" },
  { id: 2, title: "DEAR PRESIDENT TINUBU", content: "I'm a Nigerian citizen, we are suffering. Think about the common man, we can't even afford food.", color: "#FFD700" },
  { id: 3, title: "DEAR TINUBU", content: "I hope this get to you well, and I hope you see and understand that things are currently hard for the people.", color: "#FFC0CB" },
  { id: 4, title: "DEAR TINUBU", content: "I hope this...", color: "#FF6347" },
  { id: 5, title: "THIS IS", content: "Price of...", color: "#800080" },
];

const App: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // cardsRef.current.forEach((card, index) => {
    //   if (card) {
    //     card.addEventListener("click", () => {
    //       if (activeCard === index) {
    //         setActiveCard(null);
    //       } else {
    //         setActiveCard(index);
    //       }
    //     });
    //   }

    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.set(card, {
          rotation: Math.random() * 10 -5,
          x: Math.random() * 20 -10,
          y: index * 10,
        });
      }
    });
  }, []);

  const handleCardClick = (id: number) => {
    setActiveCard(id);
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.to(card, {
          zIndex: cardData.length - index,
          scale: id === cardData[index].id ? 1.05 : 1, /*## - 1 ? 1.1 : 1, */
          rotation: id === cardData[index].id ? 0 : Math.random() * 10 - 5,
          x: id === cardData[index].id ? 0 : Math.random() * 20 - 10,
          y: id === cardData[index].id ? 0 : index * 10,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    });
  };

  return (
    <div className="app">
      <h1 className="title">A LETTER TO THE PRESIDENT</h1>
      <div className="cards">
        {cardData.map((card) => (
          <div
            key={card.id}
            ref={(element) => (cardsRef.current[card.id - 1] = element)}
            className="card"
            style={{ backgroundColor: card.color }}
            onClick={() => handleCardClick(card.id)}
          >
            <h2>{card.title}</h2>
            {activeCard === card.id && <p>{card.content}</p>}
          </div>
        ))}
    </div>
    </div>
  );
};

export default App;