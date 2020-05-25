const USER_URL = "http:localhost:3000/api/v1/users/"

function userFetchTest(){
    fetch(USER_URL)
        .then(res => res.json())
        .then(users => renderUsers(users))
}

function renderUsers(users){
    users.forEach(user => renderUser(user))
}

function renderUser(user){
    let body = document.querySelector("body")
    let userLi = document.createElement("li")

    userLi.innerText = user.username

    body.appendChild(userLi)
}

userFetchTest()