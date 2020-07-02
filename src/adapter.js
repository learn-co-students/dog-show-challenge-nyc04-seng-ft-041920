const baseURL = "http://localhost:3000/dogs"

function getAllDogs() {
  return fetch(baseURL).then(resp => resp.json())
}

function updateDog(dogId, newDogObj) {
  return fetch(baseURL + `/${dogId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newDogObj)
    })
    .then(resp => resp.json())  
}
