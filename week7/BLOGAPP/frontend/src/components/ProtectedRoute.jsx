import { useAuth } from "../store/authStore";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function ProtectedRoute({ children, allowedRoles }) {
  const { loading, initialized, currentUser, isAuthenticated } = useAuth();

  // Wait until checkAuth has completed at least once before making any decision.
  // This prevents an immediate redirect to /login on a hard refresh when the
  // user is actually logged in but the auth check hasn't finished yet.
  if (!initialized || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <svg
          className="animate-spin h-8 w-8 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
      </div>
    );
  }

  // Auth check is done — user is not logged in
  if (!isAuthenticated) {
    toast.error("Please log in to continue");
    return <Navigate to="/login" replace />;
  }

  // Logged in but wrong role
  if (allowedRoles && !allowedRoles.includes(currentUser?.role)) {
    return <Navigate to="/unauthorized" replace state={{ redirectTo: "/" }} />;
  }

  return children;
}

export default ProtectedRoute;
