// import React, { useState, useEffect } from 'react';

// type CellType = 'wall' | 'path' | 'player' | 'exit';

// const Maze: React.FC = () => {
//   const [maze, setMaze] = useState<CellType[][]>([]);
//   const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });

//   const generateMaze = () => {
//     // Start with all walls
//     const newMaze: CellType[][] = Array(31).fill(null).map(() => Array(31).fill('wall'));
    
//     const carve = (x: number, y: number) => {
//       const directions = [
//         [0, -1], [1, 0], [0, 1], [-1, 0]
//       ].sort(() => Math.random() - 0.5);
      
//       for (const [dx, dy] of directions) {
//         const nx = x + dx * 2;
//         const ny = y + dy * 2;
//         if (nx > 0 && nx < 30 && ny > 0 && ny < 30 && newMaze[ny][nx] === 'wall') {
//           newMaze[y + dy][x + dx] = 'path';
//           newMaze[ny][nx] = 'path';
//           carve(nx, ny);
//         }
//       }
//     };

//     // Start carving from (1,1)
//     newMaze[1][1] = 'path';
//     carve(1, 1);

//     // Ensure there's a path to the exit if it's not already accessible
//     if (newMaze[29][29] === 'wall') {
//       let x = 29, y = 29;
//       while (newMaze[y][x] === 'wall') {
//         newMaze[y][x] = 'path';
//         if (x > 1) x--;
//         if (y > 1) y--;
//       }
//     }

//     newMaze[1][1] = 'player';
//     newMaze[29][29] = 'exit';
    
//     setMaze(newMaze);
//     setPlayerPosition({ x: 1, y: 1 });
//   };

//   useEffect(() => {
//     generateMaze();
//   }, []);

//   const movePlayer = (dx: number, dy: number) => {
//     const newX = playerPosition.x + dx;
//     const newY = playerPosition.y + dy;

//     if (newX <= 0 || newX >= 30 || newY <= 0 || newY >= 30) return;
//     if (maze[newY][newX] === 'wall') return;

//     const newMaze = maze.map(row => [...row]);
//     newMaze[playerPosition.y][playerPosition.x] = 'path';
//     newMaze[newY][newX] = 'player';
//     setMaze(newMaze);
//     setPlayerPosition({ x: newX, y: newY });

//     if (newX === 29 && newY === 29) {
//       alert('You won! Generating new maze.');
//       generateMaze();
//     }
//   };

//   useEffect(() => {
//     const handleKeyPress = (e: KeyboardEvent) => {
//       switch (e.key.toLowerCase()) {
//         case 'w': movePlayer(0, -1); break;
//         case 'a': movePlayer(-1, 0); break;
//         case 's': movePlayer(0, 1); break;
//         case 'd': movePlayer(1, 0); break;
//       }
//     };

//     window.addEventListener('keydown', handleKeyPress);
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, [playerPosition, maze]);

//   return (
//     <div className="p-4">
//       <div className="inline-grid grid-cols-31 gap-0 mb-4">
//         {maze.map((row, y) =>
//           row.map((cell, x) => (
//             <div
//               key={`${x}-${y}`}
//               className={`w-3 h-3 ${
//                 cell === 'wall' ? 'bg-gray-800' :
//                 cell === 'path' ? 'bg-white' :
//                 cell === 'player' ? 'bg-blue-500 border border-white' :
//                 cell === 'exit' ? 'bg-green-500' : ''
//               }`}
//             />
//           ))
//         )}
//       </div>
//       <p>Use W, A, S, D keys to move the player (blue) to the exit (green)</p>
//     </div>
//   );
// };

// export default Maze;

import React, { useState, useEffect } from 'react';
import { generateUnevenGrid } from '../../utils/maze';

type CellType = 'wall' | 'path' | 'player' | 'exit' | 'fog';

const Maze: React.FC = () => {
  const [maze, setMaze] = useState<CellType[][]>([]);
  const [visibleMaze, setVisibleMaze] = useState<CellType[][]>([]);
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
  const [fogGroups, setFogGroups] = useState<number[][]>([]);

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

    newMaze[1][1] = 'player';
    newMaze[29][29] = 'exit';

    setMaze(newMaze);
    
    const newVisibleMaze: CellType[][] = newMaze.map((row, y) => 
      row.map((cell, x) => (x <= 2 && y <= 2) ? cell : 'fog')
    );
    setVisibleMaze(newVisibleMaze);

    // Generate fog groups
    let newFogGroups: number[][] = [];
    let groupId = 1;
    newFogGroups = generateUnevenGrid(31, 31, 25, 30)
    setFogGroups(newFogGroups);

    setPlayerPosition({ x: 1, y: 1 });
  };

  useEffect(() => {
    generateMaze();
  }, []);

  const movePlayer = (dx: number, dy: number) => {
    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;

    if (newX <= 0 || newX >= 30 || newY <= 0 || newY >= 30) return;
    if (maze[newY][newX] === 'wall' || visibleMaze[newY][newX] === 'fog') return;

    const newVisibleMaze = visibleMaze.map(row => [...row]);
    newVisibleMaze[playerPosition.y][playerPosition.x] = maze[playerPosition.y][playerPosition.x];
    newVisibleMaze[newY][newX] = 'player';
    setVisibleMaze(newVisibleMaze);
    setPlayerPosition({ x: newX, y: newY });

    if (newX === 29 && newY === 29) {
      alert('You won! Generating new maze.');
      generateMaze();
    }
  };

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
  }, [playerPosition, maze, visibleMaze]);

  const handleCellClick = (x: number, y: number) => {
    if (visibleMaze[y][x] === 'fog') {
      const groupId = fogGroups[y][x];
      const newVisibleMaze = visibleMaze.map(row => [...row]);
      for (let fy = 0; fy < 31; fy++) {
        for (let fx = 0; fx < 31; fx++) {
          if (fogGroups[fy][fx] === groupId) {
            newVisibleMaze[fy][fx] = maze[fy][fx];
          }
        }
      }
      setVisibleMaze(newVisibleMaze);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="border-2 border-gray-300">
        {visibleMaze.map((row, y) =>
          <div key={y} className="flex">
            {row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className={`w-3 h-3 ${
                  cell === 'wall' ? 'bg-black' :
                  cell === 'player' ? 'bg-blue-500 border border-white' :
                  cell === 'exit' ? 'bg-green-500' :
                  cell === 'fog' ? 'bg-gray-500' :
                  'bg-white'
                }`}
                onClick={() => handleCellClick(x, y)}
              />
            ))}
          </div>
        )}
      </div>
      <div className="mt-4 text-sm">Use W, A, S, D keys to move the player (blue) to the exit (green)</div>
      <div className="mt-2 text-sm">Click on gray areas to clear fog groups</div>
    </div>
  );
};

export default Maze;