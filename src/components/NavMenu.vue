<template>
  <div class="nav">
    <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item class="title"><i class="el-icon-upload"></i>云音乐</el-menu-item>
       <el-menu-item index="1" @click="() => this.$router.push('/')">发现音乐</el-menu-item>
        <el-menu-item index="1" @click="() => this.$router.push('/songlist')">歌单</el-menu-item>
      <el-menu-item index="1" @click="() => this.$router.push('/mymusic')">我的音乐</el-menu-item>
      <el-menu-item>
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          @keyup.enter="toSearch">
        </el-input>
      </el-menu-item>
    </el-menu>
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
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    toSearch () {
      console.log('跳转到搜索页')
      this.$router.push({ name: 'search' })
    }
  }
}
</script>
<style lang="scss" scoped>
.nav {
  width: 100%;
  height: 100px;
  background-color: black;
  margin: auto;
  padding: 20px 0;
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

</style>
