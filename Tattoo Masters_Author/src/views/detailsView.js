import { getLikesByTattooId, likeTattoo } from '../data/likes.js';
import { deleteTattoo, getTattooById } from '../data/tattoos.js';
import { html, render, page } from '../lib.js';
import { getUserData, hasOwner } from '../utils.js';

const detailsTemplate = (data, likes, hasUser, hasLiked, isOwner, onLike) => html`
<section id="details">
    <div id="details-wrapper">
      <img
        id="details-img"
        src=${data.imageUrl}
        alt="example1"
      />
      <div>
        <div id="info-wrapper">
          <p id="details-type">${data.type}</p>
          <div id="details-description">
            <p id="user-type">${data.userType}</p>
            <p id="description">
              ${data.description}
            </p>
          </div>
          <h3>Like tattoo:<span id="like">${likes}</span></h3>
          ${hasUser ? html`
            <div id="action-buttons">
                ${isOwner ? html`
                <a href="/edit/${data._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" data-id=${data._id} id="delete-btn">Delete</a>
                ` : null}
                ${hasLiked ? null : html`
                <a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>
                `}
                </div>
          ` : null}
        </div>
      </div>
    </div>
</section>`;

export async function showDetailsView(ctx) {
    const id = ctx.params.id;

    const [data, likesInfo] = await Promise.all([
        getTattooById(id),
        getLikesByTattooId(id)
    ]);

    const isOwner = hasOwner(data._ownerId);
    const hasLiked = likesInfo.hasLiked || isOwner;
    const userData = await getUserData();

    render(detailsTemplate(data, likesInfo.likes, Boolean(userData), hasLiked, isOwner, onLike));

    async function onLike() {
        await likeTattoo(id);

        page.redirect('/catalog/' + id);
    }
}

async function onDelete(e) {
    e.preventDefault();
    const id = e.target.dataset.id;
    const choice = confirm('Are you sure?');

    if (!choice) {
        return;
    }

    await deleteTattoo(id);

    page.redirect('/catalog');
}