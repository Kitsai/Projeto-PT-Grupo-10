/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// POSTS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const md = window.markdownit();

async function deletePostClicked(event) {
    const postId = event.currentTarget.post;
    const token = event.currentTarget.token;

    console.log(postId, token, 'http://localhost:3000/post/' + postId);

    const res = await fetch('http://localhost:3000/posts/' + postId, {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    if(res.ok) document.getElementById("post-" + postId).remove();
}

function editPostClicked(event) {
     const postContent = event.currentTarget.postContent;
    
    const newPostModal = document.getElementById("modalPost");
    const postModalButton = document.getElementById("modalPost-button");
    
    newPostModal.style.display = "block";
    postModalButton.innerText = "Update";
    postModalButton.onclick = postModalButtonClicked;
    postModalButton.postId = event.currentTarget.postId;
    postModalButton.token = event.currentTarget.token;
    postModalButton.mode = 0; // 1 = new post, 0 = edit post
    simplemde.value(postContent);
}

export async function renderPosts(token, userId) {  // adiciona como parametro o id do usuario 
    const postContainer = document.querySelector(".posts")
    
    postContainer.innerText = ""
    
    // filtra os posts específicos do user
    const url = userId ? `http://localhost:3000/user/${userId}/posts` : 'http://localhost:3000/posts';
    const res = await fetch(url, {
        headers: token ? { Authorization: 'Bearer ' + token } : {}
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
        + date + '</a>' 
        + '<div class="buttons_container"><button class="edit_button postModal-button" type="button"><img src="../assets/edit_icon.svg" alt="editar"></button>'
        + '<button class="delete_button postModal-button" type="button"><img src="../assets/rubbish-bin-svgrepo-com.svg" alt="deletar"></button></div>'
        +'</div><a href="'
        + linkPost + '" class="content">'
        + md.render(content) + '</a>'
        
        if(authorized) {
            postCard.querySelector(".buttons_container").style.display = "block";

            // edit button
            const editButton = postCard.querySelector(".edit_button");

            editButton.onclick = editPostClicked;
            editButton.postId = id;
            editButton.postContent = content;
            editButton.token = token;

            // delete button
            const deleteButton = postCard.querySelector(".delete_button");
            
            deleteButton.onclick = deletePostClicked;
            deleteButton.post = id;
            deleteButton.token = token;
        }
        
        postContainer.appendChild(postCard)
    })
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MODAL
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const simplemde = new SimpleMDE({ element: document.getElementById("modalPost-text"), spellChecker: false , hideIcons: ["image"]});

const newPostButtonClicked = (event) => {
    const newPostModal = document.getElementById("modalPost");
    const postModalButton = document.getElementById("modalPost-button");
    
    newPostModal.style.display = "block";
    postModalButton.innerText = "Post";
    postModalButton.onclick = postModalButtonClicked;
    postModalButton.token = event.currentTarget.token;
    postModalButton.mode = 1; // 1 = new post, 0 = edit post
    simplemde.value("");
}

const postModalButtonClicked = async (event) => {
    const content = simplemde.value();
    const token = event.currentTarget.token;
    const mode = event.currentTarget.mode;
    
    console.log(JSON.stringify({content}));
    
    const modal = document.getElementById("modalPost");
    
    let res;
    if(mode) {
        res = await fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: { "Authorization": 'Bearer ' + token, 'Content-Type': 'application/json' },
            body: JSON.stringify({content}),
        })
    } else {
        const postId = event.currentTarget.postId;

        console.log(postId);

        await fetch('http://localhost:3000/posts/' + postId, {
            method: 'PUT',
            headers: {"Authorization": 'Bearer ' + token, 'Content-Type': 'application/json'},
            body: JSON.stringify({content}),
        });
    }

    if (!res.ok) {
        alert("Ocorreu um erro");
        return;
    }
    
    //destivar padrao de recarregar.
    //atualizar estado local.
    renderPosts(token);
    modal.style.display = "none";
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GERAL
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default async function renderFeed(userId){ //parametro para renderizar o feed

    const token = sessionStorage.getItem('token');
    
    await renderPosts(token, userId) //parametro para renderizar os posts
    
    if(document.getElementById("new_post_button") != null) {
        document.getElementById("new_post_button").remove()
    }
    
    if(token) {
        const newPostButton = document.createElement("button")
        newPostButton.id = "new_post_button"
        newPostButton.type = "button"
        newPostButton.innerText = 'New Post'
        
        newPostButton.addEventListener("click", newPostButtonClicked, false)
        newPostButton.token = token;
        
        document.getElementById("container_header").appendChild(newPostButton)
        
    }
}

export async function loadUserProfile() { // funcao para carregar as informacoes do usuario
    const token = sessionStorage.getItem('token');
    const res = await fetch('http://localhost:3000/user/profile', {
        headers: { Authorization: 'Bearer ' + token }
    });

    if (!res.ok) {
        console.error('Erro ao obter perfil do usuário');
        return;
    }

    const userProfile = await res.json();

    // atualiza as informaçoes da pagina html
    const fotoPerfil = document.getElementById('foto_perfil');
    const nomeUsuario = document.getElementById('usuario');
    const cargo = document.getElementById('cargo');
    const genero = document.getElementById('genero');
    const email = document.getElementById('email');

    // Atualize os elementos HTML com as informações do usuário
    fotoPerfil.src = userProfile.profile_picture;
    nomeUsuario.textContent = userProfile.username;
    cargo.textContent = userProfile.jobTitle;
    genero.textContent = userProfile.gender;
    email.textContent = userProfile.email;
}