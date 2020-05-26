const BASE_URL = "http:localhost:3000/api/v1/"
const USER_URL = "http:localhost:3000/api/v1/users/"
const SPOT_URL = "http:localhost:3000/api/v1/fishing_spots/"
const REVIEW_URL = "http:localhost:3000/api/v1/reviews/"

fetchReviews()

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
    const container = document.querySelector('main')
    container.appendChild(card)
}