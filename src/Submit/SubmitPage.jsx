import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyData } from "../UploadOMR/UploadOmr";
import MyDropzone from "../Components/DropzoneComponent";

const SubmitPage = () => {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [filelink, setFilelink] = useState(null);
  const navigate = useNavigate();
  const [setUploadedFileUrl] = useState(null);
  const [setUploadError] = useState(null);

  const handleFileDrop = (data) => {
    setFilelink(data);
    if (data.url) {
      setUploadedFileUrl(data.url);
      setUploadError(null);
    } else {
      setUploadError("File upload failed, please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("rollNo", rollNo);
    formData.append("file", filelink);
    dummyData.push({ name, rollNo, fileLink: filelink.name });
    // Example API call (replace with your actual API)
    // await api.post('/upload', formData);

    navigate("/");
  };

  return (
    <div
      className="
    max-w-xl mx-auto mt-10 p-6 bg-container-light dark:bg-container-dark shadow-md rounded-lg transition-all duration-500"
    >
      <h1 className="text-2xl font-bold mb-4">Submit OMR Sheet</h1>
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-3">
        <div>
          <div className="flex justify-between my-7">
            <div className="w-[48%]">
              <label className="flex flex-col gap-3 dark:text-white text-wrap text-lg w-full font-semibold">
                Name:
                <input
                  type="text"
                  value={name}
                  placeholder="Enter Student name"
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 dark:bg-input-dark dark:text-white dark:shadow-white/10 border-none rounded-md shadow-md text-graydark focus:outline-none focus:ring-1 focus:ring-primary appearance-none leading-tight focus:shadow-outline"
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
                  className="w-full px-3 py-2 dark:bg-input-dark dark:text-white dark:shadow-white/10 border-none rounded-md shadow-md text-graydark focus:outline-none focus:ring-1 focus:ring-primary appearance-none leading-tight focus:shadow-outline"
                />
              </label>
            </div>
          </div>
          <div>
            <label className="flex flex-col gap-3 dark:text-white text-wrap text-lg w-full font-semibold">
              Upload OMR Sheet:
              <MyDropzone onDrop={handleFileDrop}>
                {({ getRootProps, getInputProps }) => (
                  <section className="dropzone">
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>
                        Drag n drop some files here, or click to select files
                      </p>
                    </div>
                  </section>
                )}
              </MyDropzone>
            </label>
          </div>
        </div>
        <button
          type="submit"
          onSubmit={handleSubmit}
          className="w-full bg-primary-light dark:bg-primary-dark hover:bg-hover-light dark:hover:bg-hover-dark transition text-white font-bold py-2 px-4 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmitPage;
