import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:8080/api/v1/user/signin', { email, password });
      
      if (res.status === 200) {
        const { token} = res.data;

        localStorage.setItem('token', token);

        navigate('/home');
      } else {
        setError(res.data.msg || 'Login failed!');
      }
    } catch (error) {
      setError('Error during login: ' + (error.response?.data?.msg || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src="https://images.prismic.io/meltwater/09951fe5-4647-4746-a964-7cbed4a076c8_marketers+guide+to+instagram+hero.png?q=90&rect=170,0,1220,813&&w=1920&dpr=1"
          className="w-full h-full object-fill"
          alt="Background"
        />
      </div>
      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
        <div className="w-full h-100">
          <h1 className="text-3xl md:text-2xl font-bold font-serif leading-tight mt-12">
            Log in to your account
          </h1>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          <form className="mt-6" onSubmit={submitHandler}>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                autoComplete="email"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                minLength="6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? 'Logging In...' : 'Log In'}
            </button>
          </form>
          <Link to="/signup">
            <p className="mt-8">
              Need an account?{' '}
              <span className="text-blue-500 hover:text-blue-700 font-semibold">
                Create an account
              </span>
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
