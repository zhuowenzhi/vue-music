<template>
  <div id="register">
      <h1>欢迎注册</h1>
      <Register></Register>
      <button class="btn-login" type="button" @click="()=>{this.$router.push('/login')}">登录</button>
  </div>
</template>

<script>
import Register from '../components/Register.vue'
export default {
  name: 'RegisterPage',
  components: {
    Register
  },
  created: function () {
    this.$emit('public_audio', false);
  }
}
</script>
<style lang="scss">
#register {
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
