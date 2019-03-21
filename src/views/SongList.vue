<template>
  <div class="songlist">
    <div class="nav">
      <NavMenu></NavMenu>
    </div>
    <div class="main">
       <div class="recommend-title">
        <h1>全部</h1>
      </div>
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
}
</style>
