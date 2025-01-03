import { page } from '../lib.js';
import * as userService from '../data/user.js';
import { updateNav } from '../util.js';

export async function logout() {
    await userService.logout();
    updateNav();
    page.redirect('/');
}