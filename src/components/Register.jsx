import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Registration attempt:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="max-w-md w-full space-y-8 p-8 bg rounded-lg shadow-md bg-white">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-preto">
            Create an account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                name="name"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border-4 border-preto placeholder-gray-500 text-gray-900 rounded-xl sm:text-sm bg-white font-bold"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border-4 border-preto placeholder-gray-500 text-gray-900 rounded-xl sm:text-sm bg-white font-bold mt-4"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border-4 border-preto placeholder-gray-500 text-gray-900 rounded-xl sm:text-sm bg-white font-bold mt-4"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                name="confirmPassword"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border-4 border-preto placeholder-gray-500 text-gray-900 rounded-xl sm:text-sm bg-white font-bold mt-4"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative h-10 w-full flex justify-center border border-transparent text-sm font-medium rounded-md text-white bg-preto hover:bg-grey focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-xl align-middle p-2 font-semibold text-base"
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <Link to="/login" className="text-white flex justify-center mt-5 font-bold">Already have an account? Sign in</Link>
    </div>
  );
};

export default Register; 