import { BrowserRouter, Route, Routes } from "react-router-dom";
/** 
* We use the module react-router-dom and its buildt in functions (Router, Routes etc.) to render our UI to the DOM (HTLM).
*/

import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import CardView from "./pages/cardView";
import CreateMessage from "./pages/MessageEditor";
import Auth from "./pages/Auth";
import Navbar from "./components/layouts/Navbar";
import { NeonAuthUIProvider } from '@neondatabase/neon-js/auth/react';
import { authClient } from "./lib/auth";
import AuthProvider from "./context/AuthContext";
import Footerr from "./components/layouts/Footer";

function App() {
    /** 
    this is the webapps function that contains all the routes
    @return {default} it returns the auth and the browserrouter containing the pages
    */

    return (
        <NeonAuthUIProvider authClient={authClient} defaultTheme="light">
            <AuthProvider>
                <BrowserRouter>
                    <div className="min-h-screen flex flex-col">
                        <Navbar />
                        <main className="flex-1">
                            <Routes>
                                <Route index element={<Home />} />
                                <Route path="/onboarding" element={<Onboarding />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/auth/home" element={<Home />} />
                                <Route path="/auth/:pathname" element={<Auth />} />
                                <Route path="/card-view" element={<CardView />} />
                                <Route path="/message-editor" element={<CreateMessage />} />


                            </Routes>
                        </main>
                        <Footerr />
                    </div>
                </BrowserRouter>
            </AuthProvider>
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