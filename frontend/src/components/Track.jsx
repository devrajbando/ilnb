import React from 'react'
import Candlestick from './Candlestick'
import { useState } from 'react'


function Track() {
    const [selected, setSelected] = useState('buy');
  return (
    <>
    <div className='md:flex h-screen'>
        <div className='md:basis-2/3 max-w-2/3 position-absolute'>
            <h1 className='text-4xl font-bold md:mx-10'>Company Name</h1>
            <Candlestick/>
        </div>
        <div className='md:basis-1/3 overflow-auto h-3/4 scroll-smooth'>
        <div class="mx-auto max-w-md overflow-hidden rounded-lg shadow-4xl">
            <div role="tablist" className="tabs tabs-border">
                <button role="tab" className={`tab ${selected=='buy'?"tab-active":""}`} onClick={()=>setSelected("buy")}>Market Buy</button>
                <button role="tab" className={`tab ${selected=='sell'?"tab-active":""}`} onClick={()=>setSelected("sell")}>Market Sell</button>
                
                </div>
                {selected=='buy' &&
                <div className='mx-auto max-w-md overflow-hidden rounded-lg shadow-4xl'>
                    <input type="number" placeholder="Shares to Buy" className="input input-sm input-success mx-2" />
                    <button className="btn btn-sm btn-soft btn-success">Buy</button>
                    </div>}
                {selected=='sell'&& 
                <div className='mx-auto max-w-md overflow-hidden rounded-lg shadow-4xl'>
                    <input type="number" placeholder="Shares to Sell" className="input input-sm input-success mx-2" />
                    <button className="btn btn-sm btn-soft btn-success">Sell</button>
                    </div>}
                
            </div>
            
            
            
<div class="mx-auto max-w-md overflow-hidden rounded-lg shadow-4xl">
    <h1 className='text-white text-2xl mx-5 font-semibold'>Stock Information</h1>
  <ul class="divide-y divide-gray-100 py-2 px-4">
    <li class="flex py-4">
      <div class="mr-4 flex-1">
        <h4 class="text-lg font-medium text-gray-200">Stock 1</h4>
        <div class="mt-1 text-sm text-gray-400"><button className='btn btn-soft btn-sm btn-success'>View</button> <button className='btn btn-soft btn-sm btn-primary'>Compare</button></div>
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80" class="h-20 w-20 rounded-lg object-cover" alt="" />
      </div>
    </li>
    <li class="flex py-4">
      <div class="mr-4 flex-1">
        <h4 class="text-lg font-medium text-gray-200">Stock 1</h4>
        <div class="mt-1 text-sm text-gray-400"><button className='btn btn-soft btn-sm btn-success'>View</button> <button className='btn btn-soft btn-sm btn-primary'>Compare</button></div>
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80" class="h-20 w-20 rounded-lg object-cover" alt="" />
      </div>
    </li>
    <li class="flex py-4">
      <div class="mr-4 flex-1">
        <h4 class="text-lg font-medium text-gray-200">Stock 1</h4>
        <div class="mt-1 text-sm text-gray-400"><button className='btn btn-soft btn-sm btn-success'>View</button> <button className='btn btn-soft btn-sm btn-primary'>Compare</button></div>
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80" class="h-20 w-20 rounded-lg object-cover" alt="" />
      </div>
    </li>
  
  </ul>
</div>
<div class="mx-auto max-w-md overflow-hidden rounded-lg shadow-4xl">
    <h1 className='text-white text-2xl mx-5 font-semibold'>Recommended Category 1</h1>
  <ul class="divide-y divide-gray-100 py-2 px-4">
    <li class="flex py-4">
      <div class="mr-4 flex-1">
        <h4 class="text-lg font-medium text-gray-200">Stock 1</h4>
        <div class="mt-1 text-sm text-gray-400"><button className='btn btn-soft btn-sm btn-success'>View</button> <button className='btn btn-soft btn-sm btn-primary'>Compare</button></div>
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80" class="h-20 w-20 rounded-lg object-cover" alt="" />
      </div>
    </li>
    <li class="flex py-4">
      <div class="mr-4 flex-1">
        <h4 class="text-lg font-medium text-gray-200">Stock 1</h4>
        <div class="mt-1 text-sm text-gray-400"><button className='btn btn-soft btn-sm btn-success'>View</button> <button className='btn btn-soft btn-sm btn-primary'>Compare</button></div>
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80" class="h-20 w-20 rounded-lg object-cover" alt="" />
      </div>
    </li>
    <li class="flex py-4">
      <div class="mr-4 flex-1">
        <h4 class="text-lg font-medium text-gray-200">Stock 1</h4>
        <div class="mt-1 text-sm text-gray-400"><button className='btn btn-soft btn-sm btn-success'>View</button> <button className='btn btn-soft btn-sm btn-primary'>Compare</button></div>
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80" class="h-20 w-20 rounded-lg object-cover" alt="" />
      </div>
    </li>
  
  </ul>
</div>
<div class="mx-auto max-w-md overflow-hidden rounded-lg shadow-4xl">
    <h1 className='text-white text-2xl mx-5 font-semibold'>Recommended Category 2</h1>
  <ul class="divide-y divide-gray-100 py-2 px-4">
    <li class="flex py-4">
      <div class="mr-4 flex-1">
        <h4 class="text-lg font-medium text-gray-200">Stock 1</h4>
        <div class="mt-1 text-sm text-gray-400"><button className='btn btn-soft btn-sm btn-success'>View</button> <button className='btn btn-soft btn-sm btn-primary'>Compare</button></div>
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80" class="h-20 w-20 rounded-lg object-cover" alt="" />
      </div>
    </li>
    <li class="flex py-4">
      <div class="mr-4 flex-1">
        <h4 class="text-lg font-medium text-gray-200">Stock 1</h4>
        <div class="mt-1 text-sm text-gray-400"><button className='btn btn-soft btn-sm btn-success'>View</button> <button className='btn btn-soft btn-sm btn-primary'>Compare</button></div>
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80" class="h-20 w-20 rounded-lg object-cover" alt="" />
      </div>
    </li>
    <li class="flex py-4">
      <div class="mr-4 flex-1">
        <h4 class="text-lg font-medium text-gray-200">Stock 1</h4>
        <div class="mt-1 text-sm text-gray-400"><button className='btn btn-soft btn-sm btn-success'>View</button> <button className='btn btn-soft btn-sm btn-primary'>Compare</button></div>
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80" class="h-20 w-20 rounded-lg object-cover" alt="" />
      </div>
    </li>
  
  </ul>
</div>
<div class="mx-auto max-w-md overflow-hidden rounded-lg shadow-4xl">
    <h1 className='text-white text-2xl mx-5 font-semibold'>Recommended Category 3</h1>
  <ul class="divide-y divide-gray-100 py-2 px-4">
    <li class="flex py-4">
      <div class="mr-4 flex-1">
        <h4 class="text-lg font-medium text-gray-200">Stock 1</h4>
        <div class="mt-1 text-sm text-gray-400"><button className='btn btn-soft btn-sm btn-success'>View</button> <button className='btn btn-soft btn-sm btn-primary'>Compare</button></div>
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80" class="h-20 w-20 rounded-lg object-cover" alt="" />
      </div>
    </li>
    <li class="flex py-4">
      <div class="mr-4 flex-1">
        <h4 class="text-lg font-medium text-gray-200">Stock 1</h4>
        <div class="mt-1 text-sm text-gray-400"><button className='btn btn-soft btn-sm btn-success'>View</button> <button className='btn btn-soft btn-sm btn-primary'>Compare</button></div>
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80" class="h-20 w-20 rounded-lg object-cover" alt="" />
      </div>
    </li>
    <li class="flex py-4">
      <div class="mr-4 flex-1">
        <h4 class="text-lg font-medium text-gray-200">Stock 1</h4>
        <div class="mt-1 text-sm text-gray-400"><button className='btn btn-soft btn-sm btn-success'>View</button> <button className='btn btn-soft btn-sm btn-primary'>Compare</button></div>
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80" class="h-20 w-20 rounded-lg object-cover" alt="" />
      </div>
    </li>
  
  </ul>
</div>

        </div>
    </div>
    </>
  )
}

export default Track