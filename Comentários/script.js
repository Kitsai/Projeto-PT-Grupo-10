import renderHeader_Comen from '../src/Header_Comen.js'
import renderComen from './Render_Comen.js'

const modal = document.getElementById("modalPost");

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//event prevent default

renderHeader_Comen("comen")
renderComen()


