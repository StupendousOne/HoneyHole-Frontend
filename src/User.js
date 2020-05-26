class User {
    
    constructor(name, bio, username, email, reviews, favorite_fishing_spots) {

        this.name = name
        this.bio = bio
        this.username = username
        this.email = email
        this.element = document.createElement('div')
    }


    // have to pass in spots and reviews as they don't seem to want to come in with the user. =
    // is this execution context issue? can we bind?
    // renderUser(spots, reviews){
    //     // create card and put user name/username on it
    //     this.element.className = 'card'
    //     const name = document.createElement('p')
    //     name.innerText = this.name
    //     const username = document.createElement('p')
    //     username.innerText = this.username
    
    //     // create li tags for reviews & spots
    //     const review_count = document.createElement('li')
    //     review_count.innerText = `${reviews.length} reviews`

    //     const fav_count = document.createElement('li')
    //     fav_count.innerText = `${spots.length} favorited spots`

    //     // expand button for user detail
    //     const div = document.createElement('div')
    //     const expandBtn = document.createElement('button')
    //     expandBtn.innerText = 'Expand'
    //     expandBtn.addEventListener('click', () => {
    //         this.expandUser(spots, reviews, div)
    //     })

    //     // append elemnts to card and return the finished element
    //     this.element.append(name, username, review_count, fav_count, expandBtn, div)
        
    //     return this.element
    // }

    // attempt to add styling below. Copied renderUser to test
        // <div class="ui fluid container">
        //     <div class="ui cards">
        //       <div class="card">
        //         <div class="content">
        //           <div class="header">Insert name</div>
        //           <div class="description">bio goes here</div>
        //         </div>
        //         <div class="ui bottom attached button">
        //           <i class="add icon"></i>
        //           Button text
        //         </div>
        //       </div>
        //   </div>

    renderUser(spots, reviews){
        // create card and put user name/username on it
        this.element.className = 'card'
        const content = document.createElement('div')
        content.className = 'content'
        const name = document.createElement('div')
        name.className = 'header'
        name.innerText = this.name
        const details = document.createElement('div')
        details.className = 'description'
        details.innerText = `${this.username} has ${reviews.length} reviews.`

        // // create li tags for reviews & spots
        // const review_count = document.createElement('li')
        // review_count.innerText = `${reviews.length} reviews`

        // const fav_count = document.createElement('li')
        // fav_count.innerText = `${spots.length} favorited spots`

        // expand button for user detail
        const btn = document.createElement('div')
        btn.className = 'ui.bottom.attached.button'
        const icon = document.createElement('i')
        icon.className = 'add.icon'
        // const expandBtn = document.createElement('button')
        icon.innerText = 'Expand'
        // expandBtn.addEventListener('click', () => {
        //     this.expandUser(spots, reviews, div)
        // })

        // append elemnts to card and return the finished element
        btn.appendChild(icon)
        content.append(name, details)
        this.element.append(content, btn)
        
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