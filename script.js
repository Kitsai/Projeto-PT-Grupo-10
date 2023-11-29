import renderHeader from '../src/Header.js';
import renderFeed from './render_own_feed.js';
import loadUserProfile from './render_own_feed.js';

const modal = document.getElementById("modalPost");

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//event prevent default

renderHeader("feed");
renderFeed();
loadUserProfile();