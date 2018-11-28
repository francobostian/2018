<template>
  <div>
    <div v-if="loading">
      <loader></loader>
    </div>

    <el-table v-if="starships.length" :data="starships">
      <el-table-column prop="name" label="Nombre" width="180"></el-table-column>
      <el-table-column prop="model" label="model" width="180"></el-table-column>
      <el-table-column prop="manufacturer" label="manufacturer"></el-table-column>
      <el-table-column prop="cost_in_credits" label="cost_in_credits"></el-table-column>
      <el-table-column prop="length" label="length"></el-table-column>
      <el-table-column prop="max_atmosphering_speed" label="max_atmosphering_speed"></el-table-column>
    </el-table>
    <p v-else>Lista vacía</p>

    <el-button type="primary" @click="getStarships(1)" round>Anterior</el-button>
    <a v-for="page in pages">
      <a type="success" @click="getStarships(page)" round>{{ page }}</a>
    </a>
    <el-button type="success" @click="getStarships(numberOfPages)" round>Siguiente</el-button>
    
  </div>
</template>

<script>
import urls from "../configuration/urls.js";
import router from "../utils/router.js";
import atat from "./atatwalker.vue";
import loader from "./loader.vue";

export default {
  name: "Starships",
  components: {
    atat,
    loader
  },
  data() {
    return {
      starships: [],
      numberOfPages: 0,
      loading: true,
      pages: []
    };
  },
  computed: {},
  methods: {
    initializer() {
      this.pages = [];
      this.numberOfPages = 0;
      this.starships = [];
    },

    getStarships(index) {
      this.loading = true;
      this.initializer();
      this.$http
        .get(urls.baseInfoSearch + "starships/?page=" + index)
        .then(response => {
          this.numberOfPages = Math.ceil(response.data.count / 10);
          this.makeArrayPages();
          this.starships = response.data.results;
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
    this.getStarships(1);
  }
};
</script>
