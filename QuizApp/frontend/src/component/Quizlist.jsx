import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';

const QuizList = () => {
  const [fetchAllCategories, setFetchAllCategories] = useState([]);

  const fetch = async () => {
    const token = localStorage.getItem('token');
    const array = ["Science and Technology", "Political Science", "History and Geography", "Mathematics", "General Knowledge", "Others"];

    try {
      const requests = array.map( async item => {
        const category = item.replace(/\s+/g, '');
        return axios.get(`http://localhost:8080/api/v1/quiz/QuizCategories/${category}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(response => ({ category: item, Quiz: response.data.Quiz }));
      });

      const results = await Promise.all(requests);
      setFetchAllCategories(results);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className='text-center mt-28'>
        <h1 className='text-custom-purple text-4xl font-serif font-bold'>Join the Quiz and Compete with Other Players</h1>
      </div>

      <div className="max-w-6xl mx-auto mt-10">
        {fetchAllCategories.map(({ category, Quiz }, index) => (
          <Section key={index} title={category} items={Quiz} />
        ))}
      </div>
    </div>
  );
};

const Section = ({ title, items }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <>
      {items.length > 0 && (
        <div className="mt-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          </div>
          <div className="mt-5">
            {items.length > 4 ? (
              <Slider {...settings}>
                {items.map((item, index) => (
                  <div key={index} className="p-2">
                    <Card item={item} />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="grid grid-cols-1  mb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {items.map((item, index) => (
                  <div key={index} className="mb-4 sm:mb-0">
                    <Card item={item} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const Card = ({ item }) => (
  <Link to={`/viewQuiz/${item.id}`}><div className="bg-white w-72 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 px-8 py-6 flex flex-col justify-between mb-10">
    <div className="h-40 bg-purple-100 flex items-center justify-center text-4xl rounded-t-lg">
      <img src={item.img} />
    </div>
    <div className="mt-4 flex-1 flex flex-col justify-between">
      <h3 className="mt-2 text-xl font-semibold text-gray-800 font-serif">{item.title}</h3>
      <h3 className="mt-2 text-sm font-semibold text-green-400">{item.description}</h3>
    </div>
  </div>
  </Link>
);

export default QuizList;
