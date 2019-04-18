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
    <Recommend :list="list"></Recommend>
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
    <div class="recommend-title">
      <h1>热门歌曲</h1>
    </div>
    <div class="line"></div>
    <div class="recommend-song-table">
      <!-- <RecommedSong/> -->
      <SongTable :sendParams="sendParams"></SongTable>
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
  },
  data () {
    return {
      songlistid: '',
      songlistname: '',
      songlistpic: '',
      songlistcount: '',
      songlistplaycount: '',
      emotionvalue: '',
      songlistdescription: '',
      tagbody: '',
      list: [],
      currentPage: 1,
      page: 1,
      pageSize: 12,
      pageNum: 1,
      totalDataList: 0,
      tagId: 1,
      sendParams: {
        url: this.baseUrl + 'kd/getMusicSheetById/',
        songlistId: '2204388891'
      }
    }
  },
  methods: {
    get () {
      var _this = this
      _this.$axios.get(this.baseUrl + 'kd/getSongSheetByTagId/', {
        params: {
          tagId: _this.tagId,
          pageSize: _this.pageSize,
          pageNum: _this.pageNum
        }
      }).then(function (res) {
        console.log('热门推荐数据')
      }, function () {
        console.log('请求失败处理')
      })
    },
    handleSizeChange (size) {
      var _this = this
      _this.pageSize = size
      _this.handlePageList()
    },
    handleCurrentChange (currentPage) {
      var _this = this
      _this.pageNum = currentPage
      _this.list = []
      _this.handlePageList()
    },
    handlePageList () {
      this.loading = true
      var _this = this
      _this.$axios.get(this.baseUrl + 'kd/recommendSongSheet/', {
        params: {
          userId: _this.$cookieStore.getCookie('userId'),
          pageSize: _this.pageSize,
          pageNum: _this.pageNum
        }
      }).then(function (res) {
        for (let i = 0; i < res.data.payload.list.length; i++) {
          _this.list.push({
            songlistid: res.data.payload.list[i].songlistid,
            number: i + 1,
            songlistname: res.data.payload.list[i].songlistname,
            songlistpic: res.data.payload.list[i].songlistpic,
            songlistcount: res.data.payload.list[i].songlistcount,
            songlistplaycount: res.data.payload.list[i].songlistplaycount,
            emotionvalue: res.data.payload.list[i].emotionvalue,
            songlistdescription: res.data.payload.list[i].songlistdescription,
            tagbody: res.data.payload.list[i].tagbody
          })
          _this.pageSize = res.data.payload.pageSize
          console.log(_this.pageSize)
          _this.pageNum = res.data.payload.pageNum
        }
        console.log(res.data.payload)
        _this.totalDataList = res.data.payload.total
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  created () {
    this.handlePageList()
  },
  mounted () {
    //this.get()
  },
  computed: {
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
.index-pagination {
    width: 200px;
    margin: 0 auto;
}
.recommend-song-table {
 margin-bottom: 80px;
}
</style>
