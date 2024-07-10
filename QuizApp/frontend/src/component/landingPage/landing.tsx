import React from 'react'
import { Link } from 'react-router-dom'
import SubSection from './SubSection'
import ContactMe from './ContactMe'

const Landing = () => {
  return (
    <>
       <nav className="w-full  h-20  shadow-sm shadow-gray-600 rounded-sm">
        <div className="flex ml-10 space-x-3">
          <h1 className="text-5xl mt-4 text-fuchsia-800 underline font-serif font-extrabold">Quizzy</h1>
        </div>
        <ul className="flex justify-end space-x-5 -mt-10 mr-10">
          <Link to={'/signin'}><button className="block w-32 px-2 py-2 mb-3 text-md text-center font-semibold  bg-gray-200 hover:bg-gray-100 rounded-xl" >Sign in</button></Link>
          <Link to={'/signup'}><button className="block w-32 px-2 py-2 mb-2  text-md text-center text-white font-semibold bg-fuchsia-800 hover:bg-fuchsia-700  rounded-xl" >Sign Up</button></Link>
        </ul>
      </nav>
      <div className="bg-custom-purple text-white h-110 flex flex-col justify-center items-center p-8">
        <div className="text-center w-[60%]">
          <h1 className="text-6xl ml-20 font-bold flex">
            Free online <span className="flex text-yellow-500 underline decoration-yellow-700">
              <img className='w-32 h-32 -mt-12 rounded-full' src='https://cdn-icons-png.flaticon.com/512/7710/7710638.png' />
              Quiz maker</span>
          </h1>
          <p className="mt-4 text-2xl">
            Make a quiz with different question types to engage students in a classroom, train employees at work, or play trivia with friends.
          </p>
          <button className="mt-6 bg-gray-100 text-custom-purple text-xl underline font-bold px-6 py-3 rounded-lg shadow-lg transform transition-transform hover:scale-105">
            Create a quiz
          </button>
        </div>
      </div>
      <SubSection/>
       <ContactMe/>
    </>
  )
}

export default Landing