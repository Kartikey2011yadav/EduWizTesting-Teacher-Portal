import './Dashboard.css';
import Sidebar from "../Sidebar/Sidebar";
import TeacherNavbar from '../Components/TeacherNavbar';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {

    const navigate = useNavigate();
    let teacherName = '';

    useEffect(() => {

        const teacherID = localStorage.getItem("teacherID");
        
        if (teacherID) {
            axios
              .post("http://localhost:5000/teacher/getDetails", { teacherID })
              .then((response) => {

                const res = JSON.stringify(response);
                teacherName = res.data.name;
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
                        <thead className=" bg-[#F1F5F9] text-slate-600">
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
                <div className="TEST_PAPER_TABLE relative flex flex-col w-5/6 mx-auto  mt-8 rounded-lg shadow-3 shadow-slate-300">
                    <h2 className=" relative text-[40px] bg-[#0369A1] text-white  font-bold px-3 rounded-t-lg">Upcoming Tests</h2>

                    <div className='relative w-[95%]  mx-auto my-7 flex flex-col gap-10'>

                        <div className='TEST_CARD relative w-full flex flex-col gap-1'>
                            {/* buttons */}
                            <div className=' TEST_CARD_BUTTON relative flex justify-end gap-2'>
                                <button className=' bg-[#1E293B] rounded-md px-2 text-white'>Eddit</button>
                                <button className=' bg-[#1E293B] rounded-md px-2 text-white'>Duplicate</button>
                                <button className=' bg-[#FF2121] rounded-md px-2 text-white'>Delete</button>
                            </div>
                            {/* main content */}
                            <div className=' relative flex justify-between px-6 py-3 w-full bg-[#1E293B]'>
                                {/* info */}
                                <div>
                                    <p className=' text-white font-bold text-[20px]'>MTECH 7th Sem</p>
                                    <p className=' text-slate-200 text-[14px]'>Duration: </p>
                                    <p className=' text-slate-200 text-[14px]'>Marks:</p>
                                </div>
                                <p className=' relative text-[#FF2121]'>Scheduled on: September 19, 2024 at 6 PM</p>
                            </div>
                        </div>
                        
                        <div className='TEST_CARD relative w-full flex flex-col gap-1'>
                            {/* buttons */}
                            <div className=' TEST_CARD_BUTTON relative flex justify-end gap-2'>
                                <button className=' bg-[#1E293B] rounded-md px-2 text-white'>Eddit</button>
                                <button className=' bg-[#1E293B] rounded-md px-2 text-white'>Duplicate</button>
                                <button className=' bg-[#FF2121] rounded-md px-2 text-white'>Delete</button>
                            </div>
                            {/* main content */}
                            <div className=' relative flex justify-between px-6 py-3 w-full bg-[#1E293B]'>
                                {/* info */}
                                <div>
                                    <p className=' text-white font-bold text-[20px]'>MTECH 7th Sem</p>
                                    <p className=' text-slate-200 text-[14px]'>Duration: </p>
                                    <p className=' text-slate-200 text-[14px]'>Marks:</p>
                                </div>
                                <p className=' relative text-[#FF2121]'>Scheduled on: September 19, 2024 at 6 PM</p>
                            </div>
                        </div>
                        <div className='TEST_CARD relative w-full flex flex-col gap-1'>
                            {/* buttons */}
                            <div className=' TEST_CARD_BUTTON relative flex justify-end gap-2'>
                                <button className=' bg-[#1E293B] rounded-md px-2 text-white'>Eddit</button>
                                <button className=' bg-[#1E293B] rounded-md px-2 text-white'>Duplicate</button>
                                <button className=' bg-[#FF2121] rounded-md px-2 text-white'>Delete</button>
                            </div>
                            {/* main content */}
                            <div className=' relative flex justify-between px-6 py-3 w-full bg-[#1E293B]'>
                                {/* info */}
                                <div>
                                    <p className=' text-white font-bold text-[20px]'>MTECH 7th Sem</p>
                                    <p className=' text-slate-200 text-[14px]'>Duration: </p>
                                    <p className=' text-slate-200 text-[14px]'>Marks:</p>
                                </div>
                                <p className=' relative text-[#FF2121]'>Scheduled on: September 19, 2024 at 6 PM</p>
                            </div>
                        </div>

                    </div>
                    
                </div>
            </section>
        </section>
    )
}


export default Dashboard;