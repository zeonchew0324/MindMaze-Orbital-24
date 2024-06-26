import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import Timetable from "../../../src/components/timetable/Timetable";
import { TimeblockProvider } from "../../../src/contexts/TimeblockProvider";
import { TimetablePopupProvider } from "../../../src/contexts/TimetablePopupProvider";
import CreateTimeblock from "../../../src/components/timetable/CreateTimeblock";
import TimetablePopup from "../../../src/components/timetable/TimetablePopup";

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

  it('checks correct options in select dropdowns', () => {
    const startTimeOptions = [
      '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
      '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
      '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
      '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'
    ];

    const endTimeOptions = [
      '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
      '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
      '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
      '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'
    ];

    const dayOptions = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const startTimeSelect = screen.getByLabelText(/Start Time/i);
    const endTimeSelect = screen.getByLabelText(/End Time/i);
    const daySelect = screen.getByLabelText(/Day/i);

    // Optimize this test case later PLEASE
    startTimeOptions.forEach(option => {
      const optionElement = startTimeSelect.querySelector(`option[value="${option}"]`);
      if (optionElement) {
        expect(optionElement).toBeInTheDocument()
      } else {
        expect(option).toEqual(0)
      }
    });

    endTimeOptions.forEach(option => {
      const optionElement = endTimeSelect.querySelector(`option[value="${option}"]`);
      if (optionElement) {
        expect(optionElement).toBeInTheDocument()
      } else {
        expect(option).toEqual(0)
      }
    });

    dayOptions.forEach(option => {
      const optionElement = daySelect.querySelector(`option[value="${option}"]`);
      if (optionElement) {
        expect(optionElement).toBeInTheDocument()
      } else {
        expect(option).toEqual(0)
      }
    });
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