import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Hero from './components/Hero/Hero';
import Contact from './components/Contact/Contact';
import Team from './components/Team/Team';
import Features from './components/Features/Features';
import title from './assets/Rookus-title-4.png';
import kafka from './assets/kafka.jpg';
import Gallery from './components/Gallery/Gallery'
import DesignGen from './components/DesignGen/DesignGen';
import Test from './components/Test/Test'

import Auth from './components/Auth/Auth';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const teamMembers = [
  {
    image: kafka,
    name: 'Member 1',
    description: 'Description for member 1',
  },
  {
    image: kafka,
    name: 'Member 2',
    description: 'Description for member 2',
  },
  // Add more team members as needed
];

const Home = () => <Hero title={title} />;

const ContactUs = () => <Contact />;

const FeaturesPage = () => <Features />;

const Design = () => <DesignGen />

const Testing = () => <Test/>

const GalleryPg = () => <Gallery/>

const AuthPage = () => <Auth/>


function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/home',
          element: <Home />,
        },
        {
          path: '/contact',
          element: <ContactUs />,
        },
        {
          path: '/team',
          element: <Team members={teamMembers} />,
        },
        {
          path: '/features',
          element: <FeaturesPage />,
        },

        {
          path: '/design',
          element: <Design />
        },
        {
          path: '/gallery',
          element: <GalleryPg/>
        },

        {
          path: '/test-branch',
          element: <Testing/>
        },

        {
          path: '/Auth',
          element: <AuthPage/>
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
