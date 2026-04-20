
import { Link } from "react-router-dom";
import { Button } from "../UI/Button";
const tanukiLogo = new URL("../../assets/tanuki_logo.png", import.meta.url).href;

export default function Footerr() {
    return (
        <header className="left-0 right-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-accent)]/80 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-[var(--color-foreground)]">
                    <img src={tanukiLogo} alt="logo should be here" className="h-10 w-10 object-contain" />
                    <span className="font-semibold text-lg"> Tanuki Ekkoer</span>
                </Link>
                <nav>

                    <Link to="/auth/profile">
                        <Button variant="ghost" size="sm" className="text-foreground">Profile</Button>

                    </Link>

                    <Link to="/home">
                        <Button variant="ghost" size="sm" className="text-foreground">Om os</Button>

                    </Link>
                    <Link to="/home">
                        <Button variant="ghost" size="sm" className="text-foreground">Kontakt</Button>

                    </Link>

                </nav>
            </div>

        </header>
    )
}