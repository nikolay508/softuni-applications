import {page} from './lib.js';
import { updateNav } from './util.js';
import { showAddItemView } from './views/addItemView.js';
import { showDashboardView } from './views/dashboardView.js';
import { showDetailsView } from './views/detailsView.js';
import { showEditView } from './views/editView.js';
import { showHomeView } from './views/homeView.js';
import { showLoginView } from './views/loginView.js';
import { logout } from './views/logout.js';
import { showRegisterView } from './views/registerView.js';

page('/', showHomeView);
page('/register', showRegisterView);
page('/login', showLoginView);
page('/logout', logout);
page('/dashboard', showDashboardView);
page('/add', showAddItemView);
page('/details/:id', showDetailsView);
page('/edit/:id', showEditView);

page.start();
updateNav();