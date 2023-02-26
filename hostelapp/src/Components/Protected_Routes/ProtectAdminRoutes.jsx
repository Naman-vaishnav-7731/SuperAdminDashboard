import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({ children }) => {

  if (localStorage.getItem("Token") !== null && JSON.parse(localStorage.getItem("userData")).userType !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default ProtectedAdmin;
