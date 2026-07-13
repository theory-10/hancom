import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import MainPage from './pages/MainPage'
import ExplorePage from './pages/ExplorePage'
import DetailPage from './pages/DetailPage'
import StayPage from './pages/StayPage'
import RestaurantPage from './pages/RestaurantPage'
import WeatherPage from './pages/WeatherPage'
import ChecklistPage from './pages/ChecklistPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/stay" element={<StayPage />} />
        <Route path="/restaurant" element={<RestaurantPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/checklist" element={<ChecklistPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  )
}

export default App
