import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BMICalculator from './components/BMICalculator';
import Signup from './components/Signup';
import Slider from './components/Slider';





function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<div><Slider /><BMICalculator /><Footer /></div>} />
        <Route path="/" element={<Slider />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </Router>


  )
}

export default App
