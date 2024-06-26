import { render, screen } from "@testing-library/react";
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Timetable from "../../../src/components/timetable/Timetable";
import { TimeblockProvider } from "../../../src/contexts/TimeblockProvider";
import { TimetablePopupProvider } from "../../../src/contexts/TimetablePopupProvider";

describe('Timetable Page', () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  beforeEach(() => {
    render(
      <TimeblockProvider>
        <TimetablePopupProvider>
          <Timetable />
        </TimetablePopupProvider>
      </TimeblockProvider>
    );
  })

  it('renders correctly, displaying all days and the "Add Activity" button', () => {
    // Check for the "Add Activity" button
    const addButton = screen.getByText(/add activity/i);
    expect(addButton).toBeInTheDocument();

    // Check for all the days
    days.forEach(day => {
      const dayElement = screen.getByText(day);
      expect(dayElement).toBeInTheDocument();
    });
  });

  it('displays days in the correct order', () => {
    const dayElements = days.map(day => screen.getByText(day));

    dayElements.forEach((dayElement, index) => {
      if (index < dayElements.length - 1) {
        const nextDayElement = dayElements[index + 1];
        expect(dayElement.compareDocumentPosition(nextDayElement)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
      }
    });
  });
})