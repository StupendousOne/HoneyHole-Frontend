class FishingSpot {
    
    constructor (id, name, longitude, latitude, image, image_small, public_access, user_id, site_info, is_active, fish, created_at, updated_at) {
        this.id = id
        this.name = name
        this.latitude  = latitude
        this.longitude = longitude
        this.image = image
        this.image_small = image_small
        this.public_access = public_access
        this.user_id  = user_id    // user who created this spot in app
        this.site_info = site_info
        this.is_active = is_active
        this.fish = fish    // fish = array of fish this spot has
        this.created_at = created_at
        this.updated_at = updated_at
        this.element = document.createElement('card')
    }

    renderSpot() {
        // create card and put user title, username, and review content on it
        if(this.is_active){
            // Site image, name, and link to info page
            this.element.className = 'card'
            const image = document.createElement('img')
            image.src = this.image_small
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

            const delBtn = document.createElement('button')
            delBtn.innerText = "Delete"
            // TODO this button isn't actually deleting from db
            delBtn.addEventListener('click', () => {
                this.deleteFishingSpot()
                this.element.remove()
            })

            fishList.appendChild(fishUl)
            linkToSiteInfo.appendChild(name)
            this.element.append(image, linkToSiteInfo, linkToLocation, br1, accessSpan, br2, fishList, br3, delBtn)

            return this.element
        }
    }

    deleteFishingSpot() {
        fetch(SPOT_URL + this.id, {method: "DELETE"})
        .then(res => res.json())
        .then(res => console.log(res))
    }
    
}

function addNewFishingSpot(spot){
    fetch(SPOT_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: spot.name,
            public_access: spot.public_access,
            latitude: spot.latitude,
            longitude: spot.longitude,
            site_info: spot.site_info,
            user_id: spot.user_id,
            is_active: spot.s_active,
            image: spot.image
        })
    })
    .then(res => res.json())
    .then(res => console.log(res))
}

function modifyFishingSpot(id, params){
    fetch(SPOT_URL + id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    })
    .then(res => res.json())
    .then(res => console.log(res))
}

