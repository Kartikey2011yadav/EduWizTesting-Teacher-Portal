import './Dashboard.css';
import Sidebar from "../Sidebar/Sidebar";
import TeacherNavbar from '../Components/TeacherNavbar';
import { useEffect } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import TestScheduleCard from '../Test Schedule Card/TestScheduleCard';
import SuccessModal from '../AlertModel/AlertModel';
import { useState } from 'react';


const Dashboard = () => {
    const [modalOpen, setModalOpen] = useState(false); // Modal open state
    const [modalMessage, setModalMessage] = useState(""); // Modal message
    const [isError, setIsError] = useState(false); // Modal error state
    // const navigate = useNavigate();


    //Variables to pass into components 
    //like dashboardNavbar and Test Cards
    let teacherName = '';
    let scheduleTests;
    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {

        const teacherID = localStorage.getItem("teacherID");
        
        if (teacherID) {
            axios
              .post("http://localhost:5000/teacher/getDetails", { teacherID })
              .then((response) => {
                teacherName = response.data.name;
                scheduleTests = response.data.scheduleTests;
                setModalMessage(response.data.message);
                setModalOpen(true); // Open modal
                setIsError(false); // It's a success
              })
              .catch((error) => {
                console.error(error);
                setModalMessage("Could not fetch Teacher Details");
                setIsError(true); // It's an error
                setModalOpen(true); // Open modal
              });
          } else {
            setModalMessage("Incorrect teacher ID");
            setIsError(true); // It's an error
            setModalOpen(true); // Open modal
            
        }
    },[])


    // Data is not availble so using this sample data 
    teacherName = 'John Doe'
    scheduleTests = [
        {
            id: 0,
            course : 'MTech',
            duration : '1hr',
            subject : 'Maths 2',
            scheduleDate: new Date(2024, 8, 21, 10, 30)
        },
        {
            id: 1,
            course : 'MTech',
            duration : '1hr',
            subject : 'Maths 2',
            scheduleDate: new Date(2024, 8, 21, 10, 30)
        },
    ]

    return(
        <section className="DASHBOARD flex flex-row h-screen w-screen ">
            <div className=' sticky'>
            <Sidebar />
            </div>
            <section className="DASH_BOARD_SECTION  w-full flex flex-col bg-[#F8FAFC] overflow-y-scroll">

                {/* Teacher Navbar */}
                <TeacherNavbar name={teacherName}/>

                {/* Questions Table */}
                <div className="QUESTIONS_TABLE relative flex flex-col w-5/6 mx-auto  mt-8 rounded-lg shadow-3 shadow-slate-300">
                    <h2 className=" relative text-[40px] bg-[#0369A1] text-white  font-bold px-3 rounded-t-lg">Questions</h2>
                    <table className=" relative w-[95%] mx-auto text-center  table-fixed mt-5 mb-7">
                        <thead className="QUESTIONS_TABLE_HEADER bg-[#F1F5F9] text-slate-600">
                            <tr >
                                <th>Level</th>
                                <th>Questions</th>
                            </tr>
                        </thead>
                        <tbody className=' text-slate-500'>
                            <tr >
                                <td>1</td>
                                <td>15</td>
                            </tr>
                            <tr >
                                <td>1</td>
                                <td>15</td>
                            </tr>
                            <tr >
                                <td>1</td>
                                <td>15</td>
                            </tr>
                        </tbody>
                    </table>
                </div>


                {/*test Paper Table */}
                <div className="TEST_PAPER_TABLE relative flex flex-col w-5/6 mx-auto  my-8 rounded-lg shadow-3 shadow-slate-300">
                    <h2 className=" relative text-[40px] bg-[#0369A1] text-white  font-bold px-3 rounded-t-lg">Upcoming Tests</h2>

                    <div className='relative w-[95%]  mx-auto my-7 flex flex-col gap-10'>

                        {
                            scheduleTests.map((test) => (
                                <TestScheduleCard key={test.id} test={test} />
                            ))
                        }

                    </div>
                    
                </div>
            </section>
            <SuccessModal
                isOpen={modalOpen}
                onClose={closeModal}
                message={modalMessage}
                isError={isError}
            />
        </section>
    )
}


export default Dashboard;