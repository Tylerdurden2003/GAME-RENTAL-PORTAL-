
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-gray-900 text-white px-4 py-3 shadow-md">
    <div className="container mx-auto flex justify-between">
      <Link to="/" className="font-bold">GameRental</Link>
      <div className="space-x-4">
        <Link to="/games">Games</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
         <Link to="/cart">Cart</Link>
      </div>
    </div>
  </nav>
);
export default Navbar;
