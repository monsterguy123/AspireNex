import React from 'react';
import deepak from '../../assets/deepak.png';
import deepak2 from '../../assets/deepak2.png';
import bvmbasma from '../../assets/bvmbasma.jpeg';
import msi from '../../assets/msi.jpg';

const AboutMe = ({ aboutMeRef, educationRef ,isDarkMode}) => {
  return (
    <>
      <div ref={educationRef} className="h-auto dark:bg-gray-900 mt-16 mb-16 box-border ">
        <h1 className="text-5xl mt-20 text-gray-400 underline font-bold font-serif text-center py-8">EDUCATION</h1>
        <div className="mt-10 h-auto justify-center flex flex-col items-center space-y-10 md:flex-row md:space-x-10 md:space-y-0 md:justify-center md:items-start">
          <Education />
        </div>
        <div ref={aboutMeRef}>
          <h1 className="text-5xl mt-40 text-gray-400 underline font-bold font-serif text-center py-8">ABOUT ME</h1>
          </div>
        <div id="about" className="relative bg-white dark:bg-gray-900 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white dark:bg-gray-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              
              {
                isDarkMode?null:<>
                <svg
                className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 dark:bg-gray-900 text-white transform translate-x-1/2"
                fill="currentColor"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polygon points="50,0 100,0 50,100 0,100" ></polygon>
              </svg>
                </>
              }
              <main className="mt-10 mx-auto max-w-7xl dark:bg-gray-900 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h2 className="my-6 text-3xl tracking-tight font-extrabold text-rose-400 sm:text-4xl md:text-5xl">
                    DEEPAK BISHT
                  </h2>

                  <p className="text-lg text-gray-700 leading-relaxed dark:text-white">
                    I graduated with a Bachelor's degree in Computer Applications from Maharaja Surajmal Institute and completed my schooling at Balvantary Mehta Vidya Bhawan.
                    Beyond coding, I love talking to people, learning new languages, and exploring new places. As a foodie, I enjoy trying different cuisines and experiencing the diverse flavors they offer.
                    My passion for web development is driven by my desire to continuously learn and innovate. I'm always eager to take on new challenges and collaborate with others to create impactful solutions.
                  </p>
                </div>
              </main>
            </div>
          </div>
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          {
            isDarkMode?<>
             <img className="h-72 rounded-xl md:h-72 lg:ml-20  lg:h-full  w-110" src={deepak2} alt="Deepak Bisht" />
            </>:<>
            <img className="h-72  rounded-xl md:h-96 lg:h-full object-cover object-top w-full" src={deepak} alt="Deepak Bisht" />
            </>
          }
          </div>
        </div>
      </div>
    </>
  );
};


const Education = () => {
  return (
    <>
      <div className="space-y-10 justify-center md:space-y-0 md:flex md:space-x-10">
        <div className="w-full md:w-1/2">
          <article className="overflow-hidden dark:shadow-lg dark:shadow-white rounded-lg  shadow hover:shadow-lg">
            <img alt="Balvantary Mehta Vidya Bhawan" src={bvmbasma} className="h-56 w-full object-cover" />
            <div className="bg-white p-4 sm:p-6 dark:bg-gray-900">
              <time className="block text-xs text-gray-500 dark:text-white">April 2020 to March 2021</time>
              <a href="#" className="block mt-1.5 text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600">
                BALVANTARY MEHTA VIDHYA BHAWAN
              </a>
              <p className="mt-2 text-sm text-gray-600 dark:text-white">
                <span className="block dark:text-white">10th - 80%</span>
                <span className="block dark:text-white">12th - 80%</span>
              </p>
            </div>
          </article>
        </div>
        <div className="w-full md:w-1/2">
          <article className="overflow-hidden dark:shadow-lg dark:shadow-white rounded-lg shadow hover:shadow-lg">
            <img alt="Maharaja Surajmal Institute" src={msi} className="h-56  w-full object-cover"/>
            <div className="bg-white p-4 sm:p-6 dark:bg-gray-900">
              <time  className="block text-xs text-gray-500 dark:text-white">August 2021 to July 2024</time>
              <a href="#" className="block mt-1.5 text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600">
                  MAHARAJA SURAJMAL INSTITUTE
              </a>
              <p className="mt-2 text-sm text-gray-600 dark:text-white">
                Bachelor of Computer Application
                <span className="block dark:text-white">CGPA - 8.5</span>
              </p>
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default AboutMe;