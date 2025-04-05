import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';
export default function Signup() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 const [error, setError] = useState('');


  async function loginUser(event) {
    event.preventDefault();


    // if(name == '' || email =='' || password ==''){
    //   setError('All fields must be filled');
    //   return;
    // }

    // if(password!==confirmpass){
    //   setError('Passwords do not match');
    //   return;
    // }

    
    try {
        const response = await fetch('http://localhost:8000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        const data = await response.json();
        console.log(data)
        if (data.status === 409) {
          console.log('hi')
          
          setError(data.message );
        }
        else if (response.status === 201) {
          setError('')
          window.alert(data.message)
            navigate('/login');
          }
        
        
       
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Something went wrong. Please try again.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
    
    
  }



 

  return (
    <>

      {page === 1 && (
        
  <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
        
    <div className="max-w-md w-full space-y-8 bg-gray-900 p-8 rounded-lg shadow-md">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white-900">Login to your account</h2>
        <p className="mt-2 text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-green-600 hover:text-green-900">
            Sign up
          </Link>
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <p className="ml-3 text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Form */}
      <form className="mt-8 space-y-6" onSubmit={()=>setPage(2)}>
        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-100">
              Email address
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-100">
              Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                />
            </div>
          </div>

        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
          >
          Submit
        </button>
        <div>
                    {/* <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    isSignedIn={true}
                    /> */}
        
            
                  
                  </div>

      
      </form>
    </div>
  </div>
         
      )}
       

    
         {page ==2 && 
         <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg">
         <h1 className="text-3xl font-bold text-center mb-6">Investment Risk Assessment</h1>
         
         {!submitted ? (
           <>
             <p className="mb-6 text-gray-500">
               Please answer the following questions to help us understand your investment preferences and risk tolerance.
             </p>
             
             <div className="space-y-10">
               {questions.map((question) => (
                 <div key={question.id} className="mb-8">
                   <h3 className="text-xl font-semibold mb-4">{question.id}. {question.text}</h3>
                   <div className="flex flex-wrap">
                     {question.options.map((option, index) => (
                       <button
                         key={index}
                         className={`${getButtonClasses(option.type)} ${answers[question.id] === option.points ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                         onClick={() => handleSelect(question.id, option.points)}
                       >
                         {option.text}
                       </button>
                     ))}
                   </div>
                 </div>
               ))}
             </div>
             
             <div className="mt-10 flex justify-between">
               <button 
                 className="btn btn-outline"
                 onClick={()=>setPage(1)}
               >
                 Back
               </button>
               <button 
                 className="btn btn-primary"
                 onClick={calculateScore}
                 disabled={Object.keys(answers).length !== questions.length}
               >
                 Submit
               </button>
             </div>
           </>
         ) : (
           <div className="results-container text-center p-6 bg-blue-50 rounded-lg">
             <h2 className="text-2xl font-bold mb-4">Your Risk Assessment Results</h2>
             <div className="text-5xl font-bold mb-6">{score} / 30</div>
             
             <div className="mb-6">
               <h3 className="text-xl font-bold mb-2">{getInvestorProfile(score).type} Investor</h3>
               <p className="text-gray-700">{getInvestorProfile(score).description}</p>
             </div>
             
             
           </div>
         )}
       </div>}
      

       
      
    </>
  );
}
