import { useNavigate } from 'react-router-dom';
import '../presentations/Navbar.css';


function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <nav className='navContainer'>
      <div style={{ width: '100px' }}></div>
      <div style={{ textAlign: 'center' }}>
        <h1>Academia</h1>
      </div>
      <div style={{ width: '100px', textAlign: 'right' }}>
        {isLoggedIn ? (
          <button className='navButton' onClick={handleLogout}>Logout</button>
        ) : (
          <button className='navButton' onClick={handleLogin}>Login</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;