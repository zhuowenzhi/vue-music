<template>
  <div id="login">
      <h1>欢迎登录</h1>
      <!-- <Login></Login> -->
        <el-form ref="form" :rules="rules" :model="form" label-width="80px">
          <el-form-item prop="name">
            <el-input v-model="form.name" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="verifycode">
            <!-- 注意：prop与input绑定的值一定要一致，否则验证规则中的value会报undefined，因为value即为绑定的input输入值 -->
            <el-input v-model="form.verifycode" placeholder="请输入验证码" class="identifyinput"></el-input>
          </el-form-item>

          <el-form-item>
            <div class="identifybox">
              <div @click="refreshCode">
                <Verification :identifyCode="identifyCode"></Verification>
              </div>
              <el-button @click="refreshCode" type='text' class="textbtn">看不清，换一张</el-button>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button class="login" type="primary" @click="login()">登录</el-button>
          </el-form-item>
        </el-form>
      <button class="btn-login" type="button" @click="()=>{this.$router.push('/register')}">注册</button>
  </div>
</template>

<script>
// import Login from '../components/Login.vue'
import Verification from '../components/Verification.vue'
export default {
  name: 'LoginPage',
  components: {
    // Login,
    Verification
  },
   data () {
    return {
      form: {
        name: '',
        password: '',
        verifycode: ''
      },
      identifyCodes: '1234567890',
      identifyCode: '',
      rules: {
        password: [
          {
            required: true,
            trigger: 'blur'
          },
          {
            min: 6,
            max: 11,
            message: '请输入6~11位',
            trigger: 'blur'
          }
        ],
        verifycode: [
          {
            required: true,
            trigger: 'blur'
          }
        ]
      }
    }
  },
   mounted: function () {
    this.refreshCode()
  },
  created: function () {
    this.$emit('public_audio', false)
  },
  methods: {
    login () {
      var _this = this
      if ( _this.form.name && _this.form.password) {
        _this.$router.push({ name: 'home' })
          _this.$axios.get(_this.baseUrl + 'user/login/', {
        params: {
          userName: _this.form.name,
          password: _this.form.password
        }
        }).then(function (res) {
          _this.$emit('public_audio', true)
          _this.$cookieStore.setCookie( 'userId' , res.data.payload,9999999960)
          _this.$cookieStore.setCookie( 'name' ,_this.form.name,9999999960)
          _this.$cookieStore.setCookie( 'password' ,_this.form.password,9999999960)
          _this.$cookieStore.setCookie( 'address' ,_this.form.address,9999999960)
          _this.$router.push('/')
         
        }).catch(function (error) {
          console.log(error)
        })
      }else if (_this.form.name) {
        _this.$message('昵称不能为空')
      } else if (_this.form.password === '') {
        _this.$message('密码不能为空')
      } else if (_this.identifyCode != _this.form.verifycode) {
        _this.$message('验证码错误')
      } else {
        _this.$message('请检查用户名或者密码是否正确')
      }
    },

    // 生成随机数
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },

    // 切换验证码
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    // 随机生成验证码
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
      console.log(this.identifyCode)
    }
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
.login {
  width: 100%;
}
.identifybox {
    display: flex;
}
.textbtn {
    height: 38px;
}
</style>
