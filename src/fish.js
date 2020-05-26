class Fish {
    
    constructor(id, species, description, is_active, image, fishingSpots) {
        this.id = id
        this.species = species
        this.description = description
        this.is_active = is_active
        this.image = image
        this.fishingSpots = fishingSpots
        this.element = document.createElement('card')
    }


    renderFish() {
        // create card and put user title, username, and review content on it
        if(this.is_active){
            // create card and put user name/username on it
            this.element.className = 'card'
            const speciesP = document.createElement('p')
            speciesP.innerText = this.species
            speciesP.dataset.id = this.id
            const fishImg = document.createElement('img')
            fishImg.src = this.image
            const descP = document.createElement('ul')
            descP.innerText = this.description
            const spotsUl = document.createElement('ul')
            spotsUl.innerText = "Locations:"
            
            this.element.append(speciesP, fishImg, descP, spotsUl)
            this.fishingSpots.forEach(fishingSpot => this.listFishingSpot(fishingSpot, spotsUl))
                
            return this.element
        }
    }
    
    listFishingSpot(fishingSpot, ul){
        const spotLi = document.createElement('li')
        spotLi.innerText = fishingSpot.name
        ul.appendChild(spotLi)
    }

}

function addNewFish(fish){
    fetch(FISH_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            species: fish.species,
            description: fish.description,
            is_active: true,
            image: fish.image
        })
    })
    .then(res => res.json())
    .then(res => console.log(res))
}

function modifyFish(id, params){
    fetch(FISH_URL + id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    })
    .then(res => res.json())
    .then(res => console.log(res))
}

function deleteFish(id){
    fetch(FISH_URL + id, {method: "DELETE"})
    .then(res => res.json())
    .then(res => console.log(res))
}