import React, { useState, useEffect, useCallback, useRef } from 'react';
import { convertMazeToBackendFormat, convertMazeToFrontendFormat, generateUnevenGrid } from '../../utils/maze';
import { useEnergy } from '../../contexts/EnergyProvider';
import MazePopup from './MazePopup';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthProvider';

export type CellType = 'wall' | 'path' | 'exit' | 'fog';

const Maze: React.FC = () => {
  const [maze, setMaze] = useState<CellType[][]>([[]]);
  const [visibleMaze, setVisibleMaze] = useState<CellType[][]>([[]]);
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
  const [fogGroups, setFogGroups] = useState<number[][]>([[]]);
  const [hoveredGroup, setHoveredGroup] = useState<number | null>(null);
  const [popupData, setPopupData] = useState<{ isOpen: boolean; groupSize: number; groupId: number }>({
    isOpen: false,
    groupSize: 0,
    groupId: 0,
  });

  const { energy, decreaseEnergy } = useEnergy()
  const { currentUser, token } = useAuth()

  const latestPlayerPosition = useRef(playerPosition);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadMazeState();
  }, []); 

  useEffect(() => {
    latestPlayerPosition.current = playerPosition;

    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }

    saveTimeout.current = setTimeout(() => {
      saveMazeState(true);
    }, 5000);

    return () => {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }
    };
  }, [playerPosition]);

  useEffect(() => {
    return () => {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
        saveMazeState(true);
      }
    };
  }, []);

  const loadMazeState = async () => {
    const getUid = async () => currentUser?.uid
    try {
      const uid = await getUid()
      const response = await axios.get(`/api/maze/${uid}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      const loadedState = response.data;
      console.log("Loaded state from API:", loadedState);
      if (loadedState) {
        const formattedLoadedState = convertMazeToFrontendFormat(loadedState)
        console.log("Formatted loaded state:", formattedLoadedState);
        setMaze(formattedLoadedState.maze);
        setVisibleMaze(formattedLoadedState.visibleMaze);
        setPlayerPosition(formattedLoadedState.playerPosition);
        setFogGroups(formattedLoadedState.fogGroups);
      } else {
        generateMaze(); 
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log("Hi Axios error:", error.response?.status, error.response?.data);
      } else {
        console.log("Unexpected error:", error);
      }
    }
  };

  const saveMazeState = async (onlyPlayerPosition = false) => {
    const getUid = async () => currentUser?.uid
    try {
      const uid = await getUid()
      const stateToSave = onlyPlayerPosition 
        ? { playerPosition: latestPlayerPosition.current }
        : convertMazeToBackendFormat({
            maze,
            visibleMaze,
            fogGroups,
            playerPosition: latestPlayerPosition.current
          });

      await axios.put(`/api/maze/${uid}`, stateToSave, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      console.log("Maze state saved successfully");
    } catch (error) {
      console.error("Failed to save maze state:", error);
    }
  };

  useEffect(() => {
    if (maze[0].length !== 0) {
      saveMazeState();
    }
  }, [maze, visibleMaze, fogGroups]);

  const generateMaze = () => {
    const newMaze: CellType[][] = Array(31).fill(null).map(() => Array(31).fill('wall'));

    const carve = (x: number, y: number) => {
      const directions = [
        [0, -1], [1, 0], [0, 1], [-1, 0]
      ].sort(() => Math.random() - 0.5);

      for (const [dx, dy] of directions) {
        const nx = x + dx * 2;
        const ny = y + dy * 2;
        if (nx > 0 && nx < 30 && ny > 0 && ny < 30 && newMaze[ny][nx] === 'wall') {
          newMaze[y + dy][x + dx] = 'path';
          newMaze[ny][nx] = 'path';
          carve(nx, ny);
        }
      }
    };

    newMaze[1][1] = 'path';
    carve(1, 1);

    if (newMaze[29][29] === 'wall') {
      let x = 29, y = 29;
      while (newMaze[y][x] === 'wall') {
        newMaze[y][x] = 'path';
        if (x > 1) x--;
        if (y > 1) y--;
      }
    }

    newMaze[29][29] = 'exit';

    setMaze(newMaze);
    
    const newVisibleMaze: CellType[][] = newMaze.map((row, y) => 
      row.map((cell, x) => (x <= 2 && y <= 2) ? cell : 'fog')
    );
    setVisibleMaze(newVisibleMaze);

    // Generate fog groups
    let newFogGroups: number[][] = [];
    newFogGroups = generateUnevenGrid(31, 31, 25, 30)
    setFogGroups(newFogGroups);

    setPlayerPosition({ x: 1, y: 1 });
  };

  useEffect(() => {
    generateMaze();
  }, []);

  const movePlayer = useCallback((dx: number, dy: number) => {
    setPlayerPosition(prevPos => {
      const newX = prevPos.x + dx;
      const newY = prevPos.y + dy;

      if (newX <= 0 || newX >= 30 || newY <= 0 || newY >= 30) return prevPos;
      if (maze[newY][newX] === 'wall' || visibleMaze[newY][newX] === 'fog') return prevPos;

      console.log("Moving player to:", { newX, newY });

      if (newX === 29 && newY === 29) {
        alert('You won! Generating new maze.');
        generateMaze();
      }

      return { x: newX, y: newY };
    });
  }, [maze, visibleMaze]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'w': movePlayer(0, -1); break;
        case 'a': movePlayer(-1, 0); break;
        case 's': movePlayer(0, 1); break;
        case 'd': movePlayer(1, 0); break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePlayer]);

  const handleCellClick = (x: number, y: number) => {
    if (visibleMaze[y][x] === 'fog') {
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
    setVisibleMaze(prevVisibleMaze => {
      const newVisibleMaze = prevVisibleMaze.map(row => [...row]);
      for (let fy = 0; fy < 31; fy++) {
        for (let fx = 0; fx < 31; fx++) {
          if (fogGroups[fy][fx] === groupId) {
            newVisibleMaze[fy][fx] = maze[fy][fx];
          }
        }
      }
      return newVisibleMaze;
    });
    decreaseEnergy(popupData.groupSize)
    setPopupData({ isOpen: false, groupSize: 0, groupId: 0 });
  };

  const handleCancel = () => {
    setPopupData({ isOpen: false, groupSize: 0, groupId: 0 });
  };

  const handleHoverStart = (x: number, y: number) => {
    if (visibleMaze[y][x] === 'fog') {
      setHoveredGroup(fogGroups[y][x]);
    }
  };

  const handleHoverEnd = () => {
    setHoveredGroup(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-100%">
      <div>
        Energy Points: {energy}
      </div>
      <div className="border-2 border-gray-300">
        {visibleMaze.map((row, y) =>
          <div key={y} className="flex">
            {row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className={`w-3 h-3 ${
                  cell === 'wall' ? 'bg-black' :
                  (x === playerPosition.x && y === playerPosition.y) ? 'bg-blue-500 border border-white' :
                  cell === 'exit' ? 'bg-green-500' :
                  cell === 'fog' && fogGroups[y][x] === hoveredGroup ? 'bg-red-500' :
                  cell === 'fog' ? 'bg-gray-500' :
                  'bg-white'
                }`}
                onClick={() => handleCellClick(x, y)}
                onMouseEnter={() => handleHoverStart(x, y)}
                onMouseLeave={handleHoverEnd}
              />
            ))}
          </div>
        )}
      </div>
      <div className="mt-4 text-sm">Use W, A, S, D keys to move the player (blue) to the exit (green)</div>
      <div className="mt-2 text-sm">Click on gray areas to clear fog groups</div>
      <MazePopup 
        isOpen={popupData.isOpen}
        groupSize={popupData.groupSize}
        onReveal={handleReveal}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default Maze;
