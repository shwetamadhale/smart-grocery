import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const RequireOnboarding = ({ children }) => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!isLoaded) return; // wait until user is loaded

    const prefs = user?.publicMetadata?.preferences;
    const budget = user?.publicMetadata?.budget;

    if (!prefs || !budget) {
      // If onboarding incomplete, redirect
      navigate("/preferences", { replace: true });
    } else {
      // Onboarding complete, allow access
      setChecking(false);
    }
  }, [user, isLoaded, navigate]);

  if (!isLoaded || checking) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default RequireOnboarding;
