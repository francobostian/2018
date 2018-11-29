<template>
  <div>
    <div v-if="!error">
      <div v-if="loading">
        <loader></loader>
      </div>
      <div v-if="!loading">
        <el-table v-if="allPeople.length" :data="allPeople">
          <el-table-column prop="name" label="Name" width="180"></el-table-column>
          <el-table-column prop="gender" label="Sex" width="180"></el-table-column>
          <el-table-column prop="mass" label="Mass"></el-table-column>
          <el-table-column prop="hair_color" label="Hair color"></el-table-column>
          <el-table-column prop="birth_year" label="Born"></el-table-column>

          <el-table-column label="+ Info">
            <template slot-scope="scope">
              <el-button type="primary" @click="getId(scope.row.url)">
                <i class>More info</i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <p v-else>Empty List</p>

        <el-button type="primary" @click="getPeople(1)" round><</el-button>
        <a v-for="page in pages">
          <el-button type="info" @click="getPeople(page)" circle>{{ page }}</el-button>
        </a>
        <el-button type="primary" @click="getPeople(numberOfPages)" round>></el-button>
      </div>
    </div>
    <div v-if="error">
      <rTwo></rTwo>
    </div>
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
      loading: true,
      error: false
    };
  },
  computed: {},
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
          this.error = false;
          this.loading = false;
          this.allPeople = response.data.results;
          this.numberOfPages = Math.ceil(response.data.count / 10);
          this.makeArrayPages();
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
    this.getPeople(1);
  }
};
</script>