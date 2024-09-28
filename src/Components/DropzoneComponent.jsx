import { IoCloudUploadOutline } from 'react-icons/io5'; // Import the icon
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';

function MyDropzone({ onFileDrop }) {
  const [uploadedFile, setUploadedFile] = useState(null); // State to store uploaded file
  const [previewUrl, setPreviewUrl] = useState(null); // State to store preview URL from cloud
  const [isUploading, setIsUploading] = useState(false); // State to track uploading status

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length) {
        const file = acceptedFiles[0]; // Get the first file
        const formData = new FormData();
        formData.append('file', file); // Append the file to FormData

        setIsUploading(true); // Set uploading state to true

        // API call to the backend
        fetch('http://localhost:5000/paper/upload', {
          method: 'POST',
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('File upload failed');
            }
            return response.json(); // Assume the server responds with { secure_url: '...' }
          })
          .then((data) => {
            console.log('Response from server:', data);
            setUploadedFile({ name: file.name, public_id: data.public_id }); // Store the uploaded file info
            setPreviewUrl(data.url); // Use the secure URL from Cloudinary (or any cloud provider)
            onFileDrop(data); // Pass the response data to the parent component
          })
          .catch((error) => {
            console.error('Error uploading the file:', error);
            onFileDrop({}); // Indicate failure
          })
          .finally(() => {
            setIsUploading(false); // Set uploading state to false after the upload is finished
          });
      }
    },
    [onFileDrop]
  );

  const cancelUpload = async () => {
    if (uploadedFile) {
      try {
        const response = await fetch('http://localhost:5000/paper/remove-file', {
          method: 'POST',
          body: JSON.stringify({ public_id: uploadedFile.public_id }),
          headers: { 'Content-Type': 'application/json' },
        });
        const result = await response.json();
        console.log('File removed:', result);

        // Reset the preview and uploaded file states
        setPreviewUrl(null); // Clear the preview URL
        setUploadedFile(null); // Clear the uploaded file state
        onFileDrop({}); // Notify parent of removal
      } catch (error) {
        console.error('Error removing file:', error);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false, // Prevent multiple file uploads
    disabled: !!uploadedFile || isUploading, // Disable dropzone if a file is uploaded or uploading
  });

  return (
    <div className="flex flex-col h-fit min-h-28 w-full gap-6 items-center">
      <div
        {...getRootProps()}
        className={`flex flex-col text-center w-full min-h-39 px-3 py-2 dark:bg-input-dark dark:text-white border-none rounded-md text-graydark focus:outline-none focus:ring-1 focus:ring-primary appearance-none leading-tight focus:shadow-outline bg-slate-200 items-center justify-center cursor-pointer
                    ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
      >
        <input {...getInputProps()} />

        {isUploading ? (
          <p className="text-graydark text-base font-normal dark:text-[#949a9f]">Uploading, please wait...</p>
        ) : uploadedFile ? (
          <p className="text-graydark text-base font-normal dark:text-[#949a9f]">Uploaded: {uploadedFile.name}</p>
        ) : isDragActive ? (
          <p className="text-blue-600">Drop the files here ...</p>
        ) : (
          <div className="flex flex-col items-center justify-center">
            {/* Use the IoCloudUploadOutline icon */}
            <IoCloudUploadOutline className="text-[#949a9f] dark:text-[#ffffff] w-12 h-12" />

            {/* Text below the icon */}
            <p className="mt-2 text-[#949a9f] text-base font-normal dark:text-[#ffffff]">
              Click to select files to upload or drag and drop files here
            </p>
          </div>
        )}

        {previewUrl && (
          <div className="my-4">
            <img src={previewUrl} alt="Preview" className="w-48 h-48 object-contain rounded" />
          </div>
        )}
      </div>

      {uploadedFile && (
        <button onClick={cancelUpload} className="bg-red-500 text-white px-4 py-2 rounded">
          Cancel Upload
        </button>
      )}
    </div>
  );
}

// PropTypes validation
MyDropzone.propTypes = {
  onFileDrop: PropTypes.func.isRequired,
};

export default MyDropzone;
