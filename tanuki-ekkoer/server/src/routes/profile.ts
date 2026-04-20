import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma";
export const profileRouter = Router();

// GET route to fetch user profile
profileRouter.get("/:userId", async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId as string;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required." });
        }

        // Validate UUID format
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(userId)) {
            return res.status(400).json({ error: "Invalid user ID format." });
        }

        const profile = await prisma.user_profiles.findUnique({
            where: { user_id: userId },
        });

        if (!profile) {
            return res.status(404).json({ error: "Profile not found." });
        }

        res.json({
            user_id: profile.user_id,
            voice: profile.voice,
            messageTone: profile.message_tone,
            userChoice: profile.user_choice,
            user_name: profile.user_name,
            updated_at: profile.updated_at
        });

    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ error: "An error occurred while fetching the profile." });
    }
});

//handles creation and updating of user profiles (stores users choice of b-day message). 
//POST is a http method that we use to send data to the server. uses prisma upsert method to create or update a profile based on userId. 

profileRouter.post("/", async (req: Request, res: Response) => {
    try {
        console.log("Received profile request:", req.body);
        const { userId, ...profileData } = req.body /** this is the the information that we are sending trough the frontend its a json object */
        if (!userId) {
            return res.status(400).json({ error: "User ID is required." });
        }

        // Validate UUID format
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(userId)) {
            return res.status(400).json({ error: "Invalid user ID format." });
        }
        const {
            voice,
            messageTone,
            userChoiceOfWriter,
            name
        } = profileData; /** this is how we want te requested data to look like */

        if (!voice || !messageTone || userChoiceOfWriter === undefined || userChoiceOfWriter === null || !name) {
            return res.status(400).json({ error: "All profile fields are required." });
        }

        await prisma.user_profiles.upsert({
            /** this is the upsert method that we are using to update or create a new profile (if there is no datata -> insert data if there is data -> update)*/

            where: { user_id: userId },
            update: {
                voice: voice,
                message_tone: messageTone,
                user_choice: userChoiceOfWriter,
                user_name: name,
                updated_at: new Date()
            },
            create: {
                user_id: userId,
                voice,
                message_tone: messageTone,
                user_choice: userChoiceOfWriter,
                user_name: name
            },
        });
        res.json({ sucsses: true });

    } catch (error) {
        console.error("Error handling profile update:", error);
        res.status(500).json({ error: "An error occurred while updating the profile." });

    }
})