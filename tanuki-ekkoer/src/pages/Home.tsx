import { useNavigate } from "react-router-dom";
import { Button } from "../components/UI/Button";
import { Play } from "lucide-react";
const mikiGif = new URL("../assets/miki.gif", import.meta.url).href;

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[var(--color-background)]">
            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Text */}
                    <div className="space-y-8">
                        <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-[var(--color-primary)]">
                            Velkomment til Tanuki Ekkoer
                        </h1>
                        <h2 className="text-3xl lg:text-3xl font-bold leading-tight text-[var(--color-primary)]">
                            Få en fødselsdagshilsen<br />
                            fra dine yndlingskarakterer
                        </h2>

                        <h3 className="text-2xl text-[var(--color-muted)]">
                            Personlige beskeder med ægte klonede stemmer
                        </h3>

                        <p className="text-lg text-[var(--color-muted)] max-w-lg">
                            Med Tanuki Ekkoer kan du skabe magiske fødselsdagsbeskeder fra Mickey, Sonic,
                            Twilight Sparkle og flere. Vores AI modeller kloner stemmerne, så det lyder helt rigtigt.
                        </p>

                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => navigate("/onboarding")}
                            className="text-lg text-bold text-white px-10 py-7 hover:scale-105 transition-transform"
                        >
                            Kom i gang, det er gratis at prøve!
                        </Button>
                    </div>

                    {/* Right: Mickey GIF with Play Button */}
                    <div className="relative flex justify-center">
                        <div className="relative group">
                            <img
                                src={mikiGif}
                                alt="Mickey Mouse Birthday Animation"
                                className="w-full max-w-md lg:max-w-lg rounded-3xl shadow-2xl"
                            />

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-right justify-end p-4">
                                <div
                                    onClick={() => alert("Demo lyd kommer snart!")}
                                    className="w-20 h-20 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer shadow-xl transition-all hover:scale-110 border-4 border-white"
                                >
                                    <Play className="w-10 h-10 text-[var(--color-accent)] ml-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="bg-white py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12 text-[var(--color-primary)]">
                        Lav unikke og sjove fødselsdagshilsener på under 30 sekunder
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Step 1 */}
                        <div className="group bg-[var(--color-card)] border border-[var(--color-border)] rounded-3xl p-10 hover:border-[var(--color-accent)] hover:shadow-2xl transition-all duration-300">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 flex items-center justify-center bg-[var(--color-accent)] text-white rounded-2xl text-2xl font-bold shadow">
                                    1
                                </div>
                                <h3 className="text-2xl font-semibold">Vælg karakter</h3>
                            </div>
                            <p className="text-black leading-relaxed">
                                Vælg din yndlingskarakter!</p>
                            <p className="text-black leading-relaxed">
                                Skriv navnet af fødselsdagsbarnet, så bliver beskeden personlig. Du kan også vælge tone og stil, så det passer perfekt til begivenheden.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="group bg-[var(--color-card)] border border-[var(--color-border)] rounded-3xl p-10 hover:border-[var(--color-accent)] hover:shadow-2xl transition-all duration-300">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 flex items-center justify-center bg-[var(--color-accent)] text-white rounded-2xl text-2xl font-bold shadow">
                                    2
                                </div>
                                <h3 className="text-2xl font-semibold">Skriv eller læs beskeden</h3>
                            </div>
                            <p className="text-black leading-relaxed">
                                Skriv en besked eller vælg at beholde vores forslag.
                                Du kan redigere teksten lige så meget du vil, før vi lægger en stemme til den.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="group bg-[var(--color-card)] border border-[var(--color-border)] rounded-3xl p-10 hover:border-[var(--color-accent)] hover:shadow-2xl transition-all duration-300">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 flex items-center justify-center bg-[var(--color-accent)] text-white rounded-2xl text-2xl font-bold shadow">
                                    3
                                </div>
                                <h3 className="text-2xl font-semibold">Få din lydhilsen</h3>
                            </div>
                            <p className="text-black leading-relaxed">
                                Tryk på "Generer lyd" og hør din valgte karakter sige beskeden højt.
                                Bagefter kan du downloade det flotte kort med billede og lyd så du kan nemt sende den til andre!! ingen grund til at sende en kedelig sms, når du kan sende en sjov og personlig lydhilsen i stedet!
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => navigate("/onboarding")}
                            className="px-12 py-7 text-lg text-white hover:scale-105 transition-transform"
                        >
                            Prøv det nu
                        </Button>
                    </div>
                </div>
            </div>
            {/* Features Section */}
            <div className="bg-white py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12 text-[var(--color-primary)]">
                        Hvorfor vælge os?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group bg-[var(--color-background)] border border-gray-100 rounded-3xl p-8 hover:border-[var(--color-accent)] hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className="text-4xl mb-6">{feature.icon}</div>
                                <h3 className="text-2xl font-semibold mb-3 group-hover:text-[var(--color-accent)] transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-[var(--color-muted)] leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Features data
const features = [
    {
        icon: "🎤",
        title: "Ægte Stemmekloning",
        description: "Hør dine yndlingskarakterer sige en personlig besked med stemmer der lyder helt rigtige.",
    },
    {
        icon: "🎨",
        title: "Smukke Kort",
        description: "Få et flot animeret kort med karakteren og den indtalte besked, perfekt til at sende videre.",
    },
    {
        icon: "⚡",
        title: "Super Hurtigt",
        description: "Fra idé til færdig lydhilsen på under 30 sekunder. Klar til at overraske på fødselsdagen.",
    },
    {
        icon: "🎁",
        title: "Personligt & Sjovt",
        description: "Tilpas navn, tone og besked. Lav noget der føles specielt og mindeværdigt.",
    },
    {
        icon: "📱",
        title: "Nem at bruge",
        description: "Intuitivt design. Ingen teknisk viden nødvendig, bare skriv og tryk på knappen.",
    },
    {
        icon: "🌍",
        title: "Internationalt & Dansk",
        description: "Nogle af vores karakter har både engelske og danske stemme modeller.",
    },
];