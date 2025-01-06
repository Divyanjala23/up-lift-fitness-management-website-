// Import React and other necessary libraries
import React from 'react';
import '../assets/css/Service.css'

const Service = () => {
    return (
      <section className="services-area pt-100 pb-150">
        <div className="container">
          <div className="section-header">
            <h2>Our Services</h2>
            <p>Explore the features we offer to support your fitness journey.</p>
          </div>
          <div className="services-list">
            {services.map((service, index) => (
              <div key={index} className="service-item">
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <button className="service-button">Learn More</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  const services = [
    {
      icon: 'flaticon-user',
      title: 'Personalized Accounts',
      description: 'Members can sign up and track their progress.',
    },
    {
      icon: 'flaticon-coach',
      title: 'Coach Integration',
      description: 'Coaches provide expert guidance and meal plans.',
    },
    {
      icon: 'flaticon-progress',
      title: 'Progress Tracking',
      description: 'Monitor workouts and stay on target.',
    },
    {
      icon: 'flaticon-calculator',
      title: 'BMI Calculator',
      description: 'Easily calculate and understand your Body Mass Index.',
    },
    {
      icon: 'flaticon-community',
      title: 'Community Forum',
      description: 'Connect with others, share experiences, and seek motivation.',
    },
    {
      icon: 'flaticon-subscription',
      title: 'Subscription Service',
      description: 'Access premium features and personalized plans with flexible subscriptions.',
    },
    {
      icon: 'flaticon-video',
      title: 'Video Tutorials',
      description: 'Access video guidance and tutorials to perform exercises correctly and safely.',
    },
  ];
  
  export default Service;