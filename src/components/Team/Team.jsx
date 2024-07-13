import React from 'react';
import './Team.scss';
import logo from '../../assets/rookus-logo.jpg'; // Ensure this path is correct
import aditya from '../../assets/adi.jpg'; // Ensure this path is correct
import nikhil from '../../assets/nik.jpg'; // Add appropriate image files
import aryan from '../../assets/ry.jpg'; // Add appropriate image files
import samina from '../../assets/samina.jpg'; // Add appropriate image files
import shubhraneel from '../../assets/shubh.jpg'; // Add appropriate image files

const TeamMember = ({ image, name, role, description, email, linkedIn }) => {
  return (
    <div className="team-member">
      <img src={image} alt={name} className="member-image" />
      <div className="member-details">
        <div className="member-info">
          <span className="member-name">{name}</span>
          <span className="member-role">{role}</span>
        </div>
        <p className="member-description">{description}</p>
        <p className="member-contact">
          <span>Email: <a href={`mailto:${email}`}>{email}</a></span>
          <span>LinkedIn: <a href={linkedIn} target="_blank" rel="noopener noreferrer">View Profile</a></span>
        </p>
      </div>
    </div>
  );
};

const Team = () => {
  const members = [
    {
      image: nikhil,
      name: 'Nikhil Verma',
      role: 'Cofounder',
      description: 'Started as a Tech Project,Nikhil is assigned with building the interface of Rookus. Currently, he manages the application development, the business, and software development lifecycle at Rookus. He is involved with management of Rookus, organizing tasks, and interface development.',
      email: 'nikhil@rookus.in',
      linkedIn: 'https://www.linkedin.com/in/nikhil-verma-3bb969201/'
    },
    {
      image: aditya,
      name: 'Aditya Gaur',
      role: 'Cofounder',
      description: 'Rookus was the brainchild of Aditya who developed the first concept model. Aditya is the brain of Rookus who develops new concept models using deep learning. His models have been recognized by many engineers at Flipkart, Google, CERN, and other big institutions.',
      email: 'gaur3009@gmail.com',
      linkedIn: 'https://www.linkedin.com/in/aditya-singh-gaur-8356ba229/'
    },
    {
      image: aryan,
      name: 'Aryan Raj Saxena',
      role: 'Founding Member',
      description: 'Aryan is the best coder of our team who solves the tech challenges and currently holds the position of CTO. Aryan is involved with handling the backend, server management, analytics, and other technical tasks. Like the hackathon days, he is always the best problem solver of the team.',
      email: 'aryanraj052002@gmail.com',
      linkedIn: 'https://www.linkedin.com/in/aryan-raj-7b1100227/'
    },
    {
      image: samina,
      name: 'Samina Parveen',
      role: 'Founding Member',
      description: 'The youngest on the team, Samina has been handling challenges effortlessly. Being a young entrepreneur, she brings her talent onboard with her sharp knowledge on market, business, and strategical insights. Her experience with InertiaTeens serves her immensely in handling the content, design, and marketing at Rookus.',
      email: 'saminaparveen2005@gmail.com',
      linkedIn: 'https://www.linkedin.com/in/samina-parveen-81a9ba204/'
    },
    {
      image: shubhraneel,
      name: 'Shubhraneel',
      role: 'Founding member',
      description: 'Our trump card "Neel" has been one of the finest additions to the team. His ability to learn any set of skills within a limited time and his ability to adapt to any tech stack has been pivotal in the development of our team. Shubhraneel currently manages the frontend development and designing but surely he will give the team a knack for more.',
      email: 'wow.sng@gmail.com',
      linkedIn: 'https://www.linkedin.com/in/shubhraneel-gupta-a56092264/'
    },
  ];

  return (
    <div className="team-section">
      <div className="header">
        <img src={logo} alt="Rookus Logo" className="logo" />
        <h2>About Rookus</h2>
      </div>
      <div className="about">
        <p>
          Welcome to our team page! We are a group of dedicated professionals committed to delivering the best results.
          Our diverse team brings a wealth of experience and expertise to every project we undertake. We believe in
          collaboration, innovation, and excellence in everything we do.
        </p>
        <p>
          Our team is composed of talented individuals from various fields, each bringing unique skills and perspectives
          to the table. From software development to project management, our combined expertise allows us to tackle any
          challenge and deliver exceptional outcomes.
        </p>
      </div>
      <div className="team">
        {members.map((member, index) => (
          <TeamMember key={index} {...member} />
        ))}
      </div>
    </div>
  );
};

export default Team;
