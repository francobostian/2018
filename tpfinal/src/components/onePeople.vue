  <template>
    
    <div>
        <div v-if="loading">
          <loader></loader>
        </div>
      <el-card><span>
      <h4>	{{people.name}} </h4>
        
        Lugar de Nacimiento: 
      <label for="">{{homeworld.name}}</label>	      
      <br>
      <br>
        {{people.name}} aparece en las siguientes peliculas:
        </span></el-card>
      
      <el-table v-if="films.length" :data="films">
        <el-table-column prop="title" label="title" width="180">
        </el-table-column>
        <el-table-column prop="director" label="director" width="180">
        </el-table-column>
        <el-table-column prop="producer" label="producer">
        </el-table-column>
        <el-table-column prop="release_date" label="release_date">
        </el-table-column>
      </el-table>
      
    </div>
  </template>

  <script>
  import urls from "../configuration/urls.js";
  import loader from './loader.vue';
  export default {
    name: "OnePeople",
    components: {
      loader
    },
    data() {
      return {
        people: Object,
        homeworld: Object,
        films:[],
        loading: true,
      };
    },
    computed: {},
    created() {
      const route = this.$route.params.id;
      //console.log(route)
      this.$http
        .get(urls.baseInfoSearch + "people/" + route + "/")
        .then(response => {
          this.loading = false;
          this.people = response.data;
          this.films = this.setArrayFilms(response.data.films);

          this.$http
            .get(this.people.homeworld)
            .then(response => (this.homeworld = response.data))
            .catch(error => {
              this.loading = false;
            });

          
        })
        .catch(error => {
          this.loading = false;
        });
    },
    methods:{
      setArrayFilms(array){
          let self = this;
          let auxArray = [];
          array.forEach((element)=>{
            self.$http.get(element)
              .then((response) => {
                auxArray.push({
                  title: response.data.title,
                  director: response.data.director,
                  producer: response.data.producer,
                  release_date: response.data.release_date,
                  url: response.data.url
                });
              })
              .catch((error) => {
                auxArray.push("Error loading data.");
              });
          });
          return auxArray;
        }
    }
  };
  </script>