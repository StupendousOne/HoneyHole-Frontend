const BASE_URL = "http://localhost:3000/api/v1/"
const USER_URL = "http://localhost:3000/api/v1/users/"
const SPOT_URL = "http://localhost:3000/api/v1/fishing_spots/"
const REVIEW_URL = "http://localhost:3000/api/v1/reviews/"
const SPOT_FISH_URL = "http://localhost:3000/api/v1/fish_spots/"
const FISH_URL = BASE_URL + "fish/"

let USERS = []
let FISH = []
let CURRENT_USER
const MAIN_CONTAINER = document.querySelector('main')

// counter to how many columns have been made in the current row(max 3 for our purposes)
// start column count maxed out so a new row is created instantly
let COLUMN_COUNT = 3
let CURRENT_ROW

init()

function init () {
    fetchUsers().then(userLogin())
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
        const spotObj = new FishingSpot(spot.id, spot.name, spot.longitude, spot.latitude, spot.image, spot.image_small, spot.public_access, spot.user_id, spot.site_info, spot.is_active, spot.fish, spot.fish_spots, spot.created_at, spot.updated_at)
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
        // .then(users => renderUsers(users))
        .then(json => {
            USERS = json
            return USERS
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
        if(COLUMN_COUNT < 3){
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
    let column = document.createElement("div")
    column.className = "col-lg-4"
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
    COLUMN_COUNT = 10
}