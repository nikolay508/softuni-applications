import { html } from "../../node_modules/lit-html/lit-html.js";
import { addFruit } from "../api/data.js";

const createTamplate = (onSubmit) => html`
<section id="create">
          <div class="form">
            <h2>Add Fruit</h2>
            <form class="create-form" @submit=${onSubmit}>
            <input
                type="text"
                name="name"
                id="name"
                placeholder="Fruit Name"
              />
              <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                placeholder="Fruit Image URL"
              />
              <textarea
              id="fruit-description"
              name="description"
              placeholder="Description"
              rows="10"
              cols="50"
            ></textarea>
            <textarea
              id="fruit-nutrition"
              name="nutrition"
              placeholder="Nutrition"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Fruit</button>
            </form>
          </div>
        </section>
`;

export async function createPage(ctx) {
  ctx.render(createTamplate(onSubmit));

  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const fruit = {
      name: formData.get("name").trim(),
      imageUrl: formData.get("imageUrl").trim(),
      description: formData.get("description").trim(),
      nutrition: formData.get("nutrition").trim(),
    };

    if (Object.values(fruit).some((x) => !x)) {
      return alert("All fields are required!");
    }

    await addFruit(fruit);
    event.target.reset();
    ctx.page.redirect("/dashboard");
  }
}
