import React, { useState } from "react";
import { useEnergy } from "../../contexts/EnergyProvider";
import MazePopup from "./MazePopup";
import { useMaze } from "../../hooks/maze/useMaze";
import { usePlayer } from "../../hooks/maze/usePlayer";
import CompletionPopup from "./CompletionPopup";

export type CellType = "wall" | "path" | "exit" | "fog";

const Maze: React.FC = () => {
  const {
    maze,
    visibleMaze,
    playerPosition,
    fogGroups,
    setPlayerPosition,
    generateMaze,
    setVisibleMaze,
  } = useMaze();
  const { showPopup, setShowPopup } = usePlayer(
    maze,
    visibleMaze,
    setPlayerPosition,
    generateMaze
  );

  const { energy, decreaseEnergy } = useEnergy();
  const [hoveredGroup, setHoveredGroup] = useState<number | null>(null);
  const [popupData, setPopupData] = useState<{
    isOpen: boolean;
    groupSize: number;
    groupId: number;
  }>({
    isOpen: false,
    groupSize: 0,
    groupId: 0,
  });

  const handleCellClick = (x: number, y: number) => {
    if (visibleMaze[y][x] === "fog") {
      const groupId = fogGroups[y][x];
      let groupSize = 0;
      for (let fy = 0; fy < 31; fy++) {
        for (let fx = 0; fx < 31; fx++) {
          if (fogGroups[fy][fx] === groupId) {
            groupSize++;
          }
        }
      }
      setPopupData({ isOpen: true, groupSize, groupId });
    }
  };

  const handleReveal = () => {
    const { groupId } = popupData;
    setVisibleMaze((prevVisibleMaze) => {
      const newVisibleMaze = prevVisibleMaze.map((row) => [...row]);
      for (let fy = 0; fy < 31; fy++) {
        for (let fx = 0; fx < 31; fx++) {
          if (fogGroups[fy][fx] === groupId) {
            newVisibleMaze[fy][fx] = maze[fy][fx];
          }
        }
      }
      return newVisibleMaze;
    });
    decreaseEnergy(popupData.groupSize);
    setPopupData({ isOpen: false, groupSize: 0, groupId: 0 });
  };

  const handleCancel = () => {
    setPopupData({ isOpen: false, groupSize: 0, groupId: 0 });
  };

  const handleHoverStart = (x: number, y: number) => {
    if (visibleMaze[y][x] === "fog") {
      setHoveredGroup(fogGroups[y][x]);
    }
  };

  const handleHoverEnd = () => {
    setHoveredGroup(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-100%">
      <div>Energy Points: {energy}</div>
      <div className="border-2 border-gray-300">
        {visibleMaze.map((row, y) => (
          <div key={y} className="flex">
            {row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className={`w-3 h-3 ${
                  cell === "wall"
                    ? "bg-black"
                    : x === playerPosition.x && y === playerPosition.y
                    ? "bg-blue-500 border border-white"
                    : cell === "exit"
                    ? "bg-green-500"
                    : cell === "fog" && fogGroups[y][x] === hoveredGroup
                    ? "bg-red-500"
                    : cell === "fog"
                    ? "bg-gray-500"
                    : "bg-white"
                }`}
                onClick={() => handleCellClick(x, y)}
                onMouseEnter={() => handleHoverStart(x, y)}
                onMouseLeave={handleHoverEnd}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm">
        Use W, A, S, D keys to move the player (blue) to the exit (green)
      </div>
      <div className="mt-2 text-sm">
        Click on gray areas to clear fog groups
      </div>
      <MazePopup
        isOpen={popupData.isOpen}
        groupSize={popupData.groupSize}
        onReveal={handleReveal}
        onCancel={handleCancel}
      />
      {showPopup && (
        <CompletionPopup
          onClose={() => setShowPopup(false)}
          onGenerateMaze={generateMaze}
        />
      )}
    </div>
  );
};

export default Maze;
