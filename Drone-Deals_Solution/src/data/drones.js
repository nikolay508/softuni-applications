import { del, get, post, put } from "./api.js";

const endpoints = {
    allDrones: '/data/drones?sortBy=_createdOn%20desc',
    create: '/data/drones',
    byId: '/data/drones/',
    byName: (query) => `/data/drones?where=model%20LIKE%20%22${query}%22`
};

export async function getAllDrones() {
    return get(endpoints.allDrones);
}

export async function createDrone(data) {
    return post(endpoints.create, data);
}

export async function getById(id) {
    return get(endpoints.byId + id);
}

export async function deleteDrone(id) {
    return del(endpoints.byId + id);
}

export async function updateDrone(id, data) {
    return put(endpoints.byId + id, data);
}

export async function getDronesByName(query) {
    return get(endpoints.byName(query));
}