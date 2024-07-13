import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Hero from './components/Hero/Hero';
import Contact from './components/Contact/Contact';
import Team from './components/Team/Team';
import Features from './components/Features/Features';
import title from './assets/Rookus-title-4.png';
import kafka from './assets/kafka.jpg';
import ImageGen from './components/ImageGen/ImageGen'

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
