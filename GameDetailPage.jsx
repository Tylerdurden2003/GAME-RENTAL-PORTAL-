import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useCart } from '../context/CartContext';

const GameDetailPage = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [durationType, setDurationType] = useState('hour');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/games/${id}`);
        setGame(res.data);
      } catch (err) {
        console.error('Error fetching game', err);
      }
    };

    fetchGame();
  }, [id]);

  if (!game) return <Spinner />;

  const getPrice = () => {
    if (durationType === 'hour') return game.price;
    if (durationType === 'day') return game.price * 3;
    if (durationType === 'month') return game.price * 10;
    return 0;
  };

  const handleRent = () => {
    addToCart(game, 1, getPrice());
    navigate('/cart');
  };

  return (
    <div className="p-6 bg-gradient-to-br from-pink-100 via-yellow-100 to-green-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={game.imageUrl} alt={game.name} className="w-full h-60 object-cover" />
        <div className="p-6">
          <h2 className="text-3xl font-extrabold text-indigo-800 mb-2">{game.name}</h2>
          <p className="text-gray-600 italic mb-4">{game.genre}</p>

          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">Select Rental Duration:</label>
            <select
              value={durationType}
              onChange={(e) => setDurationType(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="hour">Hourly - ₹{game.price}</option>
              <option value="day">Daily - ₹{game.price * 3}</option>
              <option value="month">Monthly - ₹{game.price * 10}</option>
            </select>
          </div>

          <button
            onClick={handleRent}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
          >
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameDetailPage;




