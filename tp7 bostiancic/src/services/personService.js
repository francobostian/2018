import { Person } from './../objects.js'

let people = []
let lastId = 0

function mapper (array) {
  return array.map(element => new Person(element.id, element.nombre, element.edad, element.genero))
}

function getStorage() {

  if (window.localStorage.getItem("people")) {
    people = mapper(JSON.parse(window.localStorage.getItem("people")))
    lastId = parseInt(window.localStorage.getItem('lastId'), 10)
  } else {
    people = []
    lastId = 0
  }

}

function setStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export default {
  getAll() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        getStorage()
        res(people)
      }, Math.random() * 2000 + 500)
    })
  },
  create(person) {

    person.id = ++lastId
    people.push(person)
    setStorage('people', people)
    setStorage('lastId', lastId)
  },

  getByGender(gender) {
    return new Promise((resolve, reject) => {
      setTimeout(
        () => {
          getStorage()

          let peopleFilter = people
          if (gender !== '') {
            peopleFilter = peopleFilter.filter(person => person.genero === gender)
          }
          resolve(peopleFilter)
        }, 2000)
    })
  },
  delete(id) {
    getStorage()
    people = people.filter(person => person.id !== id)
    setStorage('people', people)
  },

  update(person) {
    getStorage()
    const key = people.findIndex(personArray => personArray.id === person.id)
    people.splice(key, 1, person)
    setStorage('people', people)
  },

  getOne(id) {
    return new Promise((resolve, reject) => {
      setTimeout(
        () => {
          getStorage()
          resolve(people.find(person => person.id === id))
        }, Math.random() * 2000 + 500)
    })
  },
}