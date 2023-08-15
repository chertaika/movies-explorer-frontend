import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, children }) => (
  !isLoggedIn ? <Navigate to="/signin" replace /> : children
);

export default ProtectedRoute;
