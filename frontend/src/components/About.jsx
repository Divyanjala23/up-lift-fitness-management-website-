import React from "react";
import "../assets/css/about.css";

const About = () => {
  return (
    <div className="about-main">
      <div className="containerA">
        <h1 className="about-header">Welcome to Uplift</h1>
        <p className="about-text">
          At <strong>Uplift</strong>, we are dedicated to helping you achieve your fitness goals and live a healthier, happier life. Our mission is to provide a welcoming and motivating environment for everyone—whether you're a seasoned athlete or just starting your fitness journey.
        </p>

        <h2 className="about-subheader">Who We Are</h2>
        <p className="about-text">
          Established in 2023, Uplift is more than just a gym. We are a community of fitness enthusiasts who believe in the power of transformation. With state-of-the-art facilities, experienced coaches, and a variety of classes, we are here to uplift your body, mind, and spirit.
        </p>

        <h2 className="about-subheader">What We Offer</h2>
        <ul className="about-list">
          <li>Modern gym equipment for all fitness levels</li>
          <li>Personalized training programs</li>
          <li>Group fitness classes including yoga, HIIT, and Zumba</li>
          <li>Nutritional guidance and meal planning</li>
          <li>A supportive and inspiring community</li>
        </ul>

        <h2 className="about-subheader">Our Vision</h2>
        <p className="about-text">
          We envision a world where fitness is accessible, enjoyable, and empowering for everyone. At Uplift, we aim to create a space where you can challenge yourself, celebrate progress, and build a lifestyle of wellness.
        </p>

        <h2 className="about-subheader">Join Us Today!</h2>
        <p className="about-text">
          Ready to take the first step toward a stronger, healthier you? Come and experience the Uplift difference. Let us help you reach new heights!
        </p>
      </div>
    </div>
  );
};

export default About;
