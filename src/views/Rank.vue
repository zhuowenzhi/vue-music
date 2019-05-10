<template>
  <div class="index">
    <div class="nav">
      <NavMenu></NavMenu>
    </div>
    <div class="singer">
      <div class="singer-left">
        <div class="singer-left-tag" >
            <h2>排行榜</h2>
            <ul class="singer-left-tag-ul" v-for="(item, index) in rankList" :key="index">
                <li @click="getRankId(item.rankId, item.style)"><a href="#">{{item.style}}</a></li>
            </ul>
        </div>
      </div>
      <div class="main">
        <div class="recommend-title">
        <h1>{{rankName}}</h1>
        </div>
      <SongList :send-params="sendParams" :params="params"></SongList>
      </div>
    </div>
  </div>
</template>

<script>
import NavMenu from '../components/NavMenu.vue'
import SongList from '../components/SongList.vue'
import { constants } from 'crypto'
import bus from '../common/js/bus.js'
export default {
  name: 'Singer',
  components: {
    NavMenu,
    SongList
  },
  data () {
    return {
      id: '',
      name: '',
      picurl: '',
      briefdesc: '',
      list: [],
      rankList: [],
      rankName: '',
      currentPage: 1,
      pageSize: 12,
      pageNum: 1,
      totalDataList: 0,
      tagId: 1,
      sendParams: {
        url: this.baseUrl + 'rank/getRankListById/',
      },
      params: {
        rankId: 0,
        pageNum: 1,
        pageSize: 20
      }
    }
  },
  methods: {
    // 获取左侧栏所有排行榜
    getAllRank () {
      var _this = this
      _this.$axios.get(this.baseUrl + 'rank/getRankList/').then(function (res) {
        console.log("排行榜")
        console.log(res.data.payload)
        _this.rankList = res.data.payload
      }, function () {
        console.log('请求失败处理')
      })
    },
    // 点击左侧栏获取排行榜歌曲
     getRankId (id, name) {
      console.log(id)
      this.rankName = name
      this.params.rankId = id
      console.log('getRankId' + this.params.rankId)
    }
  },
  mounted () {
    var _this = this
    _this.getAllRank()
    // _this.handlePageList()
  },
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
.singer {
    width: 1500px;
    display: flex;
    display: -webkit-flex;
    padding-top:60px;
    margin: 0 auto;
}
.singer-left {
    width:350px;
    border: 1px solid #ccc;
    padding: 10px;
    margin-right: 20px;
}
.singer-left-tag {
    // border-bottom: 1px solid #ccc;
    margin-top: 20px;
}
.singer-left-tag h2 {
    margin-bottom: 6px;
}

.singer-left-tag-ul {
   margin-left: 20px;
}
.singer-left-tag-ul li{
   margin-bottom: 10px;
   border:1px #ccc solid;
   background: rgba(250, 247, 247, 0.938);
   padding: 10px;
}
.singer-left-tag-ul li a{
    width: 133px;
    padding-left: 27px;
    background-position: 0 -30px;
    color: #333
}
.main {
  width: 1200px;
  margin: 0 auto 200px;
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
.singer-left-tag-ul li a:hover {
  color: #42b983;
}
.singer-left-tag-ul li a:active {
  color: #697525;
}
</style>
