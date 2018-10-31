
<template>
  <section id="tabla-personas">
   
  
<!--
      <section class="row">
      <label class="" style="margin-left:300px;">genero filter </label>
      <select id="filtro_genero"  class="" v-model="gender_filter">
        <option value="" selected>Todos</option>
        <option value="Varon">Varon</option>
        <option value="Mujer">Mujer</option>
      </select>
    </section>
    -->
    <h3>Filtro por sexo</h3>
     <el-select v-model="gender_filter" placeholder="Select" id="select">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
     </el-select>





<el-table v-if="people.length" :data="people">
      <el-table-column prop="nombre" label="Nombre" width="180">
      </el-table-column>
      <el-table-column prop="genero" label="Sexo" width="180">
      </el-table-column>
      <el-table-column prop="edad" label="Edad">
      </el-table-column>
      <el-table-column label="Operaciones">
        <template slot-scope="scope">
          <el-button type=primary @click="updatePerson(scope.row.id)"><i class="el-icon-edit"></i></el-button>
          <el-button type=primary @click="deletePerson(scope.row.id)"><i class="el-icon-delete"></i></el-button>
        </template>
      </el-table-column>
    </el-table>
<p v-else>Lista vacía</p>
  </section>
</template>




<script>
import { Person } from "./../objects.js";
import PersonService from "@/services/personService";
import router from "../router.js";

export default {
  name: "tablePerson",
  data() {
    return {
      people: [],
      gender_filter: "",
      options: [
        {
          value: "Hombre",
          label: "Hombre"
        },
        {
          value: "Mujer",
          label: "Mujer"
        },
        {
          value: "",
          label: "Sin filtro"
        }
      ]
    };
  },
  /*
  computed: {
    
    filtrar_personas() {
      let listReturn = this.list_persons;
      if (this.personas_filtro !== "" && this.personas_filtro!=='Todos') {
        listReturn = this.list_persons.filter(
          people => person.genero === this.personas_filtro
        );
      }
      return listReturn;
    }
  },
  */

  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    deletePerson(id) {
      // this.$emit('eliminar_person', key)
      PersonService.delete(id);
      PersonService.getAll().then(people => {
        this.people = people;
      });
    },
    updatePerson(id) {
      router.push({
        name: "update",
        params: {
          id: id
        }
      });
    }
  },
  watch: {
    gender_filter() {
      PersonService.getByGender(this.gender_filter).then(people => {
        this.people = people;
      });
    }
  },
  created() {
    PersonService.getAll().then(people => {
      this.people = people;
    });
  }
};
</script>
<style>
h3 {
}
#select {
  margin-bottom: 20px;
}
</style>
