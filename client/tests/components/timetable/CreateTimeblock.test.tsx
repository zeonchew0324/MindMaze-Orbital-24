import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import Timetable from "../../../src/components/timetable/Timetable";
import { TimeblockProvider } from "../../../src/contexts/TimeblockProvider";
import { TimetablePopupProvider } from "../../../src/contexts/TimetablePopupProvider";
import CreateTimeblock from "../../../src/components/timetable/CreateTimeblock";
import TimetablePopup from "../../../src/components/timetable/TimetablePopup";
import { clear } from "@testing-library/user-event/dist/clear";
import { ButtonHTMLAttributes } from "react";

describe('Create Timeblock', () => {
  beforeEach(() => {
    render(
      <TimeblockProvider>
        <TimetablePopupProvider>
          <Timetable />
        </TimetablePopupProvider>
      </TimeblockProvider>
    );
    const addButton = screen.getByText(/add activity/i);
    userEvent.click(addButton);
  })

  it('opens popup when pressing "Add Activity"', () => {
    const nameInput = screen.getByRole('textbox', { name: /name/i });
    expect(nameInput).toBeInTheDocument();

    const startTimeSelect = screen.getByRole('combobox', { name: /start time/i });
    expect(startTimeSelect).toBeInTheDocument();

    const endTimeSelect = screen.getByRole('combobox', { name: /end time/i });
    expect(endTimeSelect).toBeInTheDocument();

    const daySelect = screen.getByRole('combobox', { name: /day/i });
    expect(daySelect).toBeInTheDocument();
  });

  it('closes popup when pressing "Close"', () => {
    expect(screen.getByText(/Create/i)).toBeInTheDocument();
    
    const closeButton = screen.getByRole('button', { name: /Close/i });
    userEvent.click(closeButton);

    expect(screen.queryByText(/Create/i)).not.toBeInTheDocument();
  });

  it('disables interaction with elements outside the popup', () => {
    const test = vi.fn()
    cleanup()
    render(
      <TimetablePopupProvider>
        <TimeblockProvider>
          <div>
            <button onClick={test} data-testid="outside-button" className="z-0">Outside Button</button>
            <TimetablePopup isOpen={true} onClose={vi.fn()}>
              <CreateTimeblock />
            </TimetablePopup>
          </div>
        </TimeblockProvider>
      </TimetablePopupProvider>
    );

    expect(screen.getByText(/Create/i)).toBeInTheDocument();
    
    const outsideButton = screen.getByText('Outside Button');
    const { left, top } = outsideButton.getBoundingClientRect();
    fireEvent.click(document.body, { clientX: left, clientY: top });

    expect(outsideButton).toBeInTheDocument();
    expect(test).toBeCalledTimes(0)
  });

  it('validates that end time is after start time', () => {
    const startTimeSelect = screen.getAllByLabelText(/Start Time/i)[0];
    const endTimeSelect = screen.getAllByLabelText(/End Time/i)[0];

    userEvent.selectOptions(startTimeSelect, '12:00');
    userEvent.selectOptions(endTimeSelect, '10:00');

    expect(screen.getByText(/End time must be after start time/i)).toBeInTheDocument();
  });

  it('adds a new timeframe', () => {
    expect(screen.getByText(/Add Timeframe/i)).toBeInTheDocument()
    userEvent.click(screen.getByText(/Add Timeframe/i));

    expect(screen.getAllByLabelText(/Start Time/i)).toHaveLength(2);
    expect(screen.getAllByLabelText(/End Time/i)).toHaveLength(2);
    expect(screen.getAllByLabelText(/Day/i)).toHaveLength(2);
  });

  it('removes an existing timeframe', () => {
    userEvent.click(screen.getByText(/Add Timeframe/i));
    userEvent.click(screen.getAllByText(/Remove Timeframe/i)[0]);
    expect(screen.getAllByLabelText(/Start Time/i)).toHaveLength(1);
    expect(screen.getAllByLabelText(/End Time/i)).toHaveLength(1);
    expect(screen.getAllByLabelText(/Day/i)).toHaveLength(1);
  });
})