<template>
  <div class="songlist">
    <div class="nav">
      <NavMenu></NavMenu>
    </div>
    <div class="main">
       <div class="recommend-title">
        <h1>{{tagName}}</h1>
        <div class="choose" @click="choose()">
          <el-button type="success">选择分类</el-button>
        </div>
      </div>
      <div class="choose-classification" v-show="show">
          <ul class="choose-classification-ul" v-for="(item, index) in tags" :key="index">
            <li ref="item.id" @click="getTagList(item.tagId,item.name)">{{ item.name }}</li>
          </ul>
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
      show: false,
      tagId: 2,
      tagName: '全部',
      name: '',
      type: '',
      category: '',
      hot: '',
      tags: [],
      songlistId: '',
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
      totalDataList: 0
    }
  },
  methods: {
    choose () {
      this.show = !this.show
    },
    getTag () {
      var _this = this
      _this.$axios.get('http://localhost:8088/music/kd/getAllTag').then(function (res) {
        for (let i = 0; i < res.data.payload.length; i++) {
          _this.tags.push({
            tagId: res.data.payload[i].id,
            number: i + 1,
            name: res.data.payload[i].name,
            category: res.data.payload[i].category,
            type: res.data.payload[i].type,
            hot: res.data.payload[i].hot
          })
        }
      }, function () {
        console.log('请求失败处理')
      })
    },
    getTagList (tagId, tagName) {
      var _this = this
      _this.tagName = tagName
      _this.$axios.get('http://localhost:8088/music/kd/getHotSongSheet/', {
        params: {
          tagId: tagId,
          pageSize: _this.pageSize,
          pageNum: _this.pageNum
        }
      }).then(function (res) {
        console.log(res)
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
          _this.currentPage = res.data.payload.currentPage
          _this.pageSize = res.data.payload.pageSize
          _this.pageNum = res.data.payload.pageNum
        }
        _this.totalDataList = res.data.payload.total
        _this.show = false
      }).catch(function (error) {
        console.log(error)
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
      _this.$axios.get('http://localhost:8088/music/kd/getSongSheetByTagId/', {
        params: {
          tagId: 2,
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
          _this.currentPage = res.data.payload.currentPage
          _this.pageSize = res.data.payload.pageSize
          _this.pageNum = res.data.payload.pageNum
        }
        _this.totalDataList = res.data.payload.total
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  created () {
    this.handlePageList()
  },
  mounted: function () {
    this.getTag()
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
  width: 600px;
  position: absolute;
  top: 0px;
  left: 160px;
  border: 1px #ccc solid;
  padding: 10px;
  z-index: 999;
  background-color:#1c030373;
  color: #fff;
}

.choose-classification-bar-ch {
  width: 80px;
}
.choose-classification-ul li{
  float: left;
  width: 70px;
  text-align: center;
  border-right: 1px solid #ccc;
  height: 20px;
  line-height: 20px;
  margin: 10px 10px;
  padding-right: 5px;
}
</style>
