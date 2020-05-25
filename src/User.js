class User {
    
    constructor(name, bio, username, email, reviews, favorite_fishing_spots) {

        this.name = name
        this.bio = bio
        this.username = username
        this.email = email
        this.element = document.createElement('card')
    }

    // have to pass in spots and reviews as they don't seem to want to come in with the user. =
    // is this execution context issue? can we bind?
    renderUser(spots, reviews){
        // create card and put user name/username on it
        this.element.className = 'card'
        const name = document.createElement('p')
        name.innerText = this.name
        const username = document.createElement('p')
        username.innerText = this.username
    
        // create li tags for reviews & spots
        const review_count = document.createElement('li')
        review_count.innerText = `${reviews.length} reviews`

        const fav_count = document.createElement('li')
        fav_count.innerText = `${spots.length} favorited spots`

        // expand button for user detail
        const div = document.createElement('div')
        const expandBtn = document.createElement('button')
        expandBtn.innerText = 'Expand'
        expandBtn.addEventListener('click', () => {
            this.expandUser(spots, reviews, div)
        })

        // append elemnts to card and return the finished element
        this.element.append(name, username, review_count, fav_count, expandBtn, div)
        
        return this.element
    }

    expandUser(spots, reviews, div) {
        // wipes children when user clicks expand again (to close)
        if(div.lastChild) {
            this.removeChildren(div)
        // create ul for reviews & spots and appends
        } else {
            let rev_ul = document.createElement('ul')
            reviews.forEach((review) => {
                let rev_li = document.createElement('li') 
                rev_li.innerText = review.title
                rev_ul.appendChild(rev_li)
            })
            let spot_ul = document.createElement('ul')
            spots.forEach((spot) => {
                let spot_li = document.createElement('li') 
                spot_li.innerText = spot.name
                spot_ul.appendChild(spot_li)
            })
            div.append(rev_ul, spot_ul)
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