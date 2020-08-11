const baseUrl = 'http://localhost:3000/dogs'

document.addEventListener('DOMContentLoaded', () => {
  //Dome Ele
  const tableBody = document.querySelector('#table-body')
  const form = document.querySelector('#dog-form')
  //Initialize
  fetch(baseUrl)
  .then( r => r.json())
  .then(dogsArr => {
    dogsArr.forEach(dogObj => {
      renderDogTable(dogObj)
    });
  })    
  
  //Event Listener

  // tableBody.addEventListener('click', e => {
  //   if(e.target.tagName === "BUTTON"){
  //     console.log(e.target.closest('tr').dataset.id)
  //   }
  //   // console.log(e.target.tagName)
  // })

  form.addEventListener('submit', e => {
    e.preventDefault()
    const editedDogObj = {}
    editedDogObj.name = form.name.value 
    editedDogObj.breed = form.breed.value  
    editedDogObj.sex = form.sex.value 
    const dogId = form.dataset.id
    
    patchRequest(dogId, editedDogObj)
  })

  //Render helper

  function renderDogTable(dogObj){
    const dogTRow = document.createElement('tr')
    dogTRow.dataset.id = dogObj.id
    dogTRow.innerHTML = `
      <td name='name'>${dogObj.name}</td> 
      <td >${dogObj.breed}</td> 
      <td >${dogObj.sex}</td> 
      <td >
        <button>Edit</button>
      </td>
    `
    // editBtnEvent(dogObj,dogTRow)
    const editBtn = dogTRow.querySelector('button')
    editBtn.addEventListener('click', e => {
      populateForm(dogObj)
    })
    tableBody.append(dogTRow)
  }

  // function editBtnEvent(dogObj,dogTRow) {
  //   const editBtn = dogTRow.querySelector('button')
  //   editBtn.addEventListener('click', e => {
  //     populateForm(dogObj)
  //   })

  // }

  function populateForm(dogObj) {
    form.name.value = dogObj.name
    form.breed.value = dogObj.breed
    form.sex.value = dogObj.sex
    form.dataset.id = dogObj.id
  }

  function patchRequest(dogId, dogObj) {
    fetch(baseUrl+`/${dogId}`, {
        method : "PATCH",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(dogObj)
      })
      .then( r => r.json())
      .then(updateDog)
    
  }



  //after updating why does not chagned value get nested in
  //<font style="vertical-align: inherit;">/font>

  function updateDog(dogObj) {
    
    const updatedDogRow = document.querySelector(`tr[data-id='${dogObj.id}']`)
    updatedDogRow.innerHTML = `
      <td>${dogObj.name}</td> 
      <td>${dogObj.breed}</td> 
      <td>${dogObj.sex}</td> 
      <td>
        <button>Edit</button>
      </td>
    `
    const editBtn = dogTRow.querySelector('button')
    editBtn.addEventListener('click', e => {
      populateForm(dogObj)
    })
    
  }

})







// dogsArr => {
//   dogsArr.forEach(dogObj => {
//     renderDogTable(dogObj)
//   }

/* <tr>
  <td>Dog *Name*</td> 
  <td>*Dog Breed*</td> 
  <td>*Dog Sex*</td> 
  <td>
    <button>Edit</button>
  </td>
</tr> */