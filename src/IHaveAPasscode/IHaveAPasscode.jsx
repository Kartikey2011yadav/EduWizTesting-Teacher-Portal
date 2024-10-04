import './IHaveAPasscode.css';
import logoDark from '../assets/logo-dark.svg';
import logoLight from '../assets/logo-light.svg';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import AlertModal from '../AlertModel/AlertModel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const IHaveAPasscode = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post('http://localhost:5000/teacher/verifypasscode', {
        email: email,
        otp: passcode,
      })
      .then((response) => {
        setModalIsOpen(true);
        setShouldNavigate(true);
        setMessage(response.data.message);
      })
      .catch((err) => {
        setModalIsOpen(true);
        setIsError(true);
        setMessage(err.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const closeModal = () => {
    setModalIsOpen(false);
    if (!isError && shouldNavigate) navigate('/');
  };
  useEffect(() => {
    document.title = 'Passcode | EduWiz';
  }, []);
  return (
    <>
      <div className="i-passcode-container-display">
        <div className="i-passcode-container">
          <div className="i-passcode-middle-container">
            <center>
              <div className="i-passcode-logo">
                <img src={theme === 'light' ? logoLight : logoDark} />
              </div>
              <div className="i-passcode-heading">Passcode Verification</div>
              <div className="i-passcode-header">Join EduWiz and start learning today!</div>
            </center>
            <div className="i-passcode-form">
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <label>Email:</label>
                <br />
                <center>
                  <div className="i-passcode-input-container">
                    <input
                      type="email"
                      placeholder="Enter the Email:"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                    />
                  </div>
                </center>
                <label>Passcode:</label>
                <center>
                  <div className="i-passcode-input-container">
                    <input
                      type="text"
                      placeholder="Enter the Passcode:"
                      onChange={(e) => {
                        setPasscode(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="i-passcode-submit">
                    <button type="submit">{loading ? 'VERIFYING...' : 'VERIFY'}</button>
                  </div>
                </center>
                {/* Redirect to Sign In */}
                <div className="i-passcode-already-have-account">
                  <p className="">
                    Already have an account? <a href="/">Sign In</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <AlertModal
        isOpen={modalIsOpen}
        onClose={closeModal} // Close modal and navigate if needed
        message={message}
        isError={isError}
      />
    </>
  );
};
export default IHaveAPasscode;
