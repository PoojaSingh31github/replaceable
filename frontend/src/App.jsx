import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Public Pages
import LandingPage from "./pages/LandingPage";
import HorizonPage from "./pages/HorizonPage";
import ReportPage from "./pages/ReportPage";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminNewsNew from "./pages/admin/AdminNewsNew";
import AdminReports from "./pages/admin/AdminReports";
import AdminReportNew from "./pages/admin/AdminReportNew";
import AdminReportEdit from "./pages/admin/AdminReportEdit";
import AdminConsultations from "./pages/admin/AdminConsultations";
import AdminSiteContent from "./pages/admin/AdminSiteContent";
import AdminTags from "./pages/admin/AdminTags";
import AdminLandingCards from "./pages/admin/AdminLandingCards";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

// Global styles
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/horizon" element={<HorizonPage />} />
          <Route path="/reports/:slug" element={<ReportPage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="site-content" element={<AdminSiteContent />} />
              <Route path="landing-cards" element={<AdminLandingCards />} />
              <Route path="tags" element={<AdminTags />} />
              <Route path="news/new" element={<AdminNewsNew />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="reports/new" element={<AdminReportNew />} />
              <Route
                path="reports/:reportId/edit"
                element={<AdminReportEdit />}
              />
              <Route path="consultations" element={<AdminConsultations />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
