<template>
  <div class="songlist">
    <div class="nav">
      <NavMenu></NavMenu>
    </div>
    <div class="main">
       <div class="recommend-title">
        <h1>全部</h1>
        <div class="choose" @click="choose()">
          <el-button type="success">选择分类</el-button>
        </div>
      </div>
      <div class="choose-classification" v-show="show">
        <div class="choose-classification-bar">
          <div class="choose-classification-bar-ch">语言</div>
          <ul class="choose-classification-ul">
            <li>华语</li>
            <li>欧美</li>
            <li>日语</li>
            <li>华语</li>
            <li>欧美</li>
            <li>日语</li>
          </ul>
        </div>
      </div>
      <div class="line"></div>
      <Recommend></Recommend>
      <div class="index-pagination">
        <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import NavMenu from '../components/NavMenu.vue'
import Recommend from '../components/Recommend.vue'
export default {
  name: 'songList',
  components: {
    NavMenu,
    Recommend
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    choose () {
      this.show = !this.show
    }
  }
}
</script>

<style lang="scss" scoped>
.songlist {
  width: 100%;
  margin: 0 auto;
}
.index-pagination {
    width: 200px;
    margin: 0 auto;
}
.nav {
  width: 100%;
  margin: 0 auto;
}
.main {
  width: 1200px;
  margin: 0 auto;
  position: relative;
}
.recommend-title {
    height: 40px;
    display: flex;
    display: -webkit-flex;
    line-height: 40px;
    padding-bottom: 10px;
    margin-top: 20px;
}
.line {
    border-bottom: 4px red solid;
    margin-top: 10px;
}

.choose-classification {
  position: absolute;
  top: 60px;
  left: 100px;
  border: 1px #ccc solid;
  padding: 10px;
  z-index: 999;
  background-color: #f5f5f5;
}
.choose-classification-ul,.choose-classification-bar{
  width: 100%;
  display: flex;
  display: -webkit-flex;
}
.choose-classification-bar {
  height: 25px;
  align-items: center;
}
.choose-classification-bar-ch {
  width: 80px;
}
.choose-classification-ul li{
  border-right: 1px solid #ccc;
  height: 20px;
  line-height: 20px;
  margin-right: 10px;
  padding-right: 5px;
}
</style>
