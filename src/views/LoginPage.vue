<template>
  <div id="login">
      <h1>欢迎登录</h1>
      <Login></Login>
      <button class="btn-login" type="button" @click="()=>{this.$router.push('/register')}">注册</button>
  </div>
</template>

<script>
import Login from '../components/Login.vue'
export default {
  name: 'LoginPage',
  components: {
    Login
  },
  created: function () {
    this.$emit('public_audio', false);
  }
}
</script>
<style lang="scss">
#login {
  width: 500px;
  margin: 200px auto 0;
  text-align: center;
  border: 1px #ccc solid;
  padding-right: 80px;
  border-radius: 10px;
}
h1 {
  margin: 20px 0 20px 80px;
}
.btn-login {
  border: none;
  color: #409eff;
  background-color: #fff;
  display: block;
  text-align: right;
  width: 100%;
  margin: 20px 0;

}
</style>
