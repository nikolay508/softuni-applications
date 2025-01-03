import { html } from "../../node_modules/lit-html/lit-html.js";
import {
  deleteFruitById,
  getFruitById,
  
} from "../api/data.js";

const detailsTamplate = (
  fruit,
  isOwner,
  onDelete,
  isLoggedIn,
  
) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${fruit.imageUrl}" alt="example1" />
            <p id="details-title">${fruit.name}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p>${fruit.description}</p>
                <p id = "nutrition">Nutrition</p>
                <p id = "details-nutrition">
                      ${fruit.nutrition}
                      </p>
                      
              </div>
              <div id="action-buttons">
      ${isOwner
        ? html`<a href="/edit/${fruit._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}
              >Delete</a
            >`
        : ""}
    </div>
            </div>
`;

export async function detailsPage(ctx) {
  const fruitId = ctx.params.id;
  const fruit = await getFruitById(fruitId);
  const user = ctx.user;

  let userId;

  if (user != null) {
    userId = user._id;
  }

  const isOwner = user && fruit._ownerId == user._id;
  const isLoggedIn = user !== undefined;

  ctx.render(
    detailsTamplate(
      fruit,
      isOwner,
      onDelete,
      isLoggedIn,
     
    )
  );

  async function onDelete() {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      await deleteFruitById(fruitId);
      ctx.page.redirect("/dashboard");
    }
    
  }
}
