import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/Loading';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access loading state from Redux store
  const loading = useSelector((state) => state.auth.loading);

  const handleLogin = async () => {
    setError("");
    const user = {
      email,
      password,
    };
    try {
      await dispatch(login(user)).unwrap();
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login<button onClick={() => navigate('/signup')} className="l-btn">
          <h1>/SignUp</h1>
        </button>
        </h1>
        {error && <div className="error-message">{error}</div>}
        <input
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button onClick={handleLogin} className="login-button">
          login
        </button>
        {loading && <Loading />}
      </div>
    </div>
  );
}
