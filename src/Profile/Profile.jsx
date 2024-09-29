import { useState } from 'react';
import './profile.css';

import { FaPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import Modal from 'react-modal';
import defaultPhoto from '../Assets/user photo default.jpg';
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
          <div className="profile-name">{profileData.name}</div>
          <p className="profile-email">Email: {profileData.email}</p>
          <p className="profile-mob">Mobile: {profileData.mobile_no}</p>
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
              className="modallabel_input"
              type="text"
              value={newProfileData.name}
              onChange={(e) => setNewProfileData({ ...newProfileData, name: e.target.value })}
            />
          </label>
          <label className="flex flex-col gap-3 dark:text-white text-lg w-full font-semibold">
            Email:
            <input
              type="email"
              value={newProfileData.email}
              onChange={(e) => setNewProfileData({ ...newProfileData, email: e.target.value })}
            />
          </label>
          <label className="flex flex-col gap-3 dark:text-white text-lg w-full font-semibold">
            Mobile:
            <input
              type="text"
              value={newProfileData.mobile_no}
              onChange={(e) => setNewProfileData({ ...newProfileData, mobile_no: e.target.value })}
            />
          </label>
          <label className="flex flex-col gap-3 dark:text-white text-lg w-full font-semibold">
            Password:
            <div className="password-field">
              <input
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
            <button type="button" onClick={closeModal}>
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
