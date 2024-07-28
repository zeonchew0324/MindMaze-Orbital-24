import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Maze from "../../../src/components/maze/Maze";
import { useMaze } from "../../../src/hooks/maze/useMaze";
import { usePlayer } from "../../../src/hooks/maze/usePlayer";
import { useEnergy } from "../../../src/contexts/EnergyProvider";

vi.mock("../../../src/hooks/maze/useMaze");
vi.mock("../../../src/hooks/maze/usePlayer");
vi.mock("../../../src/contexts/EnergyProvider");

describe("Maze Component", () => {
  const mockMaze = Array.from({ length: 31 }, () =>
    Array.from({ length: 31 }, () => "path")
  );
  const mockVisibleMaze = Array.from({ length: 31 }, () =>
    Array.from({ length: 31 }, () => "path")
  );
  mockVisibleMaze[15][15] = "fog";
  mockMaze[30][30] = "exit";

  const mockFogGroups = Array.from({ length: 31 }, () =>
    Array.from({ length: 31 }, () => 0)
  );

  const mockUseMaze = {
    maze: mockMaze,
    visibleMaze: mockVisibleMaze,
    playerPosition: { x: 0, y: 0 },
    fogGroups: mockFogGroups,
    setPlayerPosition: vi.fn(),
    generateMaze: vi.fn(),
    setVisibleMaze: vi.fn(),
  };

  const mockUsePlayer = {
    showPopup: false,
    setShowPopup: vi.fn(),
  };

  const mockUseEnergy = {
    energy: 100,
    decreaseEnergy: vi.fn(),
  };

  beforeEach(() => {
    (useMaze as any).mockReturnValue(mockUseMaze);
    (usePlayer as any).mockReturnValue(mockUsePlayer);
    (useEnergy as any).mockReturnValue(mockUseEnergy);
  });

  it("should render the maze with initial player position", () => {
    render(<Maze />);
    const playerCell = screen.getByClass("bg-gray-500");
    expect(playerCell).toBeInTheDocument();
  });

  it("should move the player when W, A, S, D keys are pressed", () => {
    render(<Maze />);

    fireEvent.keyDown(window, { key: "D", code: "KeyD" });
    expect(mockUseMaze.setPlayerPosition).toHaveBeenCalledWith({ x: 1, y: 0 });

    fireEvent.keyDown(window, { key: "S", code: "KeyS" });
    expect(mockUseMaze.setPlayerPosition).toHaveBeenCalledWith({ x: 1, y: 1 });

    fireEvent.keyDown(window, { key: "A", code: "KeyA" });
    expect(mockUseMaze.setPlayerPosition).toHaveBeenCalledWith({ x: 0, y: 1 });

    fireEvent.keyDown(window, { key: "W", code: "KeyW" });
    expect(mockUseMaze.setPlayerPosition).toHaveBeenCalledWith({ x: 0, y: 0 });
  });

  it("should open popup when fog cell is clicked", () => {
    render(<Maze />);

    const fogCell = screen.getByClass("bg-gray-500");
    fireEvent.click(fogCell);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should decrease energy when reveal is clicked in popup", () => {
    render(<Maze />);

    const fogCell = screen.getBy("bg-gray-500");
    fireEvent.click(fogCell);

    const revealButton = screen.getByText("Reveal");
    fireEvent.click(revealButton);

    expect(mockUseEnergy.decreaseEnergy).toHaveBeenCalled();
  });

  it("should reset popup data when cancel is clicked", () => {
    render(<Maze />);

    const fogCell = screen.getByClass("bg-gray-500");
    fireEvent.click(fogCell);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
