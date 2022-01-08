let addToy = false;
let addBtn = document.querySelector("#new-toy-btn");
let toyFormContainer = document.querySelector(".container");
let toyCollect = document.querySelector('#toy-collection')

document.addEventListener("DOMContentLoaded", () => {
  toyCollection()
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  toyFormContainer.addEventListener('submit', (e) => {
    e.preventDefault()
    newToyAdd(e.target.name.value, e.target.image.value)
  })
});


function toyCollection() {
  return fetch('http://localhost:3000/toys')
    .then(data => data.json())
    .then(data => {
      console.log(data)
      data.forEach(object => {
        renderToys(object)
      })

    })
}

function renderToys(toy) {
  let newToy = document.createElement('div')
  newToy.innerHTML = `
  <h2> ${toy.name} </h2>
  <img src=${toy.image} class='toy-avatar'>
  <p>${toy.likes} </p>
  <button class='like-btn' id=${toy.id}>Like</button>
  `
  newToy.querySelector('.like-btn').addEventListener('click', () => {
    toy.likes+= 1
    newToy.querySelector('p').textContent = toy.likes
    updateLike(toy)
  })
  toyCollect.append(newToy)
}



function newToyAdd(name, url) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      "name": name,
      "image": url,
      "likes": 0
    })
  })
    .then(resp => resp.json())
    .then(data => renderToys(data))
}

function updateLike(newNumberOfLikes) {
  fetch(`http://localhost:3000/toys/${newNumberOfLikes.id}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  body: JSON.stringify({
    'likes': newNumberOfLikes.likes
  })
})
.then(resp => resp.json())
.then(data => console.log(data))
}
