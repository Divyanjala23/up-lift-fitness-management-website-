import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BMICalculator from './components/BMICalculator';



import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <Header />
    
    <Routes>
        <Route path="/" element={<div><Slider /><BMICalculator/><Footer/></div>} />
    </Routes>
    </Router>


  )
}

export default App
