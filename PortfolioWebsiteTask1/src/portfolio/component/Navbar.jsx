import { useState } from 'react';

const Navbar = ({
  skillsRef,
  personalProjectsRef,
  educationRef,
  aboutMeRef,
  contactMeRef,
  isDarkMode,
  setIsDarkMode,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Toggle dark mode class on the body or specific element
    document.documentElement.classList.toggle('dark');
  };

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <header>
      {/* Desktop Navbar */}
      <nav className="bg-white dark:bg-gray-900 dark:shadow-white shadow-md rounded p-4 flex justify-between fixed top-3 w-5/6 z-50">
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full"
            src="https://img.freepik.com/premium-vector/aggressive-alpine-majesty-goat-vector_1080480-1827.jpg"
            alt="Logo"
          />
          <p className="ml-2 text-xl font-bold font-serif text-gray-900 dark:text-white">
            Dev Folio
          </p>
        </div>

        <div className="hidden md:flex space-x-5">
          <button
            className="text-xl hover:bg-fuchsia-600 hover:text-white p-2 rounded cursor-pointer font-serif text-gray-900 dark:text-white"
            onClick={() => scrollToSection(skillsRef)}
          >
            SKILLS
          </button>
          <button
            className="text-xl hover:bg-fuchsia-600 hover:text-white p-2 rounded cursor-pointer font-serif text-gray-900 dark:text-white"
            onClick={() => scrollToSection(personalProjectsRef)}
          >
            PERSONAL PROJECTS
          </button>
          <button
            className="text-xl hover:bg-fuchsia-600 hover:text-white p-2 rounded cursor-pointer font-serif text-gray-900 dark:text-white"
            onClick={() => scrollToSection(educationRef)}
          >
            EDUCATION
          </button>
          <button
            className="text-xl hover:bg-fuchsia-600 hover:text-white p-2 rounded cursor-pointer font-serif text-gray-900 dark:text-white"
            onClick={() => scrollToSection(aboutMeRef)}
          >
            ABOUT ME
          </button>
          <button
            className="text-xl hover:bg-fuchsia-600 hover:text-white p-2 rounded cursor-pointer font-serif text-gray-900 dark:text-white"
            onClick={() => scrollToSection(contactMeRef)}
          >
            CONTACT ME
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="outline-none dark-mode-toggle"
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <svg
                className="w-6 h-6 text-gray-900 dark:text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 3v2m0 14v2m9-9h-2m-14 0H3m15.364-6.364l-1.414 1.414M6.364 17.364l-1.414 1.414M18.364 17.364l-1.414-1.414M6.364 6.364l-1.414-1.414"></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-900 dark:text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21.752 15.002A9.718 9.718 0 0112 21a9.718 9.718 0 01-9.752-5.998A9.719 9.719 0 0112 3a9.719 9.719 0 019.752 12.002z"></path>
              </svg>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            className="outline-none mobile-menu-button md:hidden"
            onClick={handleMobileMenuToggle}
            aria-label="Toggle Mobile Menu"
          >
            <svg
              className="w-6 h-6 text-gray-900 dark:text-white"
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
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} mobile-menu mt-14`}>
        <ul className="space-y-2 bg-white dark:bg-gray-800 shadow-lg rounded p-4">
          <li>
            <button
              className="text-xl hover:bg-fuchsia-600 hover:text-white p-2 rounded cursor-pointer w-full block font-serif text-gray-900 dark:text-white"
              onClick={() => {
                scrollToSection(skillsRef);
              }}
            >
              SKILLS
            </button>
          </li>
          <li>
            <button
              className="text-xl hover:bg-fuchsia-600 hover:text-white p-2 rounded cursor-pointer w-full block font-serif text-gray-900 dark:text-white"
              onClick={() => {
                scrollToSection(personalProjectsRef);
              }}
            >
              PERSONAL PROJECTS
            </button>
          </li>
          <li>
            <button
              className="text-xl hover:bg-fuchsia-600 hover:text-white p-2 rounded cursor-pointer w-full block font-serif text-gray-900 dark:text-white"
              onClick={() => {
                scrollToSection(educationRef);
              }}
            >
              EDUCATION
            </button>
          </li>
          <li>
            <button
              className="text-xl hover:bg-fuchsia-600 hover:text-white p-2 rounded cursor-pointer w-full block font-serif text-gray-900 dark:text-white"
              onClick={() => {
                scrollToSection(aboutMeRef);
              }}
            >
              ABOUT ME
            </button>
          </li>
          <li>
            <button
              className="text-xl hover:bg-fuchsia-600 hover:text-white p-2 rounded cursor-pointer w-full block font-serif text-gray-900 dark:text-white"
              onClick={() => {
                scrollToSection(contactMeRef);
              }}
            >
              CONTACT ME
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
