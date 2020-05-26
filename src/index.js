const BASE_URL = "http:localhost:3000/api/v1/"
const USER_URL = "http:localhost:3000/api/v1/users/"
const SPOT_URL = "http:localhost:3000/api/v1/fishing_spots/"
const REVIEW_URL = "http:localhost:3000/api/v1/reviews/"
const FISH_URL = BASE_URL + "fish/"

fetchFishingSpots()

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
        const spotObj = new FishingSpot(spot.id, spot.name, spot.longitude, spot.latitude, spot.image, spot.public_access, spot.user_id, spot.site_info, spot.is_active, spot.fish, spot.created_at, spot.updated_at)
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
    fetch(USER_URL + id)
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

function fetchReviews(id=''){
    fetch(REVIEW_URL + id)
        .then(res => res.json())
        .then(reviews => renderReview(reviews))
}

function renderReview(reviews){
    if (Array.isArray(reviews) && reviews.length > 0) {
        reviews.forEach((review) => {
            const reviewObj = new Review(review.title, review.content, review.rating, review.fishing_spot_id, review.user_id)
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
        const mainContainer = document.querySelector('main')
        mainContainer.appendChild(card)
    }
}