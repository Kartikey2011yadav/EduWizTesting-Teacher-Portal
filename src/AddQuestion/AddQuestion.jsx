import { useDropzone } from 'react-dropzone';
import { FaTimes } from 'react-icons/fa';
import { IoCloudUploadOutline } from 'react-icons/io5';
import './AddQuestion.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AlertModal from '../AlertModel/AlertModel';
import { useNavigate } from 'react-router-dom';

const AddQuestion = () => {
  const navigate = useNavigate();
  const [isFlex, setIsFlex] = useState(true);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsError, setModalIsError] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  //form inputs

  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('');
  const [marks, setMarks] = useState('');
  const [option, setOption] = useState('');
  const [mcqOptions, setMcqOptions] = useState([]);
  const [mcqAnswer, setMcqAnswer] = useState('');
  const [expectedTime, setExpectedTime] = useState({});
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [divTag, setDivTag] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    document.title = 'Add Questions';
  }, []);

  useEffect(() => {
    setExpectedTime({ hours, minutes });
  }, [hours, minutes]);

  const onDrop = (acceptedFiles) => {
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 10485760,
    multiple: true,
  });

  const handleRemoveImage = (index, e) => {
    e.stopPropagation();
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleMCQ = (e) => {
    const elem = document.getElementById('add-question-display?block:flex');
    window.getComputedStyle(elem).getPropertyValue('display') === 'block' ? setIsFlex(false) : setIsFlex(true);

    if (e.target.value === 'mcq') {
      setOption('mcq');

      if (mcqOptions.length === 0) {
        setMcqOptions(['']);
      }
    } else {
      setOption('null');
      setMcqOptions([]);
    }
  };

  const handleOptionAdd = () => {
    if (mcqOptions.length < 4) {
      setMcqOptions([...mcqOptions, '']);
    }
  };

  const handleRemoveOption = (index) => {
    if (index !== 0) {
      setMcqOptions(mcqOptions.filter((_, i) => i !== index));
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...mcqOptions];
    updatedOptions[index] = value;
    setMcqOptions(updatedOptions);
  };

  const handleAddTag = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value && !tags.includes(value)) {
        setTags([...tags, value]);
      }
      e.target.value = '';
    }
  };

  const validateTime = () => {
    const minutesNum = Number(minutes);

    if (minutesNum < 0 || minutesNum > 59) {
      alert('Please enter valid minutes (0-59)');
      return false;
    }

    return true;
  };

  const validateAnswer = () => {
    if (option === 'mcq') {
      const index = mcqOptions.indexOf(mcqAnswer);
      if (index === -1) return false;
      return true;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateTime()) return;
    if (!validateAnswer()) {
      setModalMessage('In MCQ type question, answer should be among the options provided!!!');
      setModalIsError(true);
      setModalIsOpen(true);
      return;
    }
    setLoading(true);
    const teacherId = localStorage.getItem('teacherId');
    try {
      const response = await axios.post('http://localhost:5000/question/addQuestion', {
        teacherId,
        heading,
        description,
        difficultyLevel,
        marks,
        option,
        mcqOptions,
        mcqAnswer,
        expectedTime,
        divTag,
      });
      if (response.status === 200) {
        setModalIsError(false);
        setModalIsOpen(true);
        setModalMessage(response.data.message);
      }
    } catch (error) {
      setModalIsError(true);
      setModalIsOpen(true);
      setModalMessage(error?.response?.data.error || 'Server Error!!!');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveTag = (elem) => {
    const index = tags.indexOf(elem);
    tags.splice(index, 1);
    setTags([...tags]);
  };

  useEffect(() => {
    setDivTag(tags);
  }, [tags]);

  const handleMinutesChange = (e) => {
    const value = e.target.value;
    // Allow input to be empty or any number temporarily
    if (value === '' || (value >= 0 && value <= 59)) {
      setMinutes(value);
    }
  };

  return (
    <div className="add-question-container-display">
      <div className="add-question-container">
        <div className="add-question-form">
          <center>
            <div className="add-question-heading">Question Upload</div>
          </center>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <label>Question Heading:</label>
            <center>
              <div className="add-question-input-container">
                <input
                  type="text"
                  placeholder="Enter Question Heading:"
                  required
                  onChange={(e) => {
                    setHeading(e.target.value);
                  }}
                />
              </div>
            </center>
            <label>Question Description:</label>
            <center>
              <div className="add-question-input-container">
                <textarea
                  placeholder="Enter Question Description:"
                  required
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
            </center>
            <div className="add-question-display-flex add-question-media-query">
              <div className="add-question-flex-contents">
                <label className="add-question-media-query-label">Question Difficulty Level:</label>
                <center>
                  <div className="add-question-input-container">
                    <select
                      required
                      onChange={(e) => {
                        setDifficultyLevel(e.target.value);
                      }}
                    >
                      <option selected>Set Difficulty Level</option>
                      <option>Level 1</option>
                      <option>Level 2</option>
                      <option>Level 3</option>
                      <option>Level 4</option>
                      <option>Level 5</option>
                    </select>
                  </div>
                </center>
              </div>
              <div className="add-question-flex-contents">
                <label>Question Marks:</label>
                <center>
                  <div className="add-question-input-container">
                    <input
                      type="number"
                      placeholder="Enter Marks:"
                      required
                      onChange={(e) => {
                        setMarks(e.target.value);
                      }}
                    />
                  </div>
                </center>
              </div>
            </div>
            <div className="add-question-display-flex add-question-media-query" id="add-question-display?block:flex">
              <div className="add-question-flex-contents">
                <label>Question Type:</label>
                <center>
                  <div className="add-question-input-container">
                    <select
                      onChange={(e) => {
                        handleMCQ(e);
                      }}
                      required
                    >
                      <option selected>Select Question Type</option>
                      <option value="mcq">MCQ</option>
                      <option value="null">NULL</option>
                    </select>
                  </div>
                </center>
              </div>
              {option === 'mcq' && !isFlex ? (
                <>
                  {mcqOptions.map((opt, index) => (
                    <div key={index} className="add-question-mcq-option">
                      <label>Option {index + 1}:</label>
                      <center>
                        <div className="add-question-input-container add-question-position-relative">
                          <input
                            type="text"
                            placeholder={`Enter Option ${index + 1}`}
                            value={opt}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            required
                          />
                          {index !== 0 && (
                            <FaTimes
                              className="remove-mcq-option-icon"
                              onClick={() => handleRemoveOption(index)}
                              size={20}
                            />
                          )}
                        </div>
                      </center>
                    </div>
                  ))}
                  {mcqOptions.length < 4 && (
                    <div className="add-question-add-option">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleOptionAdd();
                        }}
                      >
                        Add Option
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <></>
              )}
              <div className="add-question-flex-contents">
                <label>Question Expected Time:</label>
                <center>
                  <div className="add-question-display-flex">
                    <div className="add-question-flex-inner-contents">
                      <div className="add-question-input-container">
                        <input
                          type="number"
                          placeholder="Enter the Hours:"
                          onChange={(e) => {
                            setHours(e.target.value);
                          }}
                          required
                        />
                      </div>
                    </div>
                    <div className="add-question-flex-inner-contents">
                      <div className="add-question-input-container">
                        <input
                          type="number"
                          placeholder="Enter the Minutes:"
                          value={minutes}
                          onChange={handleMinutesChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </center>
              </div>
            </div>
            {option === 'mcq' && isFlex ? (
              <>
                {mcqOptions.map((opt, index) => (
                  <div key={index} className="add-question-mcq-option">
                    <label>Option {index + 1}:</label>
                    <center>
                      <div className="add-question-input-container add-question-position-relative">
                        <input
                          type="text"
                          placeholder={`Enter Option ${index + 1}`}
                          value={opt}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          required
                        />
                        {index !== 0 && (
                          <FaTimes
                            className="remove-mcq-option-icon"
                            onClick={() => handleRemoveOption(index)}
                            size={20}
                          />
                        )}
                      </div>
                    </center>
                  </div>
                ))}
                {mcqOptions.length < 4 && (
                  <div className="add-question-add-option">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleOptionAdd();
                      }}
                    >
                      Add Option
                    </button>
                  </div>
                )}
              </>
            ) : (
              <></>
            )}
            <label>Question Answer:</label>
            <center>
              <div className="add-question-input-container">
                <input
                  type="text"
                  placeholder="Enter the Answer:"
                  onChange={(e) => {
                    setMcqAnswer(e.target.value);
                  }}
                  required
                />
              </div>
            </center>
            <label>Question Tags:</label>
            <center>
              <div className="add-question-input-container">
                <input
                  type="text"
                  placeholder="Enter Question Tags:"
                  onKeyDown={(e) => {
                    handleAddTag(e);
                  }}
                />
              </div>
              {divTag.length > 0 ? (
                <div className="add-question-tag-container">
                  {divTag.map((e, key) => (
                    <span className="add-question-tag" key={key}>
                      {
                        <>
                          <div>{e}</div>
                          <FaTimes
                            className="add-question-tag-remove"
                            onClick={() => {
                              handleRemoveTag(e);
                            }}
                          />
                        </>
                      }
                    </span>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </center>
            <label>Upload Images: [Optional]</label>
            <center>
              <div {...getRootProps({ className: 'add-question-dropbox' })}>
                <input {...getInputProps()} />
                <p>
                  <div className="add_question_cloudicon">
                    <center>
                      <IoCloudUploadOutline size={50} />
                    </center>
                  </div>
                  Drag and drop images here, or click to select
                </p>
              </div>
            </center>
            <div className="add_question_image_preview_container">
              {images.map((image, index) => (
                <div key={index} className="add_question_image_preview">
                  <img src={URL.createObjectURL(image)} alt="Question" className="add_question_preview_image" />
                  <center>
                    <FaTimes
                      className="add_question_remove_image_icon"
                      onClick={(e) => handleRemoveImage(index, e)}
                      size={30}
                    />
                  </center>
                </div>
              ))}
            </div>
            <center>
              <div className="add-question-input-container">
                <input type="submit" value={loading ? 'Adding...' : 'Add Question'} disabled={loading} />
              </div>
            </center>
          </form>
        </div>
      </div>
      <AlertModal
        isOpen={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
          navigate('/questions-upload');
        }}
        isError={modalIsError}
        message={modalMessage}
      />
    </div>
  );
};

export default AddQuestion;
