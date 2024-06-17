import React, { useEffect, useState } from 'react';
import { useTimetablePopup } from '../../contexts/TimetablePopupProvider';
import { useTimeblock } from '../../contexts/TimeblockProvider';
import { calculateDuration } from '../../utils/timetable';
import { TimeBlock } from '../../types/timetable';

function CreateTimeblock() {
  const { popupContent, closePopup } = useTimetablePopup();
  const { timeBlocks, setTimeBlocks } = useTimeblock();
  
  const [name, setName] = useState('');
  const [timeframes, setTimeframes] = useState([{ start: '', end: '', day: '' }]);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (popupContent) {
      const activityTimeBlocks = timeBlocks.filter(tb => tb.name === popupContent.name);
      const formattedTimeframes = activityTimeBlocks.map(tb => ({
        start: tb.startTime,
        end: tb.endTime,
        day: tb.day
      }));
      setName(popupContent.name);
      setTimeframes(formattedTimeframes);
      setErrors(new Array(formattedTimeframes.length).fill(''));
    }
  }, [popupContent, timeBlocks]);

  const handleAddTimeframe = () => {
    setTimeframes([...timeframes, { start: '', end: '', day: '' }]);
    setErrors([...errors, '']);
  };

  const handleRemoveTimeframe = (index: number) => {
    const newTimeframes = timeframes.filter((_, i) => i !== index);
    const newErrors = errors.filter((_, i) => i !== index);
    setTimeframes(newTimeframes);
    setErrors(newErrors);
  };

  const handleTimeframeChange = (index: number, key: string, value: string) => {
    const newTimeframes = timeframes.map((timeframe, i) =>
      i === index ? { ...timeframe, [key]: value } : timeframe
    );
  
    const { start, end } = newTimeframes[index];
    let errorMessage = '';
  
    if (start && end && start >= end) {
      errorMessage = 'End time must be after start time';
    }
  
    const newErrors = newTimeframes.map((tf, i) => {
      if (i === index) {
        if (tf.start && tf.end && tf.start >= tf.end) {
          return 'End time must be after start time';
        }
        return '';
      }
      return errors[i] || '';
    });
  
    setTimeframes(newTimeframes);
    setErrors(newErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const hasErrors = errors.some((error) => error !== '');
    if (hasErrors) {
      alert('Please correct the errors before submitting.');
      return;
    }

    // Remove original time frames if editing
    if (popupContent) {
      const filteredTimeBlocks = timeBlocks.filter(tb => tb.name !== popupContent.name);
      setTimeBlocks(filteredTimeBlocks);
    }

    // Add new or edited time blocks
    const newTimeBlocks = timeframes.map((tf, index) => ({
      id: (timeBlocks.length + index).toString(),
      name: name,
      startTime: tf.start,
      endTime: tf.end,
      duration: calculateDuration(tf.start, tf.end),
      day: tf.day,
    }));
    setTimeBlocks(prevTimeBlocks => [...prevTimeBlocks, ...newTimeBlocks]);

    closePopup()
  };

  const hourOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        {timeframes.map((timeframe, index) => (
          <div key={index} className="space-y-2 border p-2 rounded-md">
            <div className="flex justify-between">
              <div className="flex-1 mr-2">
                <label className="block text-sm font-medium text-gray-700">
                  Start Time
                </label>
                <select
                  value={timeframe.start}
                  onChange={(e) =>
                    handleTimeframeChange(index, 'start', e.target.value)
                  }
                  className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select start time</option>
                  {hourOptions.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1 ml-2">
                <label className="block text-sm font-medium text-gray-700">
                  End Time
                </label>
                <select
                  value={timeframe.end}
                  onChange={(e) =>
                    handleTimeframeChange(index, 'end', e.target.value)
                  }
                  className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select end time</option>
                  {hourOptions.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {errors[index] && (
              <p className="text-red-500 text-sm mt-2">{errors[index]}</p>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Day
              </label>
              <select
                value={timeframe.day}
                onChange={(e) =>
                  handleTimeframeChange(index, 'day', e.target.value)
                }
                className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select a day</option>
                <option value="Sun">Sunday</option>
                <option value="Mon">Monday</option>
                <option value="Tue">Tuesday</option>
                <option value="Wed">Wednesday</option>
                <option value="Thu">Thursday</option>
                <option value="Fri">Friday</option>
                <option value="Sat">Saturday</option>
              </select>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveTimeframe(index)}
              className="mt-2 text-sm text-red-500 hover:text-red-700"
            >
              Remove Timeframe
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddTimeframe}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Add Timeframe
        </button>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-700"
          disabled={errors.some((error) => error !== '')}
        >
          {popupContent ? 'Save' : 'Create'}
        </button>
      </form>
    </div>
  );
}

export default CreateTimeblock;
