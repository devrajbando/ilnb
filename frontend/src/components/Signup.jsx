import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
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
    registerUser(totalScore);
  };

  const getInvestorProfile = (score) => {
    if (score <= 15) return { type: "Conservative" };
    if (score <= 25) return { type: "Moderate" };
    return { type: "Aggressive" };
  };

  const getButtonClasses = (type) => {
    const baseClasses = "btn min-w-24 m-1";
    switch (type) {
      case "error": return `${baseClasses} btn-error`;
      case "warning": return `${baseClasses} btn-warning`;
      case "success": return `${baseClasses} btn-success`;
      default: return baseClasses;
    }
  };

  async function registerUser(userScore) {
    try {
      const response = await fetch('http://localhost:3000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          score: userScore
        }),
      });

      const data = await response.json();
      if (data.status === 409) {
        setError(data.message);
      } else if (response.status === 201) {
        setError('');
        window.alert(data.message);
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }
  }

  return (
    <>
      {page === 1 && (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 bg-gray-900 p-8 rounded-lg shadow-md">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white-900">Create an account</h2>
              <p className="mt-2 text-sm text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-green-600 hover:text-green-900">Log in</Link>
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <p className="ml-3 text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            <form
              className="mt-8 space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                if (name === '' || email === '' || password === '') {
                  setError('All fields must be filled');
                } else if (password !== confirmPass) {
                  setError('Passwords do not match');
                } else {
                  setError('');
                  setPage(2);
                }
              }}
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-100">Email address</label>
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
                      className="pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm w-full"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-100">Full Name</label>
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
                      className="pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm w-full"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-100">Password</label>
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
                      className="pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm w-full"
                      placeholder="Create a password"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-100">Confirm Password</label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirm-password"
                      type="password"
                      required
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      className="pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm w-full"
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 text-white bg-green-600 hover:bg-green-700 rounded-md shadow-sm font-medium"
              >
                Next: Risk Assessment
              </button>
            </form>
          </div>
        </div>
      )}

      {page === 2 && (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl w-full bg-gray-800 text-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-6 text-green-400">Investment Risk Assessment</h1>

            {!submitted ? (
              <>
                <p className="mb-8 text-center text-gray-300 text-sm">
                  Answer the following to help us understand your investment risk profile.
                </p>

                <div className="space-y-10">
                  {questions.map((question) => (
                    <div key={question.id} className="bg-gray-700 p-6 rounded-lg shadow-sm">
                      <h3 className="text-lg font-semibold mb-4">{question.id}. {question.text}</h3>
                      <div className="flex flex-wrap gap-2">
                        {question.options.map((option, index) => (
                          <button
                            key={index}
                            type="button"
                            className={`${getButtonClasses(option.type)} ${answers[question.id] === option.points ? 'ring-2 ring-offset-2 ring-green-400' : ''}`}
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
                    className="px-4 py-2 rounded-md border border-gray-500 text-gray-300 hover:bg-gray-700"
                    onClick={() => setPage(1)}
                  >
                    Back
                  </button>
                  <button
                    className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold disabled:opacity-50"
                    onClick={calculateScore}
                    disabled={Object.keys(answers).length !== questions.length}
                  >
                    Submit
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center bg-gray-700 p-10 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-green-300">Your Risk Assessment Result</h2>
                <div className="text-5xl font-extrabold text-green-400 mb-6">{score} / 30</div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold">{getInvestorProfile(score).type} Investor</h3>
                  <p className="text-gray-300 mt-2">
                    Based on your answers, your profile indicates a {getInvestorProfile(score).type.toLowerCase()} risk tolerance.
                  </p>
                </div>

                <button
                  className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
                  onClick={() => navigate('/dashboard')}
                >
                  Go to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
