class Review {
    
    constructor(review) {
        this.title = review.title
        this.content = review.content
        this.rating = review.rating
        this.user_id = review.user_id
        this.fishing_spot_id = review.fishing_spot_id
        this.reviewed_fishing_spots = review.reviewed_fishing_spots
        this.user = review.user
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

    fillOutShowModal(){
        const body = document.querySelector("#infoModalBody")
        const header = document.querySelector("#infoModalTitle")
        const close = document.querySelector("#infoModalClose")

        //show close button in case it is hidden submit button
        close.setAttribute("style", "display:block")

        //clear any old info
        while(body.lastChild){
            body.removeChild(body.lastChild)
        }

        header.innerHTML = this.title

        const spotHeader = document.createElement("h5")
        spotHeader.innerText = this.reviewed_fishing_spots.name

        const rating = document.createElement('p')
        rating.innerText = `${this.rating}/5`

        const content = document.createElement('p')
        content.innerText = this.content

        const spotsP = document.createElement('p')
        spotsP.innerText = `By: ${this.user.username}`

        if(CURRENT_USER.id == this.user_id){
            const editBtn = document.createElement('button')
            editBtn.innerText = "Edit"
            editBtn.classList.add('btn')
            editBtn.classList.add('btn-warning')
            editBtn.addEventListener("click",()=>this.fillOutEditModal())

            const deleteBtn = document.createElement('button')
            deleteBtn.innerText = "Delete"
            deleteBtn.classList.add('btn')
            deleteBtn.classList.add('btn-danger')
            deleteBtn.dataset.dismiss = "modal"
            deleteBtn.addEventListener("click",()=> {
                REVIEWS = REVIEWS.filter(review => review.id != this.id)
                CURRENT_USER.reviews = CURRENT_USER.reviews.filter(review => review.id != this.id)
                this.deleteReview()
                clearMainContainer()
                if(CURRENT_PAGE == 'user'){
                    let user = new User(CURRENT_USER)
                    user.renderUser()
                } else if (CURRENT_PAGE == 'spots'){
                    renderFishingSpots(FISHING_SPOTS)
                }
            })
            body.append(spotHeader, rating, content, spotsP, editBtn, deleteBtn)
        } else {
            body.append(spotHeader, rating, content, spotsP)
        }
    }

    fillOutEditModal(spot){
        const body = document.querySelector("#infoModalBody")
        const header = document.querySelector("#infoModalTitle")
        const close = document.querySelector("#infoModalClose")

        let isNewReview = false
        //check whether this is edit or new
        if(this.id){
            header.innerText = `Edit: ${this.species}`
        } else {
            header.innerText = `Create new Review`
            isNewReview = true
        }
        //show close button in case it is hidden submit button
        close.setAttribute("style", "display:block")

        //clear any old info
        while(body.lastChild){
            body.removeChild(body.lastChild)
        }

        const form = document.createElement('form')
        //form-groups style each input and should typically have a label and an input
        const formGroup1 = document.createElement('div')
        formGroup1.className = "form-group"

        //make label and field
        // Species
        const titleLabel = document.createElement("label")
        titleLabel.htmlFor = "titleField"
        titleLabel.innerText = "Title: "

        const titleField = document.createElement("input")
        titleField.type = "text"
        titleField.className = "form-control"
        titleField.id = "titleField"
        titleField.value = this.title

        //append label and field to form group
        formGroup1.append(titleLabel, titleField)

        //content
        const contentLabel = document.createElement("label")
        contentLabel.htmlFor = "contentField"
        contentLabel.innerText = "Review: "

        const contentField = document.createElement("input")
        contentField.type = "text"
        contentField.className = "form-control"
        contentField.id = "contentField"
        contentField.value = this.content

        //append label and field to form group
        formGroup1.append(contentLabel, contentField)

        // Image
        const ratingLabel = document.createElement("label")
        ratingLabel.htmlFor = "contentField"
        ratingLabel.innerText = "Rating: "

        const ratingField = document.createElement("input")
        ratingField.type = "number"
        ratingField.max = 5
        ratingField.className = "form-control"
        ratingField.id = "ratingField"
        ratingField.value = this.image

        //append label and field to form group
        formGroup1.append(ratingLabel, ratingField)

        const submitBtn = document.createElement("input")
        submitBtn.type = "submit"
        submitBtn.classList.add("btn")
        submitBtn.classList.add("btn-primary")
        submitBtn.innerText = "Submit"

        if(!isNewReview){
            body.addEventListener("submit", e => updateReview(e, this, spot.id))
        } else {
            body.addEventListener("submit", e => createNewReview(e))
        }
        //append everything to form and form to body
        form.append(formGroup1, submitBtn)
        body.appendChild(form)
    }
}

function updateReview(e, spotId){
    e.preventDefault()
    const formTitle = e.target.querySelector("#titleField").value
    const formContent = e.target.querySelector("#contentField").value
    const formRating = e.target.querySelector("#ratingFieldField").value

    modifyReview({id: this.id, title: formTitle, content: formContent, rating: formRating, user_id: CURRENT_USER.id, fishing_spot_id: spotId})
}

function fetchReviews(id=''){
    return fetch(REVIEW_URL + id)
        .then(res => res.json())
        .then(reviews => {
            REVIEWS = reviews
            return REVIEWS
        })
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

function newReview(review){
    fetch(REVIEW_URL,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    })
}

function modifyReview(id, params){
    fetch(REVIEW_URL + id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    })
    .then(res => res.json())
    .then(res => {
        let review = new Review(res)
        review.fillOutShowModal()
    })
}