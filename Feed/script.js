import renderHeader from '../src/Header.js'
import renderFeed from './Render_Feed.js'

const modal = document.getElementById("modalPost");
var logo = document.getElementById('logo')
const back = document.getElementById('back_button')

back.onclick = function (event) { 
    window.location.href = "../home/página de login.html"
}

logo.onclick = function(event) { 
    window.location.href = "../Feed/index.html"
}

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



//event prevent default

renderHeader("feed")
renderFeed()