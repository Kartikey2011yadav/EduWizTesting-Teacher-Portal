import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';

const SchedulePaper = () => {
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const subjects = ['Math', 'Science', 'History', 'English', 'Computer Science'];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      className,
      subject,
      marks,
      duration,
      date,
      time,
    });
  };

  return (
    <div className={`max-w-lg mx-auto mt-10 p-6 bg-container-light dark:bg-container-dark shadow-md rounded-lg transition-all duration-500}`}>
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-left dark:text-white text-primary">Schedule a Paper</h2>

      </div>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Class Name Input */}
        <div className='flex justify-start items-center'>
          <label className="block dark:text-white text-wrap w-full font-semibold">Class Name</label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="w-full px-3 py-2  border-none rounded-md shadow-md focus:outline-none focus:ring-1 focus:ring-primary appearance-none text-gray-700 dark:text-black  leading-tight focus:shadow-outline"
            placeholder="Enter class"
          />
        </div>

        {/* Subject Dropdown */}
        <div className='flex justify-start items-center text-[#cccacd] dark:text-[#cccacd]'>
          <label className="block w-full text-[#000] dark:text-white font-semibold mb-1">Subject</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 border-none rounded-md shadow-md text-graydark focus:outline-none focus:ring-1 focus:ring-primary appearance-none leading-tight focus:shadow-outline"
          >
            <option value="" disabled >
              --Select a subject--
            </option>
            {subjects.map((subj, index) => (
              <option key={index} value={subj} className="text-black">
                {subj}
              </option>
            ))}
          </select>
        </div>

        {/* Marks Input */}
        <div className='flex justify-start items-center'>
          <label className="block w-full text-gray-700  font-semibold mb-1">Marks</label>
          <input
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            className="w-full px-3 py-2 border-none  rounded-md shadow-md focus:outline-none focus:ring-1 focus:ring-primary appearance-none dark:text-black  leading-tight focus:shadow-outline"
            placeholder="Enter marks"
          />
        </div>

        {/* Duration Input */}
        <div className='flex justify-start items-center'>
          <label className="block w-full  font-semibold mb-1">Duration (in minutes)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-3 py-2  border-none rounded-md shadow-md focus:outline-none focus:ring-1 focus:ring-primary appearance-none dark:text-black  leading-tight focus:shadow-outline"
            placeholder="Enter duration"
          />
        </div>

        {/* Date Picker */}
        <div className='flex justify-start items-center'>
          <label className="block w-full  font-semibold mb-1">Date</label>
          <div className='w-full  dark:bg-white rounded-md'>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={date}
                onChange={(newDate) => setDate(newDate)}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                  <div className="  relative">
                    <input
                      ref={inputRef}
                      {...inputProps}
                      className="w-full px-3 py-2 border-none text-black rounded-md shadow-md focus:outline-none focus:ring-1 focus:ring-primary appearance-none text-gray-700 dark:text-black leading-tight focus:shadow-outline"
                    />
                    <span className="absolute  right-3 top-2">{InputProps?.endAdornment}</span>
                  </div>
                )}
              />
            </LocalizationProvider>
          </div>
        </div>

        {/* Time Picker */}
        <div className='flex justify-start items-center'>
          <label className="block w-full text-gray-700 dark:text-gray-300 font-semibold mb-1">Time</label>
          <div className='w-full dark:bg-white rounded-md'>
            <LocalizationProvider dateAdapter={AdapterDateFns} >
              <TimePicker
                ampm
                value={time}
                onChange={(newTime) => setTime(newTime)}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                  <div className="relative w-full">
                    <input
                      ref={inputRef}
                      {...inputProps}
                      className="w-full px-3 py-2 border-none  rounded-md shadow-md focus:outline-none focus:ring-1 focus:ring-primary appearance-none text-gray-700 dark:text-black leading-tight focus:shadow-outline"
                    />
                    <span className="absolute right-3 top-2">{InputProps?.endAdornment}</span>
                  </div>
                )}
              />
            </LocalizationProvider>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary-light dark:bg-primary-dark hover:bg-hover-light dark:hover:bg-hover-dark transition text-white font-bold py-2 px-4 rounded-md"
        >
          Schedule Paper
        </button>
      </form>
    </div>
  );
};

export default SchedulePaper;