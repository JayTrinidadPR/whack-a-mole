import { useState, createContext, useContext, useMemo } from "react";

const GameContext = createContext(null);

const TIME_LIMIT = 15;

function getRandomHoleIndex(holeCount) {
    return Math.floor(Math.random() * holeCount);
}

export function GameProvider({ children }) {
    const HOLE_COUNT = 9;
}

const [phase, setPhase] = useState("welcome");
const [score, setScore] useState(0);

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
        whackMole
    }),
    [phase, score, moleIndex]
);

return <GameContext.Provider value={value}>{children} </GameContext.Provider>;

export function useGame() {
    const ctx = useContext(GameContext);
    if (!ctx) throw new Error("ITS NOT WORKING, useGame must be inside" < GameProvider);
    return ctx;
}