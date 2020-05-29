class Review {
    
    constructor(title, content, rating, reviewed_fishing_spots, user) {

        this.title = title
        this.content = content
        this.rating = rating
        this.reviewed_fishing_spots = reviewed_fishing_spots
        this.user = user
        this.element = document.createElement('card')
    }

    renderReview() {
        // create card and put user title, username, and review content on it
        this.element.className = 'card'
        const title = document.createElement('h1')
        title.innerText  = this.title
        const spot = document.createElement('a')
        spot.innerText = `Location: ${this.reviewed_fishing_spots}`
        spot.href = SPOT_URL + `${this.reviewed_fishing_spots.id}`
        const br = document.createElement('br')
        const user = document.createElement('a')
        user.innerText = `By: ${this.user.name} (${this.user.username})` 
        user.href = USER_URL + `${this.user.id}`
        const content = document.createElement('p')
        // can use a slice like this and click to expand and see the whole thing? or use CSS styling accordian style expand.
        // content.innerText = this.content.slice(0, 150)
        content.innerText = this.content

        // append elemnts to card and return the finished element
        this.element.append(title, spot, br, user, content)
        
        return this.element
    }

    editReview(){
        
    }

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