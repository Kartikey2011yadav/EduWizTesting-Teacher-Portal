import { useState } from 'react';
import { FaPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import Modal from 'react-modal';
import defaultPhoto from '../assets/user photo default.jpg';
import AlertModal from '../AlertModel/AlertModel';

Modal.setAppElement('#root');

const Profile = () => {
  const [profileData, setProfileData] = useState({
    photo: defaultPhoto,
    name: 'Niko',
    email: 'niko@gmail.com',
    mobile_no: '1234567890',
    password: 'Qwerty@123',
    confirmPassword: 'Qwerty@123',
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [newProfileData, setNewProfileData] = useState(profileData);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const openModal = () => {
    setNewProfileData(profileData);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openAlertModal = (message, isError = false) => {
    setAlertMessage(message);
    setIsError(isError);
    setAlertIsOpen(true);
  };

  const handleSave = () => {
    const { email, mobile_no, password, confirmPassword } = newProfileData;

    if (!email.includes('@')) {
      openAlertModal('Please enter a valid email address.', true);
      return;
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile_no)) {
      openAlertModal('Please enter a valid 10-digit mobile number.', true);
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      openAlertModal(
        'Password must be at least 8 characters, contain one uppercase letter, one number, and one special character.',
        true
      );
      return;
    }

    if (password !== confirmPassword) {
      openAlertModal('Passwords do not match.', true);
      return;
    }

    setProfileData(newProfileData);
    setModalIsOpen(false);
    openAlertModal('Profile updated successfully!');
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData({
          ...profileData,
          photo: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const passwordsMatch = newProfileData.password === newProfileData.confirmPassword;
  // const toggleDarkMode = () => {
  //   document.documentElement.classList.toggle('dark');
  // };
  return (
    <div className="bg-[#F3F4F6] h-full w-full py-50 dark:bg-[#010B18]">
      <div className="bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-md w-1/2 mx-auto text-center p-6 relative border border-purple-500 shadow-gray-500/50">
        <div className="relative inline-block">
          <img
            src={profileData.photo}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-black shadow-lg mx-auto -mt-24"
          />
          <label
            htmlFor="file-input"
            className="absolute bottom-0 right-0 bg-black text-white dark:bg-white dark:bg-black rounded-full p-2 cursor-pointer"
          >
            <FaPlus />
          </label>
          <input id="file-input" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </div>
        <div className="mt-4 text-black dark:text-white">
          <div className="text-2xl font-bold mb-2 dark:text-white">{profileData.name}</div>
          <p className="text-lg text-black mb-2 dark:text-white">Email: {profileData.email}</p>
          <p className="text-gray-400 text-black mb-4 dark:text-white">Mobile: {profileData.mobile_no}</p>
        </div>
        <button
          className="bg-blue-900 hover:bg-blue-800 text-white dark:bg-blue-500 dark:hover:bg-blue-600 py-2 px-4 rounded mt-4"
          onClick={openModal}
        >
          Edit Profile
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Profile"
        className="bg-gray-800 p-6 rounded-lg w-[90%] md:w-[500px] mx-auto text-white"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-6 items-center justify-center flex">Edit Profile</h2>
        <form className="grid gap-4">
          <label className="flex flex-col">
            Name:
            <input
              type="text"
              value={newProfileData.name}
              onChange={(e) => setNewProfileData({ ...newProfileData, name: e.target.value })}
              className="bg-gray-700 text-black rounded px-3 py-2 mt-1"
            />
          </label>
          <label className="flex flex-col">
            Email:
            <input
              type="email"
              value={newProfileData.email}
              onChange={(e) => setNewProfileData({ ...newProfileData, email: e.target.value })}
              className="bg-gray-700 text-black rounded px-3 py-2 mt-1"
            />
          </label>
          <label className="flex flex-col">
            Mobile:
            <input
              type="text"
              value={newProfileData.mobile_no}
              onChange={(e) => setNewProfileData({ ...newProfileData, mobile_no: e.target.value })}
              className="bg-gray-700 text-black rounded px-3 py-2 mt-1"
            />
          </label>
          <label className="flex flex-col">
            Password:
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className={`bg-gray-700 text-black rounded px-3 py-2 mt-1 w-full ${passwordsMatch ? 'border' : 'border-red-500'}`}
                value={newProfileData.password}
                onChange={(e) => setNewProfileData({ ...newProfileData, password: e.target.value })}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </label>
          <label className="flex flex-col">
            Confirm Password:
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className={`bg-gray-700 text-black rounded px-3 py-2 mt-1 w-full ${passwordsMatch ? 'border' : 'border-red-500'}`}
                value={newProfileData.confirmPassword}
                onChange={(e) => setNewProfileData({ ...newProfileData, confirmPassword: e.target.value })}
              />
              <span
                onClick={toggleConfirmPasswordVisibility}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </label>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="bg-purple-500 hover:bg-purple-700 text-black py-2 px-4 rounded"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              className="bg-purple-500 hover:bg-purple-700 text-black py-2 px-4 rounded"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
      {/* Alert Modal for Success or Error Messages */}
      <AlertModal isOpen={alertIsOpen} onClose={() => setAlertIsOpen(false)} message={alertMessage} iserror={isError} />
    </div>
  );
};

export default Profile;
