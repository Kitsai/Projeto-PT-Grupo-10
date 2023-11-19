import { mockedPosts } from "../src/Feed_posts.js"
import { currentUser } from "../src/Current_user.js"


function deletePostClicked(event) {

}

async function renderPosts(token) {
    const postContainer = document.querySelector(".posts")

    postContainer.innerText = ""


    const res = await fetch('http://localhost:3000/posts', {
        headers: (token)? {Authorization: 'Bearer ' + token} : {}
    });

    console.log(res);

    const posts = await res.json();

    console.log(posts);
    
    posts.forEach( ({authorized, profilePicture, username, id, authorId, content, createdAt, updatedAt}) => {
        const postCard = document.createElement("div")


        // const botao = (authorized)? '<button class="delete_button"><img src="../assets/rubbish-bin-svgrepo-com.svg" alt="deletar"></button>': ''
        const linkDados = (!token) ? "../home/página de login.html" : "perfil"
        const linkPost = (!token) ? "../home/página de login.html" : "comentarios"

        const [year, month, day] = createdAt.split("T")[0].split("-");

        const date = `${day}/${month}/${year}`
    
        postCard.classList.add("card")
        postCard.id = id

        postCard.innerHTML = '<div class="post_header"><a href="' 
        + linkDados + '" class="dados"> <img src="data:image/png;base64,'
        + profilePicture + '" alt="profile picture"> <h2>'
        + username + '</h2>'
        + date + '</a></div><a href="'
        + linkPost + '" class="content">'
        + content + '</a>'

        if(authorized) {
            const button = document.createElement("button")
            button.classList.add("delete_button")
            button.type = "button"
            button.innerHTML = '<img src="../assets/rubbish-bin-svgrepo-com.svg" alt="deletar">'

            button.addEventListener("click", deletePostClicked, false)
        }
        
        postContainer.appendChild(postCard)
    })
}

const newPostButtonClicked = () => {

}



export default async function renderFeed(token){
    
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
