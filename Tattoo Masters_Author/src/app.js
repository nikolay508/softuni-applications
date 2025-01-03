import { page } from "./lib.js";

import { showHomeView } from "./views/homeView.js";
import { showCatalogView } from "./views/catalogView.js";
import { showLoginView } from "./views/loginView.js";
import { showRegisterView } from "./views/registerView.js";
import { showDetailsView } from "./views/detailsView.js";
import { showEditView } from "./views/editView.js";
import { showCreateView } from "./views/createView.js";
import { logout } from "./data/user.js";
import { updateNav } from "./utils.js";

page('/', showHomeView);
page('/login', showLoginView);
page('/register', showRegisterView);
page('/catalog', showCatalogView);
page('/catalog/:id', showDetailsView);
page('/edit/:id', showEditView);
page('/addTattoo', showCreateView);

page.start();

updateNav();

document.getElementById('logout').addEventListener('click', () => {
    logout();

    updateNav();

    page.redirect('/');
})