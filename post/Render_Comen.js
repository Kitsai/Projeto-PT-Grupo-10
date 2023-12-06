/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// COMMENTS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const md = window.markdownit();

async function deleteCommentClicked(event) {
    const commentId = event.currentTarget.commentId;
    const token = event.currentTarget.token;

    console.log(commentId, token, 'http://localhost:3000/comment/' + commentId);

    const res = await fetch('http://localhost:3000/comment/' + commentId, {
        method: 'DELETE',
        headers: {Authorization: 'Bearer ' + token}
    });
    if(res.ok) document.getElementById("comment-" + commentId).remove();
}

function editCommentClicked(event) {
     const commentContent = event.currentTarget.commentContent;
    
    const newCommentModal = document.getElementById("modalComment");
    const commentModalButton = document.getElementById("modalComment-button");
    
    newCommentModal.style.display = "block";
    commentModalButton.innerText = "Update";
    commentModalButton.onclick = commentModalButtonClicked;
    commentModalButton.commentId = event.currentTarget.commentId;
    commentModalButton.token = event.currentTarget.token;
    commentModalButton.mode = 0; // 1 = new comment, 0 = edit comment
    simplemde.value(commentContent);
}

async function render_Posts_Comen(token) {
    const commentContainer = document.querySelector(".comment")
    
    commentContainer.innerText = ""
    const postId = window.location.href.split('id=')[1]
    if (!postId) window.location.href = '/Feed'

    const res = await fetch(`http://localhost:3000/posts/${postId}/comment`, {
        headers: (token)? {Authorization: 'Bearer ' + token} : {}
    });
    
    console.log(res);
    
    const comments = await res.json();
    
    console.log(comments);
    
    comments.reverse()
    
    comments.forEach( ({id, authorId,author, content }) => {
        const commentCard = document.createElement("div")
        
        
        // const botao = (authorized)? '<button class="delete_button"><img src="../assets/rubbish-bin-svgrepo-com.svg" alt="deletar"></button>': ''
        const linkDados = (!token) ? "../home/página de login.html" : "perfil"
        const linkComment = (!token) ? "../home/página de login.html" : "comentarios"
        
        commentCard.classList.add("card");
        commentCard.id = "comment-" + id;
        
        commentCard.innerHTML = '<div class="post_header"><a href="' 
        + linkDados + '" class="dados"> <img src="'
        + author.profile_picture + '" alt="profile picture"> <h2>'
        + author.username + '</h2>'
        + '</a>' 
        + '<div class="buttons_container"><button class="edit_button postModal-button" type="button"><img src="../assets/edit_icon.svg" alt="editar"></button>'
        + '<button class="delete_button postModal-button" type="button"><img src="../assets/rubbish-bin-svgrepo-com.svg" alt="deletar"></button></div>'
        +'</div>'
        + md.render(content) 
        const userId = +sessionStorage.getItem('userId')

        if(userId === authorId) {
            commentCard.querySelector(".buttons_container").style.display = "block";
            
            // edit button
            const editButton = commentCard.querySelector(".edit_button");

            editButton.onclick = editCommentClicked;
            editButton.commentId = id;
            editButton.commentContent = content;
            editButton.token = token;

            // delete button
            const deleteButton = commentCard.querySelector(".delete_button");
            
            deleteButton.onclick = deleteCommentClicked;
            deleteButton.commentId = id;
            deleteButton.token = token;
        }
        
        commentContainer.appendChild(commentCard)
    })
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MODAL
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const simplemde = new SimpleMDE({ element: document.getElementById("modalComment-text"), spellChecker: false , hideIcons: ["image"]});

const newCommentButtonClicked = (event) => {
    const newCommentModal = document.getElementById("modalComment");
    const commentModalButton = document.getElementById("modalComment-button");
    
    newCommentModal.style.display = "block";
    commentModalButton.innerText = "Comment";
    commentModalButton.onclick = commentModalButtonClicked;
    commentModalButton.token = event.currentTarget.token;
    commentModalButton.mode = 1; // 1 = new comment, 0 = edit comment
    simplemde.value("");
}

const commentModalButtonClicked = async (event) => {
    const content = simplemde.value();
    const token = event.currentTarget.token;
    const mode = event.currentTarget.mode;
    
    console.log(JSON.stringify({content}));
    
    const modal = document.getElementById("modalComment");
    const authorId = +sessionStorage.getItem('userId')

    const postId = +window.location.href.split('id=')[1]

    let res;
    if(mode) {
        res = await fetch('http://localhost:3000/comment', {
            method: 'POST',
            headers: { "Authorization": 'Bearer ' + token, 'Content-Type': 'application/json' },
            body: JSON.stringify({authorId, postId, content}),
        })
    } else {
        const commentId = event.target.commentId;

        console.log(commentId);
        console.log(content)

        await fetch('http://localhost:3000/comment/' + commentId, {
            method: 'PUT',
            headers: {"Authorization": 'Bearer ' + token, 'Content-Type': 'application/json'},
            body: JSON.stringify({content, authorId, postId}),
        });
    }

    if (!res.ok) {
        alert("Ocorreu um erro");
        return;
    }
    
    //destivar padrao de recarregar.
    //atualizar estado local.
    render_Posts_Comen(token);
    modal.style.display = "none";
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GERAL
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default async function renderComen(){

    const token = sessionStorage.getItem('token');
    
    await render_Posts_Comen(token)
    
    if(document.getElementById("new_comment_button") != null) {
        document.getElementById("new_comment_button").remove()
    }
    
    if(token) {
        const newCommentButton = document.createElement("button")
        newCommentButton.id = "new_comment_button"
        newCommentButton.type = "button"
        newCommentButton.innerText = 'Comentar'
        
        newCommentButton.addEventListener("click", newCommentButtonClicked, false)
        newCommentButton.token = token;
        
        document.getElementById("container_header").appendChild(newCommentButton)
        
    }
}