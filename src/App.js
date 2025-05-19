import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { LanguageProvider } from "./context/LanguageContext"
import styled from "styled-components"

// Import pages and components (replace these imports with your actual files)
import HomePage from "./components/pages/public/HomePage"
import LoginPage from "./components/pages/public/LoginPage"
import RegisterPage from "./components/pages/public/RegisterPage"
import CitizenDashboard from "./components/pages/citizen/CitizenDashboard"
import SubmitComplaint from "./components/pages/citizen/SubmitComplaints"
import MyComplaints from "./components/pages/citizen/MyComplaints"
import ComplaintDetails from "./components/pages/citizen/ComplaintsDetails"
import InstitutionDashboard from "./components/pages/institution/InsititutionDashboard.jsx"
import IncomingComplaints from "./components/pages/institution/IcomingComplaints.jsx"
import RespondPage from "./components/pages/institution/RespondPage"
import InstitutionProfile from "./components/pages/institution/InstitutionProfile"
import AdminDashboard from "./components/pages/admin/AdminDashboard"
import ComplaintsMonitor from "./components/pages/admin/ComplaintsMonitor"
import ManageUsers from "./components/pages/admin/ManageUser"
import ManageCategories from "./components/pages/admin/ManageCategories"
import Analytics from "./components/pages/admin/Analytics"
import ComplaintDetail from "./components/pages/admin/ComplaintsDetails.jsx"
import Navbar from "./components/common/Navbar"
import Footer from "./components/common/Footer"
import GlobalStyle from "./styles/GlobalStyles"
import TranslationLoader from "./components/common/TranslationLoader.js"

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const ContentContainer = styled.main`
  flex: 1;
  padding-top: 80px; // Account for fixed navbar
  padding-bottom: 40px;
`

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <TranslationLoader>
          <Router>
            <GlobalStyle />
            <AppContainer>
              <Navbar />
              <ContentContainer>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />

                  {/* Citizen Routes */}
                  <Route
                    path="/citizen/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={["citizen"]}>
                        <CitizenDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/citizen/submit-complaint"
                    element={
                      <ProtectedRoute allowedRoles={["citizen"]}>
                        <SubmitComplaint />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/citizen/my-complaints"
                    element={
                      <ProtectedRoute allowedRoles={["citizen"]}>
                        <MyComplaints />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/citizen/complaint/:id"
                    element={
                      <ProtectedRoute allowedRoles={["citizen"]}>
                        <ComplaintDetails />
                      </ProtectedRoute>
                    }
                  />

                  {/* Institution Routes */}
                  <Route
                    path="/institution/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={["institution"]}>
                        <InstitutionDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/institution/complaints"
                    element={
                      <ProtectedRoute allowedRoles={["institution"]}>
                        <IncomingComplaints />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/institution/respond/:id"
                    element={
                      <ProtectedRoute allowedRoles={["institution"]}>
                        <RespondPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/institution/profile"
                    element={
                      <ProtectedRoute allowedRoles={["institution"]}>
                        <InstitutionProfile />
                      </ProtectedRoute>
                    }
                  />

                  {/* Admin Routes */}
                  <Route
                    path="/admin/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={["admin"]}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/monitor"
                    element={
                      <ProtectedRoute allowedRoles={["admin"]}>
                        <ComplaintsMonitor />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/users"
                    element={
                      <ProtectedRoute allowedRoles={["admin"]}>
                        <ManageUsers />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/categories"
                    element={
                      <ProtectedRoute allowedRoles={["admin"]}>
                        <ManageCategories />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/analytics"
                    element={
                      <ProtectedRoute allowedRoles={["admin"]}>
                        <Analytics />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/complaint/:id"
                    element={
                      <ProtectedRoute allowedRoles={["admin"]}>
                        <ComplaintDetail />
                      </ProtectedRoute>
                    }
                  />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </ContentContainer>
              <Footer />
            </AppContainer>
          </Router>
        </TranslationLoader>
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App
