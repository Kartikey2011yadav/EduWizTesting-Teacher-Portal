import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyDropzone from '../Components/DropzoneComponent';

const SubmitPage = () => {
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [filelink, setFilelink] = useState(null); // To store file URL
  const navigate = useNavigate();
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null); // Store URL from Dropzone
  const [uploadError, setUploadError] = useState(null); // Handle any upload errors

  const handleFileDrop = (data) => {
    if (data.url) {
      setFilelink(data.url); // Set the URL of the uploaded file
      setUploadedFileUrl(data.url); // Store the URL for further use
      setUploadError(null);
    } else {
      setUploadError('File upload failed, please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle the form submission logic
    if (!uploadedFileUrl) {
      setUploadError('Please upload a file before submitting.');
      return;
    }

    const formData = {
      studentName: name,
      studentRollNo: rollNo,
      fileLink: filelink, // Use the file URL obtained from MyDropzone
    };

    const response = await fetch('http://localhost:5000/paper/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      setUploadError('Submission failed. Please try again.');
      return;
    }

    navigate('/upload-omr');
  };

  useEffect(() => {
    document.title = 'Submit';
  }, []);
  return (
    <div
      className={`max-w-xl mx-auto mt-10 p-6 bg-container-light dark:bg-container-dark shadow-[0px_0px_10px_#00000059;] dark:shadow-[0px_0px_10px_#ffffff7a;] rounded-lg transition-all duration-500}`}
    >
      <h1 className="text-2xl font-bold mb-4">Submit OMR Sheet</h1>
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-3">
        <div>
          <div className="flex justify-between mb-7">
            <div className="w-[48%]">
              <label className="flex flex-col gap-3 dark:text-white text-wrap text-lg w-full font-semibold">
                Name:
                <input
                  type="text"
                  value={name}
                  placeholder="Enter Student name"
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full font-normal text-base px-3 py-2 bg-slate-200 dark:bg-input-dark dark:text-white  border-none rounded-md dark:placeholder:text-white  focus:outline-none focus:ring-1 focus:ring-primary appearance-none leading-tight focus:shadow-outline"
                />
              </label>
            </div>
            <div className="w-[48%]">
              <label className="flex flex-col gap-3 dark:text-white text-lg w-full font-semibold">
                Roll No:
                <input
                  type="text"
                  value={rollNo}
                  placeholder="Enter Student roll number"
                  onChange={(e) => setRollNo(e.target.value)}
                  required
                  className="w-full font-normal text-base px-3 py-2 bg-slate-200 dark:bg-input-dark dark:text-white  border-none rounded-md dark:placeholder:text-white  focus:outline-none focus:ring-1 focus:ring-primary appearance-none leading-tight focus:shadow-outline"
                />
              </label>
            </div>
          </div>
          <div>
            <label className="flex flex-col gap-3 dark:text-white text-wrap text-lg w-full font-semibold">
              Upload OMR Sheet:
              <MyDropzone onFileDrop={handleFileDrop} /> {/* Pass the handleFileDrop function */}
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-primary-light dark:bg-primary-dark hover:bg-hover-light dark:hover:bg-hover-dark transition text-white font-bold py-2 px-4 rounded-md"
        >
          Submit
        </button>
        {uploadError && (
          <p className="text-red-500">{uploadError}</p> // Display error if file upload fails
        )}
      </form>
    </div>
  );
};

export default SubmitPage;
