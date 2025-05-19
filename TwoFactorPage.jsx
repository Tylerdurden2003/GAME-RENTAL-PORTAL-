import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TwoFactorPage = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Simulate OTP verification delay
    setTimeout(() => {
      setLoading(false);
      setMessage('OTP verified! Redirecting...');
      setTimeout(() => {
        navigate('/games');
      }, 1000);
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">OTP Verification</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 rounded ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>

        {loading && (
          <div className="text-center mt-4 text-blue-600 text-sm">
            <svg
              className="animate-spin h-5 w-5 mx-auto text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            Validating OTP...
          </div>
        )}

        {message && <p className="text-sm text-center mt-4 text-green-600">{message}</p>}
      </form>
    </div>
  );
};

export default TwoFactorPage;


