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

import { CustomCursor } from './components/CustomCursor';

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
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
