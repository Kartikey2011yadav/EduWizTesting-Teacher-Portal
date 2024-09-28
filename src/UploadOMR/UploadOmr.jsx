import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UploadOmr = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/paper/omr-sheets');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    console.log(students);
  }, [students]);

  return (
    <div className="lg:p-6 w-full h-fit min-h-screen">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Upload OMR Sheets</h1>
        <Link to="/submit" className="mb-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Upload OMR
        </Link>
      </div>
      <div
        className={`max-w-full mx-auto mt-10 p-1 lg:p-6 bg-container-light dark:bg-container-dark shadow-[0px_0px_10px_#00000059;] dark:shadow-[0px_0px_10px_#ffffff7a;] rounded-lg transition-all duration-500}`}
      >
        <div className="flex  px-3 pt-3 items-center gap-4">
          <div className="w-2/5  lg:text-2xl font-bold mb-2">Student Name</div>
          <div className="lg:w-[55%]  w-2/5 lg:text-2xl font-bold mb-2 flex items-center justify-start">
            Student Roll No
          </div>
          <div className="lg:w-[5%] w-1/5 lg:text-2xl font-bold mb-2 flex items-start justify-start">Link </div>
        </div>
        {students.map((student) => (
          <div
            key={student.rollNo}
            className="flex w-full font-normal text-base px-3 py-2 bg-slate-200 dark:bg-input-dark dark:text-white  border-none rounded-md dark:placeholder:text-white  focus:outline-none focus:ring-1 focus:ring-primary appearance-none leading-tight focus:shadow-outline items-center gap-4 my-4"
          >
            <div className="w-2/5  flex items-center justify-start">{student.studentName}</div>
            <div className="lg:w-[55%] w-2/5 flex items-center justify-start">{student.studentRollNo}</div>
            <div className="lg:w-[5%] w-1/5 flex items-center justify-start">
              <a
                href={student.fileLink}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-wrap hover:underline"
              >
                View OMR
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadOmr;
