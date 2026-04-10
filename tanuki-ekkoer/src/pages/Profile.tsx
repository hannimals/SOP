import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
export default function Profile() {
    const { user, isLoading } = useAuth();
    const plan = true; /**here we are changing this so it checks if the user has created a card before or not @hannimals */
    if (!user && !isLoading) {
        return <Navigate to="/auth/sign-in" />

    }
    else if (plan) {
        return <Navigate to="/onboarding" /> /**@hannimals this will be changed so the user will be navigated to the card generator */
    }
    else {
        return <div>
            this is the Profile page
        </div>

    }

}