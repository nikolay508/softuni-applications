import {getUserData, clearUserData} from '../util.js';

const host = 'http://localhost:3030';

async function request(method, url, data) {
    const options = {
        method, headers: {}
    }

    if(data != undefined){
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();

    if(userData){
        options.headers['X-Authorization'] = userData.accessToken;
    }

    try {
        const response = await fetch(host + url, options);

        if(!response.ok){
            const err = await response.json();

            if(response.status === 403 && err.message === 'Invalid access token'){
                clearUserData();
            }

            throw new Error(err.message);
        }

        if(response === 204){
            return response
        }else{
            return response.json();
        }
    } catch (error) {
        alert(error.message);
        throw error;
    }
}

export const get = (url) => request('get', url);
export const post = (url, data) => request('post', url, data);
export const put = (url, data) => request('put', url, data);
export const del = (url) => request('delete', url);