import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-b from-blue-100 to-white text-center px-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4 drop-shadow-lg">
        Welcome to GameVerse 🎮
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 max-w-xl mb-8">
        Rent your favorite PC games instantly. Explore top titles like Elden Ring, Sekiro, and more at flexible rental plans.
      </p>
      <div className="flex gap-4">
        <Link to="/games">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
            Explore Games
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-white border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

