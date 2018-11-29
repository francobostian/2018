<template>
  <div>
    <div v-if="!error">
      <div v-if="loading">
        <loader></loader>
      </div>
      <div v-if="!loading">
        <el-table v-if="starships.length" :data="starships">
          <el-table-column prop="name" label="Nombre" width="180"></el-table-column>
          <el-table-column prop="model" label="model" width="180"></el-table-column>
          <el-table-column prop="manufacturer" label="manufacturer"></el-table-column>
          <el-table-column prop="cost_in_credits" label="cost_in_credits"></el-table-column>
          <el-table-column prop="length" label="length"></el-table-column>
          <el-table-column prop="max_atmosphering_speed" label="max_atmosphering_speed"></el-table-column>
        </el-table>
        <p v-else>Empty List</p>

        <el-button type="primary" @click="getStarships(1)" round><</el-button>
        <a v-for="page in pages">
          <el-button type="info" @click="getStarships(page)" circle>{{ page }}</el-button>
        </a>
        <el-button type="primary" @click="getStarships(numberOfPages)" round>></el-button>
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
      error: false,
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
    this.getStarships(1);
  }
};
</script>
