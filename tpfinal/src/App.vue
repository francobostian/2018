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
          <el-menu-item index="/login">
           SWAPI
          </el-menu-item>
          <el-menu-item @click="logout">Logout</el-menu-item>
          <el-menu-item v-if="$store.state.token" index="/people">People</el-menu-item>
          <el-menu-item v-if="$store.state.token" index="/planets">Planets</el-menu-item>
          <el-menu-item v-if="$store.state.token" index="/starships">Starships</el-menu-item>
          <!-- <el-menu-item index="/login">Login</el-menu-item> -->
          
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

</style>
