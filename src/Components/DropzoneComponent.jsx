import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';

function MyDropzone({ onFileDrop }) {
  const [uploadedFile, setUploadedFile] = useState(null); // State to store uploaded file

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length) {
      const file = acceptedFiles[0]; // Get the first file
      const formData = new FormData();
      formData.append('file', file); // Append the file to FormData

      // API call to the backend
      fetch('http://localhost:5000/teacher/upload', {
        method: 'POST',
        body: formData,
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('File upload failed');
        }
        return response.json();
      })
      .then(data => {
        console.log('Response from server:', data);
        setUploadedFile({ name: file.name, public_id: data.public_id }); // Store the uploaded file info
        onFileDrop(data); // Pass the response data to the parent component
      })
      .catch(error => {
        console.error('Error uploading the file:', error);
        onFileDrop({}); // Indicate failure
      });
    }
  }, [onFileDrop]);

  const cancelUpload = async () => {
    if (uploadedFile) {
      try {
        const response = await fetch('http://localhost:5000/teacher/remove-file', {
          method: 'POST',
          body: JSON.stringify({ public_id: uploadedFile.public_id }),
          headers: { 'Content-Type': 'application/json' },
        });
        const result = await response.json();
        console.log('File removed:', result);
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
    disabled: !!uploadedFile, // Disable dropzone if a file is uploaded
  });

  return (
    <div>
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-4 my-4 transition-colors 
                    ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
      >
        <input {...getInputProps()} />
        {uploadedFile ? (
          <p className="text-gray-700">Uploaded: {uploadedFile.name}</p>
        ) : isDragActive ? (
          <p className="text-blue-600">Drop the files here ...</p>
        ) : (
          <p className="text-gray-700">Drag n drop a file here, or click to select one</p>
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
