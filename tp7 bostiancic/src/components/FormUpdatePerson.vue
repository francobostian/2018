
  <template>
      
  <section id="form-person"  @keyup.enter="submitForm()">

    

    <div class="form-group">
      <label for="nombre">Nombre: </label>
      <input type="text" class="form-control" name="nombre" id="nombre" placeholder="ingrese nombre"  v-model.trim="nombre">

    </div>
    <div class="form-group" id="edad">
      <label for="edad">edad: </label>
      <input type="number" class="form-control" name="edad" id="edad" placeholder="edad" v-model.number="edad">
    </div>
    
    <el-radio-group v-model="genero" id="radio">
  <el-radio  name="genero" id="genero" value="Varon" label="Hombre">Hombre</el-radio>
    <el-radio  name="genero" id="genero" value="Mujer" label="Mujer">Mujer</el-radio>
    
  </el-radio-group>

        <div v-if="arrError.length" v-for="error in arrError" :key="error">
              <br>{{ error }}
          </div>
  <br>
    <el-button @click="submitForm()" type="success">Modificar</el-button>
  </section>
  </template>

  <script>
  import { Person } from "./../objects.js"
  import PersonService from "@/services/personService"
  import router from '../router.js'

  export default {
    name: "FormPerson",
    data() {
      return {
        id:0,
        nombre: "",
        edad: 0,
        genero: "1",
        arrError: []
      }
    },
    methods: {
      submitForm() {
        this.arrError = [];
        if (this.nombre == "") {
          this.arrError.push("error en nombre");
        }
        if(this.edad<=0 || this.edad>=110){
            this.arrError.push("error en edad");
        }
        if(this.genero == "1"){
            this.arrError.push("error en genero");
        }
        if(this.arrError.length == 0){
          let person;
          person = new Person(this.id, this.nombre, this.edad, this.genero);
          PersonService.update(person);
          router.push("/list");
        }
      }
    },
    created () {
      PersonService.getOne(this.$route.params.id)
        .then( (person) => {
          this.id = person.id
          this.nombre = person.nombre
          this.edad = person.edad
          this.genero = person.genero
          
        })
        
    }
  };
  </script>
  <style>
    .form-group {
      
      margin-bottom: 10px;
      float: none;
        }

    #radio{
      margin-bottom: 10px;
    }
    #edad{
      margin-left: 11px;
    }
  </style>