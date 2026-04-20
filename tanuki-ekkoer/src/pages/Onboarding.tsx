import { RedirectToSignIn, SignedIn } from "@neondatabase/neon-js/auth/react";
import { useAuth } from "../context/AuthContext"
import { Card } from "../components/UI/Card";
import { Select } from "../components/UI/Select";
import { useState } from "react";
import { TextArea } from "../components/UI/TextArea";
import { Button } from "../components/UI/Button";
import { ArrowRight, Loader2 } from "lucide-react";
import type { UserProfile } from "../types";
import { useNavigate } from "react-router-dom";
import CharacterSelector from "../components/UI/characterRow";

const messageTone = [
    { value: "fun", label: "En muntert hilsen, for sjov" },
    { value: "friendly", label: "En venlig og opmuntrende hilsen til de bedste venner!" },
    { value: "cool", label: "En sej besked fra en sej karakter" }
]

const userChoiceOfWriter = [
    { value: "user", label: "Jeg vil ændre min besked" },
    { value: "AI", label: "Jeg vil gerne beholde den besked, som AI'en har givet" },
]


export default function Onboarding() {
    const { user, saveProfile } = useAuth();
    const [formData, setFormData] = useState({
        voice: "mickey",
        messageTone: "friendly",
        userChoiceOfWriter: "user",
        name: ""
    });
    //we create the states we need for the form, the form data is an object that contains all the information we need to save the profile, we initialize it with default values. We also have a state for the loading state of the generation process and a state for any error that might occur during the profile saving process.
    const [isGenerating, setIsGenerating] = useState(false);//true for testing
    const [error, setError] = useState("");
    const navigate = useNavigate();
    function updateFormData(field: string, value: string) { /**formdata becomes an object where the prev is the previous that remains the same and onlt the field we pass is changed */
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }))
    }

    async function handleUserForm(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault(); /**prevents the default behavior of the form submission, which is to reload the page. This allows us to handle the form submission with our custom logic without causing a page refresh. */

        // Validate form data
        if (!formData.name.trim()) {
            alert("Please enter a name");
            return;
        }
        if (!formData.voice) {
            alert("Please select a voice");
            return;
        }
        if (!formData.messageTone) {
            alert("Please select a message tone");
            return;
        }
        if (!formData.userChoiceOfWriter) {
            alert("Please select your preference for message editing");
            return;
        }

        const profile: Omit<UserProfile, 'userId' | 'updatedAt'> = {
            name: formData.name,
            voice: formData.voice as UserProfile['voice'], /**we are using type assertion here to tell typescript that the value of formData.voice will be one of the values defined in the UserProfile interface for the voice property. This is necessary because formData.voice is a string, but we want to ensure that it matches the specific string literals defined in the UserProfile interface. */
            messageTone: formData.messageTone as UserProfile['messageTone'],
            userChoiceOfWriter: formData.userChoiceOfWriter as UserProfile['userChoiceOfWriter']
        };

        try {
            await saveProfile(profile);
            navigate("/message-editor")
            setIsGenerating(true);
            alert("Profile saved successfully!");
        } catch (e) {
            setError(e instanceof Error ? e.message : "Failed to save profile T^T");
            console.error("Error saving profile:", e);
            alert("Error saving profile: " + (e as Error).message);
        } finally {
            setIsGenerating(false);
        }
        // state management for the form submission process. We validate the form data to ensure all required fields are filled out, then we construct a profile object that matches the expected format for our API. We call the saveProfile function from our AuthContext to save the profile data to the backend, and we handle any errors that might occur during this process by updating the error state and logging the error to the console. Finally, we set the isGenerating state back to false once the process is complete, regardless of whether it succeeded or failed.
    }

    if (!user) {
        return <RedirectToSignIn />; /**a component from neon */

    }
    return (
        <SignedIn>
            <div className="min-h-screen pt-24 pb-12 px-6 bg-[var(--color-background)]">
                <div className="max-w-xl mx-auto">
                    {/*/step 1: input from user*/}

                    {!isGenerating ? (
                        <Card variant="bordered">
                            <h1 className="text-2xl font-bold mb-2">Velkom til Tanuki Ekkoer!</h1>
                            <p >Lav din første fødselsdagshilsen med avanceret AI-teknologi.</p>
                            <form onSubmit={handleUserForm} className="space-y-7 mt-12 ">
                                <TextArea id="name"
                                    label="Hvad hedder fødselsdagsbarnet?"
                                    placeholder="Skriv dit navn eller kælenavn her"
                                    rows={2}
                                    value={formData.name}
                                    onChange={(e) => updateFormData('name', e.target.value)}
                                />

                                <CharacterSelector
                                    value={formData.voice}
                                    onChange={(selectedVoice) => updateFormData('voice', selectedVoice)}
                                />
                                <Select id="messageTone"
                                    label="Hvilken tone ønsker du, at din besked skal have?"
                                    options={messageTone}
                                    value={formData.messageTone}
                                    onChange={(e) => updateFormData('messageTone', e.target.value)} />

                                <Select id="userChoiceOfWriter"
                                    label="Vil du redigere den besked, som AI'en har genereret, eller beholde den, som den er?"
                                    options={userChoiceOfWriter}
                                    value={formData.userChoiceOfWriter}
                                    onChange={(e) => updateFormData('userChoiceOfWriter', e.target.value)} />

                                <div className="flex gap-3 pt-2">
                                    <Button type="submit" className="flex-1 gap-2" >

                                        Generer min fødselsdagshilsen <ArrowRight className="w-4 h-4" />
                                    </Button>

                                </div>
                            </form>
                        </Card>
                    ) : (
                        <Card variant="bordered" className="text-center py-16 flex flex-col items-center gap-4">
                            <Loader2 className="w-12 h-12 text-[var(--color-accent)] mx-auto mb-6 animate-spin" />
                            <h1 className="text-2xl font-bold mb-2">We are creating your message</h1>
                            <p className="text-[var(--color-muted)]"> This might take a few seconds, we are using powerful AI to create the best message for your birthday greeting!</p>
                        </Card>


                    )}

                    {/*step 2: AI generation card as an output*/}



                </div>
            </div>

        </SignedIn>
    )
}