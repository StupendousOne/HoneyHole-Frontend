class Fish {
    
    constructor(fish) {
        this.id = fish.id
        this.species = fish.species
        this.description = fish.description
        this.is_active = fish.is_active
        this.image = fish.image
        this.fishingSpots = fish.fishing_spots
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

        const spotSpan = document.createElement('span')
        spotSpan.innerText = "Locations:"
        const spotBr = document.createElement('br')

        const spotsP = document.createElement('p')
        this.fishingSpots.forEach(( fishingSpot ) => this.listFishingSpot(fishingSpot, spotsP))
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
        deleteBtn.addEventListener("click",()=>{
            FISH.forEach(fish => {
                if(fish.id == this.id)
                    fish.is_active = false
            })
            this.deleteFish()
            clearMainContainer()
            if(CURRENT_PAGE == "fish"){
                renderFish(FISH)
            } else if (CURRENT_PAGE == "spots") {
                FISHING_SPOTS.forEach(spot => {
                    spot.fish.forEach(fish => {
                        if (this.id == fish.id){
                            fish.is_active = false
                        }
                    })
                })
                renderFishingSpots(FISHING_SPOTS)
            }
            
        })
        
        body.append(fishImg, fishDesc, spotSpan, spotBr, spotsP, editBtn, deleteBtn)
    }

    fillOutEditModal(){
        const body = document.querySelector("#infoModalBody")
        const header = document.querySelector("#infoModalTitle")
        const close = document.querySelector("#infoModalClose")

        let isNewFish = false
        //check whether this is edit or new
        if(this.id){
            header.innerText = `Edit: ${this.species}`
        } else {
            header.innerText = `Create new Fish`
            isNewFish = true
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
        const speciesLabel = document.createElement("label")
        speciesLabel.htmlFor = "speciesField"
        speciesLabel.innerText = "Species: "

        const speciesField = document.createElement("input")
        speciesField.type = "text"
        speciesField.className = "form-control"
        speciesField.id = "speciesField"
        if(!isNewFish)
            speciesField.value = this.species
 
        //append label and field to form group
        formGroup1.append(speciesLabel, speciesField)

        // Description
        const descLabel = document.createElement("label")
        descLabel.htmlFor = "descField"
        descLabel.innerText = "Description: "

        const descField = document.createElement("input")
        descField.type = "text"
        descField.className = "form-control"
        descField.id = "descField"
        if(!isNewFish)
            descField.value = this.description

        //append label and field to form group
        formGroup1.append(descLabel, descField)

        // Image
        const imgLabel = document.createElement("label")
        imgLabel.htmlFor = "descField"
        imgLabel.innerText = "Image: "

        const imgField = document.createElement("input")
        imgField.type = "text"
        imgField.className = "form-control"
        imgField.id = "imgField"
        if(!isNewFish)
            imgField.value = this.image

        //append label and field to form group
        formGroup1.append(imgLabel, imgField)

        // spots
        const spotsLabel = document.createElement("label")
        spotsLabel.innerText = "Fish Location:"
        const spotUl = document.createElement('ul')

        let currentSpots

        if(!isNewFish){
            currentSpots = this.fishingSpots.map(fs => fs.id)
        } else {
            currentSpots = []
        }


        FISHING_SPOTS.forEach((spot) => {
            const spotLabel = document.createElement('label')
            spotLabel.innerText = spot.name
            const spotCheck = document.createElement('input')
            spotCheck.type = "checkbox"
            spotCheck.dataset.id = spot.id
            spotCheck.className = "fs"
            currentSpots.includes(spot.id) ? spotCheck.checked = true : spotCheck.checked = false
            const br1 = document.createElement('br')
            spotUl.append(spotCheck, spotLabel, br1)
        })

        formGroup1.append(spotsLabel, spotUl)

        const submitBtn = document.createElement("input")
        submitBtn.type = "submit"
        submitBtn.classList.add("btn")
        submitBtn.classList.add("btn-primary")
        submitBtn.innerText = "Submit"

        if(!isNewFish){
            body.addEventListener("submit", e => updateFish(e, this))
        } else {
            body.addEventListener("submit", e => addNewFish(e))
        }
        //append everything to form and form to body
        form.append(formGroup1, submitBtn)
        body.appendChild(form)
    }

    connectSpot(spotId){
        fetch(SPOT_FISH_URL,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fish_id: this.id,
                fishing_spot_id: spotId
            })
        })
            .then(res => res.json())
            .then(res => console.log(res))
    }

    removeSpot(id){
        fetch(SPOT_FISH_URL + id,{method:"DELETE"})
    }

    modifyFish(params){
        fetch(FISH_URL + this.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
        .then(res => res.json())
        .then(res => {
            this.fillOutShowModal()
        })
    }
    
    listFishingSpot(fishingSpot, p){
        const spotA = document.createElement('a')
        spotA.innerText = fishingSpot.name
        spotA.href = '#'
        spotA.addEventListener('click', (e) => {
            e.preventDefault()
            let full = FISHING_SPOTS.find(fs => fs.id == fishingSpot.id)
            const spotObj = new FishingSpot(full.id, full.name, full.longitude, full.latitude, full.image, full.image_small, full.public_access, full.user_id, full.site_info, full.is_active, full.fish, full.fish_spot, full.created_at, full.updated_at)
            spotObj.fillOutShowModal()
        })
        const spotBr = document.createElement('br')
        p.append(spotA, spotBr)
        return p
    }

    deleteFish(){
        fetch(FISH_URL + this.id, {method: "DELETE"})
        .then(res => res.json())
        .then(res => console.log(res))
    }
}

function updateFish(e, currentFish){
    e.preventDefault()
    const formSpots = Array.prototype.slice.call(e.target.querySelectorAll(".fs"))
    const formSpecies = e.target.querySelector("#speciesField").value
    const formDesc = e.target.querySelector("#descField").value
    const formImg = e.target.querySelector("#imgField").value

    const currentSpots = currentFish.fishingSpots.map(fs => fs.id)

    formSpots.forEach(spot => {
        if(spot.checked){
            if(!currentSpots.includes(parseInt(spot.dataset.id)))
                currentFish.fishingSpots.push(FISHING_SPOTS.find(fs => fs.id == spot.dataset.id))
                currentFish.connectSpot(spot.dataset.id)
        } else {
            if(currentSpots.includes(parseInt(spot.dataset.id))){
                currentFish.fishingSpots = currentFish.fishingSpots.filter(fs => fs.id != parseInt(spot.dataset.id))
                let fspot = FISHING_SPOTS.find(fs => fs.id == spot.dataset.id)
                let fishSpot = fspot.fish_spots.find(fs => fs.fish_id == currentFish.id)
                currentFish.removeSpot(fishSpot.id)
            }
        }
    })

    currentFish.modifyFish({species: formSpecies, description: formDesc, image: formImg})
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
        const newFish = new Fish(fish)
        const card = newFish.renderFish()
        rendersCard(card)
    })
}

function addNewFish(e){
    e.preventDefault()
    const formSpecies = e.target.querySelector("#speciesField").value
    const formDesc = e.target.querySelector("#descField").value
    const formImg = e.target.querySelector("#imgField").value

    fetch(FISH_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            species: formSpecies,
            description: formDesc,
            is_active: true,
            image: formImg
        })
    })
    .then(res => res.json())
    .then(fish => {
        console.log(fish)
        FISH.push(fish)
        newFish = new Fish(fish)
        newFish.fillOutShowModal()
    })
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

