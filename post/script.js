import renderHeader_Comen from '../src/Header_Comen.js'
import renderComen from './Render_Comen.js'

const modal = document.getElementById("modalComment");
var logo = document.getElementById('logo')
const back = document.getElementById('back_button')

back.onclick = function (event) { 
    window.location.href = document.referrer
}

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


logo.onclick = function(event) { 
    window.location.href = "../Feed/index.html"
}

//event prevent default

renderHeader_Comen("comment")
renderComen()


