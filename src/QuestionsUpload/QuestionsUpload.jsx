// import { useNavigate } from 'react-router-dom';
import './QuestionsUpload.css';
import { useContext, useEffect, useState } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { SiLevelsdotfyi } from 'react-icons/si';
import { FaRegClock, FaTag } from 'react-icons/fa6';
import { ThemeContext } from '../contexts/ThemeContext';
import { GoDotFill } from 'react-icons/go';
import questionImage from '../assets/user-photo-default.jpg';
import AddQuestion from '../AddQuestion/AddQuestion';
import PropTypes from 'prop-types';
import SuccessModal from '../AlertModel/AlertModel';

const Question = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  difficultyLevel: PropTypes.string.isRequired,
  marks: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  option: PropTypes.string.isRequired,
  mcqOptions: PropTypes.arrayOf(PropTypes.string),
  mcqAnswer: PropTypes.string,
  expectedTime: PropTypes.shape({
    hours: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minutes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
});

const QuestionsUpload = () => {
  const { theme } = useContext(ThemeContext);
  const [questions, setQuestions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editQuestionData, setEditQuestionData] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  //for modal
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    questionIdToDelete: null,
  });
  const [resultModal, setResultModal] = useState({
    isOpen: false,
    isError: false,
    message: '',
  });

  const lightColors = {
    '#1e3a8a': 'rgba(0, 255, 255, 0.253)',
    '#9203ca': 'rgba(242, 181, 247, 0.699)',
    '#04aa44': 'rgba(100, 247, 100, 0.35)',
  };
  const darkColors = {
    'rgba(0, 255, 255)': '#1e3a8a',
    'rgba(242, 181, 247)': '#9203ca',
    'rgba(203,241,203)': '#04aa44',
  };

  const colorKeysLight = Object.keys(lightColors);
  const colorKeysDark = Object.keys(darkColors);
  // const navigate = useNavigate();

  const handleEdit = (question) => {
    setEditQuestionData(question);
    setIsEditing(true);
  };

  const handleAddNewQuestion = () => {
    setEditQuestionData(null);
    setIsEditing(true);
  };

  const handleBack = () => {
    setIsEditing(false);
    setEditQuestionData(null);
    // Refresh questions list after edit
    axios
      .post('http://localhost:5000/question/getQuestionDetailsByTeacherId', {
        teacherId: localStorage.getItem('teacherId'),
      })
      .then((response) => {
        setQuestions(response.data.questions);
      })
      .catch((err) => {
        console.error(err?.response?.data.error || 'Server Error');
      });
  };

  const initiateDelete = (questionId) => {
    setConfirmModal({
      isOpen: true,
      questionIdToDelete: questionId,
    });
  };

  const handleDelete = async () => {
    const questionId = confirmModal.questionIdToDelete;

    try {
      setIsDeleting(true);
      const response = await axios.delete(`http://localhost:5000/question/deleteQuestion/${questionId}`, {
        data: {
          teacherId: localStorage.getItem('teacherId'),
        },
      });

      if (response.status === 200) {
        // Update the local state to remove the deleted question
        setQuestions((prevQuestions) => prevQuestions.filter((q) => q._id !== questionId));

        // Show success modal
        setResultModal({
          isOpen: true,
          isError: false,
          message: 'Question deleted successfully',
        });
      }
    } catch (error) {
      console.error('Error deleting question:', error);
      // Show error modal
      setResultModal({
        isOpen: true,
        isError: true,
        message: error.response?.data?.message || 'Failed to delete question',
      });
    } finally {
      setIsDeleting(false);
      setConfirmModal({ isOpen: false, questionIdToDelete: null });
    }
  };

  useEffect(() => {
    axios
      .post('http://localhost:5000/question/getQuestionDetailsByTeacherId', {
        teacherId: localStorage.getItem('teacherId'),
      })
      .then((response) => {
        setQuestions(response.data.questions);
      })
      .catch((err) => {
        console.error(err?.response?.data.error || 'Server Error');
      });
  }, []);

  if (isEditing) {
    return <AddQuestion questionData={editQuestionData} onBack={handleBack} />;
  }

  return (
    <>
      <div className="question-upload-container">
        <div className="question-upload-heading">Questions</div>
        <div
          className="question-upload-add-question"
          onClick={handleAddNewQuestion}
          // onClick={() => {
          //   navigate('/add-question');
          // }}
        >
          <FaPlus />
          <div>Add Question</div>
        </div>
      </div>
      <div className="question-upload-card-container">
        {questions.map((question, key) => (
          <div className="question-upload-card" key={key}>
            <div className=" TEST_CARD_BUTTONS relative mr-6 flex justify-end gap-2 text-white font-thin">
              <button
                className="TEST_CARD_BUTTON_EDDIT bg-[#1E293B] hover:bg-[#2b3c56] rounded-md px-3 py-1 flex items-center gap-1"
                onClick={() => handleEdit(question)}
              >
                <FaEdit /> Edit
              </button>
              <button
                className="TEST_CARD_BUTTON_DELETE bg-[#FF2121] hover:bg-[#dc1c1c] rounded-md px-3 py-1 flex items-center gap-1"
                onClick={() => initiateDelete(question._id)}
                disabled={isDeleting}
              >
                <FaTrash /> Delete
              </button>
            </div>
            <div className="question-upload-difficultyLevel">
              <SiLevelsdotfyi />
              <div>{question.difficultyLevel}</div>
            </div>
            <div className="question-upload-expectedTime">
              <FaRegClock />
              <div>
                Expected Time: &nbsp;{question.expectedTime.hours} Hours&nbsp;&nbsp;
                {Number(question.expectedTime.minutes)} Minutes
              </div>
            </div>
            <div className="question-upload-marks">Marks: {question.marks}</div>
            <hr></hr>
            <div className="question-upload-image-flex">
              <div>
                <div className="question-upload-question-heading">{question.heading}</div>
                <div className="question-upload-description">{question.description}</div>
                <div className="question-upload-tags">
                  {question.tags.map((tag, index) => {
                    let colorIndex = index % colorKeysLight.length;
                    let textColor = colorKeysLight[colorIndex];
                    let backgroundColor = lightColors[textColor];

                    if (theme === 'dark') {
                      colorIndex = index % colorKeysDark.length;
                      textColor = colorKeysDark[colorIndex];
                      backgroundColor = darkColors[textColor];
                    }

                    return (
                      <span
                        key={index}
                        style={{
                          color: textColor,
                          backgroundColor: backgroundColor,
                          padding: '2px 6px',
                          borderRadius: '6px',
                          marginRight: '10px',
                          display: 'inline-flex',
                          alignItems: 'center',
                        }}
                      >
                        <FaTag style={{ marginRight: '3px' }} />
                        <div>{tag}</div>
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="question-upload-image">
                <img src={questionImage} alt="Question" />
              </div>
            </div>
            <hr></hr>
            <div className="question-upload-type">
              Question Type: &nbsp;<b>{question.option}</b>
            </div>
            {question.option === 'mcq' && (
              <div className="question-upload-options">
                Options:
                <br />
                <div className="question-upload-options-container">
                  {question.mcqOptions.map((option, key) => (
                    <div className="question-upload-option" key={key}>
                      <GoDotFill />
                      <div>{option}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="question-upload-answer">Answer: &nbsp;{question.mcqAnswer}</div>
          </div>
        ))}
      </div>
      {/* Confirmation Modal */}
      <SuccessModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, questionIdToDelete: null })}
        message="Are you sure you want to delete this question?"
        isError={false}
        isConfirm={true}
        onConfirm={handleDelete}
      />

      {/* Result Modal */}
      <SuccessModal
        isOpen={resultModal.isOpen}
        onClose={() => setResultModal({ isOpen: false, isError: false, message: '' })}
        message={resultModal.message}
        isError={resultModal.isError}
      />
    </>
  );
};

QuestionsUpload.propTypes = {
  questions: PropTypes.arrayOf(Question),
};

QuestionsUpload.defaultProps = {
  questions: [],
};

export default QuestionsUpload;
