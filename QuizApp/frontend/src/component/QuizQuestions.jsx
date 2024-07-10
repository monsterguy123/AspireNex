import React, { useState } from 'react';
import { useParams , useNavigate} from 'react-router-dom';
import axios from 'axios';

const QuizQuestions = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [message, setMessage] = useState('');
  const { quizId } = useParams();

  const router = useNavigate();

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleDeleteOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleCorrectAnswerChange = (event) => {
    setCorrectAnswer(event.target.value);
  };

  const SubmitQuiz = async () =>{
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `http://localhost:8080/api/v1/quiz/QuizCompleted/${quizId}`,{},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(res){
         router('/mylist')
      }
    } catch (error) {
      console.error('Error creating question:', error);
    }  
  }

  const handleSubmit = async () => {
    if (!question.trim()) {
      alert('Please enter a question');
      return;
    }

    if (options.length === 0 || options.some(option => !option.trim())) {
      alert('Please fill in all options and add at least one option');
      return;
    }

    if (!correctAnswer.trim()) {
      alert('Please enter the correct answer');
      return;
    }

    const poll = {
      question,
      options: options.filter(option => option.trim()),
      correctAnswer,
    };

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `http://localhost:8080/api/v1/quiz/fillQuestions/${quizId}`,
        poll,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 201) {
        setCorrectAnswer('');
        setOptions(["", "", "", ""]);
        setQuestion('');
      }
    } catch (error) {
      console.error('Error creating question:', error);
      setMessage('Failed to create question. Please try again.');
    }

    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
        <h1 className="text-5xl mt-10 font-serif font-semibold text-custom-purple">
          Create As Many Questions As You Need For Your Quiz
        </h1>
        <div className="max-w-lg mt-5 w-full bg-white p-8 rounded-lg shadow-lg">
          {message && <p className='text-lg text-center text-green-500'>{message}</p>}
          <div>
            <label
              className="text-2xl font-bold font-serif text-gray-800"
              htmlFor="quiz-question"
            >
              Write your question for your Quiz
            </label>
            <input
              id="quiz-question"
              type="text"
              className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              value={question}
              onChange={handleQuestionChange}
            />
          </div>
          {options.map((option, index) => (
            <div key={index} className="mt-4 flex items-center">
              <label className="mr-2 text-gray-800" htmlFor={`option-${index}`}>
                Option {index + 1}:
              </label>
              <input
                id={`option-${index}`}
                type="text"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
              <button
                className="ml-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg focus:outline-none focus:bg-red-600"
                onClick={() => handleDeleteOption(index)}
                aria-label={`Delete option ${index + 1}`}
              >
                Delete
              </button>
            </div>
          ))}
          <div className="mt-3">
            <label className="text-lg font-semibold text-gray-800">
              Write the correct answer
            </label>
            <input
              id="correct-answer"
              type="text"
              className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              value={correctAnswer}
              onChange={handleCorrectAnswerChange}
            />
          </div>
          <div className="mt-4">
            <button
              className="bg-fuchsia-800 text-white w-full px-4 py-2 rounded-lg hover:bg-fuchsia-700 focus:outline-none"
              onClick={handleAddOption}
              aria-label="Add an option"
            >
              Add an option +
            </button>
          </div>
          <div className="mt-4">
            <button
              className="bg-fuchsia-800 text-white w-full px-4 py-2 rounded-lg hover:bg-fuchsia-700 focus:outline-none"
              onClick={handleSubmit}
              aria-label="Create question"
            >
              Create Question
            </button>
          </div>
          <div className="mt-4">
            <button
              onClick={SubmitQuiz}
              className="bg-blue-500 text-white w-full px-4 py-2 rounded-lg hover:bg-blue-400 focus:outline-none"
            >
              Submit your Quiz
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizQuestions;
