import { User } from './../objects.js'

let users = []
let lastId = 0

function mapper (array) {
    return array.map(element => new User(element.nombre, element.email, element.password, element.id))
  }

  function getStorage() {

    if (window.localStorage.getItem("users")) {
      users = mapper(JSON.parse(window.localStorage.getItem("users")))
      lastId = parseInt(window.localStorage.getItem('lastId'), 10)
    } else {
      users = []
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
          res(users)
        }, Math.random() * 2000 + 500)
      })
    },
    create(user) {
  
      user.id = ++lastId
      users.push(user)
      setStorage('users', users)
      setStorage('lastId', lastId)
    },
  
    getOne(id) {
      return new Promise((resolve, reject) => {
        setTimeout(
          () => {
            getStorage()
            resolve(users.find(user => user.id === id))
          }, Math.random() * 2000 + 500)
      })
    },
  }
  