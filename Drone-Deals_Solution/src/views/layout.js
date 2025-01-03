import { html } from '../../node_modules/lit-html/lit-html.js';

// TODO replace with actual layout
export const layoutTemplate = (userData, content) => html`
    <header>
    <!-- Navigation -->
    <a id="logo" href="/"
          ><img id="logo" src="./images/logo2.png" alt="img"
        /></a>
    <nav>
        <div>
        <a href="/catalog">Marketplace</a>
        </div>

        ${userData
            ? html`
                <div class="user">
                <a href="/create">Sell</a>
                <a href="/logout">Logout</a>
                </div>
            `
            : html`
                <div class="guest">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
                </div>
            `
        }

    </nav>
    </header>


<main id="main-element">
    ${content}
</main>
`;