class Review {
    
    constructor(title, content, rating, reviewed_fishing_spots, user) {

        this.title = title
        this.content = content
        this.rating = rating
        this.reviewed_fishing_spots = reviewed_fishing_spots
        this.user = user
        this.element = document.createElement('card')
    }

    // have to pass in spots and reviews as they don't seem to want to come in with the user. =
    // is this execution context issue? can we bind?
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

    // could rebuild this into expandReview... try css styling accordian style expand first on review above.
    // expandUser(spots, reviews, div) {
    //     // wipes children when user clicks expand again (to close)
    //     if(div.lastChild) {
    //         this.removeChildren(div)
    //     // create ul for reviews & spots and appends
    //     } else {
    //         const revLabel = document.createElement('revLabel')
    //         revLabel.innerText = 'Reviews:'
    //         let rev_ul = document.createElement('ul')
    //         reviews.forEach((review) => {
    //             let rev_a = document.createElement('a') 
    //             rev_a.innerText = review.title
    //             // links to review
    //             rev_a.href = BASE_URL + `reviews/${review.id}`
    //             rev_ul.appendChild(rev_a)
    //         })
    //         const spotLabel = document.createElement('spotLabel')
    //         spotLabel.innerText = 'Favorite spots:'
    //         let spot_ul = document.createElement('ul')
    //         spots.forEach((spot) => {
    //             let spot_a = document.createElement('a') 
    //             spot_a.innerText = spot.name
    //             // links to fishing spot
    //             spot_a.href = BASE_URL + `fishing_spots/${spot.id}`
    //             spot_ul.appendChild(spot_a)
    //         })
    //         div.append(revLabel, rev_ul, spotLabel, spot_ul)
    //         // returns div element to expandUser for appending
    //         return div
    //     }
    // }

    removeChildren(tag) {
        while (tag.lastChild) {
            tag.removeChild(tag.lastChild)
        }
        return tag
    }
}