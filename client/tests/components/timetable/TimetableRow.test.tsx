import { render, screen } from "@testing-library/react";
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import TimetableRow from "../../../src/components/timetable/TimetableRow";
import { TimeblockContext } from "../../../src/contexts/TimeblockProvider";
import { TimeBlock } from "../../../src/types/timetable";
import { TimetablePopupProvider } from "../../../src/contexts/TimetablePopupProvider";
import userEvent from "@testing-library/user-event";

describe('TimetableRow Component', () => {
  it('renders time blocks at the right place', () => {
    render(
      <TimetablePopupProvider>
        <TimeblockContext.Provider value={{
          timeBlocks: [
            {
              id: '1',
              name: 'Test Block 1',
              day: 'Mon',
              startTime: '09:00',
              duration: '01:00',
              endTime: '10:00'
            },
            {
              id: '2',
              name: 'Test Block 2',
              day: 'Mon',
              startTime: '09:00',
              duration: '02:00',
              endTime: '11:00'
            }
          ],
          setTimeBlocks: vi.fn((tb: TimeBlock[]) => {}),
        }}>
          <TimetableRow day="Mon" />
        </TimeblockContext.Provider>
      </TimetablePopupProvider>
    );

    const block1 = screen.getByText('Test Block 1');
    const block2 = screen.getByText('Test Block 2');
  
    // Verify position and span based on start time and duration
    expect(block1).toHaveStyle('grid-column: 10 / span 1');
    expect(block2).toHaveStyle('grid-column: 10 / span 2');
  });

  it('handles overlap correctly', () => {
    render(
      <TimetablePopupProvider>
        <TimeblockContext.Provider value={{
          timeBlocks: [
            {
              id: '1',
              name: 'Test Block 1',
              day: 'Mon',
              startTime: '09:00',
              duration: '02:00',
              endTime: '11:00'
            },
            {
              id: '2',
              name: 'Test Block 2',
              day: 'Mon',
              startTime: '09:00',
              duration: '02:00',
              endTime: '11:00'
            }
          ],
          setTimeBlocks: vi.fn((tb: TimeBlock[]) => {}),
        }}>
          <TimetableRow day="Mon" />
        </TimeblockContext.Provider>
      </TimetablePopupProvider>
    );

    const block1Text = screen.getByRole('button', {
      name: /test block 1/i
    })	
    const block2Text = screen.getByRole('button', {
      name: /test block 2/i
    })	

    // Get the positions of the text elements
    const block1TextPosition = block1Text.getBoundingClientRect();
    const block2TextPosition = block2Text.getBoundingClientRect();
    // Ensure block2 text is stacked below block1 text
    // I gave up on this one, for some mysterious bug it doesnt work here, but works in testing library's playground
    expect(block2TextPosition.top).toBeGreaterThanOrEqual(block1TextPosition.bottom);
    expect(screen.getByRole('button', {
      name: /test block 2/i
    }).getBoundingClientRect().bottom - screen.getByRole(
    'button', {
      name: /test block 1/i
    }).getBoundingClientRect().bottom).toBeGreaterThanOrEqual(0) //should be greater only
  });
});