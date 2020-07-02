// DOM elements
const tableBody = document.querySelector('#table-body')
const dogForm = document.querySelector('#dog-form')

// Event listener
dogForm.addEventListener('submit', event => {
  event.preventDefault()
  
  const newDogObj = {
    name: event.target.name.value,
    breed: event.target.breed.value,
    sex: event.target.sex.value
  }
  const dogId = event.target.dataset.id
  updateDog(dogId, newDogObj)
  .then(updatedDog => {
    const dogRow = document.querySelector(`tr[data-id="${dogId}"]`)
    dogRow.innerHTML = ` 
      <td>${updatedDog.name}</td> 
      <td>${updatedDog.breed}</td> 
      <td>${updatedDog.sex}</td> 
      <td>
        <button>Edit</button>
      </td> `
  })
})

// Render Helpers
function populateForm(dog) {
  dogForm.name.value = dog.name
  dogForm.breed.value = dog.breed
  dogForm.sex.value = dog.sex

  // give the form information about which dog we're editing
  dogForm.dataset.id = dog.id
}

function renderDogRow(dog) {
  const dogRow = document.createElement('tr')
  dogRow.dataset.id = dog.id
  dogRow.innerHTML = ` 
    <td>${dog.name}</td> 
    <td>${dog.breed}</td> 
    <td>${dog.sex}</td> 
    <td>
      <button>Edit</button>
    </td> `

    const dogButton = dogRow.querySelector('button')
    dogButton.addEventListener('click', event => {
      populateForm(dog)
    })
  
  tableBody.append(dogRow)
}

function renderAllDogs(dogs) {
  dogs.forEach(renderDogRow)
}

// Initial Fetch & Render
getAllDogs().then(renderAllDogs)