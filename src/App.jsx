import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className=" flex items-center justify-center min-h-screen bg-cover bg-center relative text-white bg-black">
      
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      <div className="z-10 bg-white bg-opacity-90 text-black p-10 rounded-xl shadow-2xl text-center max-w-xl">
        <h1 className="text-4xl font-extrabold mb-6">
          Welcome to <br /> E-commerce
        </h1>
        <Link 
          to="/login"
          className="inline-block mt-4 px-6 py-3 bg-black text-white text-lg font-semibold rounded-lg hover:bg-red-700 transition"
        >
          Launch
        </Link>
      </div>
    </div>
  );
}

export default App;