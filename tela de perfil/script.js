import renderHeader from '../src/Header.js'
import renderProfileFeed from './render_own_feed.js';
import loadUserProfile from './render_own_feed.js';



const modal = document.getElementById("modalPost");
var logo = document.getElementById('logo')

const back = document.getElementById('back_button')

back.onclick = function (event) { 
    window.location.href = "../Feed/index.html"
}

logo.onclick = function(event) { 
    window.location.href = "../Feed/index.html"
}

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


document.addEventListener('DOMContentLoaded', function () {

    const fotoPerfil = document.querySelector('.foto')
    const profilePicture = sessionStorage.getItem('profile_picture');
    fotoPerfil.src = profilePicture;

});


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
