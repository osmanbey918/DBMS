import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/Loading';


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Access loading state from Redux store
  const loading = useSelector((state) => state.authSlice.loading);

  const handleLogin = () => {
    const user = {
      email,
      password,
    };
    dispatch(login(user));
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>
          Login
          <button onClick={() => navigate('/signup')} className="l-btn">
            <h1>/SignUp</h1>
          </button>
        </h1>
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
