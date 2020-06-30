document.addEventListener('DOMContentLoaded', () => {
    const dogForm = document.querySelector('#dog-form');
    let currentEdit = null
    let initialDogObj = null
    fetch('http://localhost:3000/dogs').then(resp => resp.json()).then(json => {
        initialDogObj = json;
        renderDogs(json)
    })


    function renderDogs(dogsObj) {
        console.log(dogsObj)
        const table = document.querySelector("#table-body");
        dogsObj.forEach(dog => {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');
            const btn = document.createElement('button');
            tr.dataset.id = dog.id
            td.innerHTML = dog.name;
            td2.innerHTML = dog.breed;
            td3.innerHTML = dog.sex;
            btn.innerHTML = 'Edit';
            tr.append(td)
            tr.append(td2)
            tr.append(td3)
            tr.append(btn)
            table.append(tr)
            addBtnListener(btn, dog.name, dog.breed, dog.sex)
        });

    }


    function addBtnListener(btn, name, breed, sex) {
        btn.addEventListener('click', (e) => {
            dogForm.name.value = name;
            dogForm.breed.value = breed;
            dogForm.sex.value = sex;
            currentEdit = name;

        })
    }

    dogForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const breed = e.target.breed.value
        const sex = e.target.sex.value
        const dogId = findDog(currentEdit)
        dogInfo = {
            id: dogId,
            name: name,
            breed: breed,
            sex: sex
        }
        addDog(dogInfo)
        updateDom(dogInfo)
    })

    function updateDom(dogInfo) {
        const dogData = document.querySelectorAll("#table-body tr")
        let obj = initialDogObj.find(o => o.id === dogInfo.id)
        dogData.forEach(dog => {
            if (parseInt(obj.id) === parseInt(dog.dataset.id)) {
                dog.children[0].innerText = dogInfo.name
                dog.children[1].innerText = dogInfo.breed
                dog.children[2].innerText = dogInfo.sex
            }
        })
    }


    function findDog(name) {
        let dogId = null
        const dogNames = document.querySelectorAll("#table-body tr td");
        dogNames.forEach(dog => {
            if (dog.innerText === name) {

                dogId = dog.parentElement.dataset.id;
            }
        })
        return parseInt(dogId)
    }

    function addDog(dogInfo) {
        const fetchData = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dogInfo)
        }
        fetch(`http://localhost:3000/dogs/${dogInfo.id}`, fetchData)
            .then(resp => resp.json()).then([renderDogs])
    }
})

