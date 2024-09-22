import './Dashboard.css';
import Sidebar from "../Sidebar/Sidebar";
import TeacherNavbar from '../Components/TeacherNavbar';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TestScheduleCard from '../Test Schedule Card/TestScheduleCard';


const Dashboard = () => {

    const navigate = useNavigate();
    let teacherName = '';
    let scheduleDate;
    let course;
    let subjectName;
    let duration;

    useEffect(() => {

        const teacherID = localStorage.getItem("teacherID");
        
        if (teacherID) {
            axios
              .post("http://localhost:5000/teacher/getDetails", { teacherID })
              .then((response) => {

                const res = JSON.stringify(response);
                teacherName = res.data.name;
                scheduleDate = res.data.scheduleDate;
                course = res.data.course;
                subjectName = res.data.subjectName;
                duration = res.data.duration;
              })
              .catch(() => {
                alert('Could not fetch Teacher data');
                // navigate("/teacher"); 
              });
          } else {
            alert('can not find teacher ID');
            navigate("/dashboard"); 
          }
    },[])


    // Data is not availble so using this name 
    teacherName = 'John Doe'

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

                        <TestScheduleCard date={scheduleDate} duration={duration} course={course} subjectName={subjectName} />
                        
                        <TestScheduleCard date={scheduleDate} duration={duration} course={course} subjectName={subjectName}/>

                    </div>
                    
                </div>
            </section>
        </section>
    )
}


export default Dashboard;