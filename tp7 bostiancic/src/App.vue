<template>
  <div id="app">
    <el-container>
      <el-header>
        <div id="nav">
          <router-link to="/">Agregar</router-link> |
          <router-link to="/list">Listar</router-link> |
        
        </div>
      </el-header>
        <el-main>
         <router-view/>
        </el-main>
    </el-container>
  
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  }
};
</script>


<style>
#app {
  /*
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
  */
  text-align: center;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
