import PropTypes from "prop-types";
import './TestScheduleCard.css';


const TestScheduleCard = (props) => {

    return (
        <div className='TEST_CARD relative w-full flex flex-col gap-1'>
            {/* buttons */}
            <div className=' TEST_CARD_BUTTONS relative flex justify-end gap-2 text-white font-thin'>
                <button className='TEST_CARD_BUTTON_EDDIT bg-[#1E293B] rounded-md px-3 py-1 '>Eddit</button>
                <button className='TEST_CARD_BUTTON_DUPLICATE bg-[#1E293B] rounded-md px-3 py-1 '>Duplicate</button>
                <button className='TEST_CARD_BUTTON_DELETE bg-[#FF2121] rounded-md px-3 py-1 '>Delete</button>
            </div>
            {/* main content */}
            <div className='TEST_CARD_BOX relative flex justify-between px-6 py-3 w-full rounded-md bg-[#1E293B]'>
                {/* info */}
                <div className="TEST_CARD_DETAILS relative flex flex-col">
                    <p className='TEST_CARD_DETAILS_COURSE text-white font-bold text-[20px]'>Course Name: {props.course}</p>
                    <p className='TEST_CARD_DETAILS_SMALL text-slate-200 text-[14px]'>Duration: {`${props.duration}`}</p>
                    <p className='TEST_CARD_DETAILS_SMALL text-slate-200 text-[14px]'>Subject: {props.subject}</p>
                </div>
                <p className=' relative text-[#FF2121] font-semibold'>Scheduled on: {props.scheduleDate}</p>
            </div>
        </div>
    )
}

TestScheduleCard.propTypes = {
    duration: PropTypes.number.isRequired,
    subject: PropTypes.string.isRequired,
    course: PropTypes.string.isRequired,
    scheduleDate: PropTypes.instanceOf(Date).isRequired,
  };
  

export default TestScheduleCard;