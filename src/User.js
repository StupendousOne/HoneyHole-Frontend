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

        // append elements to card and return the finished element
        this.element.append(name, username, review_count, fav_count, expandBtn, div)
        
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

    addNewUser(obj){
        fetch(USER_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.name,
                bio: this.bio,
                username: this.username,
                email: this.email
            })
        })
        .then(res => res.json())
        .then(user => CURRENT_USER = user.id)
        .then(res => console.log('New user saved'))
    }

    removeChildren(tag) {
        while (tag.lastChild) {
            tag.removeChild(tag.lastChild)
        }
        return tag
    }
}

function renderUsers(users){
    users.forEach((user) => {
        const userObj = new User(user.name, user.username, user.bio, user.favorite_fishing_spots, user.reviews)
        const card = userObj.renderUser(user.favorite_fishing_spots, user.reviews)
        rendersCard(card)
    })
}

function userLogin() {
    let card = document.createElement('card')
    let header = document.createElement('h3')
    header.innerText = "Login | Sign Up"

    let login = document.createElement('button')
    login.innerText = "Select user"
    login.addEventListener('click', (e) => {
        let parent = e.target.parentElement    // parent is actually same as card
        let parentUl = parent.querySelector('ul')   // attempt to find a ul element on the card
        if (parentUl) {
            parent.removeChild(parentUl)
        } else { 
            let usersUl = document.createElement('ul')
            USERS.forEach((user) => {
                let userLi = document.createElement('li')
                const a = document.createElement('a') // set up link for user
                a.innerText = user.username
                a.dataset.id = user.id
                a.href = '#' // makes it looks linky
                a.onclick = e => {
                    e.preventDefault(); // don't follow link
                    CURRENT_USER = user.id
                    clearMainContainer()
                    fetchFishingSpots()
                }
                userLi.appendChild(a)
                usersUl.appendChild(userLi)
            })
            card.appendChild(usersUl)
        }
    })
    // signUp route responds to click and launches signUp function
    let signUp = document.createElement('button')
    signUp.innerText = "Sign up"
    signUp.onclick = e => {
        clearMainContainer()
        signUpUser()
    }
    // append items and render card
    card.append(header, login, signUp)
    rendersCard(card)
}

function signUpUser() {
    let card = document.createElement('card')
    let header = document.createElement('h3')
    header.innerText = "Sign Up Below"
    let signUpForm = document.createElement('form')
    let nameLabel = document.createElement('label')
    nameLabel.innerText = 'Name:'
    let name = document.createElement('input')
    name.id = 'login-name'
    name.setAttribute("type", "text")
    let usernameLabel = document.createElement('label')
    usernameLabel.innerText = 'Username:'
    let usernameInput = document.createElement('input')
    usernameInput.setAttribute("type", "text")
    let emailLabel = document.createElement('label')
    emailLabel.innerText = 'Email:'
    let email = document.createElement('input')
    email.setAttribute("type", "text")
    let bioLabel = document.createElement('label')
    bioLabel.innerText = 'Tell us about yourself:'
    let bio = document.createElement('INPUT')
    bio.setAttribute("type", "text")


    // submit and go to spots index view
    let submit = document.createElement('button')
    submit.innerText = "Submit"
    signUpForm.addEventListener('submit', function(e) {
        e.preventDefault()
        let userObj = new User(name.value, bio.value, usernameInput.value, email.value)
        userObj.addNewUser()
        clearMainContainer()
        fetchFishingSpots()
    })
    // back button and wipe nodes 
    let back = document.createElement('button')
    back.innerText = "Back"
    back.onclick = e => {
        clearMainContainer()
        userLogin()
    }
    // append and render
    signUpForm.append(nameLabel, name, usernameLabel, usernameInput, emailLabel, email, bioLabel, bio, submit)
    card.append(header, signUpForm, back)
    clearMainContainer()
    rendersCard(card)
}