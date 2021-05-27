let dogTable = document.querySelector('#table-body')
let dogInput = document.querySelector('#dog-form')

document.addEventListener('DOMContentLoaded', () => {
    getDogs()
})
document.addEventListener('submit', (e) => {
    e.preventDefault()
    getNewData(e.target)
})

function getDogs(){
    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(data => data.forEach(renderDog))
}
function renderDog(dogObj){
    let dogRow = document.createElement('tr')
    let dogName = document.createElement('td')
    let dogBreed = document.createElement('td')
    let dogSex = document.createElement('td')
    let editBtn = document.createElement('button')

    editBtn.addEventListener("click", (e) =>{
        e.preventDefault()
        getFormData(e.target)
    })

    dogName.textContent = dogObj.name
    dogName.className = "name"
    dogBreed.textContent = dogObj.breed
    dogBreed.className = "breed"
    dogSex.textContent = dogObj.sex
    dogSex.className = "sex"
    editBtn.textContent = "click me"
    dogRow.id = dogObj.id

    dogTable.append(dogRow)
    dogRow.append(dogName, dogBreed, dogSex, editBtn)
}

function getFormData(clickData){
    //console.log(clickData.parentNode.id)
    let id = clickData.parentNode.id
    let updateName = dogInput.name.value
    let updateBreed = dogInput.breed.value
    let updateSex = dogInput.sex.value

    let updateDog = {
        id: id,
        name: updateName,
        breed: updateBreed,
        sex: updateSex
    }
    patchDog(updateDog)
}

function patchDog(dogObj){
    fetch(`http://localhost:3000/dogs/${dogObj.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dogObj)
    })
    .then(res => res.json())
    .then(data => editDog(data))
}

function editDog(dogObj){
    let editId = document.getElementById(`${dogObj.id}`)
    editId.querySelector('.name').textContent = dogObj.name
    editId.querySelector('.breed').textContent = dogObj.breed
    editId.querySelector('.sex').textContent = dogObj.sex
}

function getNewData(clickData){
    let newName = dogInput.name.value
    let newBreed = dogInput.breed.value
    let newSex = dogInput.sex.value

    let newDog = {
        name: newName,
        breed: newBreed,
        sex: newSex
    }
    postDog(newDog)
}

function postDog(dogObj){
    fetch(`http://localhost:3000/dogs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dogObj)
    })
    .then(res => res.json())
    .then(data => renderDog(data))
}
