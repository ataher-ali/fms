import { Routes, Route, Link } from 'react-router-dom';
import Nav from './Components/NavBar/Nav';
import Home from './Pages/Home/Home';
import About from './Components/About/About';
import Login from './Pages/Login/Login';
import Signup from './Pages/Login/Signup';
import Dashboard from './Dashboard';
import Footer from './Components/NavBar/Footer';
import PrivateRoute from './Auth/PrivateRoute';
import Error from './Pages/Error/Error';
import ForgotPassword from './Pages/Login/ForgotPassword';


const App = () => {
  

  return (

    <div>
      <Nav></Nav>



      <div className=" ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Error/>} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/ForgotPassword" element={<ForgotPassword/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/dashboard" element={ <PrivateRoute> <Dashboard/> </PrivateRoute> } />
        </Routes>
      </div>

      <Footer/>
    </div>
    );
};

export default App;