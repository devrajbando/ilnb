import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 const [error, setError] = useState('');
 const { setUser } = useAuthContext();

  async function loginUser(event) {
    event.preventDefault();

    try {
        const apiUrl = import.meta.env.VITE_BACKEND_URL
              const response = await fetch(`${apiUrl}/api/users/login`, {
          method: 'POST',
          credentials: 'include', // Include cookies in the request
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        const data = await response.json();
        
        if (data.status === 409) {
          console.log('hi')
          
          setError(data.message );
        }
        console.log('devraj')
            console.log(data.data.user);
    
            if (data.statusCode == 200) {
                console.log('Login successful');
                
                setUser(data.data.user)
                alert('Login successful');

                navigate('/');
            } else {
                setError('Please check your username and password');
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

        
  <div className="min-h-screen flex items-start justify-center  py-12 px-4 sm:px-6 lg:px-8">
  
    <div className="max-w-md w-full space-y-8 bg-gray-900 p-8 rounded-lg shadow-md">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">Login to your account</h2>
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
      <form className="mt-8 space-y-6" onSubmit={(event)=>loginUser(event)}>
        <div className="space-y-4 text-white">
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
    

      
      </form>
    </div>
  </div>
         
       

  

       
      
    </>
  );
}
