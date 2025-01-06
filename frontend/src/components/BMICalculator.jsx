import React, { useState } from "react";
import "../assets/css/BMICalculator.css";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [bmi, setBMI] = useState(null);
  const [status, setStatus] = useState("");

  const calculateBMI = () => {
    if (!height || !weight) return;

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBMI(bmiValue);
    determineStatus(bmiValue);
  };

  const determineStatus = (bmiValue) => {
    if (bmiValue < 16) setStatus("Severely Underweight");
    else if (bmiValue < 17) setStatus("Underweight");
    else if (bmiValue < 18.5) setStatus("Normal");
    else if (bmiValue < 25) setStatus("Overweight");
    else if (bmiValue < 30) setStatus("Obese Class I");
    else if (bmiValue < 40) setStatus("Obese Class II");
    else setStatus("Obese Class III");
  };

  return (
    <div className="bmi-calculator">
      <h2>BMI Calculator</h2>
      <div className="input-group">
        <label>Height (cm)</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Enter height in cm"
        />
      </div>
      <div className="input-group">
        <label>Weight (kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter weight in kg"
        />
      </div>
      <div className="input-group">
        <label>Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter age"
        />
      </div>
      <button className="calculate-btn" onClick={calculateBMI}>
        Calculate
      </button>
      {bmi && (
        <div className="result">
          <h3>Your BMI: {bmi}</h3>
          <h4>Status: {status}</h4>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
