import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    if (photoFile) formData.append('img', photoFile);
  
    // Log form data for debugging
    console.log('Form Data:', {
      name,
      email,
      password,
      photoFile
    });
  
  
    try {
      const res = await axios.post("http://localhost:8080/api/v1/user/signup", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (res.status === 201) {
        setName('');
        setEmail('');
        setPassword('');
        setPhotoFile(null);
        setPhotoPreview(null);
        setSuccess(res.data.msg || 'Sign up successful!');
      } else {
        setError(res.data.msg || 'Sign up failed!');
      }
    } catch (error) {
      // Log error response from server
      console.error('Error response:', error.response);
      setError('Error during sign up: ' + (error.response?.data?.msg || error.message));
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
          <h1 className="text-3xl text-center md:text-2xl font-bold font-serif leading-tight mt-12">
            Sign up to your account
          </h1>
          {success?<p className='text-green-600 text-center'>{success}</p>:null}
          <form className="mt-6" onSubmit={submitHandler}>
            <div className="col-span-6 ml-2 sm:col-span-4 md:mr-3">
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
                aria-label="Upload Profile Photo"
              />

              <label className="block text-gray-700 text-sm font-bold mb-2 text-center" htmlFor="photo">
                Profile Photo
              </label>
              
              <div className="text-center">
                {!photoPreview ? (
                  <div className="mt-2">
                    <img
                      src="https://images.unsplash.com/photo-1531316282956-d38457be0993?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
                      className="w-40 h-40 m-auto rounded-full shadow"
                      alt="Current Profile"
                    />
                  </div>
                ) : (
                  <div className="mt-2">
                    <span
                      className="block w-40 h-40 rounded-full m-auto shadow"
                      style={{
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                        backgroundImage: `url(${photoPreview})`,
                      }}
                    />
                  </div>
                )}
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 mt-2 ml-3"
                  onClick={handleClick}
                >
                  Select New Photo
                </button>
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Full Name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
                aria-required="true"
                aria-label="Full Name"
              />
            </div>
            <div>
              <label className="block text-gray-700 mt-5">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
                aria-required="true"
                aria-label="Email Address"
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
                aria-required="true"
                aria-label="Password"
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            <button
              type="submit"
              className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
          <Link to="/signin">
            <p className="mt-3">
              Already have an account?{' '}
              <span className="text-blue-500 hover:text-blue-700 font-semibold">
                Sign in
              </span>
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
