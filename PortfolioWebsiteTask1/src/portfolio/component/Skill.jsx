import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import skill from '../../assets/skill.png'

const skills = [
  { id: 1, src: 'https://logos-download.com/wp-content/uploads/2019/01/JavaScript_Logo.png', alt: 'JavaScript', width: 'w-16', height: 'h-16' },
  { id: 2, src: 'https://logospng.org/download/typescript/typescript-4096.png', alt: 'TypeScript', width: 'w-16', height: 'h-16' },
  { id: 3, src: 'https://coryrylan.com/assets/images/posts/types/react-800x800.png', alt: 'React', width: 'w-16', height: 'h-16' },
  { id: 4, src: 'https://d33wubrfki0l68.cloudfront.net/7acada89f32ae092f7d4b53fd675dbd32b616f9f/868c7/static/fb8aa1bb70c9925ce1ae22dc2711b343/46604/nextjs-logo.png', alt: 'Next.js', width: 'w-24', height: 'h-24' },
  { id: 5, src: 'https://stusolution.mn/en/assets/img/brand/node.jpg', alt: 'Node.js', width: 'w-16', height: 'h-16' },
  { id: 6, src: 'https://logicmojo.com/assets/dist/new_pages/images/C++Logo.png', alt: 'C++', width: 'w-16', height: 'h-16' },
  { id: 7, src: 'https://cdn.sanity.io/images/ti7si9cx/production/974d10349641023260fa8089d89d674050e7ea98-1024x683.png?rect=0,56,1024,573&w=500&h=280', alt: 'Prisma', width: 'w-24', height: 'h-16' },
  { id: 8, src: 'https://th.bing.com/th/id/OIP.6pLWWA3aD7z2GozLFuDQKgHaHp?rs=1&pid=ImgDetMain', alt: 'Express', width: 'w-16', height: 'h-16' },
  { id: 9, src: 'https://logodix.com/logo/2090013.jpg', alt: 'PostgreSQL', width: 'w-24', height: 'h-24' },
  { id: 10, src: 'https://th.bing.com/th/id/OIP.3lerszXonPy2hvSP1jkh9wHaHK?rs=1&pid=ImgDetMain', alt: 'MongoDB', width: 'w-40', height: 'h-40' },
  { id: 11, src: 'https://th.bing.com/th/id/OIP.0BiOdEjaqaZtepF9AvlYXwAAAA?rs=1&pid=ImgDetMain', alt: 'Docker', width: 'w-40', height: 'h-40' }
];

const Skill = ({ skillsRef }) => {
  useEffect(() => {
    const images = document.querySelectorAll('.skill-image');

    if (images.length > 0) {
      images.forEach((image) => {
        const delay = Math.random() * 2; 
        const duration = Math.random() * 2 + 1; 

        image.style.animation = `scale ${duration}s ease-in-out ${delay}s infinite alternate`;
      });
    }
  }, []);

  return (
    <div ref={skillsRef}  className='mt-28 dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='lg:flex lg:items-center lg:justify-between'>
          <div className='w-[50%] md:w-5/6 lg:w-5/6 hidden md:block'>
            <img className='mt-8 mx-auto lg:mt-0' src='https://cdni.iconscout.com/illustration/premium/thumb/programming-language-9561033-7706464.png' alt='Cover' loading='lazy' />
          </div>
          <div className='lg:w-[60%] mt-10 lg:mt-0'>
            <h1 className='text-4xl sm:text-5xl lg:text-5xl text-gray-400 underline font-bold font-serif text-center py-8'>MY TOP SKILLS</h1>
            <div className='flex flex-wrap justify-center space-x-10'>
              {skills.map((skill) => (
                <img key={skill.id} className={`${skill.width} ${skill.height} sm:w-20 sm:h-20 rounded-md mt-4 mx-2 skill-image`} src={skill.src} alt={skill.alt} loading='lazy' />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Skill.propTypes = {
  skillsRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
};

export default Skill;
