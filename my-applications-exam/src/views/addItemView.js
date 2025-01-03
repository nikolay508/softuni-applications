import {html, render} from '../lib.js';
import { page } from '../lib.js';
import { createSubmitHandler } from '../util.js';
import * as dataService from '../data/data.js';

const temp = (handler) => html`
  <section id="create">
    <div class="form form-item">
      <h2>Share Your item</h2>
      <form @submit=${handler} class="create-form">
        <input type="text" name="item" id="item" placeholder="Item" />
        <input
          type="text"
          name="imageUrl"
          id="item-image"
          placeholder="Your item Image URL"
        />
        <input
          type="text"
          name="price"
          id="price"
          placeholder="Price in Euro"
        />
        <input
          type="text"
          name="availability"
          id="availability"
          placeholder="Availability Information"
        />
        <input
          type="text"
          name="type"
          id="type"
          placeholder="Item Type"
        />
        <textarea
          id="description"
          name="description"
          placeholder="More About The Item"
          rows="10"
          cols="50"
        ></textarea>
        <button type="submit">Add</button>
      </form>
    </div>
  </section>
`

export function showAddItemView() {
    render(temp(createSubmitHandler(onSubmit)));
}

async function onSubmit(data, formRef) {
    if(!data.availability || !data.description || !data.imageUrl || !data.item || !data.price || !data.type){
        return alert('All fields are req')
    }
    
    await dataService.createCyber(data);
    page.redirect('/dashboard');
}
