import { mockedPosts } from "../src/Feed_posts.js"
import { currentUser } from "../src/Current_user.js"

async function renderPosts(token) {
    const postContainer = document.querySelector(".posts")

    postContainer.innerText = ""


    const res = await fetch('http://localhost:3000/posts', {
        mode: 'no-cors',
        headers: (token)? {Authorization: 'Bearer ' + token} : {}
    })

    const posts = await res.json()
    
    posts.forEach( post => {
        const postCard = document.createElement("div")
        const botao = (post.authorized)? '<button class="delete_button"><img src="../assets/rubbish-bin-svgrepo-com.svg" alt="deletar"></button>': ''
        const linkDados = (!token) ? "../home/página de login.html" : "perfil"
        const linkPost = (!token) ? "../home/página de login.html" : "comentarios"
        postCard.classList.add("card")

        postCard.innerHTML = '<div class="post_header"><a href="' 
        + linkDados + '" class="dados"> <img src="'
        + post.user.img + '" alt="profile picture"> <h2>'
        + post.user.name + '</h2>'
        + post.date + '</a>'
        + botao + '</div><a href="'
        + linkPost + '" class="content">'
        + post.content + '</a>'
        
        postContainer.appendChild(postCard)
    })
}

const newPostButtonClicked = () => {

}

export default async function renderFeed(){
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzAwMzY4NDM1fQ.XnqelWlngHaowNIqfbEkf4TyNEmWIKMn4TrbRodSVYY'

    await renderPosts(token)

    if(document.getElementById("new_post_button") != null) {
        document.getElementById("new_post_button").remove()
    }

    if(token) {
        const newPostButton = document.createElement("button")
        newPostButton.id = "new_post_button"
        newPostButton.type = "button"
        newPostButton.innerText = 'New Post'
        
        newPostButton.addEventListener("click", newPostButtonClicked, false)
        
        document.getElementById("container_header").appendChild(newPostButton)
    }
}
