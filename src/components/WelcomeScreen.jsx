import { useGame } from "../game/GameContext";

export default function WelcomeScreen() {
  const { startGame } = useGame();

  return (
    <div className="screen">
      <h1>Whack-a-Mole</h1>
      <p>
        Click the mole to score points. Each time you whack it, it moves to a
        random hole.
      </p>
      <button className="btn" onClick={startGame}>
        Play
      </button>
    </div>
  );
}
