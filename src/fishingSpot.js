class FishingSpot {

    constructor(id = '', name = '', longitude = '', latitude = '', image = '', image_small = '', public_access = '', user_id = '', site_info = '', is_active, fish = [], fish_spot = [], created_at, updated_at) {

        this.id = id
        this.name = name
        this.latitude = latitude
        this.longitude = longitude
        this.image = image
        this.image_small = image_small
        this.public_access = public_access
        this.user_id = user_id    // user who created this spot in app
        this.site_info = site_info
        this.is_active = is_active
        this.fish = fish    // fish = array of fish this spot has
        this.fish_spot = fish_spot
        this.created_at = created_at
        this.updated_at = updated_at
        this.element = document.createElement('div')
    }

    renderSpot() {
        // create card and put user title, username, and review content on it
        if (this.is_active) {
            // Site image, name, and link to info page
            this.element.className = 'card'
            this.element.classList.add("h-100")
            const image = document.createElement('img')
            image.src = this.image
            image.classList.add("card-img-top")
            image.classList.add("mh-30")

            const cardBody = document.createElement("div")
            cardBody.className = "card-body"
            cardBody.classList.add("card-body")
            cardBody.classList.add("d-flex")
            cardBody.classList.add("flex-column")

            const linkToSiteInfo = document.createElement('a')
            linkToSiteInfo.href = this.site_info
            const name = document.createElement('h3')
            name.innerText = this.name
            const location = document.createElement('p')

            // Location info:
            // https://www.google.com/maps/search/?api=1&query=<lat>,<lng>
            const linkToLocation = document.createElement('a')
            linkToLocation.innerText = 'Address'
            linkToLocation.href = `https://www.google.com/maps/search/?api=1&query=${this.latitude},${this.longitude}`
            const br1 = document.createElement('br')

            // Location info:
            const accessSpan = document.createElement('span')
            accessSpan.innerText = `Public access: ${this.public_access}`
            const br2 = document.createElement('br')

            // Fish info:
            const fishList = document.createElement('span')
            fishList.innerText = `Fish species:`
            const fishUl = document.createElement('ul')
            const br3 = document.createElement('br')

            this.fish.forEach((fish) => {
                const fishLi = document.createElement('li')
                fishLi.innerText = fish.species
                fishUl.appendChild(fishLi)
            })


            const btnDiv = document.createElement("div")
            btnDiv.className = "mt-auto"
            // edit fishing spot
            const editBtn = document.createElement('button')
            editBtn.classList.add('btn')
            editBtn.classList.add('btn-primary')
            editBtn.dataset.toggle = "modal"
            editBtn.dataset.target = `#infoModal`
            editBtn.innerText = "Edit"

            editBtn.addEventListener('click', () => this.addEditModal(this))

            const br4 = document.createElement('br')

            // favorite fishing spot
            const favBtn = document.createElement('button')
            favBtn.classList.add('btn')
            favBtn.classList.add('btn-primary')
            favBtn.dataset.toggle = "modal"
            favBtn.dataset.target = `#infoModal`

            // handle CURRENT_USER array of favorite_fishing_spots to see if this is one of them and toggle innerText accordingly
            const spotIds = CURRENT_USER.favorite_fishing_spots.map(spot => spot.id)
            if (spotIds.includes(this.id)) {favBtn.innerText = "Unfavorite"}
            else {favBtn.innerText = "Favorite"}

            favBtn.addEventListener('click', () => this.favorite())

            // remove fishing spot (toggle is_active status)
            const delBtn = document.createElement('button')
            delBtn.classList.add('btn')
            delBtn.classList.add('btn-danger')
            delBtn.innerText = "Delete"
            delBtn.addEventListener('click', () => {
                this.deleteFishingSpot()
                this.element.remove()
            })

            // append everything here
            fishList.appendChild(fishUl)
            linkToSiteInfo.appendChild(name)
            btnDiv.append(favBtn, editBtn, br4, delBtn)
            cardBody.append(linkToSiteInfo, linkToLocation, br1, accessSpan, br2, fishList, br3, btnDiv)
            this.element.append(image, cardBody)

            return this.element
        }
    }

    modifyFishingSpot(spotObj) {
        fetch(SPOT_URL + id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
            .then(res => res.json())
            .then(res => console.log(res))
            .then(res => fetchFishingSpots())
    }

    deleteFishingSpot() {
        fetch(SPOT_URL + this.id, { method: "DELETE" })
            .then(res => res.json())
            .then(res => console.log(res))
    }

    unFavorite() {
        fetch(SPOT_URL, { 
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: CURRENT_USER.id,
                fishing_spot_id: this.id
            })
        })
        .then(res => res.json())
        .then(res => console.log(res))
    }

    favorite() {
        fetch(SPOT_URL, { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: CURRENT_USER.id,
                fishing_spot_id: this.id
            })
        })
        .then(res => res.json())
        .then(res => console.log(res))
    }

    addEditModal(spotObj) {
        const body = document.querySelector("#infoModalBody")
        const header = document.querySelector("#infoModalTitle")
        const close = document.querySelector("#infoModalClose")
        let isNew = false

        // this can be delegated to the button to create new and refactored. This generates a new object if one is not passed in to edit
        if (!spotObj.id) {
            isNew = true
            spotObj = new FishingSpot()
        }
        header.innerText = `Edit: ${this.name}`

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
        nameField.value = spotObj.name

        //append label and field to form group
        formGroup1.append(nameLabel, nameField)

        // latitude
        const latLabel = document.createElement("label")
        latLabel.htmlFor = "latField"
        latLabel.innerText = "Latitude: "

        const latField = document.createElement("input")
        latField.type = "text"
        latField.className = "form-control"
        latField.id = "latField"
        latField.value = spotObj.latitude

        //append label and field to form group
        formGroup1.append(latLabel, latField)

        // longitude
        const longLabel = document.createElement("label")
        longLabel.htmlFor = "latField"
        longLabel.innerText = "Longitude: "

        const longField = document.createElement("input")
        longField.type = "text"
        longField.className = "form-control"
        longField.id = "longField"
        longField.value = spotObj.longitude

        //append label and field to form group
        formGroup1.append(longLabel, longField)

        // image_url
        const imgLabel = document.createElement("label")
        imgLabel.htmlFor = "image"
        imgLabel.innerText = "Image URL: "

        const imgField = document.createElement("input")
        imgField.type = "text"
        imgField.className = "form-control"
        imgField.id = "imgField"
        imgField.value = spotObj.image

        //append label and field to form group
        formGroup1.append(imgLabel, imgField)

        // public_access
        const accLabel = document.createElement("label")
        accLabel.htmlFor = "public_access"
        accLabel.innerText = "Public access notes: "

        const accField = document.createElement("input")
        accField.type = "text"
        accField.className = "form-control"
        accField.id = "accField"
        accField.value = spotObj.public_access

        //append label and field to form group
        formGroup1.append(accLabel, accField)

        // site_info
        const siteLabel = document.createElement("label")
        siteLabel.htmlFor = "site_info"
        siteLabel.innerText = "Site info link: "

        const siteField = document.createElement("input")
        siteField.type = "text"
        siteField.className = "form-control"
        siteField.id = "siteField"
        siteField.value = spotObj.site_info

        //append label and field to form group
        formGroup1.append(siteLabel, siteField)

        // fish species
        const fishLabel = document.createElement("label")
        fishLabel.htmlFor = "site_info"
        fishLabel.innerText = "Fish species present:"
        const fishUl = document.createElement('ul')
        fishUl.htmlFor = "fish_species"

        let fishIds = spotObj.fish.map((fish) => fish.id)
        let deleteIds = []

        FISH.forEach((fish) => {
            const fishLabel = document.createElement('label')
            fishLabel.innerText = fish.species
            const fishCheck = document.createElement('input')
            fishCheck.setAttribute("type", "checkbox")
            fishCheck.dataset.id = fish.id
            fishIds.includes(fish.id) ? fishCheck.checked = true : fishCheck.checked = false
            const br1 = document.createElement('br')
            fishUl.append(fishCheck, fishLabel, br1)
            fishCheck.addEventListener('change', function(e) {
                if (fishCheck.checked) {
                    if (!fishIds.includes(fish.id)) {
                        fishIds.push(fish.id)
                        spotObj.fish.push(fish)
                    }
                } else {
                    if (fishIds.includes(fish.id)) {
                        fishIds = fishIds.filter(id => id != fish.id)
                        spotObj.fish = spotObj.fish.filter(spotFish => spotFish.id != fish.id)
                        deleteIds.push(fish.id)
                    }
                }
            })
        })

        //append label and field to form group
        formGroup1.append(fishLabel, fishUl)

        //create and append submit button
        const submitBtn = document.createElement("input")
        submitBtn.type = "submit"
        submitBtn.classList.add("btn")
        submitBtn.classList.add("btn-primary")
        submitBtn.innerText = "Submit"

        //append everything to form and form to body
        form.append(formGroup1, submitBtn)
        body.appendChild(form)

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
                fetchFish().then(fetchFishingSpots())
            })
            spotObj.fish.forEach((fish) => addSpotFishFetch(spotObj, fish))
            deleteIds = deleteIds.map((id) => {
                return spotObj.fish_spot.find((fish_spot) => fish_spot.fish_id == id)
            })
            deleteIds.forEach((fish_spot) => deleteSpotFishFetch(fish_spot))
            if (isNew){
                addSpotFetch(spotObj)
            } else {
                editSpotFetch(spotObj)
            }
        })
    }

}

function editSpotFetch(params) {
    fetch(SPOT_URL + params.id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: params.name,
            latitude: params.latitude,
            longitude: params.longitude,
            image: params.image,
            public_access: params.public_access,
            user_id: params.user_id,
            site_info: params.site_info
        })
    })
    
}

function fetchFishingSpots(id=""){
    return fetch(SPOT_URL + id)
        .then(res => res.json())
        .then(spots => {
            FISHING_SPOTS = spots
            return FISHING_SPOTS
        })
}

function renderFishingSpots(spots){
    spots.forEach(spot => {
        const spotObj = new FishingSpot(spot.id, spot.name, spot.longitude, spot.latitude, spot.image, spot.image_small, spot.public_access, spot.user_id, spot.site_info, spot.is_active, spot.fish, spot.fish_spots, spot.created_at, spot.updated_at)
        const card = spotObj.renderSpot()
        rendersCard(card)
    })
}

function addSpotFetch(params) {
    fetch(SPOT_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: params.name,
            latitude: params.latitude,
            longitude: params.longitude,
            image: params.image,
            public_access: params.public_access,
            user_id: params.user_id,
            site_info: params.site_info,
            is_active: true,
        })
    })
        .then(res => res.json())
        .then(res => console.log(res))
        .then(res => fetchFishingSpots())
}

function addSpotFishFetch(spotObj, fish) {
    fetch(SPOT_FISH_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fishing_spot_id: spotObj.id,
            fish_id: fish.id
        })
    })
        .then(res => res.json())
        .then(res => console.log(res))
        .then(res => fetchFishingSpots())
}

function deleteSpotFishFetch(fish_spot) {
    fetch(SPOT_FISH_URL + fish_spot.id, {method: "DELETE"})
    .then(res => res.json())
    .then(res => console.log(res))
}