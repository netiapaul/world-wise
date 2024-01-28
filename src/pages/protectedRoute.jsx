import { useNavigate } from "react-router-dom";
import { UseAuth } from "../contexts/fakeAuthContext";
import { useEffect } from "react";

/* eslint-disable react/prop-types */
function ProtectedRoute({ children }) {
  const { isAuthenticated } = UseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
