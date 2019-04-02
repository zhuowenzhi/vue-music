<template>
  <div class="nav">
    <el-menu class="el-menu-demo" mode="horizontal">
      <el-menu-item class="title"><i class="el-icon-upload"></i>云音乐</el-menu-item>
       <el-menu-item index="1" @click="() => this.$router.push('/')">发现音乐</el-menu-item>
        <el-menu-item index="1" @click="() => this.$router.push('/songlist')">歌单</el-menu-item>
      <el-menu-item index="1" @click="() => this.$router.push('/usersong')">我的音乐</el-menu-item>
      <el-menu-item @click="toSearch">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
         >
        </el-input>
      </el-menu-item>
    </el-menu>
    <div class="user">
      <img :src="pic_url" alt="" @click="showInfo()">
      <div class="user-info" v-show="show">
        <ul class="user-info-ul">
          <li class="iconfont iconnicheng2"><span>{{name}}</span></li>
          <li class="iconfont icondizhi"><span>{{address}}</span></li>
          <li class="iconfont icongenders"><span>{{sex}}</span></li>
          <li class="iconfont icontuichu" @click="signOut()"><span>退出</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  props: {
    type: String
  },
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      name:'zzzz',
      address: '广东湛江',
      sex: '女',
      pic_url: 'http://localhost:8088/music/image/user.jpg',
      show: false
    }
  },
  methods: {
    toSearch () {
      this.$router.push('/search')
    },
    showInfo () {
      this.show = !this.show
    },
    signOut () {
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss" scoped>
.iconfont {
  font-size: 20px;
}
.nav {
  width: 100%;
  height: 100px;
  background-color: black;
  margin: auto;
  padding: 20px 0;
  display: flex;
  display: -webkit-flex;
}
.el-menu-demo {
  width: 1200px;
  margin: 0 auto;
  height: 60px;
  line-height: 100px;
  border: none;
  background-color: black;
  margin: auto;
}
.title {
    font-size: 36px;
}
.el-icon-upload {
    font-size: 32px;
    margin-right: 16px;
    color: #fff;
}
.el-submenu {
    font-size: 16px;
}
.el-menu-demo:hover, .el-submenu, .el-submenu:hover, .el-menu, .el-menu-item, .el-submenu__title:hover, .el-menu-item:hover {
  background-color: black !important;
  color: #fff !important;
}

.user {
  color: #fff;
  margin-right: 30px;
  position: relative;
}
.user img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.user-info {
  border: 1px #ffffff solid;
  border-radius: 10px;
  background-color: #27120e3b;
  position: absolute;
  right: 0px;
  z-index: 9999;
  width: 150px;
  padding: 10px;
}
.user-info-ul li span{
  display: inline-block;
  margin: 10px 6px;
}
</style>
