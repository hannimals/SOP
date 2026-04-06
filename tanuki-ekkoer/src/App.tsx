import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import Account from "./pages/Account";
import Auth from "./pages/Auth";
import Navbar from "./components/layouts/Navbar";
import { NeonAuthUIProvider } from '@neondatabase/neon-js/auth/react';
import { authClient } from "./lib/auth";

function App() {
    return (
        <NeonAuthUIProvider authClient={authClient}>
            <BrowserRouter>
                <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-1">
                        <Routes>
                            <Route index element={<Home />} />
                            <Route path="/onboarding" element={<Onboarding />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/auth/:pathname" element={<Auth />} />
                            <Route path="/account/:pathname" element={<Account />} />


                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
        </NeonAuthUIProvider>
    )
}

export default App;



/** 
    const [theme, setTheme] = useState("light");
    return(
        <div className={`${theme} bg-background min-h-screen min-w-screen text-slate-900 dark:bg-primary dark:text-white`}>
            <div className="flex items-center justify-between bg-rose-100 p-4 dark:bg-rose-400">
                <div className="font-bold">
                    logo
                </div>
                <div className="flex gap-2">
                    <button className="text-xl px-4 cursor-pointer text-r" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                        ◐

                    </button>
                    <span>Home</span>
                    <span>About</span>
                    <span>Contact</span>
                </div>
            </div> {/**app bar*
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 text-center p-6 gap-2">
                <div className="bg-sky-300 p-4 m-2 rounded-xl hover:bg-sky-400 hover:scale-110 transition-all">Feature 1</div>
                <div className="bg-sky-300 p-4 m-2 rounded-xl hover:bg-sky-400 hover:scale-110 transition-all">Feature 2</div>
                <div className="bg-sky-300 p-4 m-2 rounded-xl hover:bg-sky-400 hover:scale-110 transition-all">Feature 3</div>
                <div className="bg-sky-300 p-4 m-2 rounded-xl hover:bg-sky-400 hover:scale-110 transition-all">Feature 4</div>
                <div className="bg-sky-300 p-4 m-2 rounded-xl hover:bg-sky-400 hover:scale-110 transition-all">Feature 5</div>
            </div>
        </div>
    ); */ 