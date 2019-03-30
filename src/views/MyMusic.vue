<template>
  <div id="mymusic">
    <div id="nav">
      <NavMenu></NavMenu>
    </div>
      <div class="main">
        <!-- <Aside></Aside> -->
         <div class="main-right">
           <div class="main-right-songinfo">
             <img src="http://img.hb.aicdn.com/60f788fc2a846192f224b9e6d4904b30e54926211d3d67-ACFJ9G_fw658" alt="">
             <div class="main-right-songinfo-right">
                <div class="main-right-songinfo-listname">
                  <el-button type="danger">歌单</el-button>
                  <div class="song-list-name">孤独的</div>
                  <!-- <Dialog></Dialog> -->
                  <!-- <span>我喜欢的音乐</span> -->
                </div>
                <!-- <div class="main-right-songinfo--userinfo">
                  <img src="http://img.hb.aicdn.com/60f788fc2a846192f224b9e6d4904b30e54926211d3d67-ACFJ9G_fw658" alt="">
                  <span>来那个天涯</span>
                  <span>2017-04-25创建</span>
                </div> -->
                <div>
                  <el-button type="success" icon="el-icon-caret-right">播放</el-button>
                  <!-- <el-button type="info" icon="el-icon-tickets">信息按钮</el-button> -->
                </div>
                <div class="introduces">ddddddddddd</div>
                <div class="fold" @click="fold">展开</div>
             </div>
           </div>
           <h1>歌曲列表</h1>
           <SongTable :list="list"></SongTable>
           <div class="index-pagination">
              <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              :page-sizes="[5, 10, 20, 40]"
              layout="total, prev, pager, next, jumper"
              :total="totalDataList">
              </el-pagination>
            </div>
         </div>
      </div>
     <div class="my-audio">
        <Audio></Audio>
     </div>
  </div>
</template>

<script>
import NavMenu from '../components/NavMenu.vue'
import SongTable from '../components/SongTable.vue'
import Audio from '../components/Audio.vue'
export default {
  name: 'MyMusic',
  show: false,
  components: {
    NavMenu,
    SongTable,
    Audio
  },
  data () {
    return {
      currentPage: 1,
      page: 1,
      pageSize: 10,
      pageNum: 1,
      totalDataList: 0,
      songlistId: '',
      id: '',
      songid: '',
      name: '',
      singer: '',
      pic: '',
      url: '',
      time: '',
      lrc: '',
      list: []
    }
  },
  methods: {
    handleSizeChange (size) {
      var _this = this
      _this.pageSize = size
      _this.handlePageList()
    },
    handleCurrentChange (currentPage) {
      var _this = this
      _this.pageNum = currentPage
      _this.handlePageList()
    },
     handlePageList () {
      this.loading = true
      var _this = this
      _this.$axios.get('http://localhost:8088/music/kd/getMusicSheetById/', {
        params: {
          songlistId: _this.$route.params.songlistId,
          pageSize: _this.pageSize + 2,
          pageNum: _this.pageNum
        }
      }).then(function (res) {
         for (let i = 0; i < res.data.payload.list.length; i++) {
          _this.list.push({
            id: res.data.payload.list[i].id,
            number: i + 1,
            songid: res.data.payload.list[i].songid,
            singer: res.data.payload.list[i].singer,
            pic: res.data.payload.list[i].pic,
            url: res.data.payload.list[i].url,
            time: res.data.payload.list[i].time,
            lrc: res.data.payload.list[i].lrc,
            currentPage: res.data.payload.currentPage,
            pageSize: res.data.payload.pageSize,
            pageNum: res.data.payload.pageNum
          })
        }
        console.log(res.data.payload)
        _this.totalDataList = res.data.payload.total
        console.log( _this.totalDataList)
        _this.pageNum = res.data.payload
        
      })
    },
    fold () {
    }
  },
  created () {
    this.handlePageList()
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 1080px;
  display:flex;
  margin: 0 auto 100px;
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
.main-right-songinfo-listname {
  display: flex;
  display: -webkit-flex;
  height: 40px;
  line-height: 40px;
}
.main-right-songinfo-listname span{
  margin: 10px ;
  font-size: 18px;
}
.song-list-name {
  margin: 0 10px;
}
.main-right-songinfo-right{
  flex-grow: 1;
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
.my-audio {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
}
.introduces {
  width: 100%;
  height: 200px;
  overflow: hidden;
  border: 1px solid #ccc;
}
.fold {
  text-align: right;
}
</style>
