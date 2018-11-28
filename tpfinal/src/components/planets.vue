<template>
  <div>
    <div v-if="loading">
      <loader></loader>
    </div>
    <el-table v-if="planets.length" :data="planets">
      <el-table-column prop="name" label="Nombre" width="180"></el-table-column>
      <el-table-column prop="rotation_period" label="rotation_period" width="180"></el-table-column>
      <el-table-column prop="orbital_period" label="orbital_period"></el-table-column>
      <el-table-column prop="diameter" label="diameter"></el-table-column>
      <el-table-column prop="climate" label="climate"></el-table-column>
      <el-table-column prop="gravity" label="gravity"></el-table-column>
      <el-table-column label="En q peli aparece?">
        <template slot-scope="scope">
          <el-button type="primary" @click="getId(scope.row.url)">
            <i class></i>ver mas
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <p v-else>Lista vacía</p>

    <el-button type="primary" @click="getPlanets(1)" round>First</el-button>

    <a v-for="page in pages">
      <a type="success" @click="getPlanets(page)" round>{{ page }}</a>
    </a>

    <el-button type="success" @click="getPlanets(numberOfPages)" round>Last</el-button>

    
  </div>
</template>

<script>
import urls from "../configuration/urls.js";
import router from "../utils/router.js";
import loader from "./loader.vue";
import atat from "./atatwalker.vue";
export default {
  name: "Planets",
  components: {
    loader,
    atat
  },
  data() {
    return {
      planets: [],
      pages: [],
      numberOfPages: 0,
      loading: true
    };
  },
  computed: {},
  methods: {
    initializer() {
      this.pages = [];
      this.planets = [];
      this.numberOfPages = 0;
    },
    getId(url) {
      //console.log("asdadsad"+id)
      let urlArr = url.split("/");
      let id = urlArr[5];
      //console.log("asdadsad"+id)
      router.push({
        name: "onePlanet",
        params: {
          id: id
        }
      });
    },
    getPlanets(index) {
      this.loading = true;
      this.initializer();
      this.$http
        .get(urls.baseInfoSearch + "planets/?page=" + index)
        .then(response => {
          this.numberOfPages = Math.ceil(response.data.count / 10);
          this.makeArrayPages();
          this.planets = response.data.results;
          this.loading = false;
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
    this.getPlanets(1);
  }
};
</script>
