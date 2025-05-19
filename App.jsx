
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartPage from './pages/CartPage';
import CheckoutConfirmationPage from './pages/CheckoutConfirmationPage';
import GameDetailPage from './pages/GameDetailPage';
import GameListPage from './pages/GameListPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TwoFactorPage from './pages/TwoFactorPage';
const App = () => (
  <Router>
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/games" element={<GameListPage />} />
        <Route path="/games/:id" element={<GameDetailPage />} />
        <Route path="/verify-otp" element={<TwoFactorPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutConfirmationPage />} />
      </Routes>
    </div>
  </Router>
);
export default App;
