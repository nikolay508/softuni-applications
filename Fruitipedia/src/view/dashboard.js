import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllFruits } from "../api/data.js";

const dashboardTemplate = (fruits) => html`<h2>Fruits</h2>
<section id="dashboard">
  ${fruits.length == 0
    ? html`<h2>No fruit info yet.</h2>`
    : fruits.map(
        (p) => html`       
          <div class="fruit">
            <img src="${p.imageUrl}" alt="example1" />
            <h3 class="title">${p.name}</h3>
            <p class="description">"${p.description}"</p>
            <a class="details-btn" href="/details/${p._id}">More Info</a>
          </div>
        `
      )}
</section>`;

      
         


export async function dashboardPage(ctx) {
  const fruits = await getAllFruits();
  console.log(fruits);
  ctx.render(dashboardTemplate(fruits));
}
