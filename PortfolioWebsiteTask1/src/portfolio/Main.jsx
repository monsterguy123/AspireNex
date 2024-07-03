import { useRef } from 'react';
import Navbar from './component/Navbar'
import Introduction from './component/Introduction'
import Skill from './component/Skill'
import PersonalProjects from './component/PersonalProjects';
import AboutMe from './component/AboutMe';
import ContactMe from './component/ContactMe';

const Main = () => {

  const skillsRef = useRef(null);
  const personalProjectsRef = useRef(null);
  const education = useRef(null);
  const aboutMe = useRef(null);
  const contactMe = useRef(null);

  return (
    <>
      <Navbar skillsRef={skillsRef} personalProjectsRef={personalProjectsRef} education={education} aboutMe={aboutMe} contactMe={contactMe}/>
      <Introduction />
      <Skill skillsRef={skillsRef} />
      <PersonalProjects personalProjectsRef={personalProjectsRef}/>
      <AboutMe aboutMe={aboutMe} education={education}/>
      <ContactMe contactMe={contactMe}/>
    </>
  );
}



export default Main;
