// import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import './Model.css'; 
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx"; 

const SuccessModal = ({ isOpen, onClose, message, isError, isConfirm, onConfirm }) => {
  const image = isError ? <RxCrossCircled className='cross-logo' /> : <IoMdCheckmarkCircleOutline className='correct-logo' />;

  const handleClose = () => {
    if (onConfirm) {
      onConfirm(); 
    }
    onClose(); 
  };

  const handleConfirmClose = () => {
    onClose(); 
  };

  const buttonColor = isError ? '#dc2626' : '#059669'; 

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Success Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {isConfirm ? (
          <svg className="modal-icon" fill="#ffe438" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
            <path d="M960 0c530.193 0 960 429.807 960 960s-429.807 960-960 960S0 1490.193 0 960 429.807 0 960 0Zm-9.838 1342.685c-84.47 0-153.19 68.721-153.19 153.19 0 84.47 68.72 153.192 153.19 153.192s153.19-68.721 153.19-153.191-68.72-153.19-153.19-153.19ZM1153.658 320H746.667l99.118 898.623h208.755L1153.658 320Z" />
          </svg>
        ) : (
          image
        )}

        <h2>{isConfirm ? "Warning" : isError ? "Failed" : "Operation Successful"}</h2>
        <p>{message}</p>

        {isConfirm ? (
          <div className="button-group">
            <button onClick={handleClose} className="confirm-button">
              Okay
            </button>
            <button onClick={handleConfirmClose} className="cancel-button">
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleClose}
            className="close-button"
            style={{ backgroundColor: buttonColor }} // Apply dynamic color
          >
            Close
          </button>
        )}
      </div>
    </Modal>
  );
};


// Define Prop Types for better type safety
SuccessModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,     // Controls if the modal is open
  onClose: PropTypes.func.isRequired,    // Function to close the modal
  message: PropTypes.string.isRequired,  // Message to display
  isError: PropTypes.bool.isRequired,    // Controls if it's an error or success modal
  isConfirm: PropTypes.bool,             // If confirmation modal, it changes behavior
  onConfirm: PropTypes.func,             // Confirmation action callback
};

// Default props
SuccessModal.defaultProps = {
  onConfirm: null,
  isConfirm: false,
};

export default SuccessModal;
