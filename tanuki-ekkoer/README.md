# Tanuki Ekkoer

**En AI-drevet platform til at skabe personlige fødselsdagshilsener med klonede karakterstemmer**

### Projektbeskrivelse

Tanuki Ekkoer er en webapplikation, der giver brugeren mulighed for at skabe personlige og følelsesladede fødselsdagsbeskeder, hvor kendte animationskarakterer "taler" direkte til brugeren.

Projektet kombinerer moderne webudvikling med AI (text-to-speech og voice cloning) for at skabe en unik og underholdende app. Navnet "Tanuki" refererer til det japanske yokai, der er kendt for at kunne efterligne stemmer og former. dette afspejler appens kernefunktionalitet.

### Teknisk Arkitektur

Applikationen er bygget som en **tre-lags arkitektur**:

- **Frontend (Presentation lag)**: React 19 + TypeScript + Vite + Tailwind CSS
- **Backend (Application lag)**: Express.js + TypeScript + Prisma
- **Database (Data lag)**: PostgreSQL (hosted via Neon)

Kommunikation mellem frontend og backend sker via en REST API med en central `api.ts` service layer.

### Hovedfunktionaliteter

- Brugeroprettelse og autentificering via Neon Auth
- Man kan vælge mellem flere karaktere
- Personlig beskedgenerering med brugerens navn
- TTS konvertering med karakter-specifikke stemmeindstillinger
- Visning af færdigt "kort" med animation og lydafspilning

### Implementering af kernefunktioner

#### 1. Character Selection
Brugeren vælger karakter via en horisontal, scrollbar komponent (`CharacterSelector`). Valget gemmes i brugerens profil og bruges senere til både beskedgenerering og TTS.

#### 2. Personlig Beskedgenerering
Beskedskabeloner ligger i `birthdayMessages.ts`. Funktionerne `getBirthdayMessage()` erstatter placeholder `{name}` med brugerens indtastede navn, hvilket sikrer personlig tilpasning.

#### 3. Text-to-Speech med Karakterstemmer (`tts.ts`)
Dette er applikationens mest kritiske modul. Filen håndterer konvertering af tekst til tale via ElevenLabs API.
Det fungerer ved at mappe karakternavne til ElevenLabs voice IDs (disse vil være de clonede stemmer). Hver karakter anvender specifikke `voice_settings` (stability, similarity_boost, style, speed) for at opnå mest mulig karaktertro lyd. til sidst konverterer den audio stream til base64 data URL, så lyden kan afspilles direkte i browseren uden ekstra filhåndtering.

Eksempel på logik (simplificeret):
```ts
const voiceMapping: Record<string, string> {
"karakterNavn" : "ID af clonede stemme" 
}
const VoiceStettingsForCharacter: Record<string, any> = {
    "karakter1": {
        stability: 0.40,
        similarity_boost: 0.88,
        style: 0.25,
        speed: 1.0
    },
}

export async function generateAudio(message: string, voiceId: string): Promise<string> {
    if (!message?.trim()) {
        throw new Error("Text for TTS generation cannot be empty.");
    }
    if (!voiceId || voiceId.trim().length === 0) {
        throw new Error("Voice ID for TTS generation cannot be empty.");
    }

    // Map friendly voice name to ElevenLabs voice ID
    const elevenLabsVoiceId = voiceMapping[voiceId.toLowerCase()];
    if (!elevenLabsVoiceId) {
        throw new Error(`Unknown voice: ${voiceId}. Available voices: ${Object.keys(voiceMapping).join(', ')}`);
    }
    const settings = VoiceStettingsForCharacter[voiceId.toLowerCase()] || {
        stability: 0.5,
        similarity_boost: 0.85,
        style: 0.0,
        speed: 1.0
    };

    try {
        console.log("generating audio with voiceId:", voiceId, "-> ElevenLabs ID:", elevenLabsVoiceId);
        const audioStream = await client.textToSpeech.convert(elevenLabsVoiceId, {
            text: message.trim(),
            model_id: "eleven_multilingual_v2",
            voice_settings: settings,
        });

        const chunks: Buffer[] = []; //We collect the stream into a Buffer because ElevenLabs returns audio as a stream.
        for await (const chunk of audioStream) {
            chunks.push(Buffer.from(chunk));
        }

        const audioBuffer = Buffer.concat(chunks);

        const base64 = audioBuffer.toString('base64');
        return `data:audio/mpeg;base64,${base64}`;

    } catch (error: any) {
        console.error("ElevenLabs TTS Error:", error.message || error);
        throw new Error(`Failed to generate audio: ${error.message || 'Unknown error'}`);
    }
}

````
## User Flow Chart:
for at visualisere kodens kompleksitet og brugeroplevelsen har jeg anvendt en bruger-flow-diagram
<img width="3687" height="2482" alt="tanuki-userFlow" src="https://github.com/user-attachments/assets/133f7e24-f85b-4f29-a15d-5d6f725f05ae" />
