import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx"; 
import ThemeToggleButton from '../Components/ThemeToggle';

const SuccessModal = ({ isOpen, onClose, message, isError, isConfirm, onConfirm }) => {
  // const isDark = (localStorage.theme === 'dark') ? true : false;
  // Chooses the icon based on whether there is an error
  const image = isError ? <RxCrossCircled className='text-red-600 h-12 w-12' /> : <IoMdCheckmarkCircleOutline className='text-green-600 h-12 w-12' />;
  
  const handleClose = () => {
    if (onConfirm) {
      onConfirm(); // Trigger confirmation action
    }
    onClose(); // Always close the modal
  };

  const handleConfirmClose = () => {
    onClose(); // Close the modal on cancel
  };

  const buttonColor = isError ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'; // Button color changes based on error state

  return (
    <>
     <ThemeToggleButton/>
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Success Modal"
      className="modal bg-container-light p-5 rounded-lg w-full max-w-xs mx-auto text-center shadow-lg text-white dark:bg-container-dark"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 backdrop-blur-md"
    >
     
      <div className="space-y-4 " onClick={(e) => e.stopPropagation()}>
        <div className='flex justify-center items-center'>
        {isConfirm ? (
          <svg className="h-12 w-12 fill-current text-yellow-400 mb-3" viewBox="0 0 1920 1920">
            <path d="M960 0c530.193 0 960 429.807 960 960s-429.807 960-960 960S0 1490.193 0 960 429.807 0 960 0Zm-9.838 1342.685c-84.47 0-153.19 68.721-153.19 153.19 0 84.47 68.72 153.192 153.19 153.192s153.19-68.721 153.19-153.191-68.72-153.19-153.19-153.19ZM1153.658 320H746.667l99.118 898.623h208.755L1153.658 320Z" />
          </svg>
        ) : (
          image
        )}
        </div>

        <h2 className="text-lg">{isConfirm ? <p className='text-yellow-400'>Warning</p>  : isError ? <p className='text-red-600'>Failed</p>  :  <p className='text-green-600'>Operation Successful</p>}</h2>
        <p className="text-gray-300 text-sm">{isConfirm ? <p className='text-yellow-400'> {message} </p> : isError ? <p className='text-red-600'>{message}</p> : <p className='text-green-600'>{message}</p>}</p>

        {isConfirm ? (
          <div className="flex justify-between gap-2">
            <button onClick={handleClose} className="bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2 w-full">
              Okay
            </button>
            <button onClick={handleConfirmClose} className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2 w-full">
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleClose}
            className={`w-full rounded-md py-2 ${buttonColor} text-white`}
          >
            Close
          </button>
        )}
      </div>
    </Modal>
    </>
  );
};

// Prop Types for type safety
SuccessModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  isConfirm: PropTypes.bool,
  onConfirm: PropTypes.func,
};

// Default props setup
SuccessModal.defaultProps = {
  onConfirm: null,
  isConfirm: false,
};

export default SuccessModal;  
