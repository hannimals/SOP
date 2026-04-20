/**
* we set the messageTone type to be one of the three string literals
@type {messageTone}
@property {string} fun - A cheerful message, to joke around.
* @property {string} friendly - A friendly encouraging message to the best of friends!
* @property {string} cool - A cool message from a cool character.
*/
export type messageTone = "fun" | "friendly" | "cool";

/**
* the birthday message interface defines the structure of a birthday message object, which includes the voice, tone, and text of the message. This interface is used to ensure that all birthday messages adhere to a consistent format, making it easier to manage and utilize them within the application.
*
* @interface BirthdayMessage
* @property {string} voice - The voice associated with the birthday message (mickey, sonic ..)
* @property {messageTone} tone - The tone of the birthday message, which can be fun, friendly or cool
* @property {string} text - The actual text content of the birthday message.
*/

export interface BirthdayMessage {
    voice: string,
    tone: messageTone,
    text: string;
}

/** This is an array containing the diferent mesagges, each one is of type BirthdayMessage, this will be replaced with AI generated messages in the future.
 * @var {BirthdayMessage} birthdayMessages
*/
export const birthdayMessages: BirthdayMessage[] = [
    // Mickey Mouse
    {
        voice: "mickey",
        tone: "fun",
        text: "Hey there {name}, pal! It's your special day, and I just wanted to say... Happy Birthday! I hope your day is filled with fun, laughter, and lots of cake! Remember, you're never too old to have a little fun. So go out there and make some magical memories today!"
    },
    {
        voice: "mickey",
        tone: "friendly",
        text: "Hiya {name}, my friend! Wishing you a very Happy Birthday! May your day be filled with joy, laughter, and all the things that make you smile. Have a fantastic birthday!"
    },
    {
        voice: "mickey",
        tone: "cool",
        text: "Hey {name}! Happy Birthday, legend! Hope your day is as cool as you are. Keep being awesome!"
    },

    // Sonic
    {
        voice: "sonic",
        tone: "fun",
        text: "Hej {name}, din hurtigkører! Det er din fødselsdag! Så er det tid til at suse af sted mod endnu et fantastisk år! Jeg håber, det bliver fyldt med vildt sjov og episke eventyr!"
    },
    {
        voice: "sonic",
        tone: "friendly",
        text: "Hvordan går det, {name}? Tillykke med fødselsdagen! Du har været en fantastisk ven. Jeg håber, din store dag bliver fyldt med smil og gode oplevelser!"
    },
    {
        voice: "sonic",
        tone: "cool",
        text: "Hej {name}! Tillykke med fødselsdagen! Endnu et år ældre, endnu et år hurtigere. Hold energien oppe!"
    },

    // Twilight Sparkle
    {
        voice: "twilight",
        tone: "fun",
        text: "Kære {name}! Det er din fødselsdag! *glitter* Jeg har regnet ud, at i dag burde være 100 % perfekt for dig! Jeg håber, den bliver fyldt med magi og venskab!"
    },
    {
        voice: "twilight",
        tone: "friendly",
        text: "Tillykke med fødselsdagen, {name}, min kære ven! Du er blevet så stor. Jeg er så stolt af dig! Må din dag være fyldt med varme og venskabets magi."
    },
    {
        voice: "twilight",
        tone: "cool",
        text: "Tillykke med fødselsdagen, {name}! Som Venskabets Prinsesse erklærer jeg i dag for en fantastisk dag. Du har fortjent det!"
    },
];
/** 
* this function takes in a voice and a tone as parameters and returns the corresponding birthday message text based on the provided voice and tone. It searches through the birthdayMessages array to find a message that matches both the voice and tone criteria, else it returns the text of that message and replaces {name} with the name from the form. If no matching message is found, it defaults to returning a generic "Happy Birthday! (the name the user wrote on the form)".
* @param {string} voice 
* @param {messageTone} tone
* @return {string} the specific birthday message gets returned and the {name} placeholder gets replaced with the user name input.
*/
export function getBirthdayMessage(voice: string, tone: messageTone, name: string = "friend"): string {
    const templateMessage = birthdayMessages.find(
        (msg) => msg.voice === voice && msg.tone === tone
    );
    const message = templateMessage?.text || "Happy Birthday! {name}";

    return message.replace(/{name}/g, name);

}