import { Link } from 'react-router-dom';
import './css/NavBar.css';

function NavBar() {
  return (
    <nav className="header three-col-navbar">
      <div className="nav-col left-col">
        <Link to="/friends">
          <button className="nav-buttons">Friends Page</button>
        </Link>
      </div>
      <div className="nav-col center-col">
        <Link to="/social">
          <button className="nav-buttons">Social Feed</button>
        </Link>
      </div>
      <div className="nav-col right-col">
        <Link to="/lifts">
          <button className="nav-buttons">Lifts</button>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;