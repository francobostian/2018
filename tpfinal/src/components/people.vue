<template>
  <div>
    <div v-if="loading">
      <loader></loader>
    </div>

    <el-table v-if="allPeople.length" :data="allPeople">
      <el-table-column prop="name" label="Nombre" width="180"></el-table-column>
      <el-table-column prop="gender" label="Sexo" width="180"></el-table-column>
      <el-table-column prop="mass" label="Masa"></el-table-column>
      <el-table-column prop="hair_color" label="color de pelo"></el-table-column>
      <el-table-column prop="birth_year" label="nacimiento"></el-table-column>

      <el-table-column label="+ informacion">
        <template slot-scope="scope">
          <el-button type="primary" @click="getId(scope.row.url)">
            <i class>Mas info</i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <p v-else>Lista vacía</p>

    <el-button type="primary" @click="getPeople(1)" round>Anterior</el-button>
    <a v-for="page in pages">
      <a type="success" @click="getPeople(page)" round>{{ page }}</a>
    </a>
    <el-button type="success" @click="getPeople(numberOfPages)" round>Siguiente</el-button>

    <rTwo></rTwo>
   
  </div>
</template>

<script>
import urls from "../configuration/urls.js";
import router from "../utils/router.js";
import loader from "./loader.vue";
import rTwo from "./rTwo.vue";
import atat from "./atatwalker.vue";
export default {
  name: "People",
  components: {
    loader,
    rTwo,
    atat
  },
  data() {
    return {
      pages: [],
      allPeople: [],
      numberOfPages: 0,
      loading: true
    };
  },
  methods: {
    initializer() {
      this.pages = [];
      this.allPeople = [];
      this.numberOfPages = 0;
    },
    getId(url) {
      let urlArr = url.split("/");
      let id = urlArr[5];
      router.push({
        name: "onePeople",
        params: {
          id: id
        }
      });
    },
    getPeople(index) {
      this.loading = true;
      this.initializer();
      this.$http
        .get(urls.baseInfoSearch + "people/?page=" + index)
        .then(response => {
          this.loading = false;
          this.allPeople = response.data.results;
          this.numberOfPages = Math.ceil(response.data.count / 10);
          this.makeArrayPages();
        })
        .catch(error => {
          this.loading = false;
        });
    },
    makeArrayPages() {
      for (let i = 1; i <= this.numberOfPages; i++) {
        this.pages.push(i);
      }
    }
  },
  mounted() {
    this.getPeople(1);
  }
};
</script>