import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';

const ResultPage = () => {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [result, setResult] = useState([]);
  const [LeaderBoard, setLeaderBoard] = useState([]);
  const { quizId } = useParams();

  useEffect(() => {
    setShowHelpModal(true);
  }, []);

  const fetch = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/quiz/result/${quizId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setResult(res.data.Result);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  const leaderboard = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/quiz/leaderboard/${quizId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res) {
        // Sort the leaderboard by score in descending order
        const sortedLeaderBoard = res.data.Scores.sort((a, b) => b.Score - a.Score);
        setLeaderBoard(sortedLeaderBoard);
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  useEffect(() => {
    fetch();
    leaderboard();
  }, [quizId]);

  const toggleHelpModal = () => {
    setShowHelpModal(!showHelpModal);
  };

  return (
    <>
      <Navbar />
      <div className='flex flex-col md:flex-row min-h-screen bg-gray-100 p-4 md:p-8'>
        <div className='w-full md:w-[70%] mt-20 p-4'>
          <h1 className='text-4xl text-center font-serif mt-10 mb-5 underline'>Quiz Result</h1>
          <div className="quiz-questions">
            <div className="overflow-auto rounded-lg max-h-[450px] bg-white p-5">
              <div className="flex justify-end mb-2">
                <button
                  className="px-3 py-1 text-sm text-gray-600 bg-gray-200 rounded-md"
                  onClick={toggleHelpModal}
                >
                  Show Help
                </button>
              </div>
              <div className="questions-list">
                {result.map((item, index) => (
                  <div key={index} className="question border-b border-gray-200 py-4">
                    <h3 className="text-lg font-semibold mb-2">{item.QuizQuestions.question}</h3>
                    <ul className="space-y-2">
                      {item.QuizQuestions.options.map((option, key) => {
                        let bgColor = 'bg-gray-100 text-gray-800';
                        if (option === item.QuizQuestions.answer || option === item.markedAnswer) {
                          if (item.QuizQuestions.answer === item.markedAnswer) {
                            bgColor = 'bg-green-100 text-green-800';
                          } else {
                            bgColor = option === item.QuizQuestions.answer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
                          }
                        }
                        return (
                          <li
                            key={key}
                            className={`py-1 px-4 rounded-lg ${bgColor}`}
                          >
                            {option}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-20 p-4'>
          <h1 className='text-3xl text-center font-serif mt-10 underline'>Leaderboard</h1>
          <div className="mt-6 overflow-auto max-h-[450px]">
            <table className="min-w-full mx-auto bg-white shadow-lg rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4">User</th>
                  <th className="py-2 px-4">Image</th>
                  <th className="py-2 px-4">Score</th>
                </tr>
              </thead>
              <tbody>
                {LeaderBoard.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-2 px-4">{item.User.name}</td>
                    <td className="py-2 px-4">
                      <img src={item.User.img} className="w-10 h-10 rounded-full" alt="User" />
                    </td>
                    <td className="py-2 px-4">{item.Score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal isOpen={showHelpModal} onClose={toggleHelpModal}>
        <p className="text-lg text-gray-800">
          1. Correct Answer is marked Green<br />
          2. If your marked option is wrong, it will be highlighted Red<br />
          3. If your marked answer is correct, you will only see one color, i.e., Green
        </p>
      </Modal>
    </>
  );
};

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Help Information</h2>
          <button className="text-gray-500 hover:text-gray-800" onClick={onClose}>
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M13.414 10l5.293 5.293a1 1 0 0 1-1.414 1.414L12 11.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 10 5.293 4.707a1 1 0 0 1 1.414-1.414L12 8.586l5.293-5.293a1 1 0 0 1 1.414 1.414L13.414 10z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ResultPage;
