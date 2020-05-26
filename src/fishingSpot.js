class FishingSpot {
    
    constructor (id, name, longitude, latitude, image, public_access, user_id, site_info, is_active, fish, created_at, updated_at) {
        this.id = id
        this.name = name
        this.latitude  = latitude
        this.longitude = longitude
        this.image = image
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
        // if(this.is_active){
            // create card and put user name/username on it
            this.element.className = 'card'
            const linkToSiteInfo = document.createElement('a')
            linkToSiteInfo.href = this.site_info
            const name = document.createElement('h3')
            name.innerText = this.name
            // https://www.google.com/maps/search/?api=1&query=<lat>,<lng>
            const location = document.createElement('p')
            const linkToLocation = document.createElement('a')
            linkToLocation.innerText = 'Address'
            linkToLocation.href = `https://www.google.com/maps/search/?api=1&query=${this.latitude},${this.longitude}`

            
            linkToSiteInfo.appendChild(name)
            this.element.append(linkToSiteInfo, linkToLocation)
            // this.fish.forEach(fish => this.listFishingSpot(fish, fishUl))
                
            return this.element
        // }
    }
    
    // listFishingSpot(fish, ul){
    //     const fishLi = document.createElement('li')
    //     fishLi.innerText = fish.species
    //     ul.appendChild(fishLi)
    // }

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