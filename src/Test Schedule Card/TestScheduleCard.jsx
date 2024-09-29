import PropTypes from 'prop-types';
import './TestScheduleCard.css';
import { FaEdit, FaCopy, FaTrash } from 'react-icons/fa';
import { useState } from 'react';

const TestScheduleCard = (props) => {
  console.log(props);
  const [hover, setHover] = useState(false);

  // const formattedDate = new Date(props.test.scheduleDate).toLocaleString();

  return (
    <div
      className="TEST_CARD relative w-full flex flex-col gap-1 mt-1"
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      {/* buttons */}
      {hover ? (
        <div className=" TEST_CARD_BUTTONS relative flex justify-end gap-2 text-white font-thin">
          <button className="TEST_CARD_BUTTON_EDDIT bg-[#1E293B] rounded-md px-3 py-1 flex items-center gap-1">
            <FaEdit /> Edit
          </button>
          <button className="TEST_CARD_BUTTON_DUPLICATE bg-[#1E293B] rounded-md px-3 py-1 flex items-center gap-1">
            <FaCopy /> Duplicate
          </button>
          <button className="TEST_CARD_BUTTON_DELETE bg-[#FF2121] rounded-md px-3 py-1 flex items-center gap-1">
            <FaTrash /> Delete
          </button>
        </div>
      ) : (
        <></>
      )}
      {/* main content */}
      <div className="TEST_CARD_BOX relative flex justify-between px-6 py-3 w-full rounded-md border-l-4 border-[#0EA5E9] bg-[#F1F5F9]">
        {/* info */}
        <div className="TEST_CARD_DETAILS relative flex flex-col">
          <p className="TEST_CARD_DETAILS_COURSE text-[#1E293B] font-bold text-[20px]">
            Course Name: {props.test.className}
          </p>
          <p className="TEST_CARD_DETAILS_SMALL text-[#1E293B] text-[14px]">
            Duration: {`${props.test.duration.hours}`} hour {`${props.test.duration.minutes}`} minutes
          </p>
          <p className="TEST_CARD_DETAILS_SMALL text-[#1E293B] text-[14px]">Subject: {props.test.subject}</p>
        </div>
        <p className=" relative text-[#FF2121] font-semibold">Scheduled on: {props.test.date}</p>
      </div>
    </div>
  );
};

TestScheduleCard.propTypes = {
  test: PropTypes.shape({
    className: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    // scheduleDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
  }).isRequired,
};

export default TestScheduleCard;
