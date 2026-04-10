/**
* Here we have our user interface. interfaces allow us to define props in our components, and even defining functions. they arre very similar to types but here we use interfaces as they allow us to do declarationmerging in the future, where we add more props without having to change the original declaration.
*
* @interface User
* @extends {ParentInterfaceNameHereIfAny}
*/
export interface User {
    id: string;
    email: string;
    creteDate: string;
}


//comment for this @hannimals

export interface UserProfile {
    userId: string;
    name: string;
    voice: "mickey" | "sonic" | "twilight";
    messageTone: "fun" | "friendly" | "cool";
    userChoiceOfWriter: "user" | "AI";
    updatedAt: string;
}
