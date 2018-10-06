<style>
</style>

<template>
  <section id="tabla-personas">
    <header>
      <h2>People list</h2>
      <section class="row">
      <label class="" style="margin-left:300px;">genero filter </label>
      <select id="filtro_genero"  class="" v-model="personas_filtro">
        <option value="" selected>Todos</option>
        <option value="Varon">Varon</option>
        <option value="Mujer">Mujer</option>
      </select>
    </section>
    </header>
           

   <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Edad</th>
      <th scope="col">Sexo</th>
      <th scope="col">Borrar</th>
    </tr>
  </thead>
  <tbody>
        <tr v-for="(person, key) in filtrar_personas" :key="key">
          <td> {{ person.id }} </td>
          <td> {{ person.nombre }} </td>
          <td> {{ person.edad }} </td>
          <td> {{ person.genero }} </td>
          <td> <button @click="eliminarPersona(key)">X</button> </td>
        </tr>
      </tbody>
</table>
  </section>
</template>

<script>
export default {
  nombre: "tablaPersonas",
  props: {
    list_persons: Array,
    personas_filtro: ""
  },
  data() {
    return {};
  },
  computed: {
    filtrar_personas() {
      let listReturn = this.list_persons;
      if (this.personas_filtro !== "" && this.personas_filtro!=='Todos') {
        listReturn = this.list_persons.filter(
          person => person.genero === this.personas_filtro
        );
      }
      return listReturn;
    }
  },
  methods: {
    eliminarPersona (key) {
      this.$emit('eliminar_person', key)
    }
  }
};
</script>
