//file for our text-to-speech functionality, using Eleven Labs API
import dotenv from "dotenv";
import { ElevenLabsClient } from 'elevenlabs';
dotenv.config();

const apiKey = process.env.ELEVEN_LABS_API_KEY;

if (!apiKey) {
    throw new Error("there is no api key in the env)");
}

const client = new ElevenLabsClient({
    apiKey
});

// Map our friendly voice names to ElevenLabs voice IDs
const voiceMapping: Record<string, string> = {
    "mickey": "restricted", // Mickey Mouse voice ID english
    "sonic": "restricted",  // Sonic voice ID  dansk
    "twilight": "restrictedL"  // Twilight Sparkle voice ID dansk
};


const VoiceStettingsForCharacter: Record<string, any> = {
    "mikcey": {
        stability: 0.40,
        similarity_boost: 0.88,
        style: 0.25,
        speed: 1.0
    },
    "sonic": {
        stability: 0.50,
        similarity_boost: 0.75,
        style: 0.0,
        speed: 1.0
    },
    "twilight": {
        stability: 0.55,
        similarity_boost: 0.70,
        style: 0.04,
        speed: 0.95
    },

};

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

    // Get character-specific settings or fallback to default
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

/**
 * Creates a new Instant Voice Clone this function will be implemented in the future as a better way to create a voice library of any character the user wants (for legal reasons this would only be posible with public domain characters)
 * @param {string} name - Name for the clone (e.g. "Mickey Mouse Style")
 * @param {Buffer[] | string[]} audioFiles - Array of audio file paths or Buffers (at least 1 file)
 * @returns {string} voice_id -- The new voice_id from ElevenLabs
 */
export async function createVoiceClone(name: string,
    audioFiles: Buffer[] | string[],
): Promise<string> {
    try {
        console.log(`Creating voice clone: ${name}`);
        const voice = await client.voices.ivc.create({
            name: name,
            description: `Cloned voice for ${name} character`,
            files: audioFiles,
        });
        console.log(`voice cloned sucsesfuly :), voice id: ${voice.voice_id}`);
        return voice.voice_id;

    } catch (err: any) {
        console.error("Voice cloning error", err.message || err);
        throw new Error(`failed to clone voice: ${err.message}`);

    }

}
