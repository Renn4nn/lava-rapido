import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch("http://localhost:8800/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const result = await res.json();
  
      if (res.status === 200) {

        navigate("/home");
      } else {
        alert(result.message || "Erro ao fazer login");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro na requisição.");
    }
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
            Login to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border-4 border-preto placeholder-gray-500 text-gray-900 rounded-xl sm:text-sm bg-white font-bold"
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
                className="appearance-none relative block w-full px-3 py-2 border-4 border-preto placeholder-gray-500 text-gray-900 rounded-xl sm:text-sm bg-white mt-4 font-bold"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="mt-4 mr-1 ml-1 text-preto flex justify-between font-bold">
                <p>
                  <input type="checkbox" name="" id="" /> Remember me
                </p>
                <a href="http://google.com" target="_blank">
                  Forgot password?
                </a>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative h-10 w-full flex justify-center border border-transparent text-sm font-medium rounded-md text-white bg-preto hover:bg-grey focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-xl align-middle p-2 font-semibold text-base"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
      <Link to="/register" className="text-white flex justify-center mt-5 font-bold">
        Need an account? Register
      </Link>
    </div>
  );
};

export default Login;
