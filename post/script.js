import renderHeader_Comen from '../src/Header_Comen.js'
import renderComen from './Render_Comen.js'

const modal = document.getElementById("modalComent");

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var logo = document.getElementById('logo')

logo.onclick = function(event) { 
    window.location.href = "../Feed/index.html"
}


//event prevent default

renderHeader_Comen("comment")
renderComen()


