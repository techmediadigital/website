import React from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import WhatsAppButton from './components/WhatsAppButton';
import PublicLayout from './components/PublicLayout';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Company from './pages/Company';
import Contact from './pages/Contact';
import Solutions from './pages/Solutions';
import Insights from './pages/Insights';
import Products from './pages/Products';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-wrapper">
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/company" element={<Company />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/products" element={<Products />} />
              <Route path="/insights" element={<Insights />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
          <WhatsAppButton />
          <SpeedInsights />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
