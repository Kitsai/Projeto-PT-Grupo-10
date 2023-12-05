import renderHeader from '../src/Header.js'
import renderFeed from './Render_Feed.js'

const modal = document.getElementById("modalPost");

var logo = document.getElementById('logo')

logo.onclick = function(event) { 
    window.location.href = "./index.html"
}

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



//event prevent default

renderHeader("feed")
renderFeed()