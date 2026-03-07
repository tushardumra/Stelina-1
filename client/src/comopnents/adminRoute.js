import { Navigate } from "react-router-dom";

export const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("user_token");

  if(!token) {
    return <Navigate to="/login" replace />
  }

  const parts = token.split(".");
  const payload = JSON.parse(atob(parts[1]));

  if(payload.userRole !== "admin") {
    return <Navigate to="/" replace/>
  }

  return children;
}