import { type UserProfile } from "../types";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
/** 
* This file is going to be responsible for all the API calls we make to our backend. This way we can keep all the logic related to fetching data in one place, and if we need to change something in the future, we know exactly where to go. We are going to export an object called api that will contain all the functions we need to fetch data from our backend.*/


function normalizeApiPath(path: string) {
    const cleanedPath = path.replace(/^\/+/, "");
    return `${BASE_URL.replace(/\/+$/, "")}/api/${cleanedPath}`;
}

async function post(path: string, body: object) {
    const url = normalizeApiPath(path);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
    });
    if (!response.ok)
        throw new Error(
            (await response.json().catch(() => ({}))).error || "the request failed :(",
        );
    return response.json();
} //post requests

async function get() {
} //    get requests



export const api = {
    saveProfile: (userId: string,
        profile: Omit<UserProfile, 'userId' | 'updatedAt'>,
    ) => {
        return post("profile", { userId, ...profile });

    },
};