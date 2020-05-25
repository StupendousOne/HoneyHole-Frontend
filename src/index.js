const BASE_URL = "http:localhost:3000/api/v1/"
const USER_URL = "http:localhost:3000/api/v1/users/"

fetchUsers()

function fetchUsers(){
    fetch(USER_URL)
        .then(res => res.json())
        .then(users => renderUsers(users))
}

function renderUsers(users){
    users.forEach((user) => {
        const userObj = new User(user.name, user.username, user.bio, user.favorite_fishing_spots, user.reviews)
        const card = userObj.renderUser(user.favorite_fishing_spots, user.reviews)
        rendersCard(card)
    })
}

function rendersCard(card){
    const mainContainer = document.querySelector('main')
    mainContainer.appendChild(card)
}