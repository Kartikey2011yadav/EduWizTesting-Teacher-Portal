import { useState } from 'react';
import './profile.css';
import { FaPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import Modal from 'react-modal';
import defaultPhoto from '../assets/user photo default.jpg';
import AlertModal from '../AlertModel/AlertModel';

const Profile = () => {
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');
  const mobileNumber = localStorage.getItem('mobileNumber');
  const [profileData, setProfileData] = useState({
    photo: defaultPhoto,
    name: '',
    email: '',
    mobile_no: '',
    password: '',
    confirmPassword: '',
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // Modal open state
  const [modalMessage, setModalMessage] = useState(''); // Modal message
  const [isError, setIsError] = useState(false); // Modal error state

  const [newProfileData, setNewProfileData] = useState(profileData);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const openModal = () => {
    setNewProfileData(profileData);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const closeIsModal = () => {
    setModalIsOpen(false);
  };
  const handleSave = () => {
    const { email, mobile_no, password, confirmPassword } = newProfileData;

    if (!email.includes('@')) {
      setModalMessage('Please enter a valid email address.');
      setIsError(true);
      setModalOpen(true);
      return;
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile_no)) {
      setModalMessage('Please enter a valid 10-digit mobile number.');
      setIsError(true);
      setModalOpen(true);
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setModalMessage(
        'Password must be at least 8 characters, contain one uppercase letter, one number, and one special character.'
      );
      setIsError(true);
      setModalOpen(true);
      return;
    }

    if (password !== confirmPassword) {
      setModalMessage('Passwords do not match');
      setIsError(true);
      setModalOpen(true);
      return;
    }

    setProfileData(newProfileData);
    setModalMessage('Profile updated successfully!');
    setIsError(false);
    setModalOpen(true);
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

  return (
    <div className="profile_card_main">
      <div className="profile-card">
        <div className="profile-header">
          <img src={profileData.photo} alt="Profile" className="profile-image" />
          <label htmlFor="file-input" className="plus-icon">
            <FaPlus />
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>
        <div className="profile-details">
          <div className="profile-name">{name}</div>
          <p className="profile-email">Email: {email}</p>
          <p className="profile-mob">Mobile: {mobileNumber}</p>
        </div>
        <button className="edit-button" onClick={openModal}>
          Edit Profile
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Profile"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="profile_edit_heading">Edit Profile</h2>
        <form className="modal-form">
          <label className="flex flex-col gap-3 dark:text-white text-lg w-full font-semibold">
            Name:
            <input
              placeholder="Enter your name"
              className="modallabel_input"
              type="text"
              value={newProfileData.name}
              onChange={(e) => setNewProfileData({ ...newProfileData, name: e.target.value })}
            />
          </label>
          <label className="flex flex-col gap-3 dark:text-white text-lg w-full font-semibold">
            Email:
            <input
              placeholder="Enter your email"
              type="email"
              value={newProfileData.email}
              onChange={(e) => setNewProfileData({ ...newProfileData, email: e.target.value })}
            />
          </label>
          <label className="flex flex-col gap-3 dark:text-white text-lg w-full font-semibold">
            Mobile:
            <input
              placeholder="Enter mobile no"
              type="text"
              value={newProfileData.mobile_no}
              onChange={(e) => setNewProfileData({ ...newProfileData, mobile_no: e.target.value })}
            />
          </label>
          <label className="flex flex-col gap-3 dark:text-white text-lg w-full font-semibold">
            Password:
            <div className="password-field">
              <input
                placeholder="Enter your password"
                type={showPassword ? 'text' : 'password'}
                className={passwordsMatch ? 'input-normal' : 'input-faded'}
                value={newProfileData.password}
                onChange={(e) => setNewProfileData({ ...newProfileData, password: e.target.value })}
              />
              <span onClick={togglePasswordVisibility} className="eye-icon">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </label>
          <label className="flex flex-col gap-3 dark:text-white text-lg w-full font-semibold">
            Confirm Password:
            <div className="password-field relative">
              <input
                placeholder="Enter confirm password"
                type={showConfirmPassword ? 'text' : 'password'}
                className={passwordsMatch ? 'input-normal' : 'input-faded'}
                value={newProfileData.confirmPassword}
                onChange={(e) => setNewProfileData({ ...newProfileData, confirmPassword: e.target.value })}
              />
              <span onClick={toggleConfirmPasswordVisibility} className="eye-icon">
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </label>
          <div className="modal-buttons">
            <button type="button" onClick={handleSave}>
              Save
            </button>
            <button type="button" onClick={closeIsModal}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
      <AlertModal isOpen={modalOpen} onClose={closeModal} message={modalMessage} isError={isError} />
    </div>
  );
};

export default Profile;
