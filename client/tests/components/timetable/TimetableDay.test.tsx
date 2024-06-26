import { render, screen } from "@testing-library/react";
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import TimetableDay from "../../../src/components/timetable/TimetableDay";
import { TimeblockProvider } from "../../../src/contexts/TimeblockProvider";

describe('TimetableDay Component', () => {
  it('renders the day\'s name', () => {
    render(
      <TimeblockProvider>
        <TimetableDay day="Mon" key={0} />
      </TimeblockProvider>
    );
    expect(screen.getByText('Mon')).toBeInTheDocument();
  });

  it('renders the timetable row for the given day', () => {
    render(
      <TimeblockProvider>
        <TimetableDay day="Mon" key={0} />
      </TimeblockProvider>
    );
    expect(screen.getByRole('listitem')).toBeInTheDocument();
  });
});