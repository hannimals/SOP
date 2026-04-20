
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
/** 
* This file is going to be responsible for all the API calls we make to our backend. This way we can keep all the logic related to fetching data in one place, and if we need to change something in the future, we know exactly where to go. We are going to export an object called api that will contain all the functions we need to fetch data from our backend.*/


function normalizeApiPath(path: string) {
    const cleanedPath = path.replace(/^\/+/, "");
    return `${BASE_URL.replace(/\/+$/, "")}/api/${cleanedPath}`;
}

async function post<T = any>(path: string, body: object) {
    const url = normalizeApiPath(path);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({})); //we try to parse the response as json to get the error message, if it fails we catch the error and return an empty object, this way we avoid throwing an error when trying to parse a non-json response.
        throw new Error(errorData.error || "the post request failed :("); //we throw a new error with the message we got from the response, if there is no message we use a default one.
    }
    return response.json();
} //post requests


async function get<T = any>(path: string): Promise<T> {
    const url = normalizeApiPath(path);
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "the get request failed :(");
    }
    return response.json();
} //    get requests



export const api = {
    saveProfile: (userId: string,
        profile: any,
    ) => {
        return post("profile", { userId, ...profile });

    },
    getProfile: (userId: string) => {
        return get(`profile/${userId}`);
    },

    generateGreeting: (userId: string, text: string, voiceId: string) => {
        return post("greetings/generate", { userId, text, voiceId });
    },
};
