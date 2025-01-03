import {html, render} from '../lib.js';
import { page } from '../lib.js';
import { createSubmitHandler } from '../util.js';
import * as dataService from '../data/data.js';

const temp = (handler, cyber) => html`
  <section id="edit">
    <div class="form form-item">
      <h2>Edit Your Item</h2>
      <form @submit=${handler} class="edit-form">
        <input type="text" name="item" id="item" placeholder="Item" value=${cyber.item} />
        <input
          type="text"
          name="imageUrl"
          id="item-image"
          placeholder="Your item Image URL"
          value=${cyber.imageUrl}
        />
        <input
          type="text"
          name="price"
          id="price"
          placeholder="Price in Euro"
          value=${cyber.price}
        />
        <input
          type="text"
          name="availability"
          id="availability"
          placeholder="Availability Information"
          value=${cyber.availability}
        />
        <input
          type="text"
          name="type"
          id="type"
          placeholder="Item Type"
          value=${cyber.type}
        />
        <textarea
          id="description"
          name="description"
          placeholder="More About The Item"
          rows="10"
          cols="50"
          .value=${cyber.description}
        ></textarea>
        <button type="submit">Edit</button>
      </form>
    </div>
  </section>
`

let id = null;
export async function showEditView(ctx) {
    id = ctx.params.id;
    const cyber = await dataService.getCyberById(id);
    render(temp(createSubmitHandler(onSubmit), cyber))
}

async function onSubmit(data, formRef) {
    if(!data.availability || !data.description || !data.imageUrl || !data.item || !data.price || !data.type){
        return alert('All fields are req')
    }

    await dataService.updateCyber(id, data);
    page.redirect(`/details/${id}`);
}