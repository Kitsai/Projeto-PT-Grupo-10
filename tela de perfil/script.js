import renderHeader from '../src/Header.js'
import renderProfileFeed from './render_own_feed.js';
import loadUserProfile from './render_own_feed.js';


const modal = document.getElementById("modalPost");

window.onload = function() {
    const userId = sessionStorage.getItem('userId');
    loadUserProfile(userId);
    renderHeader("feed");
    renderProfileFeed
    
}

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


function redirecionar () {
    window.location.href = "../Feed/index.html";
}
//atualiza
const fotoPerfil = document.getElementById('foto_perfil');
const username = document.getElementById('username');
const jobTitle = document.getElementById('jobTitle');
const gender = document.getElementById('gender');
const email = document.getElementById('email');
    
username.innerText = sessionStorage.getItem('username')
jobTitle.innerText = sessionStorage.getItem('jobTitle')
gender.innerText = sessionStorage.getItem('gender')
email.innerText = sessionStorage.getItem('email')
fotoPerfil.src = 'data:image/png;base64,' + sessionStorage.getItem('profile_picture')
