// Package Imports
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/landingPage/NavBar'
// Page imports
import HomePage from './pages/HomePage'
import FriendsPage from './pages/FriendPage'
import LiftsPage from './pages/Lifts'
import SocialFeedPage from './pages/SocialFeed'
import WorkoutsPage from './pages/Workouts'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/social" element={<SocialFeedPage />} />
        <Route path="/workouts" element={<WorkoutsPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/lifts" element={<LiftsPage />} />
      </Routes>
    </>
  );
}

export default App;
