import { render, screen } from "@testing-library/react";
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import TimetableRow from "../../../src/components/timetable/TimetableRow";
import { TimeblockContext } from "../../../src/contexts/TimeblockProvider";
import { TimeBlock } from "../../../src/types/timetable";
import { TimetablePopupProvider } from "../../../src/contexts/TimetablePopupProvider";

describe('TimetableRow Component', () => {
  beforeEach(() => {
    render(
      <TimetablePopupProvider>
        <TimeblockContext.Provider value={{
          timeBlocks: [
            {
              id: '1',
              name: 'Test Block',
              day: 'Mon',
              startTime: '09:00',
              duration: '01:00',
              endTime: '10:00'
            }
          ],
          setTimeBlocks: vi.fn((tb: TimeBlock[]) => {}),
        }}>
          <TimetableRow day="Mon" />
        </TimeblockContext.Provider>
      </TimetablePopupProvider>
    );
  })

  it('renders the background grid for the timetable', () => {
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('renders time blocks at the right place', () => {
    // WIP
  });
});