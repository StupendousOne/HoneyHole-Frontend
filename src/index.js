const BASE_URL = "http://localhost:3000/api/v1/"
const USER_URL = "http://localhost:3000/api/v1/users/"
const SPOT_URL = "http://localhost:3000/api/v1/fishing_spots/"
const REVIEW_URL = "http://localhost:3000/api/v1/reviews/"
const FISH_URL = BASE_URL + "fish/"

let USERS = []
let FISH = []
let CURRENT_USER
const MAIN_CONTAINER = document.querySelector('main')

init()

function init () {
    // fetchFish().then(addNewFishingSpot)
    fetchFishingSpots()
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

// TODO: wire this function up to modal from main menu pull click
// needs a button to submit or go back
function addNewFishingSpot(spotObj) {
    if (!spotObj.id) {
        spotObj = new FishingSpot()
    }
    console.log(spotObj)
    let card = document.createElement('card')
    let header = document.createElement('h3')
    header.innerText = "Add New Fishing Spot"
    let spotForm = document.createElement('form')
    // name
    let nameLabel = document.createElement('label')
    nameLabel.innerText = 'Name:'
    let name = document.createElement('input')
    name.value = (spotObj.name)
    name.setAttribute("type", "text")
    // latitude
    let latLabel = document.createElement('label')
    latLabel.innerText = 'Latitude:'
    let latitude = document.createElement('input')
    latitude.setAttribute("type", "text")
    latitude.value = (spotObj.latitude)
    // longitude
    let longLabel = document.createElement('label')
    longLabel.innerText = 'Longitude:'
    let longitude = document.createElement('input')
    longitude.setAttribute("type", "text")
    longitude.value = (spotObj.longitude)
    // image url
    let imgLabel = document.createElement('label')
    imgLabel.innerText = 'Image url:'
    let image = document.createElement('input')
    image.setAttribute("type", "text")
    image.value = (spotObj.image) 
    // public_access
    let accessLabel = document.createElement('label')
    accessLabel.innerText = 'Public access notes:'
    let public_access = document.createElement('input')
    public_access.setAttribute("type", "text")
    public_access.value = (spotObj.public_access) 
    // link to site info
    let siteLabel = document.createElement('label')
    siteLabel.innerText = 'Link to site info page'
    let site_info = document.createElement('input')
    site_info.setAttribute("type", "text")
    site_info.value = (spotObj.site_info) 

    // fish species menu. user checks boxes for all that exist at this spot
    let fishHeader = document.createElement('h3')
    fishHeader.innerText = "Select fish species"
    fishUl = document.createElement('ul')
    FISH.forEach((fish) => {
        fishLabel = document.createElement('label')
        fishLabel.innerText = fish.species
        fishCheck = document.createElement('input')
        fishCheck.setAttribute("type", "checkbox")
        fishCheck.dataset.id = fish.id
        br1 = document.createElement('br')
        fishUl.append(fishCheck, fishLabel, br1)
        fishCheck.addEventListener('change', function(e) {
        })
    })

    // submit and go to spots index view
    // not intaking second image for image_small attribute by design (for now, could automate shrinking function and write to file if necessary)
    let submit = document.createElement('button')
    submit.innerText = "Submit"
    spotForm.addEventListener('submit', function(e) {
        e.preventDefault()
        clearMainContainer()
        debugger;
        addSpot({
            name: name.value,
            longitude: longitude.value,
            latitude: latitude.value,
            image: image.value,
            public_access: public_access.value,
            // user_id: CURRENT_USER,
            user_id: 2256,
            site_info: site_info.value
        })
    })
    // back button and wipe nodes 
    let back = document.createElement('button')
    back.innerText = "Back"
    back.onclick = e => {
        clearMainContainer()
        fetchFishingSpots()
    }

    // append and render
    spotForm.append(nameLabel, name, latLabel, latitude, longLabel, longitude, imgLabel, image, accessLabel, public_access, siteLabel, site_info, fishHeader, fishUl, submit)
    card.append(header, spotForm, back)
    rendersCard(card)
}

function fetchFishingSpots(id=""){
    fetch(SPOT_URL + id)
        .then(res => res.json())
        .then(spots => renderFishingSpots(spots))
}

function fetchFish(id=''){
    return fetch(FISH_URL + id)
        .then(res => res.json())
        .then(json => {
            FISH = json
            return FISH
        })
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
            return USERS
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
        MAIN_CONTAINER.appendChild(card)
    }
}

function clearMainContainer() {
    while (MAIN_CONTAINER.lastChild)
        MAIN_CONTAINER.removeChild(MAIN_CONTAINER.lastChild)
}