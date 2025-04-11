
import React from 'react';
import { FeaturesSection } from './Features';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import Stocks from '../assets/white stocks.svg';
import Analyse from '../assets/analysis.svg';
import { useAuthContext } from '../hooks/useAuthContext';


// import { title } from 'process';
const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const bounceIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 120 } }
  };

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-green-950 to-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen py-20 px-4 relative overflow-hidden">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center relative z-10"
        >
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              The <span className='font-extrabold text-green-400'>easiest</span> way to trade stocks
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              From the small stuff to the big picture, organize your trades, track performance,
              and act fast with our intuitive tools.
            </p>
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={bounceIn}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <button
                className="px-8 py-3 bg-green-700 text-white rounded-xl text-lg hover:scale-110 transition duration-300 shadow-md"
                onClick={() => { user?navigate('/dashboard'):navigate('/signup'); }}
              >
                Get Started
              </button>
              {/* <button className="px-8 py-3 border border-green-500 rounded-xl text-lg text-green-400 transition duration-300 hover:text-white hover:bg-green-700 flex items-center">
                <CirclePlay className='mr-2 animate-ping-slow' /> Watch Demo
              </button> */}
            </motion.div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              src={Stocks}
              alt="Stocks illustration"
              className="rounded-xl shadow-lg w-full max-w-md h-96"
            />
            {/* <Stocks/> */}
              {/* <img src={Stocks} alt="" className='h-96'/> */}
            
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <FeaturesSection/>
      


      {/* Call to Action Section */}
      <section className="min-h-[70vh] flex items-center px-4 py-20 relative overflow-hidden">
        <motion.div
          className='max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center'
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div>
            <h1 className='text-green-400 text-5xl font-bold mb-6 leading-tight animate-pulse'>
              Track all stocks from one dashboard
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              Download the app to manage your portfolio, get real-time updates, and act without delay. Never miss an opportunity again.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => user?navigate('/track'):navigate('/signup')}
              className="bg-green-700 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white hover:text-green-800 transition shadow-lg"
            >
              Start Tracking
            </motion.button>
          </div>
          <div className="hidden md:block">
            <motion.img
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              src={Analyse}
              alt="Stock dashboard"
              className="rounded-xl shadow-xl mx-auto h-96"
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;