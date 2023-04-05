import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "tailwindcss/tailwind.css";

function DateSelector() {
    const [selectedDate, setSelectedDate] = useState(new Date());
  
    return (
      <div className=" w-52 pl-6 pr-4">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="appearance-none block w-full ring-2 ring-black ring-opacity-5 bg-white border border-gray-300 hover:border-gray-400 px-8 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        />
        {/* <div className="relative inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="fill-current h-4 w-4 text-white-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.707a1 1 0 0 0 0 1.414L8.586 12l-3.293 3.293a1 1 0 0 0 1.414 1.414l3.293-3.293 3.293 3.293a1 1 0 1 0 1.414-1.414L12.414 12l3.293-3.293a1 1 0 0 0-1.414-1.414L11 10.586l-3.293-3.293a1 1 0 0 0-1.414 0z"
            />
          </svg>
        </div> */}
      </div>
    );
  }

  export default DateSelector;
  