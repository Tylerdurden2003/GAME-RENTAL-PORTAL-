import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.duration, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul className="mb-4">
            {cartItems.map((item, index) => (
              <li key={index} className="border-b py-2">
                {item.name} — {item.duration} hr × ₹{item.price}/hr = ₹{item.price * item.duration}
              </li>
            ))}
          </ul>
          <p className="font-semibold mb-4">Total: ₹{total}</p>
          <button
            className="bg-green-600 text-white px-6 py-2 rounded"
            onClick={() => navigate('/checkout')}
          >
            Confirm Rental
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;



