import { CellType } from "../components/maze/Maze";

// Define the input type
export type FrontendMazeData = {
  maze: CellType[][];
  visibleMaze: CellType[][];
  playerPosition: {x: number, y: number};
  fogGroups: number[][];
};

// Define the output type
export type BackendMazeData = {
  maze: { [key: string]: CellType[] };
  visibleMaze: { [key: string]: CellType[] };
  playerPosition: {x: number, y: number};
  fogGroups: { [key: string]: number[] };
};

export function generateUnevenGrid(rows: number, cols: number, minSize: number, maxSize: number): number[][] {
  const grid: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));
  let groupId = 1;

  function floodFill(x: number, y: number, groupId: number, size: number): number {
    if (size <= 0 || x < 0 || x >= cols || y < 0 || y >= rows || grid[y][x] !== 0) {
      return 0;
    }

    grid[y][x] = groupId;
    size -= 1;

    // Shuffle directions to create more organic shapes
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]].sort(() => Math.random() - 0.5);

    for (const [dx, dy] of directions) {
      // Add a probability factor to make the shape more organic
      if (Math.random() < 0.9) { // 90% chance to expand in each direction
        size -= floodFill(x + dx, y + dy, groupId, size);
      }
    }

    return 1;
  }

  function mergeSmallGroups(minGroupSize: number) {
    const groupSizes = new Map<number, number>();

    // Count the size of each group
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const id = grid[y][x];
        if (id !== 0) {
          groupSizes.set(id, (groupSizes.get(id) || 0) + 1);
        }
      }
    }

    // Merge small groups into neighboring larger groups
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const id = grid[y][x];
        if (id !== 0 && groupSizes.get(id)! < minGroupSize) {
          const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
          for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && grid[ny][nx] !== 0 && grid[ny][nx] !== id) {
              const neighborId = grid[ny][nx];
              if (groupSizes.get(neighborId)! >= minGroupSize) {
                // Merge current small group into the neighboring larger group
                const oldGroupId = id;
                for (let yy = 0; yy < rows; yy++) {
                  for (let xx = 0; xx < cols; xx++) {
                    if (grid[yy][xx] === oldGroupId) {
                      grid[yy][xx] = neighborId;
                    }
                  }
                }
                groupSizes.set(neighborId, groupSizes.get(neighborId)! + groupSizes.get(oldGroupId)!);
                groupSizes.delete(oldGroupId);
                break;
              }
            }
          }
        }
      }
    }
  }

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 0) {
        const size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
        floodFill(x, y, groupId, size);
        groupId += 1;
      }
    }
  }

  // Merge small groups to meet the minimum size
  mergeSmallGroups(minSize);

  return grid;
}

// Function to convert from input format to output format
export function convertMazeToBackendFormat(input: FrontendMazeData): BackendMazeData {
  return {
    maze: Object.fromEntries(input.maze.map((row, index) => [index.toString(), row])),
    visibleMaze: Object.fromEntries(input.visibleMaze.map((row, index) => [index.toString(), row])),
    playerPosition: input.playerPosition,
    fogGroups: Object.fromEntries(input.fogGroups.map((group, index) => [index.toString(), group])),
  };
}

// Function to convert from output format back to input format
export function convertMazeToFrontendFormat(output: BackendMazeData): FrontendMazeData {
  return {
    maze: Object.values(output.maze),
    visibleMaze: Object.values(output.visibleMaze),
    playerPosition: output.playerPosition,
    fogGroups: Object.values(output.fogGroups),
  };
}