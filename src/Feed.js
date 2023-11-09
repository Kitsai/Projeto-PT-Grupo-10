

const mockedPosts = [
    {
        id: 1,
        user: {img: "../assets/image login.png", name: "NOME"},
        date: "DATA",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente totam eum unde! Quas exercitationem dignissimos recusandae obcaecati, possimus magnam, voluptatem quasi ratione ea ut itaque cumque facilis hic id adipisci!"
    },
    {
        id: 2,
        user: {img: "../assets/aaaaa.jpg", name: "Chomusuke"},
        date: "25/12/2035",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente totam eum unde! Quas exercitationem dignissimos recusandae obcaecati, possimus magnam, voluptatem quasi ratione ea ut itaque cumque facilis hic id adipisci!"
    },
    {
        id: 3,
        user: {img: "../assets/aaaaa.jpg", name: "Chomusuke"},
        date: "25/12/2035",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente totam eum unde! Quas exercitationem dignissimos recusandae obcaecati, possimus magnam, voluptatem quasi ratione ea ut itaque cumque facilis hic id adipisci! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos reiciendis vero quibusdam, animi rem delectus! Quas, facilis corrupti. Fugit perferendis facere corrupti inventore dolorum reprehenderit, ab voluptate dolore quam doloremque. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse eius atque quo ab nostrum delectus saepe non, a doloremque, aliquam cum tempora, odit expedita rem voluptatem quisquam id explicabo iusto!"
    },
    {
        id: 4,
        user: {img: "../assets/aaaaa.jpg", name: "Chomusuke"},
        date: "25/12/2035",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente totam eum unde! Quas exercitationem dignissimos recusandae obcaecati, possimus magnam, voluptatem quasi ratione ea ut itaque cumque facilis hic id adipisci!"
    },
    {
        id: 5,
        user: {img: "../assets/aaaaa.jpg", name: "Chomusuke"},
        date: "25/12/2035",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente totam eum unde! Quas exercitationem dignissimos recusandae obcaecati, possimus magnam, voluptatem quasi ratione ea ut itaque cumque facilis hic id adipisci!"
    },
    {
        id: 6,
        user: {img: "../assets/aaaaa.jpg", name: "Chomusuke"},
        date: "25/12/2035",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente totam eum unde! Quas exercitationem dignissimos recusandae obcaecati, possimus magnam, voluptatem quasi ratione ea ut itaque cumque facilis hic id adipisci!"
    },
]

const renderPosts = () => {
    const postContainer = document.querySelector(".posts")

    const linkDados = (document.querySelector("#header_deslogado") != null) ? "../home/página de login.html" : "perfil"
    const linkPost = (document.querySelector("#header_deslogado") != null) ? "../home/página de login.html" : "comentarios"
    
    mockedPosts.forEach( post => {
        const postCard = document.createElement("div")
        postCard.classList.add("card")

        postCard.innerHTML = '<a href="' + linkDados + '" class="dados"><img src="' + post.user.img + '" alt="Foto de perfil"><h2> ' + post.user.name + '</h2>' + post.date + '</a> <a href="' + linkPost + '" class="content"><p>' + post.content + '</p></a>'
        
        postContainer.appendChild(postCard)
    })
}

renderPosts()