import {html, render} from '../lib.js';
import { getAllCybers } from '../data/data.js';

const temp = (cybers) => html`
  <!-- Dashboard page -->
  <h3 class="heading">Market</h3>
  <section id="dashboard">
    <!-- Display a div with information about every post (if any)-->
    ${cybers.map(cyber => itemTemp(cyber))}
  </section>
  <!-- Display an h2 if there are no posts -->
  ${cybers.length === 0 ? html`<h3 class="empty">No Items Yet</h3>` : ""}
`

const itemTemp = (cyber) => html`
<div class="item">
      <img src=${cyber.imageUrl} alt="example1" />
      <h3 class="model">${cyber.item}</h3>
      <div class="item-info">
        <p class="price">Price: €${cyber.price}</p>
        <p class="availability">
        ${cyber.availability}
        </p>
        <p class="type">Type: ${cyber.type}</p>
      </div>
      <a class="details-btn" href=/details/${cyber._id}>Uncover More</a>
</div>
`

export async function showDashboardView(){
    const cybers = await getAllCybers();
    render(temp(cybers));
}
