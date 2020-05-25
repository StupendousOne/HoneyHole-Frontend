class Review {
    
    constructor(title, content, rating, fishing_spot_id, user_id) {

        this.title = title
        this.content = content
        this.rating = rating
        this.fishing_spot_id = fishing_spot_id
        this.user_id = user_id
        this.element = document.createElement('card')
    }

    // have to pass in spots and reviews as they don't seem to want to come in with the user. =
    // is this execution context issue? can we bind?
    renderReview() {
        // create card and put user title, username, and review content on it
        this.element.className = 'card'
        const title = document.createElement('h3')
        title.innerText  = this.title
        const user = document.createElement('a')
        user.innerText = `User ID: ${this.user_id}` 
        user.href = USER_URL + `${this.user_id}`
        const br = document.createElement('br')
        const spot = document.createElement('a')
        spot.innerText = `Fishing spot ID: ${this.fishing_spot_id}`
        spot.href = SPOT_URL + `${this.fishing_spot_id}`
        const content = document.createElement('p')
        content.innerText = this.content

        // append elemnts to card and return the finished element
        this.element.append(title, user, br, spot, content)
        
        return this.element
    }

    expandUser(spots, reviews, div) {
        // wipes children when user clicks expand again (to close)
        if(div.lastChild) {
            this.removeChildren(div)
        // create ul for reviews & spots and appends
        } else {
            const revLabel = document.createElement('revLabel')
            revLabel.innerText = 'Reviews:'
            let rev_ul = document.createElement('ul')
            reviews.forEach((review) => {
                let rev_a = document.createElement('a') 
                rev_a.innerText = review.title
                // links to review
                rev_a.href = BASE_URL + `reviews/${review.id}`
                rev_ul.appendChild(rev_a)
            })
            const spotLabel = document.createElement('spotLabel')
            spotLabel.innerText = 'Favorite spots:'
            let spot_ul = document.createElement('ul')
            spots.forEach((spot) => {
                let spot_a = document.createElement('a') 
                spot_a.innerText = spot.name
                // links to fishing spot
                spot_a.href = BASE_URL + `fishing_spots/${spot.id}`
                spot_ul.appendChild(spot_a)
            })
            div.append(revLabel, rev_ul, spotLabel, spot_ul)
            // returns div element to expandUser for appending
            return div
        }
    }

    removeChildren(tag) {
        while (tag.lastChild) {
            tag.removeChild(tag.lastChild)
        }
        return tag
    }
}