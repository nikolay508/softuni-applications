import { get, post, put, del } from './api.js';

const endpoints = {
    'catalog': '/data/tattoos?sortBy=_createdOn%20desc',
    'tattoos': '/data/tattoos',
    'tattooById': '/data/tattoos/'
}

export async function getAllTattoos() {
    return get(endpoints.catalog);
}

export async function getTattooById(id) {
    return get(endpoints.tattooById + id);
}

export async function createTattoo({ type, imageUrl, description, userType }) {
    return post(endpoints.tattoos, {
        type,
        imageUrl, 
        description, 
        userType
    });
}

export async function updateTattoo(id, data) {
    return put(endpoints.tattooById + id, data);
}

export async function deleteTattoo(id) {
    return del(endpoints.tattooById + id);
}