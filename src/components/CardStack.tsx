import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
};

type CardStackProps = {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
};

export const CardStack: React.FC<CardStackProps> = ({ items, offset, scaleFactor }) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()!);
        return newArray;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-80 w-full max-w-md md:h-80 md:max-w-xl mx-auto">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className="absolute bg-white h-80 w-full max-w-md md:max-w-xl rounded-3xl p-6 shadow-xl border border-neutral-200 flex flex-col justify-between"
          style={{
            transformOrigin: "top center",
          }}
          animate={{
            top: index * -CARD_OFFSET,
            scale: 1 - index * SCALE_FACTOR,
            zIndex: cards.length - index,
          }}
        >
          <div className="font-normal text-neutral-700 text-base mb-4">
            {card.content}
          </div>
          <div className="mt-auto">
            <p className="text-neutral-700 font-bold text-lg">{card.name}</p>
            <p className="text-neutral-500 font-medium">{card.designation}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}; 