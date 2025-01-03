import {html, render} from '../lib.js';
import { page } from '../lib.js';
import { hasOwner } from '../util.js';
import * as dataService from '../data/data.js';

const temp = (cyber, owner) => html`
  <section id="details">
    <div id="details-wrapper">
      <div>
        <img id="details-img" src=${cyber.imageUrl} alt="example1" />
        <p id="details-title">${cyber.item}</p>
      </div>
      <div id="info-wrapper">
        <div id="details-description">
          <p class="details-price">Price: €${cyber.price}</p>
          <p class="details-availability">
          ${cyber.availability}
          </p>
          <p class="type">Type: ${cyber.type}</p>
          <p id="item-description">
          ${cyber.description}
          </p>
        </div>
        ${owner ? html`
        <div id="action-buttons">
          <a href=/edit/${cyber._id} id="edit-btn">Edit</a>
          <a href="#" @click=${onDelete} data-id=${cyber._id} id="delete-btn">Delete</a>
        </div>
        `: ''} 
        <!--Edit and Delete are only for creator-->
      </div>
    </div>
  </section>
`

export async function showDetailsView(ctx) {
    const id = ctx.params.id;
    const cyber = await dataService.getCyberById(id);
    const owner = hasOwner(cyber._ownerId)
    render(temp(cyber, owner));
}

async function onDelete(e) {
    e.preventDefault();

    const id = e.target.dataset.id;
    const confirmRes = confirm('are you sure?');
    if(!confirmRes){ return };

    await dataService.deleteCyber(id);
    page.redirect('/dashboard');
}