import { post, put, del, get } from "./api.js";

const endpoints = {
    allCybers: "/data/cyberpunk?sortBy=_createdOn%20desc",
    cybers: "/data/cyberpunk",
}

export async function getAllCybers() {
    return await get(endpoints.allCybers);
}

export async function createCyber(data) {
    return await post(endpoints.cybers, data);
}

export async function getCyberById(id) {
    return await get(endpoints.cybers + `/${id}`);
}

export async function updateCyber(id, data) {
    return await put(endpoints.cybers + `/${id}`, data);
}

export async function deleteCyber(id) {
    return await del(endpoints.cybers + `/${id}`);
}
