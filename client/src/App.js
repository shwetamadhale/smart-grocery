import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import RequireOnboarding from "./components/RequiresOnboarding";

import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import Preferences from "./pages/Preferences";
import Budget from "./pages/Budget";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";

function App() {
  const location = useLocation();
  const noNavbarPaths = ["/login", "/register"];

  return (
    <>
      {!noNavbarPaths.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/login/*" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/preferences"
          element={
            <SignedIn>
              <Preferences />
            </SignedIn>
          }
        />
        <Route
          path="/budget"
          element={
            <SignedIn>
              <Budget />
            </SignedIn>
          }
        />

        <Route
          path="/dashboard"
          element={
            <SignedIn>
              <RequireOnboarding>
                <Dashboard />
              </RequireOnboarding>
            </SignedIn>
          }
        />
        <Route
          path="/analytics"
          element={
            <SignedIn>
              <RequireOnboarding>
                <Analytics />
              </RequireOnboarding>
            </SignedIn>
          }
        />
        <Route
          path="/profile"
          element={
            <SignedIn>
              <RequireOnboarding>
                <Profile />
              </RequireOnboarding>
            </SignedIn>
          }
        />

        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <Navigate to="/dashboard" />
              </SignedIn>
              <SignedOut>
                <Navigate to="/login" />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
