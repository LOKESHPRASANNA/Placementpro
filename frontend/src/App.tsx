import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { AIChat } from './pages/AIChat';
import { ResumeAnalyzer } from './pages/ResumeAnalyzer';
import { PlacementRoadmap } from './pages/PlacementRoadmap';
import { MockInterview } from './pages/MockInterview';
import { StudyPlanner } from './pages/StudyPlanner';
import { Analytics } from './pages/Analytics';
import { AptitudeHub } from './pages/AptitudeHub';
import { CodingPlatform } from './pages/CodingPlatform';
import { TestSimulation } from './pages/TestSimulation';
import { CompanyPrepCenter } from './pages/CompanyPrepCenter';
import { JobPortal } from './pages/JobPortal';
import { CareerCoach } from './pages/CareerCoach';

import { CustomCursor } from './components/CustomCursor';
import { ComingSoon } from './components/ComingSoon';
import { Boxes, Users, ShieldAlert } from 'lucide-react';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CustomCursor />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="chat" element={<AIChat />} />
            <Route path="resume" element={<ResumeAnalyzer />} />
            <Route path="roadmap" element={<PlacementRoadmap />} />
            <Route path="interview" element={<MockInterview />} />
            <Route path="planner" element={<StudyPlanner />} />
            <Route path="analytics" element={<Analytics />} />
            
            {/* Phase 6 New Routes */}
            <Route path="career-coach" element={<CareerCoach />} />
            
            {/* Phase 3 New Routes */}
            <Route path="coding" element={<CodingPlatform />} />
            <Route path="aptitude" element={<AptitudeHub />} />
            <Route path="test-simulation" element={<TestSimulation />} />
            
            {/* Phase 4 New Routes */}
            <Route path="companies" element={<CompanyPrepCenter />} />
            <Route path="jobs" element={<JobPortal />} />
            
            {/* Phase 5+ Placeholder Routes */}
            <Route path="projects" element={
              <ComingSoon title="AI Project Builder" description="Architecture, tech stack, and timeline generator for your next big project." icon={<Boxes size={40} />} phase={4} />
            } />
            <Route path="community" element={
              <ComingSoon title="Community Forum" description="Peer learning, study groups, and knowledge sharing." icon={<Users size={40} />} phase={4} />
            } />
            <Route path="admin" element={
              <ComingSoon title="Admin Dashboard" description="Analytics and management panel for faculty and administrators." icon={<ShieldAlert size={40} />} phase={4} />
            } />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
