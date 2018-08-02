<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- <spinner v-show="false"></spinner> -->
  </div>
</template>

<script>
  //移动端单位转换；
  // var deviceWidth = document.documentElement.clientWidth;   
  // document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
  // //1rem=100px  就是所有的css属性的属性值都是用rem来表示
  // console.log(deviceWidth/7.5);

  export default {
    name: 'App'
  }
</script>

<style>
/*body, html {
  max-width: 768px;
  height: 100%;
  margin: 0 auto;
}*/
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  max-width: 768px;
  /*margin-top: 60px;*/
}
</style>
