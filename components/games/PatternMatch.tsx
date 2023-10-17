import { ColorThemeContext } from '@/context/ColorThemeContextProvider';
import { useTranslation } from 'next-i18next';
import { use, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';

import Button from '../ui/Button';

const numRows = 5;
const numCols = 5;

const generateRandomTiles = (numTiles: number) => {
  const tiles = new Set<string>();
  while (tiles.size < numTiles) {
    const row = Math.floor(Math.random() * numRows);
    const col = Math.floor(Math.random() * numCols);
    tiles.add(`${row}-${col}`);
  }
  console.log(tiles);
  return Array.from(tiles);
};

export interface PatternMatchProps {
  setShowPatternMatch: React.Dispatch<React.SetStateAction<boolean>>;
  setRenderedComponent: React.Dispatch<
    React.SetStateAction<'memory' | 'win' | 'home' | 'patterns'>
  >;
}

export default function PatternMatch({
  setShowPatternMatch,
  setRenderedComponent,
}: PatternMatchProps) {
  const { t } = useTranslation('common');
  const [activeTiles, setActiveTiles] = useState<string[]>([]);
  const [clickedTiles, setClickedTiles] = useState<string[]>([]);
  const [level, setLevel] = useState(1);
  const [showActiveTile, setShowActiveTile] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [isClickDisabled, setIsClickDisabled] = useState(false);
  const [tileColors, setTileColors] = useState<{
    [key: string]: 'green' | 'red' | 'transparent';
  }>({});
  const [gameOver, setGameOver] = useState(false);
  const [leastTriesInLocalStorage, setLeastTriesInLocalStorage] =
    useLocalStorage('leastTries', 0);
  const maxLevels = 10;

  function initializeLocalStorage() {
    if (!leastTriesInLocalStorage) {
      setLeastTriesInLocalStorage(0);
    }
  }

  function setNewLeastTriesInLocalStorage() {
    if (
      (leastTriesInLocalStorage && mistakes < leastTriesInLocalStorage) ||
      leastTriesInLocalStorage === 0
    ) {
      setLeastTriesInLocalStorage(mistakes);
    }
  }

  useEffect(() => {
    initializeLocalStorage();
  }, []);

  function resetGameState() {
    setShowPatternMatch(false);
    setActiveTiles([]);
    setClickedTiles([]);
    setLevel(1);
    setShowActiveTile(false);
    setMistakes(0);
    setIsClickDisabled(false);
    setTileColors({});
  }

  useEffect(() => {
    handleLevelChangeAndGameOver();
  }, [level]);

  useEffect(() => {
    // Only check for matching tiles if there are active tiles
    checkForNextLevelAndGameOver();
  }, [clickedTiles, activeTiles]);

  function checkForNextLevelAndGameOver() {
    if (activeTiles.length > 0) {
      // Filter the clickedTiles array to only include tiles that are also in the activeTiles array
      const correctClickedTiles = clickedTiles.filter((tile) =>
        activeTiles.includes(tile),
      );

      // Check if the length of the filtered array matches the length of the activeTiles array
      if (correctClickedTiles.length === activeTiles.length) {
        console.log('correct');
        setIsClickDisabled(true);
        // If the lengths match, all correct tiles have been clicked, so move on to the next level
        setTimeout(() => {
          setLevel((prevLevel) => {
            const nextLevel = prevLevel + 1;
            if (nextLevel > maxLevels) {
              setGameOver(true); // Set gameOver to true if the next level is 3
            }
            return nextLevel; // Return the next level to update the state
          });
          setIsClickDisabled(false);
        }, 1000);
      }
    }
  }

  function handleLevelChangeAndGameOver() {
    if (gameOver) {
      setTimeout(() => {
        setNewLeastTriesInLocalStorage();
        setRenderedComponent('win');
        resetGameState();
      }, 100);
      return;
    }
    setTileColors({}); // Reset tile colors
    const numTiles = level + 2;
    setActiveTiles([]);
    console.log(activeTiles);
    setClickedTiles([]);
    setTimeout(() => {
      setActiveTiles(generateRandomTiles(numTiles));
      showActiveTilesForSeconds(1);
    }, 1000);
  }

  function showActiveTilesForSeconds(seconds: number) {
    setIsClickDisabled(true);
    setShowActiveTile(true);
    setTimeout(() => {
      setShowActiveTile(false);
      setIsClickDisabled(false);
    }, seconds * 1000);
  }

  return (
    <div className="flex flex-col justify-center items-center gap-5 w-full">
      <div className="mr-auto px-3 sm:text-lg font-bold ">
        {' '}
        Level {level <= maxLevels && level}
      </div>
      <div className="flex text-sm sm:text-base gap-10 justify-between w-full px-3">
        <div>
          {t('mistakes')}: {mistakes}
        </div>

        <div>
          {t('least-mistakes')}: {leastTriesInLocalStorage}
        </div>
      </div>

      <div
        className="grid gap-2 pattern-grid"
        style={{
          gridTemplateColumns: `repeat(${numCols}, 1fr)`,
        }}
      >
        {Array.from({ length: numRows * numCols }).map((_, index) => {
          const row = Math.floor(index / numCols);
          const col = index % numCols;
          const tile = `${row}-${col}`;
          const isTileActive = activeTiles.includes(tile);
          return (
            <Tile
              key={tile}
              activeTile={isTileActive}
              activeTiles={activeTiles}
              setClickedTiles={setClickedTiles}
              setMistakes={setMistakes}
              setLevel={setLevel}
              tile={tile}
              showActiveTile={showActiveTile}
              row={row}
              col={col}
              isClickDisabled={isClickDisabled}
              backgroundColor={tileColors[tile] || 'transparent'}
              setTileColors={setTileColors}
            />
          );
        })}
      </div>
      <Button
        type="tertiary"
        onClick={() => {
          setShowPatternMatch(false);
          setRenderedComponent('home');
          resetGameState();
        }}
      >
        {t('back')}
      </Button>
    </div>
  );
}

interface TileProps {
  activeTile: boolean;
  activeTiles: string[];
  tile: string;
  setMistakes: React.Dispatch<React.SetStateAction<number>>;
  setClickedTiles: React.Dispatch<React.SetStateAction<string[]>>;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  row: number;
  col: number;
  showActiveTile: boolean;
  isClickDisabled: boolean;
  backgroundColor: string;
  setTileColors: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
}

function Tile({
  activeTile,
  tile,
  setClickedTiles,
  setMistakes,
  activeTiles,
  setLevel,
  row,
  col,
  showActiveTile,
  isClickDisabled,
  backgroundColor,
  setTileColors,
}: TileProps) {
  const colorContext = useContext(ColorThemeContext);
  const handleTileClick = () => {
    if (isClickDisabled) {
      return;
    }
    setTileColors((prev) => ({
      ...prev,
      [tile]: activeTile ? colorContext.colorThemeColor : 'red',
    }));

    setClickedTiles((prev) => [...prev, tile]);

    if (!activeTiles.includes(tile)) {
      setMistakes((prev) => prev + 1);
      console.log('mistake');
    }
  };

  return (
    <div
      className="w-12 h-12 sm:w-16 sm:h-16 border-[0.5px] shadow-whiteBox rounded-lg border-white/30 tile"
      style={{
        backgroundColor:
          showActiveTile && activeTile
            ? colorContext.colorThemeColor
            : backgroundColor,
      }}
      onClick={() => handleTileClick()}
    />
  );
}
