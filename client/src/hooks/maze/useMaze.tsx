import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { convertMazeToBackendFormat, convertMazeToFrontendFormat, generateUnevenGrid } from '../../utils/maze';
import { useAuth } from '../../contexts/AuthProvider';
import { CellType } from '../../components/maze/Maze';
import { useEnergy } from '../../contexts/EnergyProvider';

export const useMaze = () => {
  const [maze, setMaze] = useState<CellType[][]>([[]]);
  const [visibleMaze, setVisibleMaze] = useState<CellType[][]>([[]]);
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
  const [fogGroups, setFogGroups] = useState<number[][]>([[]]);

  const { currentUser, token } = useAuth();
  const latestPlayerPosition = useRef(playerPosition);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);
  const { fetchEnergy } = useEnergy()

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
    fetchEnergy()
    return () => {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
        saveMazeState(true);
      }
    };
  }, []);

  useEffect(() => {
    if (maze[0].length !== 0) {
      saveMazeState();
    }
  }, [maze, visibleMaze, fogGroups]);

  const loadMazeState = async () => {
    try {
      const uid = currentUser?.uid;
      if (uid) {
        const response = await axios.get(`/api/maze/${uid}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        });
        const loadedState = response.data;
        if (loadedState.maze) {
          const formattedLoadedState = convertMazeToFrontendFormat(loadedState);
          setMaze(formattedLoadedState.maze);
          setVisibleMaze(formattedLoadedState.visibleMaze);
          setPlayerPosition(formattedLoadedState.playerPosition);
          setFogGroups(formattedLoadedState.fogGroups);
        } else {
          generateMaze(); 
        }
      }
    } catch (error: any) {
      console.error("Error loading maze state:", error);
    }
  };

  const saveMazeState = async (onlyPlayerPosition = false) => {
    try {
      const uid = currentUser?.uid;
      if (uid) {
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
      }
    } catch (error) {
      console.error("Failed to save maze state:", error);
    }
  };

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

    const newFogGroups = generateUnevenGrid(31, 31, 25, 30);
    setFogGroups(newFogGroups);
    setPlayerPosition({ x: 1, y: 1 });
  };

  return { maze, visibleMaze, playerPosition, fogGroups, setPlayerPosition, generateMaze, loadMazeState, saveMazeState, setVisibleMaze };
}
