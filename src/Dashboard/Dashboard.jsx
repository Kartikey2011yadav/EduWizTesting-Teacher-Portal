import './Dashboard.css';
import { useEffect } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import TestScheduleCard from '../Test Schedule Card/TestScheduleCard';
import SuccessModal from '../AlertModel/AlertModel';
import { useState } from 'react';

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false); // Modal open state
  const [modalMessage, setModalMessage] = useState(''); // Modal message
  const [isError, setIsError] = useState(false); // Modal error state
  // const navigate = useNavigate();
  // let scheduleTests;
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    document.title = 'Dashboard | EduWiz';
    const teacherID = localStorage.getItem('teacherID');

    if (teacherID) {
      axios
        .post('http://localhost:5000/teacher/getDetails', { teacherID })
        .then((response) => {
          // scheduleTests = response.data.scheduleTests;
          setModalMessage(response.data.message);
          setModalOpen(true); // Open modal
          setIsError(false); // It's a success
        })
        .catch((error) => {
          console.error(error);
          setModalMessage('Could not fetch Teacher Details');
          // setIsError(true); // It's an error
          // setModalOpen(true); // Open modal
        });
    } else {
      setModalMessage('Incorrect teacher ID');
      // setIsError(true); // It's an error
      // setModalOpen(true); // Open modal
    }
    fetchScheduledPapers();
  }, []);

  const [scheduledPapers, setScheduledPapers] = useState([]);

  const fetchScheduledPapers = async () => {
    const teacherId = localStorage.getItem('teacherId');

    if (!teacherId) {
      return;
    }
    console.log('Fetching scheduled papers for teacherId:', teacherId);
    try {
      const response = await axios.get('http://localhost:5000/paper/schedule', {
        headers: {
          'Content-Type': 'application/json',
          'teacher-Id': teacherId,
        },
      });
      console.log('Received scheduled papers:', response.data);
      setScheduledPapers(response.data);
    } catch (error) {
      console.error('Error fetching scheduled papers:', error);
    }
  };

  return (
    <div>
      <div>
        {/* Questions Table */}
        <div className="QUESTIONS_TABLE relative flex flex-col w-5/6 mx-auto  mt-8 rounded-lg shadow-3 shadow-slate-300">
          <h2 className=" relative text-[40px] bg-[#0369A1] text-white  font-bold px-3 rounded-t-lg">Questions</h2>
          <table className=" relative w-[95%] mx-auto text-center  table-fixed mt-5 mb-7">
            <thead className="QUESTIONS_TABLE_HEADER bg-[#F1F5F9] text-slate-600">
              <tr className="bg-[#ececec] dark:bg-[#1F2937]">
                <th>Level</th>
                <th>Questions</th>
              </tr>
            </thead>
            <tbody className=" text-slate-500">
              <tr>
                <td>1</td>
                <td>15</td>
              </tr>
              <tr>
                <td>1</td>
                <td>15</td>
              </tr>
              <tr>
                <td>1</td>
                <td>15</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/*test Paper Table */}
        <div className="TEST_PAPER_TABLE relative flex flex-col w-5/6 mx-auto  my-8 rounded-lg shadow-3 shadow-slate-300">
          <h2 className=" relative text-[40px] bg-[#0369A1] text-white  font-bold px-3 rounded-t-lg">Upcoming Tests</h2>

          <div className="relative w-[95%]  mx-auto my-7 flex flex-col gap-10">
            {scheduledPapers.length > 0 ? (
              scheduledPapers.map((test) => <TestScheduleCard key={test._id} test={test} />)
            ) : (
              <p>No scheduled tests found.</p>
            )}
          </div>
        </div>
      </div>
      <SuccessModal isOpen={modalOpen} onClose={closeModal} message={modalMessage} isError={isError} />
    </div>
  );
};

export default Dashboard;
