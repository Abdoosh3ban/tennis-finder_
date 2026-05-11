import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import CourtsPage from './components/CourtsPage';
import MarketplacePage from './components/MarketplacePage';
import MatchmakingPage from './components/MatchmakingPage';
import CommunityPage from './components/CommunityPage';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import PricingPage from './components/PricingPage';
import DemoChatPage from './components/DemoChatPage';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';


export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/courts" element={<CourtsPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/matchmaking" element={<MatchmakingPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/comunity" element={<CommunityPage />} />
          <Route path="/demochat" element={<DemoChatPage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
      {/* If you want this route, keep it */}
          <Route path="/pricing/*" element={<PricingPage />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}
