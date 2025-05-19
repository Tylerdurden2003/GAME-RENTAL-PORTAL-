import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

const GameListPage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/games');
        setGames(res.data);
      } catch (err) {
        console.error('Error fetching games', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen">
      <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">🎮 Explore Games for Rent</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {games.map((game) => (
          <div key={game._id} className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition duration-300">
            <img
              src={game.imageUrl}
              alt={game.name}
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
            <h3 className="text-xl font-bold text-gray-800">{game.name}</h3>
            <p className="text-sm text-gray-500 italic mb-2">{game.genre}</p>
            <div className="text-gray-700 text-sm mb-3">
              <p>💸 <strong>Hourly:</strong> ₹{game.price}</p>
              <p>📅 <strong>Daily:</strong> ₹{game.price * 3}</p>
              <p>📆 <strong>Monthly:</strong> ₹{game.price * 10}</p>
            </div>
            <Link
              to={`/games/${game._id}`}
              className="block text-center mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              Rent Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameListPage;


