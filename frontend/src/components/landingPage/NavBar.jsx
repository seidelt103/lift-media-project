import { Link } from 'react-router-dom';
import './css/NavBar.css';

function NavBar() {
  return (
    <div className="overall-nav">
      <div className="nav-wrapper">
        <h1 className="nav-title">Liftr</h1>
        <nav className="five-col-navbar">
          <div className="nav-col">
            <Link to="/home">
              <button className="nav-buttons home-btn">Home</button>
            </Link>
          </div>
          <div className="nav-col">
            <Link to="/social">
              <button className="nav-buttons">Social Feed</button>
            </Link>
          </div>
          <div className="nav-col">
            <Link to="/workouts">
              <button className="nav-buttons">Workouts Page</button>
            </Link>
          </div>
          <div className="nav-col">
            <Link to="/friends">
              <button className="nav-buttons">Friends Page</button>
            </Link>
          </div>
          <div className="nav-col">
            <Link to="/lifts">
              <button className="nav-buttons lift-btn">Lifts</button>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;