
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import API from "../../services/api";
import PageLoader from "./PageLoader";
import { getToken, removeToken } from "../../utils/authCookie";
import Home from "../../features/home/Home";

const getDashboardPath = (role) => {
    switch (role) {
        case "ADMIN":
            return "/admin-dashboard";

        case "CUSTOMER":
            return "/customer-dashboard";

        case "TECHNICIAN":
            return "/technician-dashboard";

        default:
            return null;
    }
};

export default function ProtectedRoute() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    const [status, setStatus] = useState("checking");
    const [role, setRole] = useState(null);

    useEffect(() => {
        let active = true;

        const checkAuth = async () => {
            const token = getToken();

            // 1. No token: user is a guest
            if (!token) {
                localStorage.removeItem("name");
                localStorage.removeItem("role");

                if (active) {
                    setStatus("guest");
                }
                return;
            }

            try {
                // 2. Validate token with backend
                const response = await API.get("/auth/me");

                if (!active) return;

                const { name, role } = response.data.data;

                // 3. Validate user information
                const dashboardPath = getDashboardPath(role);

                if (!name || !dashboardPath) {
                    throw new Error("Invalid user information");
                }

                // 4. Save authenticated user information
                localStorage.setItem("name", name);
                localStorage.setItem("role", role);

                setRole(role);
                setStatus("authenticated");

            } catch (error) {
                if (!active) return;

                console.error("Authentication check failed:", error);

                // 5. Invalid or expired JWT
                if (
                    error.response?.status === 401 ||
                    error.message === "Invalid user information"
                ) {
                    removeToken();
                    localStorage.removeItem("name");
                    localStorage.removeItem("role");

                    setRole(null);
                    setStatus("guest");
                } else {
                    // Network/server errors should not log out the user
                    setStatus("error");
                }
            }
        };

        checkAuth();

        return () => {
            active = false;
        };
    }, []);

    // 6. Show loading animation while checking authentication
    if (status === "checking") {
        return <PageLoader />;
    }

    // 7. Handle backend/network errors
    if (status === "error") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-gray-700">
                        Unable to verify your session.
                    </p>

                    <button
                        onClick={() => window.location.reload()}
                        className="mt-3 rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const dashboardPath = getDashboardPath(role);

    // 8. Authenticated user opening Home
    if (isHomePage && status === "authenticated") {
        return <Navigate to={dashboardPath} replace />;
    }

    // 9. Guest user opening Home
    if (isHomePage && status === "guest") {
        return <Home />;
    }

    // 10. Guest cannot access dashboard
    if (status === "guest") {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    // 11. User can access only their own dashboard
    if (!dashboardPath || !location.pathname.startsWith(dashboardPath)) {
        return <Navigate to={dashboardPath || "/"} replace />;
    }

    // 12. Authentication successful: render dashboard routes
    return <Outlet />;
}
