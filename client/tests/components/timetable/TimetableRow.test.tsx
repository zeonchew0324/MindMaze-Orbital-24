import { render, screen } from "@testing-library/react";
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import TimetableRow from "../../../src/components/timetable/TimetableRow";
import { TimeblockContext, TimeblockProvider } from "../../../src/contexts/TimeblockProvider";

describe('TimetableRow Component', () => {
  beforeEach(() => {
    render(
      <TimeblockContext.Provider value={[
        {
          id: '1',
          name: 'Test Block',
          day: 'Mon',
          startTime: '09:00',
          duration: '01:00',
          endTime: '10:00'
        }
      ]}>
        <TimetableRow day="Mon" />
      </TimeblockContext.Provider>
    );
  })

  it('renders the background grid for the timetable', () => {
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('renders time blocks correctly', () => {
    // WIP
  });
});