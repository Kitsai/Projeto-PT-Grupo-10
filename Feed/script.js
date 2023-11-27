// import renderHeader from '../src/Header.js'
import renderFeed from './Render_Feed.js'

const token = sessionStorage.getItem('token');

const modal = document.getElementById("modalPost");

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//event prevent default

// renderHeader("feed")
renderFeed(token)