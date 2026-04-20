// here we provide a readonæy view of the message if the user chose not to edit and a edit view if the user chose to edit. 
//we also have a big generate audio button
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/UI/Card";
import { Button } from "../components/UI/Button";
import { TextArea } from "../components/UI/TextArea";
import { ArrowLeft, Play, Loader2, Download } from "lucide-react";
import { getBirthdayMessage } from "../data/birthdayMessages";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";

export default function CreateMessage() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [profile, setProfile] = useState<any>(null);
    const [messageText, setMessageText] = useState("");
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const canEdit = profile?.userChoice === "user";

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.id) {
                navigate("/onboarding");
                return
            };
            try {
                const data = await api.getProfile(user.id);
                setProfile(data);
                //this is the default message
                const defaultMessage = getBirthdayMessage(
                    data.voice,
                    data.messageTone as any,
                    data.user_name || "friend");

                setMessageText(defaultMessage);

            } catch (err) {
                console.error("Failed to fetch profile:", err);
                setError("failed to load profil");
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, [user, navigate]);

    const handleGenerateAudio = async () => {
        if (!messageText.trim() || !user?.id || !profile) {
            setError("please enter a message (indtast en besked)");
            return;
        }
        setIsGenerating(true);
        setError("");
        try {
            const response = await api.generateGreeting(
                user.id,
                messageText,
                profile.voice
            );
            navigate("/card-view",
                {
                    state:
                    {
                        audioUrl: response.audioUrl,
                        character: profile.voice
                    }
                });
            setAudioUrl(response.audioUrl);
        } catch (e: any) {
            console.error("Audio Generation Error:", e);
            setError(e.message || "An error occurred while generating audio. (der var en fejl ved at generere din lyd)");
        } finally {
            setIsGenerating(false);
        }
    };
    if (isLoading) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-[var(--color-accent)]" />
            </div>
        );
    }
    if (error && !profile) {
        return (
            <div className="min-h-screen p-24 flex items-center justify-center">
                <Card variant="bordered" className="text-center p-8">
                    <p className="text-red-500"> {error}</p>
                    <Button onClick={() => navigate("/onboarding")} className="mt-4">
                        Tilbage
                    </Button>
                </Card>
            </div>
        );
    }
    if (!profile) {
        return (
            <div className="min-h-screen p-24 flex items-center bg-[var(--color-background)] justify-center text-black">
                <Card className="text-center border border-yellow-500 p-8 rounded">
                    <h2 className="text-xl font-bold text-yellow-600 mb-4">Profile Not Found</h2>
                    <p className="mb-4">No profile found for user ID: {user?.id}</p>
                    <p className="mb-4">Please complete the onboarding process first.</p>
                    <Button onClick={() => navigate("/onboarding")} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Go to Onboarding
                    </Button>
                </Card>
            </div>
        );
    }

    /**<div className="mb-6 p-4 bg-gray-100 rounded text-black">
                        <h2 className="text-lg font-bold mb-2">Debug Info:</h2>
                        <p>User ID: {user?.id}</p>
                        <p>Voice: {profile?.voice}</p>
                        <p>Message Tone: {profile?.messageTone}</p>
                        <p>User Choice: {profile?.userChoice}</p>
                        <p>Can Edit: {canEdit ? 'Yes' : 'No'}</p>
                    </div> */

    return (
        <div className="min-h-screen pt-24 pb-12 px-6">
            <div className="max-w-2xl mx-auto">




                <Button variant="ghost"
                    onClick={() => navigate("/onboarding")}
                    className="mb-6 flex items-center gap-2 border border-gray-300 px-4 py-2 rounded">
                    <ArrowLeft className="w-4 h-4" />
                    Tilbage til opsætning
                </Button>

                <Card variant="bordered" className="p-8">
                    <h1 className="text-3xl font-bold mb-2 text-[var(--color-primary)]">
                        {`Besked fra: ${profile?.voice.charAt(0).toUpperCase() + profile?.voice.slice(1)}`} {/*capitalizes the first letter of the voice name for better display*/}
                    </h1>
                    <p className="text-[var(--color-muted)] mb-8">
                        {canEdit
                            ? "Du er velkommen til at redigere den AI-genererede besked nedenfor, inden du opretter din lydhilsen!"
                            : "Her er den AI-genererede fødselsdagshilsen, der er tilpasset dine præferencer. Du kan oprette din lydhilsen ved at klikke på knappen nedenfor!"}
                    </p>

                    <div className="space-y-6">
                        <TextArea
                            id="message"
                            label="Fødselsdags Besked"
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            rows={9}
                            disabled={!canEdit}
                            placeholder="Skriv din Fødselsdagshilsen her..."
                            className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-muted)]"
                        />
                        {audioUrl && (
                            <div className="mt-8">
                                <h3 className="font-medium mb-3 px-4 text-[var(--color-primary)]">
                                    Lyd Preview:
                                </h3>
                                <Card variant="bordered" size="sm" className="p-4 bg-gray-50">
                                    <audio controls className="w-full rounded-xl bg-transparent" src={audioUrl}> {/*we will change this later. for preview it works*/}
                                        Your browser does not support the audio element (Din browser understøtter ikke audio-elementet).
                                    </audio>
                                </Card>
                            </div>

                        )}
                        {/*generate audio*/}

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button
                                onClick={handleGenerateAudio}
                                disabled={isLoading || !messageText.trim()}
                                className="flex-1 gap-2">
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-5 h-5 text-[var(--color-accent)] animate-spin" />
                                        Generating...
                                    </>
                                ) :
                                    (<>
                                        <Play className="w-5 h-5" />
                                        Generere hilsen med {profile.voice}
                                    </>
                                    )}
                            </Button>


                        </div>
                        {error && (
                            <p className="text-red-500 mt-4">
                                {error} </p>
                        )}

                    </div>
                </Card>
            </div>

        </div>
    );
}