import { render, act, fireEvent } from "@testing-library/react";
import {
  useEnergy,
  EnergyProvider,
} from "../../../src/contexts/EnergyProvider";
import React from "react";
import { describe, it, expect } from "vitest";

// Helper component to test EnergyProvider
const TestComponent: React.FC = () => {
  const { energy, increaseEnergy, fetchEnergy } = useEnergy();

  React.useEffect(() => {
    fetchEnergy();
  }, []);

  return (
    <div>
      <div data-testid="energy">{energy}</div>
      <button onClick={() => increaseEnergy(10)} data-testid="increase-button">
        Increase
      </button>
    </div>
  );
};

describe("EnergyProvider", () => {
  it("should increase energy by 10 after habit completion", async () => {
    const { getByTestId } = render(
      <EnergyProvider>
        <TestComponent />
      </EnergyProvider>
    );

    const energyBefore = getByTestId("energy").textContent;
    const increaseButton = getByTestId("increase-button");

    // Simulate habit completion
    await act(async () => {
      fireEvent.click(increaseButton);
    });

    const energyAfter = getByTestId("energy").textContent;

    expect(Number(energyAfter)).toBe(Number(energyBefore) + 10);
  });
});
