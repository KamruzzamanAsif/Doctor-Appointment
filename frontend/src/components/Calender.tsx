import React, { useState } from 'react';

interface CalendarProps {
  onDateChange: (year: number, month: number) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDateChange }) => {
  const [selectedYear, setSelectedYear] = useState<number>(2021);
  const [selectedMonth, setSelectedMonth] = useState<number>(1); // January is 1, December is 12

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value, 10);
    setSelectedYear(year);
    onDateChange(year, selectedMonth);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const month = parseInt(event.target.value, 10);
    setSelectedMonth(month);
    onDateChange(selectedYear, month);
  };

  return (
    <div className="max-w-md mx-auto mt-5 p-4 border rounded shadow-md bg-white flex items-center">
      <div className="mr-4 flex items-center">
        <label className="text-sm font-semibold mr-2" htmlFor="year">
          Select Year:
        </label>
        <select
          id="year"
          className="p-2 border rounded"
          value={selectedYear}
          onChange={handleYearChange}
        >
          {Array.from({ length: 3 }, (_, index) => 2019 + index).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center">
        <label className="text-sm font-semibold mr-2" htmlFor="month">
          Select Month:
        </label>
        <select
          id="month"
          className="p-2 border rounded"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
            <option key={month} value={month}>
              {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

};

export default Calendar;
