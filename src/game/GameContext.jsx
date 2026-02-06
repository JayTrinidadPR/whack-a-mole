import { createContext, useContext, useMemo, useState } from "react";

const GameContext = createContext(null);

function getRandomHoleIndex(holeCount) {
  return Math.floor(Math.random() * holeCount);
}

export function GameProvider({ children }) {
  const HOLE_COUNT = 9;

  const [phase, setPhase] = useState("welcome"); // "welcome" | "playing"
  const [score, setScore] = useState(0);
  const [moleIndex, setMoleIndex] = useState(() => getRandomHoleIndex(HOLE_COUNT));

  function startGame() {
    setScore(0);
    setMoleIndex(getRandomHoleIndex(HOLE_COUNT));
    setPhase("playing");
  }

  function restartGame() {
    setPhase("welcome");
  }

  function whackMole() {
    setScore((s) => s + 1);
    setMoleIndex(getRandomHoleIndex(HOLE_COUNT));
  }

  const value = useMemo(
    () => ({
      HOLE_COUNT,
      phase,
      score,
      moleIndex,
      startGame,
      restartGame,
      whackMole,
    }),
    [phase, score, moleIndex]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside <GameProvider>");
  return ctx;
}
