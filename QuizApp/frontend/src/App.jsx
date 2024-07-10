import './index.css'
import Landing from './component/landingPage/landing'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SignIn from './component/formPage/SignIn'
import SignUp from './component/formPage/SignUp'
import Home from './component/Home'
import CreateQuiz from './component/CreateQuiz'
import QuizQuestions from './component/QuizQuestions'
import MyList from './component/MyList'
import ViewQuiz from './component/ViewQuiz'
import ResultPage from './component/ResultPage'

export default function App(){
  return (
    <BrowserRouter>
       <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/createQuiz' element={<CreateQuiz/>}/>
        <Route path='/fillQuestions/:quizId' element={<QuizQuestions/>}/>
        <Route path='/mylist' element={<MyList/>}/>
        <Route path='/ViewQuiz/:quizId' element={<ViewQuiz/>}/>
        <Route path='/Result/:quizId' element={<ResultPage/>}/>
       </Routes>
    </BrowserRouter>
  )
}