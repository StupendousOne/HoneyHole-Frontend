class User {
    
    constructor(name, bio, username, email, reviews, favorite_fishing_spots) {

        this.name = name
        this.bio = bio
        this.username = username
        this.email = email
        this.reviews = reviews
        this.favorite_fishing_spots = favorite_fishing_spots 
        this.element = document.createElement('card')
    }

    renderUser(spots, reviews){
        // create card and put user name/username on it
        this.element.className = 'card'
        const name = document.createElement('p')
        name.innerText = this.name
        const username = document.createElement('p')
        username.innerText = this.username
    
        let review_count = document.createElement('li')
        review_count.innerText = `${reviews.length} reviews`

        let fav_count = document.createElement('li')
        fav_count.innerText = `${spots.length} favorited spots`

        // detail user review/favorites
        // if (Array.isArray(this.reviews) && this.reviews.length) {
        //     let review_count = document.createElement('li')
        //     review_count.innerText = `${this.reviews.size} reviews`
        // } else { 
        //     let review_count = document.createElement('li')
        //     review_count.innerText = `${this.name} has no reviews`
        // }
        // if (Array.isArray(this.reviews) && this.reviews.length) {
        //     let fav_count = document.createElement('li')
        //     fav_count.innerText = `${this.favorite_fishing_spots.size} favorited spots`
        // } else { 
        //     let fav_count = document.createElement('li')
        //     fav_count.innerText = `${this.name} has no favorited spots`
        // }

        // append elemnts to card and return the finished element
        this.element.append(name, username, review_count, fav_count)
        
        return this.element
    }
}