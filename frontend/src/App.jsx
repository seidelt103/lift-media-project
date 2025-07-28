// Package Imports
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/landingPage/NavBar'
// Page imports
import FriendsPage from './pages/FriendPage'
import LiftsPage from './pages/Lifts'
import SocialFeedPage from './pages/SocialFeed'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LiftsPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/lifts" element={<LiftsPage />} />
        <Route path="/social" element={<SocialFeedPage />} />
      </Routes>
    </>
  );
}

export default App;
