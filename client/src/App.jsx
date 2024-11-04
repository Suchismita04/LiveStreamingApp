import './App.css'
import SignUp from './pages/SignUp'
import {BrowserRouter as  Route,Router,Routes} from 'react-router-dom'
import LogIn from './pages/LogIn.jsx'
import Nav from './components/Nav.jsx'

function App() {


  return (
    <>
    <Nav/>
    <SignUp/>
    {/* <Router>
      <Routes>
        <Route path='/Login' element={<LogIn/>}/>
      </Routes>
    </Router> */}
     
    </>
  )
}



export default App
