class Fish {
    
    constructor(id, species, description, is_active, image, fishingSpots) {
        this.id = id
        this.species = species
        this.description = description
        this.is_active = is_active
        this.image = image
        this.fishingSpots = fishingSpots
        this.element = document.createElement('div')
    }

    renderFish() {
        // create card and put user title, username, and review content on it
        if(this.is_active){
            // create card and put user name/username on it
            this.element.classList.add('card')
            this.element.classList.add("h-100")

            const fishImg = document.createElement('img')
            fishImg.src = this.image
            fishImg.className = "card-img-top"

            const cardBody = document.createElement("div")
            cardBody.classList.add("card-body")
            cardBody.classList.add("d-flex")
            cardBody.classList.add("flex-column")

            const speciesTitle = document.createElement('h5')
            speciesTitle.innerText = this.species
            speciesTitle.dataset.id = this.id
            speciesTitle.className = "card-title"
            
            // <button data-toggle="collapse" data-target="#demo">Collapsible</button>
            // <div id="demo" class="collapse">
            // Lorem ipsum dolor text....
            // </div>
            const btnDiv = document.createElement("div")
            btnDiv.className = "mt-auto"
            const descBtn = document.createElement("button")
            descBtn.classList.add('btn')
            descBtn.classList.add('btn-primary')
            descBtn.dataset.toggle="modal"
            descBtn.dataset.target=`#infoModal`
            descBtn.innerText = "Description"
            descBtn.addEventListener("click",()=>this.fillOutShowModal())
            btnDiv.appendChild(descBtn)

            const spotsUl = document.createElement('ul')
            spotsUl.innerText = "Locations:"
            
            cardBody.append(speciesTitle, btnDiv)
            this.element.append(fishImg, cardBody)
            this.fishingSpots.forEach(fishingSpot => this.listFishingSpot(fishingSpot, spotsUl))

            return this.element
        }
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

        header.innerHTML = this.species

        const fishImg = document.createElement('img')
        fishImg.src = this.image
        fishImg.className = "img-fluid"

        const fishDesc = document.createElement('p')
        fishDesc.innerText = this.description

        const spotsUl = document.createElement('p')
        spotsUl.innerText = "Locations:"

        const editBtn = document.createElement('button')
        descBtn.classList.add('btn')
        descBtn.classList.add('btn-warning')
        descBtn.addEventListener("click",()=>this.fillOutEditModal())
        
        this.fishingSpots.forEach(fishingSpot => this.listFishingSpot(fishingSpot, spotsUl))
        body.append(fishImg, fishDesc, spotsUl, editBtn)
    }

    fillOutEditModal(){
        const body = document.querySelector("#infoModalBody")
        const header = document.querySelector("#infoModalTitle")
        const close = document.querySelector("#infoModalClose")

        //show close button in case it is hidden submit button
        close.setAttribute("style", "display:block")

        //clear any old info
        while(body.lastChild){
            body.removeChild(body.lastChild)
        }
    }
    
    listFishingSpot(fishingSpot, p){
        const spotLi = document.createElement('li')
        spotLi.innerText = fishingSpot.name
        p.appendChild(spotLi)
    }

}

function fetchFish(id=''){
    return fetch(FISH_URL + id)
        .then(res => res.json())
        .then(json => {
            FISH = json
            return FISH
        })
}

function renderFish(fish){
    fish.forEach((fish) => {
        const newFish = new Fish(fish.id, fish.species, fish.description, fish.is_active, fish.image, fish.fishing_spots)
        const card = newFish.renderFish()
        rendersCard(card)
    })
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