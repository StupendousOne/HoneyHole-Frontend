const BASE_URL = "http://localhost:3000/api/v1/"
const USER_URL = "http://localhost:3000/api/v1/users/"
const SPOT_URL = "http://localhost:3000/api/v1/fishing_spots/"
const REVIEW_URL = "http://localhost:3000/api/v1/reviews/"
const SPOT_FISH_URL = "http://localhost:3000/api/v1/fish_spots/"
const FISH_URL = BASE_URL + "fish/"

let USERS = []
let FISH = []
let CURRENT_USER
let FISHING_SPOTS = []
const MAIN_CONTAINER = document.querySelector('main')
USER_LINK = document.querySelector(".user-link")
SPOT_LINK = document.querySelector(".spots-link")
FISH_LINK = document.querySelector(".fish-link")
NEW_SPOT = document.querySelector(".new-spot")
NEW_FISH  = document.querySelector(".new-fish")

// counter to how many columns have been made in the current row(max 3 for our purposes)
// start column count maxed out so a new row is created instantly
let COLUMN_COUNT = 3
let CURRENT_ROW

init()

function init () {
    fetchUsers().then(userLogin())
    setUpLinks()
}

function setUpLinks(){
    USER_LINK.addEventListener("click", e => changeToUserView(e))
    FISH_LINK.addEventListener("click", e => changeToFishView(e))
    SPOT_LINK.addEventListener("click", e => changeToSpotView(e))
    NEW_FISH.addEventListener("click", e => changeToAddFish(e))
    NEW_SPOT.addEventListener("click", e => changeToAddSpot(e))
}

function activateLinks(){
    USER_LINK.classList.remove("disabled")
    FISH_LINK.classList.remove("disabled")
    SPOT_LINK.classList.remove("disabled")
    NEW_FISH.classList.remove("disabled")
    NEW_SPOT.classList.remove("disabled")
}

function changeToUserView(e){
    e.preventDefault()
    clearMainContainer()
    CURRENT_USER.renderUser()
}

function changeToFishView(e){
    e.preventDefault()
    clearMainContainer()
    fetchFish().then(res => renderFish(FISH))
}

function changeToSpotView(e){
    e.preventDefault()
    clearMainContainer()
    fetchFishingSpots().then(renderFishingSpots(FISHING_SPOTS))
}

function changeToAddFish(e){
    e.preventDefault()
    let newFish = new Fish({})
    newFish.fillOutEditModal()
}

function changeToAddSpot(e){
    e.preventDefault()
    let spot = new FishingSpot()
    spot.addEditModal(spot)
}

function rendersCard(card){
    if(card){
        if(COLUMN_COUNT < 3){
            // if row has less than three columns 
            // increment COLUMN_COUNT and create column
            COLUMN_COUNT++
            createColumn(card)
        } else {
            // if row is full create a new row 
            // then create a column and set column count to 1
            createRow()
            createColumn(card)
            COLUMN_COUNT = 1
        }
    }
}

function createColumn(card){
    let column = document.createElement("div")
    column.className = "col-lg-4"
    column.appendChild(card)
    CURRENT_ROW.appendChild(column)
}

function createRow(){
    CURRENT_ROW = document.createElement("div")
    CURRENT_ROW.classList.add("row")
    CURRENT_ROW.classList.add("mt-3")
    MAIN_CONTAINER.appendChild(CURRENT_ROW)
}

function clearMainContainer() {
    while (MAIN_CONTAINER.lastChild)
        MAIN_CONTAINER.removeChild(MAIN_CONTAINER.lastChild)
    COLUMN_COUNT = 10
}