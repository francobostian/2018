<template>
  <div>
    <div v-if="!error">
      <div v-if="loading">
        <loader></loader>
      </div>
      <div v-if="!loading">
        <el-table v-if="planets.length" :data="planets">
          <el-table-column prop="name" label="Nombre" width="180"></el-table-column>
          <el-table-column prop="rotation_period" label="rotation_period" width="180"></el-table-column>
          <el-table-column prop="orbital_period" label="orbital_period"></el-table-column>
          <el-table-column prop="diameter" label="diameter"></el-table-column>
          <el-table-column prop="climate" label="climate"></el-table-column>
          <el-table-column prop="gravity" label="gravity"></el-table-column>
          <el-table-column label="Films starring">
            <template slot-scope="scope">
              <el-button type="primary" @click="getId(scope.row.url)">
                <i class>See More</i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <p v-else>Empty List</p>

        <el-button type="primary" @click="getPlanets(1)" round><</el-button>
        <a v-for="page in pages">
          <el-button type="info" @click="getPlanets(page)" circle>{{ page }}</el-button>
        </a>
        <el-button type="primary" @click="getPlanets(numberOfPages)" round>></el-button>
      </div>
    </div>
    <div v-if="error">
      <atat></atat>
    </div>
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
      loading: true,
      error: false
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
          this.error = false;
        })
        .catch(error => {
          this.loading = false;
          this.error = true;
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
