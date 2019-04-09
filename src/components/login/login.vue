<template>
  <el-form ref="form" :rules="rules" :model="form" label-width="80px">
    <!-- <el-form-item prop="phone">
      <el-input v-model="form.phone" maxlength="11" placeholder="手机号码"></el-input>
    </el-form-item> -->
    <el-form-item prop="name">
      <el-input v-model="form.name" placeholder="请输入昵称"></el-input>
    </el-form-item>
     <el-form-item prop="password">
      <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
    </el-form-item>
     <el-form-item prop="verifycode">
      <!-- 注意：prop与input绑定的值一定要一致，否则验证规则中的value会报undefined，因为value即为绑定的input输入值 -->
      <el-input v-model="verifycode" placeholder="请输入验证码" class="identifyinput"></el-input>
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
</template>

<script>
import Verification from './Verification.vue'
export default {
  name: 'Login',
  components: {
    Verification
  },
  props: {
    msg: String
  },
  data () {
    return {
      form: {
        // phone: '',
        name: '',
        password: '',
        verifycode: ''
      },
      identifyCodes: '1234567890',
      identifyCode: '',
      verifycode: '',
      rules: {
        phone: [
          {
            required: true,
            trigger: 'blur'
          },
          {
            min: 11,
            max: 11,
            message: '请输入11位数字',
            trigger: 'blur'
          },
          {
            pattern: /^1[34578]\d{9}$/,
            message: '请输入正确的电话号码'
          }
        ],
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
  methods: {
    login () {
      var _this = this
      if (_this.$cookieStore.getCookie('name') === this.form.name && _this.$cookieStore.getCookie('password') === this.form.password) {
        this.$router.push({ name: 'home' })
          _this.$axios.get(_this.baseUrl + 'user/login/', {
        params: {
          userName: _this.form.name,
          password: _this.form.password,
          userId: _this.$cookieStore.getCookie('userId')
        }
        }).then(function (res) {
          _this.$router.push('/')
        }).catch(function (error) {
          console.log(error)
        })
      }else if (this.form.name === '') {
        this.$message('昵称不能为空')
        console.log(" _this.$cookieStore" + userId)
      } else if (this.form.password === '') {
        this.$message('密码不能为空')
      } else if (this.identifyCode !== this.verifycode) {
        this.$message('验证码错误')
      } else {
        this.$message('请检查用户名或者密码是否正确')
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

<style lang="scss" scoped>
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
