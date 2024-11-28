import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../presentations/LoginPage.css';
import {authAPI} from '../utils/httpUtil';

function LoginPage({setIsLoggedIn} ) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      // Send login request to the API
      const response = await authAPI.login(email, password);
      const token = response.data.token || response.data; 
      
      if (token) {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
        navigate('/specializations'); 
      } else {
        setError("Invalid credentials. Please try again.");
      }
      } catch (err) {
        console.error("Login error:", err);
        setError("Login failed. Please check your credentials.");
    }
  };
  
  return (
    <div className='loginContainer'>
      <h2 className='loginHeading'>Login to Academia</h2>
      {error && <p>{error}</p>}
      <form className='formContainer' onSubmit={handleLogin}>
        <div>
          <label>Email </label> <br></br>
          <input className='loginInput'
            type="email"
            value={email}
            placeholder='Enter your email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password </label><br></br>
          <input className='loginInput'
            type="password"
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className='submitButton' type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;