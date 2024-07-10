import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [photoName, setPhotoName] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoName(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('img', photoName);
    formData.append('description', description);

    const token = localStorage.getItem('token');
    try {
      const res = await axios.post('http://localhost:8080/api/v1/quiz/createQuiz', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.status === 201) {
        setCategory('');
        setPhotoName(null);
        setPhotoPreview(null);
        setTitle('');
        navigate(`/fillQuestions/${res.data.quizId}`);
      } else {
        setErrors({ general: 'Failed to create quiz. Please try again.' });
      }
    } catch (error) {
      setErrors({ general: error.response?.data?.msg || 'Something went wrong. Please try again.' });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg mt-20">
          {errors.general && <p className="text-red-600 text-center">{errors.general}</p>}
          <form className="space-y-6" onSubmit={submitHandler}>
            <div className="col-span-6 ml-2 sm:col-span-4 md:mr-3">
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <label className="block text-gray-700 text-2xl font-bold mb-2 text-center" htmlFor="photo">
                Quiz Questions
              </label>
              <div className="text-center">
                {!photoPreview ? (
                  <div className="mt-2">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/003/234/177/original/science-text-icon-with-elements-free-vector.jpg"
                      className="w-62 h-40 m-auto rounded-lg shadow"
                      alt="Default Quiz"
                    />
                  </div>
                ) : (
                  <div className="mt-2">
                    <span
                      className="block w-40 h-40 rounded-full m-auto shadow"
                      style={{
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                        backgroundImage: `url(${photoPreview})`,
                      }}
                    />
                  </div>
                )}
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 mt-2 ml-3"
                  onClick={handleClick}
                >
                  Select New Photo
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="quiz-title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                id="quiz-title"
                name="quiz-title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2`}
                placeholder="Quiz Title"
                aria-label="Quiz Title"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>
            <div>
            <label htmlFor="quiz-title" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                id="quiz-desc"
                name="quiz-dec"
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2`}
                placeholder="Quiz Title"
                aria-label="Quiz Title"
              />
            </div>
            <div>
              <label htmlFor="quiz-category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="quiz-category"
                name="quiz-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full rounded-lg border ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                } px-3 py-2 mt-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              >
                <option value="">Select Category</option>
                <option>Science and Technology</option>
                <option>Political Science</option>
                <option>History and Geography</option>
                <option>Mathematics</option>
                <option>General Knowledge</option>
                <option>Others</option>
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 font-serif border-2 border-fuchsia-900 hover:bg-fuchsia-700 hover:text-white text-lg font-semibold rounded-md mt-4"
              >
                Create Quiz
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateQuiz;
