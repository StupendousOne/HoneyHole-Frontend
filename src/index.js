const BASE_URL = "http://localhost:3000/api/v1/"
const USER_URL = "http://localhost:3000/api/v1/users/"
const SPOT_URL = "http://localhost:3000/api/v1/fishing_spots/"
const REVIEW_URL = "http://localhost:3000/api/v1/reviews/"
const FISH_URL = BASE_URL + "fish/"

let USERS = []
let CURRENT_USER
const MAIN_CONTAINER = document.querySelector('main')

// counter to how many columns have been made in the current row(max 3 for our purposes)
// start column count maxed out so a new row is created instantly
let COLUMN_COUNT = 4
let CURRENT_ROW

init()

function init () {
    fetchFish()
    // fetchUsers().then(userLogin)
}

function userLogin() {
    let card = document.createElement('card')
    let header = document.createElement('h3')
    header.innerText = "Login | Sign Up"

    let login = document.createElement('button')
    login.innerText = "Select user"
    login.addEventListener('click', (e) => {
        let parent = e.target.parentElement    // parent is actually same as card
        let parentUl = parent.querySelector('ul')   // attempt to find a ul element on the card
        if (parentUl) {
            parent.removeChild(parentUl)
        } else { 
            let usersUl = document.createElement('ul')
            USERS.forEach((user) => {
                let userLi = document.createElement('li')
                const a = document.createElement('a') // set up link for user
                a.innerText = user.username
                a.dataset.id = user.id
                a.href = '#' // makes it looks linky
                a.onclick = e => {
                    e.preventDefault(); // don't follow link
                    CURRENT_USER = user.id
                    clearMainContainer()
                    fetchFishingSpots()
                }
                userLi.appendChild(a)
                usersUl.appendChild(userLi)
            })
            card.appendChild(usersUl)
        }
    })
    // signUp route responds to click and launches signUp function
    let signUp = document.createElement('button')
    signUp.innerText = "Sign up"
    signUp.onclick = e => {
        clearMainContainer()
        signUpUser()
    }
    // append items and render card
    card.append(header, login, signUp)
    rendersCard(card)
}

function signUpUser() {
    let card = document.createElement('card')
    let header = document.createElement('h3')
    header.innerText = "Sign Up Below"
    let signUpForm = document.createElement('form')
    let nameLabel = document.createElement('label')
    nameLabel.innerText = 'Name:'
    nameLabel.htmlFor = 'name'
    let name = document.createElement('input')
    name.id = 'login-name'
    name.setAttribute("type", "text")
    let usernameLabel = document.createElement('label')
    usernameLabel.innerText = 'Username:'
    let usernameInput = document.createElement('input')
    usernameInput.setAttribute("type", "text")
    let emailLabel = document.createElement('label')
    emailLabel.innerText = 'Email:'
    let email = document.createElement('input')
    email.setAttribute("type", "text")
    let bioLabel = document.createElement('label')
    bioLabel.innerText = 'Tell us about yourself:'
    let bio = document.createElement('INPUT')
    bio.setAttribute("type", "text")


    // submit and go to spots index view
    let submit = document.createElement('button')
    submit.innerText = "Submit"
    signUpForm.addEventListener('submit', function(e) {
        e.preventDefault()
        let userObj = new User(name.value, bio.value, usernameInput.value, email.value)
        userObj.addNewUser()
        clearMainContainer()
        fetchFishingSpots()
    })
    // back button and wipe nodes 
    let back = document.createElement('button')
    back.innerText = "Back"
    back.onclick = e => {
        clearMainContainer()
        userLogin()
    }
    // append and render
    signUpForm.append(nameLabel, name, usernameLabel, usernameInput, emailLabel, email, bioLabel, bio, submit)
    card.append(header, signUpForm, back)
    rendersCard(card)
}

function fetchFishingSpots(id=""){
    fetch(SPOT_URL + id)
        .then(res => res.json())
        .then(spots => renderFishingSpots(spots))
}

function fetchFish(id=''){
    fetch(FISH_URL + id)
        .then(res => res.json())
        .then(fish => renderFish(fish))
}

function renderFishingSpots(spots){
    spots.forEach(spot => {
        const spotObj = new FishingSpot(spot.id, spot.name, spot.longitude, spot.latitude, spot.image, spot.image_small, spot.public_access, spot.user_id, spot.site_info, spot.is_active, spot.fish, spot.created_at, spot.updated_at)
        const card = spotObj.renderSpot()
        rendersCard(card)
    })
}

function renderFish(fish){
    fish.forEach((fish) => {
        const newFish = new Fish(fish.id, fish.species, fish.description, fish.is_active, fish.image, fish.fishing_spots)
        const card = newFish.renderFish()
        rendersCard(card)
    })
}

function fetchUsers(id=''){
    return fetch(USER_URL + id)
        .then(res => res.json())
        .then(json => {
            USERS = json
            return json
        })
}

function renderUsers(users){
    users.forEach((user) => {
        const userObj = new User(user.name, user.username, user.bio, user.favorite_fishing_spots, user.reviews)
        const card = userObj.renderUser(user.favorite_fishing_spots, user.reviews)
        rendersCard(card)
    })
}

function fetchReviews(id=''){
    fetch(REVIEW_URL + id)
        .then(res => res.json())
        .then(reviews => renderReviews(reviews))
}

function renderReviews(reviews){
    if (Array.isArray(reviews) && reviews.length > 0) {
        reviews.forEach((review) => {
            const reviewObj = new Review(review.title, review.content, review.rating, review.reviewed_fishing_spots, review.user)
            const card = reviewObj.renderReview()
            rendersCard(card)
        })
    } else if (!Array.isArray(reviews)) {
        const reviewObj = new Review(reviews.title, reviews.content, reviews.rating, reviews.fishing_spot_id, reviews.user_id)
        const card = reviewObj.renderReview()
        rendersCard(card)
    } else {
        console.log('error: inspect renderReview')
    }
}

function rendersCard(card){
    if(card){
        if(COLUMN_COUNT < 4){
            // if row has less than three columns 
            // increment COLUMN_COUNT and create column
            COLUMN_COUNT++
            createColumn(card)
        } else {
            // if row is full create a new row 
            // then create a column and set column count to 1
            createRow()
            createColumn(card)
            COLUMN_COUNT = 1
        }
    }
}

function createColumn(card){
    column = document.createElement("div")
    column.className = "col-lg-3"
    column.appendChild(card)
    CURRENT_ROW.appendChild(column)
}

function createRow(){
    CURRENT_ROW = document.createElement("div")
    CURRENT_ROW.classList.add("row")
    CURRENT_ROW.classList.add("mt-3")
    MAIN_CONTAINER.appendChild(CURRENT_ROW)
}

function clearMainContainer() {
    while (MAIN_CONTAINER.lastChild)
        MAIN_CONTAINER.removeChild(MAIN_CONTAINER.lastChild)
}