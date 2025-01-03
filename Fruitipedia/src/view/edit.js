import { html } from "../../node_modules/lit-html/lit-html.js";
import { editFruitById, getFruitById } from "../api/data.js";

const editTamplate = (fruit, onSubmit) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Fruit</h2>
            <form class="edit-form" @submit=${onSubmit}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Fruit Name"
                value="${fruit.name}"
              />
              <input
              type="text"
                name="imageUrl"
                id="Fruit-image"
                placeholder="Fruit Image URL"
                value="${fruit.imageUrl}"
              />
              <textarea
              id="fruit-description"
                name="description"
                placeholder="Description"
                rows="10"
                cols="50"
              >${fruit.description}</textarea>
              
              <textarea
                id="fruit-nutrition"
                name="nutrition"
                placeholder="Nutrition"
                rows="10"
                cols="50"
              >${fruit.nutrition}</textarea>
              <button type="submit">post</button>
            </form>
          </div>
        </section>
`;

export async function editPage(ctx) {
  const fruitId = ctx.params.id;

  const fruit = await getFruitById(fruitId);
  ctx.render(editTamplate(fruit, onSubmit));

  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const editFruit = {
      name: formData.get("name").trim(),
      imageUrl: formData.get("imageUrl").trim(),
      description: formData.get("description").trim(),
      nutrition: formData.get("nutrition").trim(),
    };

    if (Object.values(editFruit).some((x) => !x)) {
      return alert("All fields are required!");
    }

    await editFruitById(fruitId, editFruit);
    event.target.reset();
    ctx.page.redirect(`/details/${fruitId}`);
  }
}
