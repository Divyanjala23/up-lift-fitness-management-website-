import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BMICalculator from './components/BMICalculator';
import Signup from './components/Signup';
import Slider from './components/Slider';
import Login from './components/Login';
import Forum from './components/Forum';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<div><Slider /><BMICalculator /><Footer /></div>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/forum" element={<div><Forum /></div>}/>

      
      </Routes>
    </Router>
  );
}

export default App;
