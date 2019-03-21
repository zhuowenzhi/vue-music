<template>
  <div class="index">
    <div class="nav">
      <NavMenu></NavMenu>
    </div>
   <div class="main">
      <Swiper></Swiper>
      <div class="recommend-title">
        <h1>热门推荐</h1>
        <!-- <a href="" @click="()=>{this.$router.push('/songlist')}">更多</a> -->
      </div>
    <div class="line"></div>
      <Recommend></Recommend>
      <div class="indexSong">
        <h1>榜单</h1>
        <SongTable></SongTable>
      </div>
   </div>
  </div>
</template>

<script>
import NavMenu from '../components/NavMenu.vue'
import Swiper from '../components/Swiper.vue'
import Recommend from '../components/Recommend.vue'
import SongTable from '../components/SongTable.vue'
export default {
  name: 'Index',
  components: {
    NavMenu,
    Swiper,
    Recommend,
    SongTable
  }
}
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  margin: 0 auto;
}
.nav {
  width: 100%;
}
.main {
  width: 1200px;
  margin: 0 auto;
}

.recommend-title {
    height: 40px;
    display: flex;
    display: -webkit-flex;
    line-height: 40px;
    padding-bottom: 10px;
}
.line {
    border-bottom: 4px red solid;
    margin-top: 10px;
}
.recommend-title h1 {
    flex-grow: 1;
}
a {
  text-decoration: none;
  color: #42b983;
}
.indexSong {
  width: 100%;
  padding: 20px;
}
.indexSong h1 {
  border-bottom: 2px red solid;
  padding-bottom: 20px;
}
</style>
