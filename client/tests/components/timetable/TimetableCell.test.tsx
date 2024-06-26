import { render, screen } from "@testing-library/react";
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { TimeBlock } from "../../../src/types/timetable";
import TimetableCell from "../../../src/components/timetable/TimetableCell";
import { PopupContext, TimetablePopupProvider, useTimetablePopup } from "../../../src/contexts/TimetablePopupProvider";
import userEvent from "@testing-library/user-event";

describe('TimetableCell Component', () => {
  const openMock = vi.fn((block: TimeBlock | undefined) => {})
  const block: TimeBlock = {
    id: '1',
    name: 'Test Block',
    day: 'Mon',
    startTime: '09:00',
    duration: '01:00',
    endTime: '10:00'
  };

  beforeEach(() => {
    render(
      <PopupContext.Provider value={{
        isPopupOpen: false,
        openPopup: openMock,
        closePopup: vi.fn(),
        popupContent: undefined,
      }}>
        <TimetableCell block={block} />
      </PopupContext.Provider>
    );
  })

  it('renders button with correct block name', () => {
    expect(screen.getByText(/test block/i)).toBeInTheDocument()
  });

  it('calls openPopup when button is clicked', () => {
    const button = screen.getByText(/test block/i); 
    userEvent.click(button);
    expect(button).toBeInTheDocument()

    expect(openMock).toHaveBeenCalledWith(block);
  });
});