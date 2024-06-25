import { render, screen } from "@testing-library/react";
import Timetable from "../../../src/components/timetable/Timetable";
import { TimeblockProvider } from "../../../src/contexts/TimeblockProvider";
import { TimetablePopupProvider } from "../../../src/contexts/TimetablePopupProvider";
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('Timetable Page', () => {
  it('renders correctly, displaying all days and the "Add Activity" button', () => {
    render(
      <TimeblockProvider>
        <TimetablePopupProvider>
          <Timetable />
        </TimetablePopupProvider>
      </TimeblockProvider>
    );

    // Check for the "Add Activity" button
    const addButton = screen.getByText(/add activity/i);
    expect(addButton).toBeInTheDocument();

    // Check for all the days
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
      const dayElement = screen.getByText(day);
      expect(dayElement).toBeInTheDocument();
    });
  });
})