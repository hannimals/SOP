import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

export default function Home() {
    const { user, isLoading } = useAuth();
    if (user && !isLoading) {
        /**we use the navigate component of react router that works as alink to navigate between routes */
        return <Navigate to="/profile" replace />;
    }
    return <div>
        this is the home page
    </div>
}