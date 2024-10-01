import { useNavigate } from 'react-router-dom';
import './QuestionsUpload.css';
import { useContext, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { SiLevelsdotfyi } from 'react-icons/si';
import { FaRegClock, FaTag } from 'react-icons/fa6';
import { ThemeContext } from '../contexts/ThemeContext';
import { GoDotFill } from 'react-icons/go';
import questionImage from '../assets/user photo default.jpg';

const QuestionsUpload = () => {
  const { theme } = useContext(ThemeContext);

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
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

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

  return (
    <>
      <div className="question-upload-container">
        <div className="question-upload-heading">Questions</div>
        <div
          className="question-upload-add-question"
          onClick={() => {
            navigate('/add-question');
          }}
        >
          <FaPlus />
          <div>Add Question</div>
        </div>
      </div>
      <div className="question-upload-card-container">
        {questions.map((question, key) => (
          <div className="question-upload-card" key={key}>
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
    </>
  );
};

export default QuestionsUpload;
