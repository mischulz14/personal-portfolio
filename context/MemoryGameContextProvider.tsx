import { shuffle } from '@/components/games/MemoryCardContainer';
import CandleSvg from '@/components/svgs/CandleSvg';
import CoffeeSvg from '@/components/svgs/CoffeeSvg';
import HeartSvg from '@/components/svgs/HeartSvg';
import LeafSvg from '@/components/svgs/LeafSvg';
import PencilSvg from '@/components/svgs/PencilSvg';
import SanduhrSvg from '@/components/svgs/Sanduhr';
import { createContext, useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';

export interface MemoryCard {
  name: string;
  id: number;
  isMatched: boolean;
  renderedSvg: JSX.Element;
}

interface MemoryCardContextType {
  resetBoard: boolean;
  flippedUpCardsCount: number;
  flippedUpCards: MemoryCard[];
  checkForMatch: () => void;
  isCheckingForMatch: boolean;
  cards: MemoryCard[];
  goBackToHome: boolean;
  setGoBackToHome: (value: boolean) => void;
  tries: number;
}

export const MemoryCardContext = createContext<MemoryCardContextType>({
  resetBoard: false,
  flippedUpCardsCount: 0,
  flippedUpCards: [],
  checkForMatch: () => {},
  isCheckingForMatch: false,
  cards: [],
  goBackToHome: false,
  setGoBackToHome: () => {},
  tries: 0,
});

export default function MemoryCardContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [resetBoard, setResetBoard] = useState(false);
  const [tries, setTries] = useState(0);
  const [triesInLocalStorage, setTriesInLocalStorage] = useLocalStorage(
    'tries',
    0,
  );
  const [isCheckingForMatch, setIsCheckingForMatch] = useState(false);
  const [goBackToHome, setGoBackToHome] = useState(false);
  const [cards, setCards] = useState<MemoryCard[]>(shuffle(getMemoryCards()));
  let flippedUpCards: MemoryCard[] = [];

  useEffect(() => {
    // Initialize local storage value with 0
    const initialTries = localStorage.getItem('tries');
    if (!initialTries) {
      localStorage.setItem('tries', '0');
    }
  }, []);

  function triggerAnimationOut() {
    setResetBoard((prev) => !prev);
  }

  function checkIfAllCardsAreMatched() {
    const unmatchedCards = cards.filter((card) => !card.isMatched);
    if (unmatchedCards.length === 0) {
      console.log('all cards are matched');
    }

    return unmatchedCards.length === 0;
  }

  function checkForMatch() {
    console.log('checking for match');
    setTries((prev) => prev + 1);
    setIsCheckingForMatch(true);
    const areSameCardsFlipped =
      flippedUpCards[0].name === flippedUpCards[1].name;

    if (areSameCardsFlipped) {
      console.log('match');
      setResetBoard(false);
      const card1 = cards.find((card) => card.id === flippedUpCards[0].id);
      const card2 = cards.find((card) => card.id === flippedUpCards[1].id);
      if (card1 && card2) {
        card1.isMatched = true;
        card2.isMatched = true;
      }

      const gameOver = checkIfAllCardsAreMatched();
      if (gameOver) {
        setTimeout(() => {
          // check if the tries in the local storage is less than the current tries
          // @ts-ignore
          if (triesInLocalStorage === 0 || triesInLocalStorage > tries) {
            setTriesInLocalStorage(tries + 1);
          }

          setGoBackToHome(true);
          resetGame();
          return;
        }, 1300);
        return;
      }

      setTimeout(() => {
        setIsCheckingForMatch(false);
        console.log('winner');
        flippedUpCards = [];
      }, 800);
    } else {
      console.log('no match');
      setResetBoard(true);
      setTimeout(() => {
        setIsCheckingForMatch(false);
        triggerAnimationOut();
        flippedUpCards = [];
        setResetBoard(false);
      }, 1000);
      return;
    }
  }

  function resetGame() {
    flippedUpCards = [];
    setIsCheckingForMatch(false);
    cards.forEach((card) => {
      card.isMatched = false;
    });
    tries && setTries(0);
    setCards(shuffle(getMemoryCards()));
    return;
  }

  const contextValue = {
    resetBoard: resetBoard,
    flippedUpCardsCount: flippedUpCards.length,
    flippedUpCards: flippedUpCards,
    checkForMatch,
    isCheckingForMatch: isCheckingForMatch,
    cards,
    goBackToHome,
    triggerAnimationOut,
    setGoBackToHome,
    tries,
  };

  return (
    <MemoryCardContext.Provider value={contextValue}>
      {children}
    </MemoryCardContext.Provider>
  );
}

export const memoryCards = [
  {
    name: 'pencil',
    id: 1,
    isMatched: false,
    renderedSvg: <PencilSvg />,
  },
  {
    name: 'pencil',
    id: 2,
    isMatched: false,
    renderedSvg: <PencilSvg />,
  },
  {
    name: 'candle',
    id: 3,
    isMatched: false,
    renderedSvg: <CandleSvg />,
  },
  {
    name: 'candle',
    id: 4,
    isMatched: false,
    renderedSvg: <CandleSvg />,
  },
  {
    name: 'sanduhr',
    id: 5,
    isMatched: false,
    renderedSvg: <SanduhrSvg />,
  },
  {
    name: 'sanduhr',
    id: 6,
    isMatched: false,
    renderedSvg: <SanduhrSvg />,
  },
  {
    name: 'leaf',
    id: 7,
    isMatched: false,
    renderedSvg: <LeafSvg />,
  },
  {
    name: 'leaf',
    id: 8,
    isMatched: false,
    renderedSvg: <LeafSvg />,
  },
  {
    name: 'coffee',
    id: 9,
    isMatched: false,
    renderedSvg: <CoffeeSvg />,
  },
  {
    name: 'coffee',
    id: 10,
    isMatched: false,
    renderedSvg: <CoffeeSvg />,
  },
  {
    name: 'heart',
    id: 11,
    isMatched: false,
    renderedSvg: <HeartSvg />,
  },
  {
    name: 'heart',
    id: 12,
    isMatched: false,
    renderedSvg: <HeartSvg />,
  },
];

export function getMemoryCards() {
  return memoryCards;
}
