import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import 'tailwindcss/tailwind.css';

function DateSelector({ selected, setSelectedDate }) {
  return (
    <div className="w-52 pl-6 pr-4">
      <DatePicker
        selected={selected}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        className="appearance-none block w-full ring-2 ring-black ring-opacity-5 bg-white border border-gray-300 hover:border-gray-400 px-8 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
}

export default DateSelector;
