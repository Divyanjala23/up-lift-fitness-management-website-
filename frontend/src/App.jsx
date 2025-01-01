import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BMICalculator from './components/BMICalculator';
import Signup from './components/Signup';
import Slider from './components/Slider';
import Login from './components/Login';
import Forum from './components/Forum';
import About from './components/About';
<<<<<<< HEAD
=======

>>>>>>> 7ddbd9a28e129308c3a6aa4045d71a533516166e
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<div><Slider /><BMICalculator /><Footer /></div>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/forum" element={<div><Forum /></div>}/>
        <Route path="/about" element={<div><About /></div>}/>

      
      </Routes>
    </Router>
  );
}

export default App;
