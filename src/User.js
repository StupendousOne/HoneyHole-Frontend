class User {
    
    constructor(id, name, bio, username, email, is_active, reviews, favorite_fishing_spots, favorites) {

        this.id = id
        this.name = name
        this.bio = bio
        this.username = username
        this.email = email
        this.is_active = is_active
        this.reviews = reviews
        this.favorite_fishing_spots = favorite_fishing_spots
        this.favorites = favorites
        this.element = document.createElement('card')
    }
    renderUser() {
        //If the user card has already been created just attach and return
        if(this.element.lastChild){
            MAIN_CONTAINER.appendChild(this.element)
            return
        }
            
        // create card and put user name/username on it
        this.element.className = 'card'
        const name = document.createElement('p')
        name.innerText = `Name: ${this.name}`
        const username = document.createElement('p')
        username.innerText = `Username: ${this.username}`
        const email = document.createElement('p')
        email.innerText = `Email: ${this.email}`
        const bio = document.createElement('p')
        bio.innerText = `About yourself: ${this.bio}`
        const is_active = document.createElement('p')
        bio.innerText = `Account status: ${this.is_active}`
    
        // create li tags for reviews & spots
        const review_count = document.createElement('li')
        review_count.innerText = `${this.reviews.length} reviews`

        const fav_count = document.createElement('li')
        fav_count.innerText = `${this.favorite_fishing_spots.length} favorited spots`

        // reviews
        const revHeader = document.createElement('p')
        revHeader.innerText = `Reviews:`
        const reviewDiv = document.createElement('div')
        reviewDiv.style = "display:block"

        if (this.reviews != undefined && this.reviews.length != 0) {
            this.reviews.forEach((review) => {
                let reviewLi = document.createElement('li')
                reviewLi.innerText = review.title
                reviewDiv.appendChild(reviewLi)
            })
        }

        const btnDiv = document.createElement("div")
            btnDiv.className = "mt-auto"
            // edit user
            const editBtn = document.createElement('button')
            editBtn.classList.add('btn')
            editBtn.classList.add('btn-primary')
            editBtn.dataset.toggle = "modal"
            editBtn.dataset.target = `#infoModal`
            editBtn.innerText = "Edit"
            editBtn.addEventListener('click', () => this.editUserModal())

            // back button
            let backBtn = document.createElement('button')
            backBtn.classList.add('btn')
            backBtn.classList.add('btn-secondary')
            backBtn.innerText = "Back"
            backBtn.onclick = e => {
                clearMainContainer()
                fetchFishingSpots().then(res => renderFishingSpots(FISHING_SPOTS)) // current user is stored in memory and user is sent to fishing spots page
            }

            btnDiv.append(editBtn, backBtn)

        // append elements to card and return the finished element
        this.element.append(name, username, review_count, fav_count, revHeader, reviewDiv, btnDiv)
        
        // render this.element
        MAIN_CONTAINER.appendChild(this.element)
    }
    addNewUser() {
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
        .then(user => CURRENT_USER = user)
        .then(res => console.log('New user saved'))
    }
    editUserModal() {
        const body = document.querySelector("#infoModalBody")
        const header = document.querySelector("#infoModalTitle")
        const close = document.querySelector("#infoModalClose")
    
        header.innerText = `Edit profile below and submit`
    
        //hide close button
        close.setAttribute("style", "display:none")
    
        //clear any old info
        while (body.lastChild) {
            body.removeChild(body.lastChild)
        }
    
        //build edit form here and append to body
        const form = document.createElement('form')
        //form-groups style each input and should typically have a label and an input
        const formGroup1 = document.createElement('div')
        formGroup1.className = "form-group"
    
        //make label and field
        // name
        const nameLabel = document.createElement("label")
        nameLabel.htmlFor = "nameField"
        nameLabel.innerText = "Name: "
    
        const nameField = document.createElement("input")
        nameField.type = "text"
        nameField.className = "form-control"
        nameField.id = "nameField"
        nameField.value = this.name
    
        // user name
        const userNameLabel = document.createElement("label")
        userNameLabel.htmlFor = "userNameField"
        userNameLabel.innerText = "Username: "
    
        const userNameField = document.createElement("input")
        userNameField.type = "text"
        userNameField.className = "form-control"
        userNameField.id = "userNameField"
        userNameField.value = this.username
    
        // email
        const emailLabel = document.createElement("label")
        emailLabel.htmlFor = "emailField"
        emailLabel.innerText = "Email: "
    
        const emailField = document.createElement("input")
        emailField.type = "text"
        emailField.className = "form-control"
        emailField.id = "emailField"
        emailField.value = this.email
    
        // bio
        const bioLabel = document.createElement("label")
        bioLabel.htmlFor = "bioField"
        bioLabel.innerText = "Tell us a little about yourself: "
    
        const bioField = document.createElement("input")
        bioField.type = "text"
        bioField.className = "form-control"
        bioField.id = "bioField"
        bioField.value = this.bio
    
        //append label and field to form group
        formGroup1.append(nameLabel, nameField, userNameLabel, userNameField, emailLabel, emailField, bioLabel, bioField)
    
        //create footer div
        const footerDiv = document.createElement('div')
        footerDiv.classList.add("modal-footer")

        //create and append submit button
        const submitBtn = document.createElement("input")
        submitBtn.type = "submit"
        submitBtn.classList.add("btn")
        submitBtn.classList.add("btn-primary")
        submitBtn.innerText = "Submit"
    
        //create and append delete button
        const delBtn = document.createElement("input")
        delBtn.type = "delete"
        delBtn.classList.add("btn")
        delBtn.classList.add("btn-danger")
        delBtn.setAttribute("data-dismiss", "modal") // dismisses modal when user deletes self
        delBtn.innerText = "Delete"
        delBtn.addEventListener("click", (e) => {
            e.preventDefault()
            clearMainContainer
            this.deleteUser()
        })

        //append everything to form and form to body
        footerDiv.append(submitBtn, delBtn)
        form.append(formGroup1, footerDiv)
        body.append(form)
    
        // params object for fetch patch
        const params = {
            name: nameField.value,
            username: userNameField.value,
            email: emailField.value,
            bio: bioField.value,
        }
    
        // add event listener that displays some result 
        //and allows closing of modal by unhiding close button
        body.addEventListener("submit", (e) => {
            e.preventDefault()
            while (body.lastChild) {
                body.removeChild(body.lastChild)
            }
            const name = document.createElement("span")
            name.innerText = `name: ${e.target.nameField.value}`
            body.appendChild(name)
            console.log("submitted")
            close.setAttribute("style", "display:block")
            close.addEventListener('click', () => {
                clearMainContainer()
                editUserFetch(this.id, params)
                fetchFishingSpots()
            })
        })
    }
    deleteUser() {
        fetch(USER_URL + this.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                is_active: "false"
            })
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .then(res => console.log('User deleted'))
        .then(res => init())
    }
    removeChildren(tag) {
        while (tag.lastChild) {
            tag.removeChild(tag.lastChild)
        }
        return tag
    }
}

function fetchUsers(id=''){
    return fetch(USER_URL + id)
        .then(res => res.json())
        .then(json => {
            USERS = json
            return USERS
        })
}

function editUserFetch(id, params){
    fetch(USER_URL + id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: params.name,
            bio: params.bio,
            username: params.username,
            email: params.email,
        })
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .then(res => console.log('User updated'))
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
                if (user.is_active == true) {
                    let userLi = document.createElement('li')
                    const a = document.createElement('a') // set up link for user
                    a.innerText = user.username
                    a.dataset.id = user.id
                    a.href = '#' // makes it looks linky
                    a.onclick = e => {
                        e.preventDefault(); // don't follow link
                        CURRENT_USER = new User(user.id, user.name, user.bio, user.username, user.email, user.is_active, user.reviews, user.favorite_fishing_spots, user.favorites)
                        clearMainContainer()
                        activateLinks()
                        fetchFishingSpots().then(res => fetchFish()).then(res => renderFishingSpots(FISHING_SPOTS))
                    }
                    userLi.appendChild(a)
                    usersUl.appendChild(userLi)
                }
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
    clearMainContainer()
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

function expandUser(spots, reviews, div) {
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