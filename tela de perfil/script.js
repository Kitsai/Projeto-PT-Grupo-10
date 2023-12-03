import renderHeader from '../src/Header.js'
import renderProfileFeed, { renderPosts } from './render_own_feed.js';
import loadUserProfile from './render_own_feed.js';

const modal = document.getElementById("modalPost");

window.onload = function() {
    const userId = sessionStorage.getItem('userId');
    loadUserProfile(userId);
    renderHeader("feed");
}

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//atualiza
const fotoPerfil = document.getElementById('foto_perfil');
const usuario = document.getElementById('usuario');
const cargo = document.getElementById('cargo');
const genero = document.getElementById('genero');
const email = document.getElementById('email');
    
usuario.innerText = sessionStorage.getItem('username')
cargo.innerText = sessionStorage.getItem('cargo')
genero.innerText = sessionStorage.getItem('genero')
email.innerText = sessionStorage.getItem('email')
fotoPerfil.src = 'data:image/png;base64,' + sessionStorage.getItem('profile_picture')

    