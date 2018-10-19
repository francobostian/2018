

<template>
    
<section id="form-person"  @keyup.enter="submitForm()">

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
 
  <button @click="submitForm()" class="button-primary">Agregar</button>
</section>
</template>

<script>
import { Person } from "./../objects.js";
import PersonService from "@/services/personService";

export default {
  name: "FormPerson",
  data() {
    return {
     
      nombre: "",
      edad: 0,
      genero: ""
    };
  },
  methods: {
    submitForm() {
      if (
        this.nombre !== "" &&
       this.edad>=0 &&
       this.edad<=110 &&
        this.genero !== ""

      ) {
        console.log(this.edad)
        let person;
        person = new Person(
          ++this.id_counter,
          this.nombre,
          this.edad,
          this.genero
        );
        PersonService.create(person)
      //  this.$emit("putPerson", person);
      }
    }
  }
};
</script>