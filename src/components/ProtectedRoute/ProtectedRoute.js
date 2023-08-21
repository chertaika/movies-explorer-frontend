import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, children }) => (
  !isLoggedIn ? <Navigate to="/" replace /> : children
);

export default ProtectedRoute;
