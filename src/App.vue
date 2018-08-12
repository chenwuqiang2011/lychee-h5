<template>
  <div id="app">
      <router-view></router-view>
  
    <keep-alive>
      <!-- <router-view></router-view> -->
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
  import api from './api/api.js';
  export default {
    name: 'App',
    created () {
      this.getToken();
      // console.log(com.getToken())
      //在页面加载时读取localStorage里的状态信息；正式环境时更改此设置；
      // localStorage.getItem("lycheeMsg") && this.$store.replaceState(JSON.parse(localStorage.getItem("lycheeMsg")));

      //开发阶段会出现新增state变量，不能更新到loacalStorage;可以使用下面的方法；
      localStorage.getItem("lycheeMsg") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("lycheeMsg")))); 
      //在页面刷新时将vuex里的信息保存到localStorage里
      window.addEventListener("beforeunload",()=>{
        localStorage.setItem("lycheeMsg",JSON.stringify(this.$store.state))
      })
    },
    methods: {
      getToken () {
        var option = {
          authAppId: 'PK9toXlIdbLoJLq7',
          authAppSecret: '6jsniGLm22HTYuS0cTvcP1fzQcysH1pQ',
          openId:'oVa7_0JOeScNLuMZSHrn4bkvx1U4'//获取用户openId
          // contentType: 'application/json'
        };

        //判断是否过期再请求
        api.getToken(option).then(res => {
          if (res.data.errcode == 1) {
            var token = localStorage.getItem('lycheeToken');
            if(token) {
              token = JSON.parse(localStorage.getItem('lycheeToken'));
            } else {
              token = res.data.auth;
              localStorage.setItem('lycheeToken', JSON.stringify(res.data.auth));
              //设置超时时间；
              
            }
              var tokenInfo = res.data.auth;
              try {
                  localStorage.getItem("lycheeToken")
              } catch (e) {
              }
          } else {
              console.log('错误提示：', res.data.errmsg)
          }
        })
      }
    }
  }
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
}

/*点击事件去除阴影*/
*{ 
-webkit-tap-highlight-color: rgba(0,0,0,0);
-webkit-tap-highlight-color: transparent; /* For some Androids */ }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  width: 100%;
  height: 100%;
  max-width: 768px;
  /*margin-top: 60px;*/
}
</style>
