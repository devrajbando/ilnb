import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';
export default function Signup() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpass, setConfirmPass] = useState('');
 const [error, setError] = useState('');
 const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      text: "How familiar are you with stock market investing?",
      options: [
        { text: "Beginner", points: 1, type: "error" },
        { text: "Some experience", points: 2, type: "warning" },
        { text: "Very experienced", points: 3, type: "success" }
      ]
    },
    {
      id: 2,
      text: "What is your risk tolerance?",
      options: [
        { text: "Low", points: 1, type: "error" },
        { text: "Medium", points: 2, type: "warning" },
        { text: "High", points: 3, type: "success" }
      ]
    },
    {
      id: 3,
      text: "Investment horizon:",
      options: [
        { text: "Short-term (Less than a year)", points: 3, type: "error" },
        { text: "Medium-term (1-5 years)", points: 2, type: "warning" },
        { text: "Long-term (More than 5 years)", points: 1, type: "success" }
      ]
    },
    {
      id: 4,
      text: "What would you do if your portfolio dropped by 10% in a month?",
      options: [
        { text: "Sell immediately", points: 1, type: "error" },
        { text: "Hold", points: 2, type: "warning" },
        { text: "Buy more", points: 3, type: "success" }
      ]
    },
    {
      id: 5,
      text: "Expected returns preference:",
      options: [
        { text: "Modest and stable", points: 1, type: "error" },
        { text: "Moderate", points: 2, type: "warning" },
        { text: "High returns despite risk", points: 3, type: "success" }
      ]
    },
    {
      id: 6,
      text: "Do you prefer managing investments independently or with guidance?",
      options: [
        { text: "Rely on expert advice", points: 1, type: "error" },
        { text: "Some guidance", points: 2, type: "warning" },
        { text: "Fully independent", points: 3, type: "success" }
      ]
    },
    {
      id: 7,
      text: "Portfolio review frequency:",
      options: [
        { text: "Monthly", points: 1, type: "error" },
        { text: "Weekly", points: 2, type: "warning" },
        { text: "Daily", points: 3, type: "success" }
      ]
    },
    {
      id: 8,
      text: "Are you comfortable with a concentrated portfolio or prefer diversification?",
      options: [
        { text: "Highly diversified", points: 1, type: "error" },
        { text: "Balanced", points: 2, type: "warning" },
        { text: "Prefer a few stocks", points: 3, type: "success" }
      ]
    },
    {
      id: 9,
      text: "How would you react to sudden market volatility?",
      options: [
        { text: "Anxious", points: 1, type: "error" },
        { text: "Cautious but steady", points: 2, type: "warning" },
        { text: "Unfazed", points: 3, type: "success" }
      ]
    },
    {
      id: 10,
      text: "Would you consider using leverage to amplify returns?",
      options: [
        { text: "No", points: 1, type: "error" },
        { text: "Maybe", points: 2, type: "warning" },
        { text: "Yes", points: 3, type: "success" }
      ]
    }
  ];

  const handleSelect = (questionId, points) => {
    setAnswers({
      ...answers,
      [questionId]: points
    });
  };

  const calculateScore = () => {
    const totalScore = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
    setScore(totalScore);
    setSubmitted(true);
    registerUser()
  };

  const getInvestorProfile = (score) => {
    if (score <= 15) {
      return {
        type: "Conservative",
        
      };
    } else if (score <= 25) {
      return {
        type: "Moderate",
        
      };
    } else {
      return {
        type: "Aggressive",
        
      };
    }
  };

  

  // Get button color classes based on button type
  const getButtonClasses = (type) => {
    const baseClasses = "btn min-w-24 m-1";
    
    switch (type) {
      case "error":
        return `${baseClasses} btn-error`;
      case "warning":
        return `${baseClasses} btn-warning`;
      case "success":
        return `${baseClasses} btn-success`;
      default:
        return baseClasses;
    }
  };

  async function registerUser() {
    


    

    
    try {
        const response = await fetch('http://localhost:8000/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
            score
            
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
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-center text-white text-5xl font-bold my-5'><span className='text-green-700'>INLB</span> Financial Services</h1>
        
      </div>

      {page === 1 && (
        
  <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
        
    <div className="max-w-md w-full space-y-8 bg-gray-900 p-8 rounded-lg shadow-md">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white-900">Create an account</h2>
        <p className="mt-2 text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-green-600 hover:text-green-900">
            Log in
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

          {/* Username Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-100">
              Full Name
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Choose a username"
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
                placeholder="Create a password"
                />
            </div>
          </div>

          {/* Confirm Password Input
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-100">
              Confirm Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmpassword"
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm your password"
                />
            </div>
          </div> */}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
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
         
         {!submitted && (
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
         ) }
       </div>}
      

       
      
    </>
  );
}
