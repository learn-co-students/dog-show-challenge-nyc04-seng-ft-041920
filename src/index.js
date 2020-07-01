const table = document.querySelector("table")
const form = document.querySelector("form")

form.addEventListener('submit', e => {
  e.preventDefault();
  const dogData = {
    name: form.name.value,
    breed: form.breed.value,
    sex: form.sex.value
  }
  fetch(`http://localhost:3000/dogs/${form.dataset.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(dogData)
  }).then(updatedDog => {
    const dogRow = document.querySelector(`tr[data-id]=${form.dataset.id}`)
    dogRow.innerHTML = `
      <td>${updatedDog.name}</td>
      <td>${updatedDog.breed}</td>
      <td>${updatedDog.sex}</td>
      <td><button>Edit</button></td>
    `
  })

})

function getDogs() {
  return fetch('http://localhost:3000/dogs')
  .then(resp => resp.json())
}

function renderDog(dog) {
  const tableRow = document.createElement('tr')
  tableRow.dataset.id = dog.id
  tableRow.innerHTML = `
    <td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button>Edit</button></td>
  `
  table.appendChild(tableRow)

  const btn = tableRow.querySelector("button")
  btn.addEventListener('click', e => {
    doggieForm(dog)
  })
}

function renderAllDogs(dogs) {
  dogs.forEach(renderDog)
}

function doggieForm(dog) {
  form.name.value = dog.name
  form.breed.value = dog.breed
  form.sex.value = dog.sex
  form.dataset.id = dog.id
}


// pay attention to this syntax
getDogs().then(renderAllDogs)
