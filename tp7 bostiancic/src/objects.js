function Person(id, nombre, edad, genero) {
  this.id = id
    this.nombre = nombre
    this.edad = edad
    this.genero = genero
}

/*class Person {
  constructor(id, nombre, edad, genero) {
    this._id = id
    this._nombre = nombre
    this._edad = edad
    this._genero = genero
  }
  
  get id() {
    return this._id
  }
  get nombre() {
    return this._nombre
  }
  get edad() {
    return this._edad
  }
  get genero() {
    return this._genero
  }

  set id(newId) {
    this._id = newId
  }
  set nombre(newNombre) {
    this._nombre = newNombre
  }
  set edad(newEdad) {
    this._edad = newEdad
  }
  set genero(newGenero) {
    this._genero = newGenero
  }
}*/
export {
  Person
} 