import { Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../UI/Button";
import { useAuth } from "../../context/AuthContext";
import { UserButton } from "@neondatabase/neon-js/auth/react";
export default function Navbar() {
    const user = useAuth();
    /** the use auth hook lets us consume the data provided from our auth provider */
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-background)]/80 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-[var(--color-foreground)]">
                    <Dumbbell className="w-6 h-6 text-[var(--color-accent)]" />
                    <span className="font-semibold text-lg"> Tanuki Ekkoer</span>
                </Link>
                <nav>
                    {user ? <>
                        <Link to="/auth/profile">
                            <Button variant="ghost" size="sm">Profile</Button>

                        </Link>
                        <UserButton className="bg-(--color-accent)" />
                    </> : <>
                        <Link to="/auth/sign-in">
                            <Button variant="ghost" size="sm">Sign In</Button>

                        </Link>
                        <Link to="/auth/sign-up">
                            <Button size="sm">Sign Up</Button>

                        </Link>
                    </>}

                </nav>
            </div>

        </header>
    )
}