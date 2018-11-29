<template>
  <div class="login">
    <label for>Ingrese nombre:</label>
    <el-input type="text" placeholder="nombre" v-model="user" style="width:200px;"></el-input>
    <br>
    <br>
    <label for>Ingrese Password:</label>
    <el-input type="password" placeholder="pass" v-model="password" style="width:200px;"></el-input>
    <br>
    <br>
    <el-button type="primary" @click="login" round>Login</el-button>
    <br>
    <br>

    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">

    <div id="starwars" class="animate">
      <p class="intro mobileIntro">A long time ago, in a galaxy far, far away...</p>
      <img
        src="http://vignette1.wikia.nocookie.net/disney/images/8/8b/Starwars-logo.png"
        class="logo"
      >
      <div id="reel">
        <div class="content">
          <h1 class="episodeNumber">Avanzada 2</h1>
          <h2 class="episodeTitle">Hola!</h2>
          <p class="episodeOpeningCrawl"></p>
        </div>
      </div>
      <div></div>
      <audio
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/244725/MainTitle.ogg"
        onloadeddata="var audioPlayer = this; setTimeout(function() { audioPlayer.play(); }, 4500)"
      ></audio>
    </div>
  </div>
</template>
<script>
import authService from "@/services/AuthService.js";
import rTwo from "./rTwo.vue";

export default {
  name: "login",
  components: {
    rTwo
  },
  data() {
    return {
      user: "",
      password: ""
    };
  },
  methods: {
    login() {
      authService
        .login(this.user, this.password)
        .then(token => {
          this.$store.commit("setToken", token);
          this.$router.push({ name: "people" });
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<style>
/* BEGINNING TEXT */
#starwars {
  background-image: url(https://i.ytimg.com/vi/JquobII5VjA/maxresdefault.jpg);
  position: relative;
  height: 600px;
  width: 100%;
}
.animate .intro {
  font-size: 250%;
  color: #19a3c8;
  width: 578px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: intro 5s linear 0s;
  opacity: 0;
}
.animate .logo {
  position: absolute;
  width: 0;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: logo 10s linear 5s;
  opacity: 0;
}
.animate #reel {
  width: 1200px;
  margin-left: -589px;
  position: absolute;
  bottom: 0;
  left: 50%;
  height: 100em;
  overflow: hidden;
  transform: perspective(255px) rotateX(30deg);
  transform-origin: 50% 100%;
  color: #ffec01;
  font-weight: bold;
  font-size: 400%;
  text-align: justify;
}
.animate #reel div {
  position: absolute;
  top: 100%;
  animation: reel 53s linear 12s;
}
.animate #reel div p {
  line-height: 1.5em;
  margin-top: 50px;
}
.animate #reel div p:first-child {
  margin-top: 0;
}
.animate #reel div h1,
.animate #reel div h2 {
  text-align: center;
  margin-bottom: 25px;
}
.animate button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
  background: none;
  border: 0;
  font-weight: bold;
  color: #ffec01;
  opacity: 1;
  cursor: pointer;
  animation: reset 66s linear;
}
@keyframes reel {
  0% {
    top: 100%;
    opacity: 1;
  }
  95% {
    opacity: 1;
  }
  100% {
    top: 50%;
    opacity: 0;
  }
}
@keyframes intro {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes logo {
  0% {
    width: 300px;
    opacity: 1;
  }
  10% {
    width: 300px;
    opacity: 1;
  }
  15% {
    width: 300px;
  }
  90% {
    width: 10px;
    opacity: 1;
  }
  100% {
    width: 0;
    opacity: 0;
  }
}
@keyframes reset {
  0% {
    opacity: 0;
    cursor: default;
  }
  99% {
    opacity: 0;
    cursor: default;
  }
  100% {
    opacity: 1;
    display: block;
  }
}

/* TABLET */
@media screen and (max-width: 768px) {
  .tabletId {
    font-size: 18px !important;
  }
  .tabletTitle {
    font-size: 20px !important;
  }
  .tabletDirector {
    font-size: 16px !important;
  }
  .tabletProducer {
    font-size: 14px !important;
  }
  .tabletDate {
    font-size: 12px !important;
  }
  .mobileIntro {
    padding-left: 40px;
    font-size: 30px !important;
  }
  .filmComponents {
    padding-left: 70px;
    padding-right: 70px;
    text-align: center;
    margin-bottom: 25px;
  }
}
</style>