<template>
  <div>
    <div v-if="loading">
      <loader></loader>
    </div>

    {{planet.name}} aparece en las siguientes peliculas:
    <el-table v-if="films.length" :data="films">
      <el-table-column prop="title" label="title" width="180"></el-table-column>
      <el-table-column prop="director" label="director" width="180"></el-table-column>
      <el-table-column prop="producer" label="producer"></el-table-column>
      <el-table-column prop="release_date" label="release_date"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import urls from "../configuration/urls.js";
import loader from "./loader.vue";

export default {
  name: "OnePlanet",
  components: {
    loader
  },
  data() {
    return {
      planet: Object,
      films: [],
      loading: true
    };
  },
  computed: {},
  created() {
    const route = this.$route.params.id;
    console.log(route);
    this.$http
      .get(urls.baseInfoSearch + "planets/" + route + "/")
      .then(response => {
        this.loading = false;
        this.planet = response.data;
        this.films = this.setArrayFilms(response.data.films);
        console
          .log(this.people.films)

          .catch(error => {
            this.loading = false;
          });
      })
      .catch(error => {
        this.loading = false;
      });
  },
  methods: {
    setArrayFilms(array) {
      let self = this;
      let auxArray = [];
      array.forEach(element => {
        self.$http
          .get(element)
          .then(response => {
            auxArray.push({
              title: response.data.title,
              director: response.data.director,
              producer: response.data.producer,
              release_date: response.data.release_date,
              url: response.data.url
            });
          })
          .catch(error => {
            auxArray.push("Error loading data.");
          });
      });
      return auxArray;
    }
  }
};
</script>