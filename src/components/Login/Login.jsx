import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './login.css';
import axios from 'axios';

const Login = () => {
  const { setAuthInfo } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', { email, password });
      const  {userData} = response.data;
      setAuthInfo(userData._id, userData.username, response.data.token, userData.email, true);
      history.push('/');
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password. Please try again.');
      } else {
        setError('Login failed. Please try again later.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-background"></div>
      <div className="login-content">
        <div className='logo1'>
          <img src='./images/logo.png' alt='' />
        </div>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign In</button>
          {error && <p className="error-message">{error}</p>}
          <div className="signup-link">
            New to StreamIt? <Link to="/register">Sign up now</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
