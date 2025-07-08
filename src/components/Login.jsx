import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const users = JSON.parse(localStorage.getItem("userDetails")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("activeUser", user.email); // ✅ Set active user
      navigate("/Home");
    } else {
      alert("❌ Invalid email or password");
    }

    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div className="fixed flex bg-gradient-to-l from-purple-500 to-blue-950 w-screen h-screen top-0 left-0 justify-center items-center overflow-hidden">
      <div className="flex w-[1000px] h-[600px] rounded-xl overflow-hidden gap-24">

        <div className="w-1/2 flex  text-white text-xl font-bold bg-[url('assets/plant.jpg')] bg-contain bg-no-repeat bg-bottom">
          <h1 className="text-center p-4">Welcome back! Please login.</h1>
        </div>

        <div className="w-1/2 flex justify-center items-center p-10 font-semibold bg-purple-400">
          <form 
            onSubmit={handleLogin} 
            autoComplete="off"
            className="flex flex-col gap-6 text-left text-gray-700 w-full"
          >
            <div>
              <label htmlFor="mail">Email*:</label>
              <input
                type="email"
                id="mail"
                ref={emailRef}
                autoComplete="off"
                className="w-full px-3 py-1 border rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="password">Password*:</label>
              <input
                type="password"
                id="password"
                ref={passwordRef}
                autoComplete="new-password"
                className="w-full px-3 py-1 border rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-purple-800 text-white py-2 rounded hover:bg-purple-950 transition"
            >
              Login
            </button>

            <Link to="/signup" className="text-sm text-blue-900 hover:underline">
              Not Registered?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
