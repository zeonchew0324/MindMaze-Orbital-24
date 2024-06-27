import { render, screen } from "@testing-library/react";
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import TimetableDay from "../../../src/components/timetable/TimetableDay";
import { TimeblockProvider } from "../../../src/contexts/TimeblockProvider";

describe('TimetableDay Component', () => {
  beforeEach(() => {
    render(
      <TimeblockProvider>
        <TimetableDay day="Sun" key={0} />
      </TimeblockProvider>
    );
  })
  it('renders the day\'s name', () => {
    expect(screen.getByText('Sun')).toBeInTheDocument();
  });

  it('renders the timetable row for the given day', () => {
    expect(screen.getByRole('listitem')).toBeInTheDocument();
  });
});