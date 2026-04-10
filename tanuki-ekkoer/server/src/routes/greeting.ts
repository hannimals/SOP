import { Router, type Request, type Response } from "express";

export const greetingRouter = Router();

greetingRouter.post("/generate", async (req: Request, res: Response) => {
 try {
    const {
        userId
    } = req.body;
    if (!userId) {
        return res.status(400).json({ error: "User ID is required." });
    }

    const profile = await prisma.user_profiles.findUnique({
        where: { user_id: userId },
    })//allows to find one row in the table based on a condition
    if (!profile) {
        return res.status(404).json({ error: "Profile not found for the given user ID." });
    }
    // need the card table

    const latestCard = await prisma.greeting_cards.findFirst({
        where: { user_id: userId },
        orderBy: { created_at: "desc" },
    })
    
 } catch (e) {
    console.error("Error generating greeting:", e);
    res.status(500).json({ e: "An error occurred while generating the greeting." });
    
 }
})