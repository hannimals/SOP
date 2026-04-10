import type { User } from "@neondatabase/neon-js/auth/types";
import { createContext, useEffect, useState, useCallback, useContext, useRef, type ReactNode } from "react";
import { authClient } from "../lib/auth";
import type { UserProfile } from "../types";
import { api } from "../lib/api";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    saveProfile: (
        profile: Omit<UserProfile,
            'userId' | 'updatedAt'>
    ) => Promise<void>; //returns a promise that resolves to void, meaning it doesn't return any value when the promise is fulfilled. The function is expected to perform some asynchronous operation (like saving the profile data to a database) and once that operation is complete, it will resolve without returning any specific data.

}
/**
* We define what type our create context is. We use the | operator to specify that our AuthContext can be either of type AuthContextType (an interface) or type null. Moreover we give the createfunction its default parameter wich is null.
* To get the information of wether the user is signed in or not, we define the user as a prop, that way we can check if the user type is present or if its not (null).
*  
* @interface AuthContextType
*/

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [neonUser, setNeonUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function loadUser() {
            try {
                const result = await authClient.getSession()
                if (result && result.data?.user) {
                    setNeonUser(result.data.user);
                }
                else {
                    setNeonUser(null);
                }

            } catch (e) {
                setNeonUser(null);
            } finally {
                setIsLoading(false);
            }

        }
        loadUser();

    }, []);

    async function saveProfile(profileData: Omit<UserProfile, 'userId' | 'updatedAt'>) {
        if (!neonUser) {
            throw new Error("User not authenticated");
        }
        await api.saveProfile(neonUser.id, profileData);

    }

    return (<AuthContext.Provider value={{ user: neonUser, isLoading, saveProfile }}>
        {children}
    </AuthContext.Provider>);
}
/** 
* We define a new component: The Auth provider. This function will provide the data in our AuthContext. Its going to take in one propt (children) and anything bellow it, in this case the entire app, that way we are making the context available within the entire component tree. It returns a AuthContext.provider that renders the children. Then we create a state called neonUser using useState hook function, this will allow us to get the data we collect from neon and convert them to our user type we defined in the User interface.
* @param {ReactNode} children - Its basically our entire app, that we wrap in the context
* @param {any} useState - its the state we create for our neon user
* @return {AuthContextType.Provider} 
*/

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an Authprovider");
    }
    return context;
}
/** 
* This is a hook we create to fetch the data provided by our auth provided
* @param {AuthContextType|null} context - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
* @return {AuthContextType|null} returns the data in the form of a context (user)
*/
