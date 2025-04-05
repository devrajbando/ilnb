
    import React from 'react';
import { BarChart, LineChart, PieChart,CirclePlay,Landmark } from 'lucide-react';

import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
  return (
    <>
    
    <div className="min-h-screen">
      

      {/* Hero Section */}
      <section className="min-h-screen bg-white py-16 md:py-24 px-4">

        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">The <span className='font-extrabold text-green-700'>easiest</span> way to trade stocks</h2>
            <p className="text-lg text-gray-600 mb-8">From the small stuff to the big picture, organizes the work so teams know what to do, why it matters, and how to get it done.</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-8 py-3 bg-green-800 text-white rounded-lg text-lg hover:scale-110 transition duration-300"
              onClick={()=>{navigate('/signup')}}
              >Get Started</button>
              <button className="px-8 py-3 border border-gray-300 rounded-lg text-lg text-green-800 transition duration-300 hover:text-white hover:bg-green-800 flex"><CirclePlay className='mx-2 mt-1'/> Watch Demo</button>
            </div>
          </div>
          
        </div>
      </section>

      {/* Features Section */}
      <section className="min-h-screen py-16 bg-green-900 px-4 flex justify-center">
        <div className='grid grid-cols-2 grid-rows-2'>
        <div className=" bg-transparent w-96 m-5 shadow-sm">
  <Landmark className='mx-auto h-24 text-green-600'/>
  <div className="card-body items-center text-center">
    <h2 className="card-title text-3xl text-bold">Automatic Portfolio Tracking</h2>
    <p>See all your investments across Zerodha, MF Central, and Angel One in one place with quick buy and sell options.</p>

  </div>
        </div>
        <div className=" bg-transparent w-96 m-5 shadow-sm">
  <Landmark className='mx-auto h-24 text-green-600'/>
  <div className="card-body items-center text-center">
    <h2 className="card-title text-3xl text-bold">Automatic Portfolio Tracking</h2>
    <p>See all your investments across Zerodha, MF Central, and Angel One in one place with quick buy and sell options.</p>

  </div>
        </div>
        <div className=" bg-transparent w-96 m-5 shadow-sm">
  <Landmark className='mx-auto h-24 text-green-600'/>
  <div className="card-body items-center text-center">
    <h2 className="card-title text-3xl text-bold">Automatic Portfolio Tracking</h2>
    <p>See all your investments across Zerodha, MF Central, and Angel One in one place with quick buy and sell options.</p>

  </div>
        </div>
        <div className=" bg-transparent w-96 m-5 shadow-sm">
  <Landmark className='mx-auto h-24 text-green-600'/>
  <div className="card-body items-center text-center">
    <h2 className="card-title text-3xl text-bold">Automatic Portfolio Tracking</h2>
    <p>See all your investments across Zerodha, MF Central, and Angel One in one place with quick buy and sell options.</p>

  </div>
        </div>
        

        </div>
      </section>

      
      <section className="min-h-screen flex py-16 bg-green-600 px-4">
        <div className='w-1/2 flex flex-col justify-center mx-auto'>
            <h1 className='mx-auto text-6xl font-bold my-4'>Track all stocks from one dashboard</h1>
            <p>Download the app to manage your projects, keep track of the progress and complete tasks without procastinating. Stay on track and complete on time!</p>
        </div>
        <div>

        </div>
      </section>

      
      
    </div>
    </>
  );
};



export default Home