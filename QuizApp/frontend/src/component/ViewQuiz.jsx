import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const ViewQuiz = () => {
  const [quiz, setQuiz] = useState(null);
  const [message, setMessage] = useState('');
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const { quizId } = useParams();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:8080/api/v1/quiz/ViewQuiz/${quizId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.status === 201) {
          setQuiz(res.data.quiz);
        } else if (res.status === 202) {
          setIsQuizCompleted(true); 
        } else if(res.status === 200){
          setMessage(res.data.msg); 
        }
      } catch (error) {
        setMessage('Error fetching quiz. Please try again later.');
      }
    };

    fetchQuiz();
  }, [quizId]);

  if (message) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-200 flex justify-center">
          <div className="max-w-3xl w-full">
            <div className="bg-gray-100 p-8 rounded-lg shadow-md mt-40 max-w-xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4 font-serif text-custom-purple">{message}</h2>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isQuizCompleted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-200 flex justify-center">
          <div className="max-w-3xl w-full">
            <div className="bg-gray-100 p-8 rounded-lg shadow-md mt-40 max-w-xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4 font-serif text-custom-purple">Quiz Completed!</h2>
              <p className="text-lg">Thank you for taking the quiz.</p>
              <p className="text-lg">Click the link below to see your result.</p>
              <Link to={`/result/${quizId}`}>
                <button className="text-xl font-serif font-bold underline mt-5 cursor-pointer hover:text-blue-700">
                  MY RESULT
                </button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!quiz) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-200 flex justify-center">
          <div className="max-w-3xl w-full">
            <p className="text-center">Loading...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-200 flex justify-center">
        <div className="max-w-3xl w-full">
          <div>
            <h1 className="text-center text-5xl font-serif font-bold text-custom-purple mt-40 mb-10">
              {quiz.title}
            </h1>
          </div>
          {quiz.question && quiz.question.length > 0 && (
            <MultipleChoiceQuiz questions={quiz.question} quizId={quiz.id} setIsQuizCompleted={setIsQuizCompleted} />
          )}
        </div>
      </div>
    </>
  );
};

const MultipleChoiceQuiz = ({ questions, quizId, setIsQuizCompleted }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionChange = (questionId, option) => {
    const updatedOptions = [...selectedOptions];
    const existingOptionIndex = updatedOptions.findIndex(item => item.quizQuestionId === questionId);
    if (existingOptionIndex !== -1) {
      updatedOptions[existingOptionIndex] = { quizQuestionId: questionId, selectedOption: option };
    } else {
      updatedOptions.push({ quizQuestionId: questionId, selectedOption: option });
    }
    setSelectedOptions(updatedOptions);
  };

  const handlePrevClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmitClick = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:8080/api/v1/quiz/attempt/${quizId}`, selectedOptions, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIsQuizCompleted(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md max-w-xl mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-4">{`Question ${currentQuestionIndex + 1} of ${questions.length}`}</h2>
      <div className="mb-6">
        <h3 className="text-lg font-semibold">{currentQuestion.question}</h3>
        <div className="mt-4">
          {currentQuestion.options.map((option, index) => (
            <label key={index} className="block">
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                value={option}
                checked={selectedOptions.find(item => item.quizQuestionId === currentQuestion.id)?.selectedOption === option}
                onChange={() => handleOptionChange(currentQuestion.id, option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={handlePrevClick}
          disabled={currentQuestionIndex === 0}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        {currentQuestionIndex < questions.length - 1 ? (
          <button
            onClick={handleNextClick}
            disabled={selectedOptions.find(item => item.quizQuestionId === currentQuestion.id)?.selectedOption === undefined}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmitClick}
            disabled={selectedOptions.find(item => item.quizQuestionId === currentQuestion.id)?.selectedOption === undefined}
            className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default ViewQuiz;
