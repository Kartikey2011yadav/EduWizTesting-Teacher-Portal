import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';

function MyDropzone({ onFileDrop }) {
  const [uploadedFile, setUploadedFile] = useState(null); // State to store uploaded file
  const [previewUrl, setPreviewUrl] = useState(null); // State to store preview URL
  const [isUploading, setIsUploading] = useState(false); // State to track uploading status

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length) {
        const file = acceptedFiles[0]; // Get the first file
        const formData = new FormData();
        formData.append('file', file); // Append the file to FormData

        // Create a local URL for the image preview
        if (file.type.startsWith('image/')) {
          setPreviewUrl(URL.createObjectURL(file)); // Set image preview URL
        }

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
            return response.json();
          })
          .then((data) => {
            console.log('Response from server:', data);
            setUploadedFile({ name: file.name, public_id: data.public_id }); // Store the uploaded file info
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
    <div className="flex flex-col h-fit w-full gap-6 items-center">
      <div
        {...getRootProps()}
        className={`flex flex-col text-center w-full px-3 py-2 dark:bg-input-dark dark:text-white dark:shadow-white/10 border-none rounded-md shadow-md text-graydark focus:outline-none focus:ring-1 focus:ring-primary appearance-none leading-tight focus:shadow-outline items-center justify-center cursor-pointer
                    ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <p className="text-graydark dark:text-[#949a9f]">Uploading, please wait...</p>
        ) : uploadedFile ? (
          <p className="text-graydark dark:text-[#949a9f]">Uploaded: {uploadedFile.name}</p>
        ) : isDragActive ? (
          <p className="text-blue-600">Drop the files here ...</p>
        ) : (
          <p className="text-graydark dark:text-[#949a9f]">
            Click to select Files to upload or drag and drop files here
          </p>
        )}
        {previewUrl && (
          <div className="my-4">
            <img src={previewUrl} alt="Preview" className="w-48 h-48 object-contain rounded" />
          </div>
        )}
      </div>
      {uploadedFile && (
        <button onClick={cancelUpload} className="bg-red-500  text-white px-4 py-2 rounded">
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
