import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate bypass and go to login page
    const timer = setTimeout(() => {
      navigate('/login');
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <p className="text-lg font-semibold">Registering... Redirecting to login</p>
    </div>
  );
};

export default RegisterPage;


