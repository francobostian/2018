<template>
  <div id="app">
    <el-container>
      <el-header>
     
        <el-menu
          :router="true"
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">
            <a href="/">SWAPI</a>
          </el-menu-item>
          <!--
    <el-menu-item index="2"><a href="/add" >Add User</a></el-menu-item>
    <el-menu-item index="7"><a href="/list" >list</a></el-menu-item>
    <el-menu-item index="8"><a href="/register" >register</a></el-menu-item>
   
          <el-menu-item index="3"><a href="/list">List</a></el-menu-item>-->
          <el-menu-item index="/people">People</el-menu-item>
          <el-menu-item index="/planets">Planets</el-menu-item>
          <el-menu-item index="/starships">Starships</el-menu-item>
          <el-menu-item @click="logout">Logout</el-menu-item>
        </el-menu>
      </el-header>

      <div class="line"></div>
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
    return {
      activeIndex: "1",
      activeIndex2: "1",
      fecha: new Date()
        .toLocaleDateString()
        .replace("/", "-")
        .replace("/", "-")
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      //console.log(key, keyPath);
    },
    logout() {
      this.$store.commit("removeToken");
      this.$router.push("/login");
    }
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
