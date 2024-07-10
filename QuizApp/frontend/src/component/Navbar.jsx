import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-[90%] ml-20 h-20 shadow-lg bg-white rounded-lg flex items-center justify-between px-10 fixed top-5 z-10">
        <div className="flex items-center space-x-3">
          <h1 className="text-4xl text-fuchsia-800 underline font-serif font-extrabold">Quizzy</h1>
        </div>
        <div className="flex space-x-6">
          <Link to={'/home'}><p className="px-7 py-2 text-lg font-serif border-fuchsia-800 border-2 rounded-lg cursor-pointer hover:text-white hover:bg-fuchsia-800">Home</p></Link>
          <Link to={'/createquiz'}><p className="px-7 py-2 text-lg font-serif border-fuchsia-800 border-2 rounded-lg  cursor-pointer hover:text-white hover:bg-fuchsia-800">Create Quiz</p></Link>
          <Link to={'/mylist'}><p className="px-7 py-2 text-lg font-serif border-fuchsia-800 border-2 rounded-lg  cursor-pointer hover:text-white hover:bg-fuchsia-800">My List</p></Link>
        </div>
        <ul className="flex space-x-5">
          <Link to={'/signin'}>
            <button className="w-32 px-2 py-2 text-md text-center text-white font-semibold bg-fuchsia-800 hover:bg-white hover:border-fuchsia-800 hover:border-2 hover:text-black rounded-xl">Logout</button>
          </Link>
        </ul>
      </nav>
  );
}

export default Navbar
