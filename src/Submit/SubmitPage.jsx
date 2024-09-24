import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyData } from '../UploadOMR/UploadOmr';
import MyDropzone from '../Components/DropzoneComponent';



const SubmitPage = () => {
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [filelink, setFilelink] = useState(null);
  const navigate = useNavigate();
  const [setUploadedFileUrl] = useState(null);
  const [ setUploadError] = useState(null);

  const handleFileDrop = (data) => {
    setFilelink(data);
    if (data.url) {
      setUploadedFileUrl(data.url);
      setUploadError(null);
    } else {
      setUploadError('File upload failed, please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('rollNo', rollNo);
    formData.append('file', filelink);
    dummyData.push({ name, rollNo, fileLink: filelink.name });
    // Example API call (replace with your actual API)
    // await api.post('/upload', formData);

    navigate('/');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Submit OMR Sheet</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <MyDropzone onDrop={handleFileDrop}>
          {({ getRootProps, getInputProps }) => (
            <section className="dropzone">
              <div
                {...getRootProps()}
                className="border-dashed border-2 border-gray-300 p-4 text-center rounded hover:bg-gray-100 cursor-pointer"
              >
                <input {...getInputProps()} />
                <p>Drag n drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </MyDropzone>
        <div>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 text-black rounded p-2"
            />
          </label>
        </div>
        <div>
          <label className="block mb-2">
            Roll No:
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded p-2 text-black"
            />
          </label>
        </div>
        <button
          type="submit" onSubmit={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmitPage;
