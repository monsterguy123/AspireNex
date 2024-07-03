import React from 'react'
import chat from '../../assets/chat.png'
import medium from '../../assets/medium.png'
import societo from '../../assets/societo.png'
 
const PersonalProjects = ({personalProjectsRef}) => {

    const scrollToProjects = () => {
        personalProjectsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div ref={personalProjectsRef} className='mt-32 dark:bg-gray-900 p-10'>
             <h1 onClick={scrollToProjects} className='cursor-pointer text-5xl text-gray-400 underline font-bold font-serif text-center py-8'>
                PERSONAL PROJECTS
            </h1>
            <SocietoApp />
            <ChatKhulkar />
            <MyBlogWebsite/>
        </div>
    )
}

const SocietoApp = () => {
    return (
        <div className="h-auto w-[95%] ml-10 dark:shadow-white dark:shadow-md shadow-lg md:h-96 flex flex-col md:flex-row mt-10 ">
            <div className="md:w-1/2 mb-6 md:mb-0 md:mt-20 md:ml-20">
                <img className="rounded-lg shadow-md mx-auto md:mx-0" src={societo} alt="Societo App" />
            </div>
            <div className="w-full md:w-1/2 px-4 sm:px-6">
                <p className="block antialiased text-fuchsia-600 underline font-serif text-4xl font-bold leading-normal mb-4">SOCIETO APP </p>
                <p className="block antialiased font-mono text-base dark:text-white leading-relaxed text-black mb-8">Societo is a comprehensive society management app developed using React, TypeScript, Node.js, PostgreSQL, and Prisma. It features three roles: SuperAdmin, Secretary, and Member. Secretaries can manage members, create polls, send complaint notices, and request donations. Members can raise complaints, participate in polls, and receive notices. SuperAdmins oversee and create Secretaries.</p>
                <div className="flex flex-col md:flex-row md:items-center md:space-x-5">
                    <p className="mb-2 text-xl dark:text-white">Explore the project:</p>
                    <a href="https://github.com/monsterguy123/SocietoApp?tab=readme-ov-file" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900">
                        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className="w-6 h-6 fill-current">
                                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                            </svg>
                        </span>
                        <span className=" font-medium dark:text-white">Societo App</span>
                    </a>
                </div>
            </div>
        </div>
    );
};


const ChatKhulkar = () => {
    return (
        <div className="h-auto shadow-lg dark:shadow-white dark:shadow-md w-[95%] ml-10 md:h-96 flex flex-col md:flex-row mt-20">
            <div className="w-full md:w-1/2 px-4 sm:px-6">
                <div className="p-6 px-2 sm:pr-6 sm:pl-4">
                    <p className="block antialiased text-fuchsia-600 font-serif underline text-4xl font-bold leading-normal mb-4">CHAT KHULKAR</p>
                    <p className="block antialiased font-mono text-base leading-relaxed text-black dark:text-white mb-8">CHAT KHULKAR is a dynamic and interactive chat application built using Node.js, React.js, PostgreSQL, Prisma, Express, and Socket.io. It offers seamless real-time communication with the ability to create group chats for collaborative conversations. Users can send friend requests and engage in one-on-one chats with their friends, ensuring personalized interactions.</p>
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-5">
                        <p className="mb-2 text-xl dark:text-white">Explore the project:</p>
                        <a href="https://github.com/monsterguy123/CHAT-KHULKAR" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900">
                            <span className="flex items-center justify-center w-10 h-10  rounded-full bg-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className="w-6 h-6 fill-current">
                                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                                </svg>
                            </span>
                            <span className="font-medium dark:text-white">Chat Khulkar App</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/2 px-4 sm:px-6 mt-6 md:mt-0">
                <img className="rounded-lg shadow-md mt-10 mx-auto md:ml-auto" src={chat} alt="Chat Khulkar" />
            </div>
        </div>
    );
};


const MyBlogWebsite = () => {
    return (
        <div className="flex flex-col  dark:shadow-white dark:shadow-md w-[95%] ml-10  md:flex-row mt-20 shadow-lg">
            <div className="w-full md:w-1/2 px-4 sm:px-6">
                <div className="p-6 px-2 sm:pr-6 sm:pl-4">
                    <p className="block antialiased text-fuchsia-600 font-serif text-4xl font-bold leading-normal mb-4">MEDIUM CLONE</p>
                    <p className="block antialiased font-mono text-base leading-relaxed text-black dark:text-white mb-8">Welcome to MediumBlogWebsite, powered by Node.js, React, and MongoDB. Securely sign in using JWT and bcrypt. Create engaging blogs, explore diverse categories, and manage personal posts. Enjoy interactive features like commenting and the ability to delete your blogs. The platform offers a user-friendly interface, catering to both writers and readers.</p>
                    <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-5">
                        <p className="mb-2 text-xl dark:text-white">Explore the project:</p>
                        <a href="https://github.com/monsterguy123/MediumBlogWebsite" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900">
                            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className="w-6 h-6 fill-current">
                                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                                </svg>
                            </span>
                            <span className="font-medium dark:text-white">Medium Blog Website</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="w-full  md:w-1/2 px-4 sm:px-6 mt-6 md:mt-0">
                <img className="rounded-lg shadow-md mt-10 mx-auto" src={medium} alt="Medium Blog Website" />
            </div>
        </div>
    );
};



export default PersonalProjects;