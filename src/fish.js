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
            cardBody.className = "card-body"

            const speciesTitle = document.createElement('h5')
            speciesTitle.innerText = this.species
            speciesTitle.dataset.id = this.id
            speciesTitle.className = "card-title"
            
            // <button data-toggle="collapse" data-target="#demo">Collapsible</button>
            // <div id="demo" class="collapse">
            // Lorem ipsum dolor text....
            // </div>
            const btnDiv = document.createElement("div")
            const descBtn = document.createElement("button")
            descBtn.classList.add('btn')
            descBtn.classList.add('btn-primary')
            descBtn.dataset.toggle="modal"
            descBtn.dataset.target=`#infoModal`
            descBtn.innerText = "Description"
            descBtn.addEventListener("click",()=>this.fillOutModal())
            btnDiv.appendChild(descBtn)
            
            const descDiv = document.createElement('div')
            descDiv.className = "collapse"
            descDiv.id = `fish${this.id}`

            const descP = document.createElement("p")
            descP.innerText = this.description

            const spotsUl = document.createElement('ul')
            spotsUl.innerText = "Locations:"
            
            descDiv.append(descP, spotsUl)
            cardBody.append(speciesTitle, btnDiv, descDiv)
            this.element.append(fishImg, cardBody)
            this.fishingSpots.forEach(fishingSpot => this.listFishingSpot(fishingSpot, spotsUl))

            return this.element
        }
    }

    fillOutModal(){
        const body = document.querySelector("#infoModalBody")
        const header = document.querySelector("#infoModalTitle")
        const submit = document.querySelector("#infoModalSubmit")

        //hide submit button
        submit.setAttribute("style", "display:none")

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
        
        this.fishingSpots.forEach(fishingSpot => this.listFishingSpot(fishingSpot, spotsUl))
        body.append(fishImg, fishDesc, spotsUl)
    }
    
    listFishingSpot(fishingSpot, p){
        const spotLi = document.createElement('li')
        spotLi.innerText = fishingSpot.name
        p.appendChild(spotLi)
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