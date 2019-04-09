<template>

  <el-form ref="form" :rules="rules" :model="form" label-width="80px">

    <!-- <el-form-item  prop="phone">
      <el-input v-model="form.phone" maxlength="11" placeholder="手机号码"></el-input>
    </el-form-item> -->
     <el-form-item  prop="sex">
      <el-radio v-model="form.sex" label="1">男</el-radio>
      <el-radio v-model="form.sex" label="0">女</el-radio>
    </el-form-item>

     <el-form-item  prop="name">
      <el-input v-model="form.name" maxlength="11" placeholder="输入昵称"></el-input>
    </el-form-item>

    
     <el-form-item  prop="address">
      <el-input v-model="form.address" placeholder="地址(如广东湛江)"></el-input>
    </el-form-item>

<!--     
     <el-form-item  prop="sex">
      <el-input v-model="form.sex" maxlength="1" placeholder="性别"></el-input>
    </el-form-item> -->
   
 
     <el-form-item prop="password">
      <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input type="password" v-model="form.passwordRepeat" placeholder="确认密码"></el-input>
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
      <el-button class="login" type="primary" @click="register()">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Verification from './Verification.vue'
export default {
  name: 'Register',
  components: {
    Verification
  },
  data () {
    return {
      form: {
        // phone: '',
        password: '',
        passwordRepeat: '',
        name: '',
        address: '',
        sex: '1'
      },
      identifyCodes: '1234567890',
      identifyCode: '',
      // verifycode: '',
       rules: {
        phone: [
          {
            required: true,
            trigger: 'blur'
          },
          { 
            min: 11, 
            max: 11,
            message: '请输入电话号码(11位)', 
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
          },
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
    // 用户注册请求接口
    register () {
      var _this = this
      if (_this.form.name === '') {
        _this.$message('昵称不能为空')
      } else if (_this.form.address === '') {
        _this.$message('地址不能为空')
      } else if (_this.form.password === '') {
        _this.$message('密码不能为空')
      } else if (_this.form.password !== _this.form.passwordRepeat) {
        _this.$message('两次输入的密码不一致')
      } else if (_this.identifyCode !== _this.form.verifycode) {
        _this.$message('验证码错误')
      } else {
        _this.$axios.get(_this.baseUrl + 'user/createUser/', {
        params: {
          name: _this.form.name,
          password: _this.form.password,
          address: _this.form.address,
          sex: _this.form.sex,
          picUrl:'123'
        }
        }).then(function (res) {
            // localStorage.setItem('name', _this.form.name)
            // localStorage.setItem('userId', res.data.payload)
            // localStorage.setItem('password', _this.form.password)
            if (res.data.code != "1") {
              alert(res.data.msg)
            } else {
              alert(res.data.msg)
              _this.$router.push('/login')
            }
            
        }).catch(function (error) {
          console.log(error)
        })
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
