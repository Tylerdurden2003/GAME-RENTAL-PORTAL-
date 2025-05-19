import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CheckoutConfirmationPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const handleConfirm = () => {
    alert('✅ Your rental has been confirmed!');
    clearCart();
    navigate('/games');
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.duration,
    0
  );

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gradient-to-br from-green-50 to-green-100 rounded shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-green-700">🎉 Checkout Summary</h2>
      {cartItems.length === 0 ? (
        <p className="text-red-600 font-semibold">No games selected for rental.</p>
      ) : (
        <div>
          <ul className="mb-4">
            {cartItems.map((item, index) => (
              <li key={index} className="border-b py-2 text-gray-700">
                <strong>{item.name}</strong> — {item.duration} hour(s) × ₹{item.price}/hr = ₹
                {item.price * item.duration}
              </li>
            ))}
          </ul>
          <p className="font-semibold mb-4 text-gray-800">Total: ₹{totalPrice}</p>
          <button
            onClick={handleConfirm}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded w-full"
          >
            ✅ Confirm Rental
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutConfirmationPage;


