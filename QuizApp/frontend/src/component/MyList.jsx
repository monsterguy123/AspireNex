import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';


const MyList = () => {
    
  const [myQuiz,setMyQuiz] = useState([]);

  const fetch = async ()=>{
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/api/v1/quiz/myQuiz',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if(res){
        setMyQuiz(res.data.myQuiz)
      }
  }

  useEffect(()=>{
      fetch()
  },[])

  return (
<>
 <Navbar/>
     <div className='bg-gray-100 min-h-screen p-8'>
        <div className="max-w-6xl mx-auto mt-20">
        <Section title="All My Quizziz" items={myQuiz} />
      </div>
    </div>
  </>
  )
}

const Section = ({ title, items }) => (
    <div className="">
      <div className="text-center mt-28 mb-10">
        <h2 className="text-5xl font-serif font-bold text-fuchsia-800">{title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {items.map((item, index) => (
          <Link to={`/viewQuiz/${item.id}`}><Card key={index} item={item} /></Link>
        ))}
      </div>
    </div>
  );
  
  const Card = ({ item }) => (
    <div className="bg-white rounded-lg w-56 cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col justify-between">
      <img className="h-36 bg-purple-100 flex items-center justify-center text-4xl rounded-t-lg" src={item.img}/>
      <div className="mt-4 flex-1 flex flex-col justify-between">
        <span className="text-xl font-serif font-semibold text-black">{item.title}</span>
        <h3 className="mt-2 text-sm font-semibold text-green-600">{item.description}</h3>
        <p className="mt-1 text-sm text-gray-600">{item.category}</p>
      </div>
    </div>
  );

export default MyList