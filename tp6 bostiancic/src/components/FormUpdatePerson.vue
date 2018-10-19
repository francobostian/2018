
<template>
    
<section id="form-person"  @keyup.enter="submitForm()">

    <div class="form-group">
        <label for="id">ID: </label>
        <input type="number" id="id" name="id"  v-model.trim="id">
    </div>

  <div class="form-group">
    <label for="nombre">Nombre</label>
    <input type="text" class="form-control" name="nombre" id="nombre" placeholder="ingrese nombre"  v-model.trim="nombre">

  </div>
  <div class="form-group">
    <label for="edad">edad</label>
    <input type="number" class="form-control" name="edad" id="edad" placeholder="edad" v-model.number="edad">
  </div>
   
   
  <div class="">
  <input class="form-check-input" type="radio" name="genero" id="genero" value="Varon" v-model="genero">
  <label class="form-check-label" for="gen">
    varon
  </label>
</div>
<div class="">
  <input class="form-check-input" type="radio" name="genero" id="genero" value="Mujer" v-model="genero">
  <label class="form-check-label" for="gen">
    mujer
  </label>
</div>
       <div v-if="arrError.length" v-for="error in arrError" :key="error">
            <br>{{ error }}
        </div>

  <button @click="submitForm()" class="button-primary">Update</button>
</section>
</template>

<script>
import { Person } from "./../objects.js"
import PersonService from "@/services/personService"
import router from '../router.js'

export default {
  name: "FormPerson",
  data() {
    return {
      id:0,
      nombre: "",
      edad: 0,
      genero: "",
      arrError: []
    }
  },
  methods: {
    submitForm() {
      this.arrError = [];
      if (this.nombre == "") {
        this.arrError.push("error en nombre");
      }
      if(this.edad<=0 || this.edad>=110){
          this.arrError.push("error en edad");
      }
      if(this.genero == ""){
          this.arrError.push("error en genero");
      }
      if(this.arrError.length == 0){
        let person;
        person = new Person(this.id, this.nombre, this.edad, this.genero);
        PersonService.update(person);
        router.push("/list");
      }
    }
  },
  created () {
    PersonService.getOne(this.$route.params.id)
      .then( (person) => {
        this.id = person.id
        this.nombre = person.nombre
        this.edad = person.edad
        this.genero = person.genero
        
      })
      
  }
};
</script>