import { getAllTattoos } from '../data/tattoos.js';
import { html, render } from '../lib.js';

const catalogTemplate = (tattoos) => html`
<h2>Collection</h2>
  <section id="tattoos">
     ${tattoos ? tattoos.map(tattoo => tattooTemplate(tattoo)) : null}
  </section>
  ${tattoos.length === 0 ? html`<h2 id="no-tattoo">Collection is empty, be the first to contribute</h2>` : null}`;

const tattooTemplate = (tattoos) => html`
<div class="tattoo">
      <img src=${tattoos.imageUrl} alt="example1" />
      <div class="tattoo-info">
        <h3 class="type">${tattoos.type}</h3>
        <span>Uploaded by </span>
        <p class="user-type">${tattoos.userType}</p>
        <a class="details-btn" href="/catalog/${tattoos._id}">Learn More</a>
      </div>
</div>`;

export async function showCatalogView() {
    const tattoos = await getAllTattoos();
    
    render(catalogTemplate(tattoos));
}