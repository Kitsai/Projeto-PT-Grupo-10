// import renderHeader from '../src/Header.js'
import renderFeed from './Render_Feed.js'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzAwMzY4NDM1fQ.XnqelWlngHaowNIqfbEkf4TyNEmWIKMn4TrbRodSVYY';
//const token = localStorage.getItem('token');

const modal = document.getElementById("modalPost");

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//event prevent default

// renderHeader("feed")
renderFeed(token)