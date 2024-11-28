import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../presentations/LoginPage.css';

function LoginPage({setIsLoggedIn} ) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      // Send login request to the API
      const response = await axios.post('http://localhost:8080/api/v1/login', 
        { email, password }, 
      );
  
      const token = response.data.token || response.data; 
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
      navigate('/specializations'); 
    } catch (err) {
      
      const errorMessage = err.response?.data?.message || err.message || 'Something went wrong';
      setError(errorMessage); // Set an error message for the user
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