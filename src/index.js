const tableBody = document.querySelector("#table-body")
const dogForm = document.querySelector("#dog-form")

dogForm.addEventListener('submit', e => {
    e.preventDefault()

    const updateDog = {
    name: e.target.name.value,
    breed: e.target.breed.value,
    sex: e.target.sex.value
    }
    updateDog(e.target.dataset.id, updateDog).then(console.log)

})

function populateDogForm(dog) {
    dogForm.name.value = dog.name
    dogForm.breed.value = dog.breed
    dogForm.sex.value = dog.sex

    dogForm.dataset.id = dog.id
}

function renderDogRow(dog) {
    const dogRow = document.createElement("tr")
    dogRow.innerHTML = `
    <td>${dog.name}</td> 
    <td>${dog.breed}</td> 
    <td>${dog.sex}</td> 
    <td><button>Edit</button></td>
    `
    const button = dogRow.querySelector("button")
    button.addEventListener('click',() => {
        populateDogForm(dog)
    })

    tableBody.append(dogRow)
}


function renderAllDogs(dogs) {
    dogs.forEach(renderDogRow)
}


getAllDogs().then(renderAllDogs)

