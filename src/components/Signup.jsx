import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const usernameRef = useRef(null);
  const dobRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const dob = dobRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;

    if (!username || !email || !password || !dob || !gender) {
      alert("Fill all the * marked details");
      return;
    }

    const user = {
      username,
      email,
      password,
      dob,
      gender: gender || "Not specified"
    };

    let users = JSON.parse(localStorage.getItem("userDetails")) || [];
    if (!Array.isArray(users)) users = []; 
      const isEmailExists = users.some(u => u.email === user.email);
    if (isEmailExists) {
      alert("Email already exists!");
      return;
    }
    users.push(user);

    localStorage.setItem("userDetails", JSON.stringify(users));
    alert("User data saved to localStorage!");

    usernameRef.current.value = '';
    dobRef.current.value = '';
    emailRef.current.value = '';
    passwordRef.current.value = '';
    const checkedGender = document.querySelector('input[name="gender"]:checked');
    if (checkedGender) checkedGender.checked = false;
    
  };

  return (
    <div className="fixed flex bg-gradient-to-l from-purple-500 to-blue-950 w-screen h-screen top-0 left-0 right-0 bottom-0 justify-center items-center">
      <div className="flex w-[1000px] h-[600px] rounded-xl overflow-hidden gap-24">
        
        <div className="w-1/2 flex justify-center  text-white text-xl  font-bold bg-[url(assets/plant.jpg)] bg-contain bg-no-repeat bg-bottom">
          <h1 className="text-center p-4 rounded-lg">Welcome to the sign up page!</h1>
        </div>

        <div className="w-1/2 flex justify-center items-center p-10 font-semibold bg-purple-400">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left text-gray-700 w-full">
            <div>
              <label htmlFor="username">User Name*:</label>
              <input type="text" id="username" ref={usernameRef} className="w-full px-3 py-1 border rounded" required />
            </div>

            <div>
              <p>Gender*:</p>
              <label className="mr-4">
                <input type="radio" name="gender" value="Male" /> Male
              </label>
              <label>
                <input type="radio" name="gender" value="Female" /> Female
              </label>
            </div>

            <div>
              <label htmlFor="DOB">DOB*:</label>
              <input type="date" id="DOB" ref={dobRef} className="w-full px-3 py-1 border rounded" required />
            </div>

            <div>
              <label htmlFor="mail">Mail*:</label>
              <input type="email" id="mail" ref={emailRef} className="w-full px-3 py-1 border rounded" required />
            </div>

            <div>
              <label htmlFor="password">Password*:</label>
              <input type="password" id="password" ref={passwordRef} className="w-full px-3 py-1 border rounded" required />
            </div>

            <button type="submit" className="bg-purple-800 text-white py-2 rounded hover:bg-purple-950 transition">
              Submit
            </button>
              <Link to="/Login" className="text-sm text-blue-900 hover:underline">
              Login?
            </Link>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Signup;
