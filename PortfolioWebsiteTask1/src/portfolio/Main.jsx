import { useRef, useState } from 'react';
import Navbar from './component/Navbar';
import Introduction from './component/Introduction';
import Skill from './component/Skill';
import PersonalProjects from './component/PersonalProjects';
import AboutMe from './component/AboutMe';
import ContactMe from './component/ContactMe';

const Main = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const skillsRef = useRef(null);
  const personalProjectsRef = useRef(null);
  const educationRef = useRef(null);
  const aboutMeRef = useRef(null);
  const contactMeRef = useRef(null);


  return (
    <div>
      <Navbar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        skillsRef={skillsRef}
        personalProjectsRef={personalProjectsRef}
        educationRef={educationRef}
        aboutMeRef={aboutMeRef}
        contactMeRef={contactMeRef}
      />
      <Introduction />
      <Skill skillsRef={skillsRef} isDarkMode={isDarkMode} />
      <PersonalProjects personalProjectsRef={personalProjectsRef} />
      <AboutMe aboutMeRef={aboutMeRef} educationRef={educationRef} isDarkMode={isDarkMode} />
      <ContactMe contactMe={contactMeRef} />
    </div>
  );
}

export default Main;
