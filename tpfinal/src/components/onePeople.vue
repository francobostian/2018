  <template>
  <div>
    <div v-if="!error">
      <div v-if="loading">
        <loader></loader>
      </div>
      <div>
        <el-card>
          <span>
            <h4>{{people.name}}</h4>Birth place:
            <br>
            <label for v-if="!ready">
              loading
              <i class="el-icon-loading"></i>
            </label>
            <label for v-else>
              <strong>{{homeworld.name}}</strong>
            </label>

            <br>
            <br>
            {{people.name}} appear in the following movies:
          </span>
        </el-card>

        <label for v-if="!ready">
          loading
          <i class="el-icon-loading"></i>
        </label>
        <div v-else>
          <el-table v-if="films.length" :data="films">
            <el-table-column prop="title" label="title" width="180"></el-table-column>
            <el-table-column prop="director" label="director" width="180"></el-table-column>
            <el-table-column prop="producer" label="producer"></el-table-column>
            <el-table-column prop="release_date" label="release_date"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div v-if="error">
      <rTwo></rTwo>
    </div>
  </div>
</template>

  <script>
import urls from "../configuration/urls.js";
import loader from "./loader.vue";
import rTwo from "./rTwo.vue";

export default {
  name: "OnePeople",
  components: {
    loader,
    rTwo
  },
  data() {
    return {
      people: Object,
      homeworld: Object,
      films: [],
      loading: true,
      error: false,
      ready: false
    };
  },
  computed: {},
  created() {
    const route = this.$route.params.id;
    //console.log(route)
    this.$http
      .get(urls.baseInfoSearch + "people/" + route + "/")
      .then(response => {
        this.error = false;
        this.loading = false;
        this.people = response.data;
        this.films = this.setArrayFilms(response.data.films);

        this.$http
          .get(this.people.homeworld)
          .then(response => {
            this.homeworld = response.data;
            this.ready = true;
          })

          .catch(error => {
            this.loading = false;
            this.error = true;
          });
      })
      .catch(error => {
        this.loading = false;
        this.error = true;
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