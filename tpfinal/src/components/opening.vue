<template>
<div>
	<div class="space layer1"></div>
<div class="space layer2"></div>
<div class="space layer3"></div>
<div class="wrapper">
  <div class="sphere">
        <div class="circle equator"></div>
    <div class="circle tropic cancer"></div>
    <div class="circle tropic capricorn"></div> 
    <div class="weapon"></div>
  </div>
</div>
<div class="planet"></div>
</div>
</template>

<script>
	export default {
		name: 'opening'
	}
</script>

<style scoped>
html {
  background-color:#000;
  overflow:hidden;
}

.space {
  animation:reverse-spin 30s infinite linear;
  bottom:0;
  content:"";
  left:-50%;
  position:absolute;
  right:-50%;
  top:0;
}

.layer1 {
  transform:translateZ(1000px);
}

.layer2 {
  transform:translateZ(500px);
}

.layer3 {
  transform:translateZ(250px);
}

.wrapper {
  margin: 100px;
  perspective: 1000px;
  perspective-origin: 50%;
}

.sphere {
  animation: spin 30s infinite linear;
  height:200px;
  margin: 0 auto;
  position: relative;
  transform-style: preserve-3d;
  width: 200px;
}

.sphere:before {
  animation: reverse-spin 30s infinite linear;
  background-image:linear-gradient(#ccc, #333);
  border-radius:50%;
  content:"";
  height:200px;
  left:0;
  position:absolute;
  top:0;
  width:200px;
}

.sphere:after {
  animation: reverse-spin 30s infinite linear;
  border-top:solid 3px #333;
  content:"";
  height:50%;
  left:0;
  position:absolute;
  right:0;
  top:50%;
  width:100%;
  z-index:1;
}

.sphere .circle {
  border:solid 2px #333;
  border-radius:50%;
  box-sizing:border-box;
  height: 200px;
  left:0;
  opacity:.5;
  position: absolute;
  top:0;
  width: 200px;
}

/* .sphere .equator {
  transform:rotateX(90deg);
}

.sphere .tropic {
  border-width:8px;
  height:172px;
  margin:14px;
  width:172px;
}

.sphere .cancer {
  transform: translateY(-50px) rotateX(90deg);
}

.sphere .capricorn {
  transform: translateY(50px) rotateX(90deg);
} */

.sphere .weapon {
  background-image:linear-gradient(#333, #ccc);
  border-radius:50%;
  height:40px;
  left:50px;
  position:absolute;
  top:40px;
  transform:translateZ(88px) rotateX(12deg);
  width:40px;
}

.sphere .weapon:before {
  background-color:#666;
  border-radius:50%;
  content:"";
  height:5px;
  left:18px;
  position:absolute;
  top:18px;
  width:5px;
}

@keyframes spin {
  0% {
    transform:rotateY(-20deg);
  }
  50% {
    transform:rotateY(60deg);
  }
  100% {
    transform:rotateY(-20deg);
  }
}

@keyframes reverse-spin {
  0% {
    transform:rotateY(20deg);
  }
  50% {
    transform:rotateY(-60deg);
  }
  100% {
    transform:rotateY(20deg);
  }
}

.star {
  background-color:#fff;
  border-radius:50%;
  height:2px;
  position:absolute;
  width:2px;
  z-index:-1;
}

.planet {
  background-color:#cde;
  border-top-left-radius:50%;
  border-top-right-radius:50%;
  bottom:0;
  box-shadow:-20px 0 20px 30px #def;
  height:20px;
  left:0;
  position:absolute;
  right:0;
}
</style>
<script>
var slices = 8,
  angle = 360 / slices,
  sphere = document.querySelector('.sphere');
for (var i = 0; i < (slices - 1); i++) {
  var slice = document.createElement('div');
  slice.className = 'circle';
  slice.style.transform = 'rotateY(' + angle * i + 'deg)';
  sphere.appendChild(slice);
}

var stars = 100,
  vh = window.innerHeight,
  vw = window.innerWidth;

function randomStar(selector) {
  var star = document.createElement('div');
  star.className = 'star';
  star.style.left = Math.floor((Math.random() * vw * 2) - 20) + 'px';
  star.style.top = Math.floor(Math.random() * (vh - 40) + 20) + 'px';
  document.querySelector(selector).appendChild(star);
}
for (var i = 0; i < stars; i++) {
  randomStar('.layer1');
  randomStar('.layer2');
  randomStar('.layer3');
}
</script>
