<template>
  <div id="mymusic">
    <div id="nav">
      <NavMenu></NavMenu>
    </div>
      <div class="main">
         <div class="main-right">
           <div class="main-right-songinfo">
             <img src="http://img.hb.aicdn.com/60f788fc2a846192f224b9e6d4904b30e54926211d3d67-ACFJ9G_fw658" alt="">
             <div class="main-right-songinfo-right">
                <div class="main-right-songinfo-listname">
                  <el-button type="danger">歌单</el-button>
                  <span>我喜欢的音乐</span>
                </div>
                <div class="main-right-songinfo--userinfo">
                  <img src="http://img.hb.aicdn.com/60f788fc2a846192f224b9e6d4904b30e54926211d3d67-ACFJ9G_fw658" alt="">
                  <span>来那个天涯</span>
                  <span>2017-04-25创建</span>
                </div>
                <div>
                  <el-button type="success" icon="el-icon-caret-right">播放</el-button>
                  <el-button type="info" icon="el-icon-tickets">信息按钮</el-button>
                </div>
             </div>
           </div>
           <h1>歌曲列表</h1>
           <SongTable></SongTable>
         </div>
      </div>
  </div>
</template>

<script>
import NavMenu from '../components/NavMenu.vue'
import SongTable from '../components/SongTable.vue'

export default {
  name: 'PlayList',
  components: {
    NavMenu,
    SongTable
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 1080px;
  display:flex;
  margin: 0 auto;;
}
.main-right {
  flex-grow: 1;
  border-right: 1px #ccc solid;
}
.main-right h1{
  border-bottom: 2px red solid;
  padding-bottom: 20px;
}
.main-right-songinfo {
  padding: 30px;
}
.main-right-songinfo-listname span{
  margin-left: 10px;
  font-size: 18px;
}
.main-right-songinfo-right{
  padding: 20px;
}
.main-right-songinfo-right > div {
  margin-top: 15px;
}
.main-right-songinfo img{
  width: 250px;
  height: 250px;
}
.main-right-songinfo, .main-right-songinfo--userinfo {
  display: flex;
  display: -webkit-flex;
  flex-grow: 1;
}
.main-right-songinfo--userinfo {
  height: 50px;
  line-height: 50px;
}

.main-right-songinfo--userinfo span{
  margin-left: 10px;
}
.main-right-songinfo--userinfo img{
  width: 50px;
  height: 50px;
}
</style>
