    
<template>
  <div class="index">
    <div class="nav">
      <NavMenu></NavMenu>
    </div>
    <div class="singer">
      <div class="singer-left">
        <div class="singer-left-tag" v-for="(item, index) in singerType" :key="index">
            <h2>{{item[0].type}}</h2>
            <ul class="singer-left-tag-ul" v-for="(item, index) in item" :key="index">
                <li @click="getSingerId(item.id, item.name)"><a href="#">{{item.name}}</a></li>
            </ul>
        </div>
      </div>
      <div class="main">
        <div class="recommend-title">
        <h1>{{typeName}}</h1>
        </div>
        <div class="line"></div>
        <SingerRecommed :list="list"></SingerRecommed>
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
  </div>
</template>

<script>
import NavMenu from '../components/NavMenu.vue'
// import Recommend from '../components/Recommend.vue'
import SingerRecommed from '../components/SingerRecommed.vue'
import { constants } from 'crypto';
export default {
  name: 'Singer',
  components: {
    NavMenu,
    SingerRecommed
    // Recommend
  },
  data () {
    return {
      id: '',
      name: '',
      picurl: '',
      briefdesc: '',
      list: [],
      singerType: [],
      typeName: '',
      currentPage: 1,
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
    // 获取左侧栏所有歌手类型
    get () {
      var _this = this
      _this.$axios.get(this.baseUrl + 'rank/getAllSingerType').then(function (res) {
        _this.singerType = res.data.payload
      }, function () {
        console.log('请求失败处理')
      })
    },
    // 点击左侧栏获取歌手类型
    getSingerId (id, name) {
      console.log(id)
       var _this = this
      _this.typeName = name
      _this.$axios.get(_this.baseUrl + 'rank/getAllSingerByTypeId', {
        params: {
          typeId: id,
          pageNum: _this.pageNum,
          pageSize: _this.pageSize
        }
      }).then(function (res) {
        console.log(res)
        _this.list = []
        _this.list = res.data.payload.list
        _this.pageSize = res.data.payload.pageSize
        _this.pageNum = res.data.payload.pageNum
        _this.totalDataList = res.data.payload.total
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
      _this.$axios.get(this.baseUrl + 'rank/getAllSingerByTypeId/', {
        params: {
          typeId: '1002',
          pageSize: _this.pageSize,
          pageNum: _this.pageNum
        }
      }).then(function (res) {
        _this.list = res.data.payload.list
        _this.pageSize = res.data.payload.pageSize
        _this.pageNum = res.data.payload.pageNum
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
    this.get()
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
.singer {
    width: 1500px;
    display: flex;
    display: -webkit-flex;
    padding-top:60px;
    margin: 0 auto;
}
.singer-left {
    width: 250px;
    border: 1px solid #ccc;
    padding: 10px;
}
.singer-left-tag {
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
.singer-left-tag-ul li a:hover {
  color: #42b983;
}
.singer-left-tag-ul li a:active {
  color: #697525;
}
</style>
