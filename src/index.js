document.addEventListener("DOMContentLoaded", function() {
    fetchDogs();
})

let allDogs = ""

function fetchDogs() {
    fetch("http://localhost:3000/dogs")
    .then(function(res) {
        return res.json();
    })
    .then(function(json) {
        allDogs = json
        allDogs.forEach(function(dogObject){ renderDog(dogObject)})
    })
}

function renderDog(dogObj) {
    const dogTable = document.querySelector("#table-body")
    const tableRow = document.createElement("tr")
    tableRow.innerHTML = `
        <td>${dogObj.name}</td>
        <td>${dogObj.breed}</td>
        <td>${dogObj.sex}</td>
        <td><button>Edit</button></td>`
    dogTable.append(tableRow)
    const editButton = tableRow.querySelector("button")
    editButton.addEventListener("click", function(e) {
        populateEditOnClick(dogObj)
    })
}

function populateEditOnClick(dogObj) {
    const editForm = document.querySelector("#dog-form")
    editForm.name.value = `${dogObj.name}`
    editForm.breed.value = `${dogObj.breed}`
    editForm.sex.value = `${dogObj.sex}`

    editForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const patchObj = {
            "name": editForm.name.value,
            "breed": editForm.breed.value,
            "sex": editForm.sex.value
        }

        submitEditForm(patchObj, dogObj)
    })
}

function submitEditForm(patchObj, dogObj) {
    patchRequest(patchObj, dogObj)
    clearDogs()
    fetchDogs()
}

function patchRequest(patchObj, dogObj) {
    const configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(patchObj)
      }
      fetch(`http://localhost:3000/dogs/${dogObj.id}`, configObj)
      .then(function(res) {
        return res.json();
      })
      .then(function(obj) {
        console.log(obj)
      })
}

function clearDogs () {
    const dogTable = document.querySelector("#table-body");
    dogTable.innerHTML = ""
}

