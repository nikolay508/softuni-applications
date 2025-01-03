import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllDrones } from '../data/drones.js';

const catalogTemplate = (drones) => html`
        <h3 class="heading">Marketplace</h3>
    <section id="dashboard">

        ${drones.length > 0
            ? html`
                ${drones.map(droneDroned)}
            `
            : html`
                <h3 class="no-drones">No Drones Available</h3>
            `
        }

    </section>
`;

const droneDroned = (drone) => html`
  
    <div class="drone">
            <img src=${drone.imageUrl} alt="example1" />
            <h3 class="model">${drone.model}</h3>
            <div class="drone-info">
              <p class="price">Price: €${drone.price}</p>
              <p class="condition">Condition: ${drone.condition}</p>
              <p class="weight">Weight: ${drone.weight}g</p>
            </div>
            <a class="details-btn" href="/catalog/${drone._id}">Details</a>
          </div>
`;


export async function catalogPage(ctx) {
    const Drones = await getAllDrones();

    ctx.render(catalogTemplate(Drones));
}