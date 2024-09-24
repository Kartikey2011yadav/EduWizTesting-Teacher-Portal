import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const UploadOmr = () => {
  const [students, setStudents] = useState([]);
  
  useEffect(() => {
    setStudents(dummyData);
  }, []);
  
  return (
    <div className="p-6 w-screen h-fit min-h-screen ">
      <h1 className="text-2xl font-bold mb-4">Upload OMR Sheets</h1>
      <Link
        to="/submit"
        className="mb-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
        Upload OMR
      </Link>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Roll No</th>
            <th className="border border-gray-300 px-4 py-2">File Link</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{student.name}</td>
              <td className="border border-gray-300 px-4 py-2">{student.rollNo}</td>
              <td className="border border-gray-300 px-4 py-2">
                <a
                  href={student.fileLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                  >
                  {student.fileLink}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UploadOmr;

// Dummy data for testing
export const dummyData = [
  { name: 'John Doe', rollNo: '101', fileLink: 'link-to-file-1' },
  { name: 'Jane Smith', rollNo: '102', fileLink: 'link-to-file-2' },
];