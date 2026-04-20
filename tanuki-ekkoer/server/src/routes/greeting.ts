import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma";
import { generateAudio } from "../lib/tts";

export const greetingRouter = Router();

greetingRouter.post("/generate", async (req: Request, res: Response) => {
    try {
        const {
            userId,
            text,
            voiceId
        } = req.body;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required." });
        }
        if (!text || text.trim().length === 0) {
            return res.status(400).json({ error: "Message text is required." });
        }
        if (!voiceId) {
            return res.status(400).json({ error: "Voice ID is required." });
        }

        const profile = await prisma.user_profiles.findUnique({
            where: { user_id: userId },
        })//allows to find one row in the table based on a condition
        if (!profile) {
            return res.status(404).json({ error: "Profile not found for the given user ID." });
        }
        // need the card table

        const latestCard = await prisma.greeting_message.findFirst({
            where: { user_id: userId },
            orderBy: { created_at: "desc" },
            select: { version: true }
        })

        const nextVersion = latestCard ? latestCard.version + 1 : 1; // if there is a card we take the version and add 1 if there is no card we start with version 1

        const audioUrl = await generateAudio(text, voiceId); //this is where we call the TTS function to generate the audio, we pass the message and the voiceid we got from the user

        const newMessageCard = await prisma.greeting_message.create({
            data: {
                user_id: userId,
                version: nextVersion,
                message_json: { rawText: text, voiceId }, // we store the message and the voiceid in a json column in the database, this allows us to easily retrieve both the text and the voiceid when we need to call generateAudio. The structure of the json can be adjusted as needed, but for now it contains the raw text and the voice id.
                message_text: text,

            }
        });//this is how we create a new row in the greeting_cards table, we specify the data we want to insert, in this case the user_id, the version and the message_json. The prisma client will take care of inserting this data into the database and returning the newly created row.

        res.json({
            sucsess: true,
            id: newMessageCard.id,
            version: newMessageCard.version,
            createdAt: newMessageCard.created_at,
            audioUrl: audioUrl,
            pop_message: "Audio generated successfully!"
        })
    } catch (e) {
        console.error("Error generating greeting:", e);

        res.status(500).json({
            sucsess: false,
            e: "An error occurred while generating the greeting."
        });

    }
})