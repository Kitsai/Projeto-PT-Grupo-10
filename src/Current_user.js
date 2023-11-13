export let currentUser = {
    id: 1,
    name: "Chomusuke",
    img: "../assets/aaaaa.jpg",
    email: "userfake1@email.com"
}

export const updateUser = (value) => {
    currentUser = value
}