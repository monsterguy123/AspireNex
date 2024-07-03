import React, { useState } from 'react';

const Navbar = ({ skillsRef, personalProjectsRef, education, aboutMe, contactMe }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToSkills = () => {
    console.log('Scrolling to Skills');
    scrollToSection(skillsRef);
  };

  const handleScrollToPersonalProjects = () => {
    console.log('Scrolling to Personal Projects');
    scrollToSection(personalProjectsRef);
  };

  const handleScrollToEducation = () => {
    console.log('Scrolling to Education');
    scrollToSection(education);
  };

  const handleScrollToAbout = () => {
    console.log('Scrolling to About Me');
    scrollToSection(aboutMe);
  };

  const handleScrollToContact = () => {
    scrollToSection(contactMe);
  };
 

  return (
    <div>
      {/* Desktop Navbar */}
      <nav className="bg-white shadow-lg rounded p-4 flex justify-between fixed top-3 w-5/6 z-50">
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full"
            src="https://img.freepik.com/premium-vector/aggressive-alpine-majesty-goat-vector_1080480-1827.jpg"
            alt="Logo"
          />
          <p className="ml-2 text-xl font-bold font-serif">Dev Folio</p>
        </div>

        <div className="hidden md:flex space-x-5">
          <button className="text-xl hover:bg-fuchsia-600 hover:text-white p-2 rounded cursor-pointer font-serif" onClick={handleScrollToSkills}>SKILLS</button>
          <button className="text-xl hover:bg-fuchsia-600 hover:text-white p-2 rounded cursor-pointer font-serif" onClick={handleScrollToPersonalProjects}>PERSONAL PROJECTS</button>
          <button className="text-xl hover:bg-fuchsia-600 hover:text-white p-2 rounded cursor-pointer font-serif" onClick={handleScrollToEducation}>EDUCATION</button>
          <button className="text-xl hover:bg-fuchsia-600 hover:text-white p-2 rounded cursor-pointer font-serif" onClick={handleScrollToAbout}>ABOUT ME</button>
          <button className="text-xl hover:bg-fuchsia-600 hover:text-white p-2 rounded cursor-pointer font-serif" onClick={handleScrollToContact}>CONTACT ME</button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex">
          <button className="outline-none mobile-menu-button" onClick={handleMobileMenuToggle}>
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} mobile-menu mt-16`}>
        <ul className="space-y-2 bg-white shadow-lg rounded p-4">
          <li>
            <button className="text-xl hover:bg-fuchsia-600 hover:text-white p-2 rounded cursor-pointer w-full block font-serif" onClick={handleScrollToSkills}>SKILLS</button>
          </li>
          <li>
            <button className="text-xl hover:bg-fuchsia-600 hover:text-white p-2 rounded cursor-pointer w-full block font-serif" onClick={handleScrollToPersonalProjects}>PERSONAL PROJECTS</button>
          </li>
          <li>
            <button className="text-xl hover:bg-fuchsia-600 hover:text-white p-2 rounded cursor-pointer w-full block font-serif" onClick={handleScrollToEducation}>EDUCATION</button>
          </li>
          <li>
            <button className="text-xl hover:bg-fuchsia-600 hover:text-white p-2 rounded cursor-pointer w-full block font-serif" onClick={handleScrollToAbout}>ABOUT ME</button>
          </li>
          <li>
            <button className="text-xl hover:bg-fuchsia-600 hover:text-white p-2 rounded cursor-pointer w-full block font-serif" onClick={handleScrollToContact}>CONTACT ME</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
