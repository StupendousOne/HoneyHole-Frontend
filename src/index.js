const BASE_URL = "http:localhost:3000/api/v1/"
const USER_URL = "http:localhost:3000/api/v1/users/"
const SPOT_URL = "http:localhost:3000/api/v1/fishing_spots/"
const REVIEW_URL = "http:localhost:3000/api/v1/reviews/"

fetchReviews()

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

function fetchReviews(){
    fetch(REVIEW_URL)
        .then(res => res.json())
        .then(reviews => renderReviews(reviews))
}

function renderReviews(reviews){
    reviews.forEach((review) => {
        const reviewObj = new Review(review.title, review.content, review.rating, review.fishing_spot_id, review.user_id)
        const card = reviewObj.renderReview()
        rendersCard(card)
    })
}

function rendersCard(card){
    const mainContainer = document.querySelector('main')
    mainContainer.appendChild(card)
}