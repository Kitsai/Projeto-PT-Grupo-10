async function deletePostClicked(event) {
    const postId = event.currentTarget.post;
    const token = event.currentTarget.token;

    console.log(postId, token, 'http://localhost:3000/post/' + postId);

    const res = await fetch('http://localhost:3000/post/' + postId, {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    if(res.ok) document.getElementById("post-" + postId).remove();
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

        const date = `${day}/${month}/${year}`;
    
        postCard.classList.add("card");
        postCard.id = "post-" + id;

        postCard.innerHTML = '<div class="post_header"><a href="' 
        + linkDados + '" class="dados"> <img src="data:image/png;base64,'
        + profilePicture + '" alt="profile picture"> <h2>'
        + username + '</h2>'
        + date + '</a></div><a href="'
        + linkPost + '" class="content">'
        + content + '</a>'

        if(authorized) {
            const deleteButton = document.createElement("button")
            deleteButton.classList.add("delete_button")
            deleteButton.type = "button"
            deleteButton.innerHTML = '<img src="../assets/rubbish-bin-svgrepo-com.svg" alt="deletar">'

            deleteButton.addEventListener("click", deletePostClicked, false)
            deleteButton.post = id;
            deleteButton.token = token;

            postCard.querySelector(".post_header").appendChild(deleteButton)
        }
        
        postContainer.appendChild(postCard)
    })
}
export const simplemde = new SimpleMDE({ element: document.getElementById("modalPost-text") });

const newPostButtonClicked = (event) => {
    const newPostModal = document.getElementById("modalPost");

    newPostModal.style.display = "block";
    document.getElementById("modalPost-button").innerText = "Post";
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
