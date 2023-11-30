import renderHeader from '../src/Header.js'
import renderProfileFeed from './render_own_feed.js';
import loadUserProfile from './render_own_feed.js';

const modal = document.getElementById("modalPost");


window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// document.addEventListener('DOMContentLoaded', async () => {
//     await loadUserProfile();

//     const userProfile = await fetch('http://localhost:3000/user/profile' , {
//         headers: { Authorizantion: 'Bearer ' + sessionStorage.getItem('token') }
//     });

//     const { id: userId } = await userProfile.json();

//     await renderPosts(sessionStorage.getItem('token'), userId)
// })

//event prevent default

const userId = sessionStorage.getItem('userId');

loadUserProfile(userId);
renderHeader("feed");