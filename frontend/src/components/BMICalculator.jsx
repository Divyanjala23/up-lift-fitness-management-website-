import React, { useState } from 'react';
import '../index.css';

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');

  // Function to handle form submission
  const calculateBMI = (e) => {
    e.preventDefault();
    const heightInMeters = height / 100; // Convert height to meters
    const calculatedBMI = weight / (heightInMeters * heightInMeters);
    setBmi(calculatedBMI.toFixed(2));
    determineCategory(calculatedBMI);
  };

  // Function to determine BMI category
  const determineCategory = (calculatedBMI) => {
    if (calculatedBMI < 18.5) {
      setBmiCategory('Underweight');
    } else if (calculatedBMI >= 18.5 && calculatedBMI < 24.9) {
      setBmiCategory('Normal weight');
    } else if (calculatedBMI >= 25 && calculatedBMI < 29.9) {
      setBmiCategory('Overweight');
    } else {
      setBmiCategory('Obesity');
    }
  };

  // Function to reset the form
  const resetForm = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setBmiCategory('');
  };

  return (
    <div
      className="bmi-container"

    >
      <h2>BMI Calculator</h2>
      <form onSubmit={calculateBMI}>
        <div className="form-group">
          <label htmlFor="weight">Weight (kg):</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="height">Height (cm):</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
          />
        </div>
        <button type="submit">Calculate BMI</button>
        <button type="button" onClick={resetForm} style={{ marginLeft: '10px' }}>
          Reset
        </button>
      </form>

      {bmi && (
        <div className="bmi-result">
          <h3>Your BMI: {bmi}</h3>
          <p>Category: {bmiCategory}</p>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
