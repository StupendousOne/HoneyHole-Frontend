class FishingSpot {
    
    constructor(params) {
        this.id = params.id
        this.name = params.name
        this.public_access = params.public_access
        this.latitude  = params.latitude
        this.longitude = params.longitude
        this.site_info = params.site_info
        this.user_id  = params.user_id
        this.is_active = params.is_active
        this.image = params.image
        this.fish = params.fish
        this.element = document.createElement('card')
    }


    renderSpot() {
        // create card and put user title, username, and review content on it
        if(this.is_active){
            // create card and put user name/username on it
            this.element.className = 'card'
            const speciesP = document.createElement('p')
            speciesP.innerText = this.name
            speciesP.dataset.id = this.id
            const fishImg = document.createElement('img')
            fishImg.src = this.image
            const infoUl = document.createElement('ul')
            infoUl.innerText = this.public_access
            const location = document.createElement('ul')
            location.innerText = `Latitude: ${this.latitude} Longitude: ${this.longitude}`
            const fishUl = document.createElement('ul')
            fishUl.innerText = "Fish Species:"
            
            this.element.append(speciesP, fishImg, infoUl, location, fishUl)
            this.fish.forEach(fish => this.listFishingSpot(fish, fishUl))
                
            return this.element
        }
    }
    
    listFishingSpot(fish, ul){
        const fishLi = document.createElement('li')
        fishLi.innerText = fish.species
        ul.appendChild(fishLi)
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

function deleteFishingSpot(id){
    fetch(SPOT_URL + id, {method: "DELETE"})
    .then(res => res.json())
    .then(res => console.log(res))
}