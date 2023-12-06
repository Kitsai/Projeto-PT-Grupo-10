import renderHeader_Comen from '../src/Header_Comen.js'
import renderComen from './Render_Comen.js'

const modal = document.getElementById("modalComent");
var logo = document.getElementById('logo')

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

logo.onclick = function(event) { 
    window.location.href = document.referrer
}

//event prevent default

renderHeader_Comen("comment")
renderComen()


