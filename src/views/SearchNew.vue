<template>
  <div class="search">
    <div class="nav">
    <el-menu class="el-menu-demo" mode="horizontal">
      <el-menu-item class="title"><i class="el-icon-upload"></i>云音乐</el-menu-item>
      <el-menu-item index="1" @click="() => this.$router.push('/')">发现音乐</el-menu-item>
      <el-menu-item index="1" @click="() => this.$router.push('/songlist')">歌单</el-menu-item>
      <el-menu-item index="1" @click="() => this.$router.push('/rank')">排行榜</el-menu-item>
      <el-menu-item index="1" @click="() => this.$router.push('/singer')">歌手</el-menu-item>
      <el-submenu index="1" background-color="#545c64">
        <template slot="title" @click="() => this.$router.push('/userlike')">我的音乐</template>
        <el-menu-item index="2-2" @click="() => this.$router.push('/userhistory')">历史歌曲</el-menu-item>
        <el-menu-item index="2-1" @click="() => this.$router.push('/userlike')">收藏歌曲</el-menu-item>
      </el-submenu>
     
    </el-menu>
    <div class="user">
      <img :src="pic_url" alt="" @click="showInfo()">
      <div class="user-info" v-show="show">
        <ul class="user-info-ul">
          <li class="iconfont iconnicheng2"><span>{{name}}</span></li>
          <li class="iconfont icondizhi"><span>{{address}}</span></li>
          <li class="iconfont icongenders"><span>{{sex}}</span></li>
          <li class="iconfont icontuichu" @click="signOut()"><span>退出</span></li>
        </ul>
      </div>
    </div>
  </div>
    <div class="search-input" >
      <el-input placeholder="请输入歌曲名词" v-model="searchName">
        <i slot="prefix" class="el-input__icon el-icon-search"  @click="get()"></i>
      </el-input>
    </div>
    <SongList :send-params="sendParams" :params="params"></SongList>
  </div>
</template>

<script>
import NavMenu from '../components/NavMenu.vue'
import { setTimeout } from 'timers'
import { mapState } from 'vuex'
import SongList from '../components/SongList.vue'
export default {
  name: 'Search',
  components: {
    NavMenu
    // SingleSong
  },
  data () {
    return {
       sendParams: {
        url: this.baseUrl + 'kd/searchSong/',
      },
      params: {
        userId: _this.$cookieStore.getCookie('userId'),
        pageNum: _this.pageNum,
        pageSize: _this.pageSize,
        songName: _this.searchName
      },
      iconVolt: 'iconshengyin',
      searchName: '',
      activeIndex: '1',
      activeIndex2: '1',
      name:'',
      address: '',
      sex: '',
      pic_url: 'http://localhost:8088/music/image/user.jpg',
      show: false,
      list: [],
       isDisable: true,
      songReady: false,
      currentLyric: null,
      currentLineNum: 0,
      currentShow: 'cd',
      playingLyric: '',
      currentPage: 1,
      pageSize: 10,
      pageNum: 1,
      totalDataList: 0,
      songlistId: '',
      iconPlay: 'iconbofang1',
      dialogVisible: false,
      playing: false,
      currentIndex:''
    }
  },
  methods: {
    // 搜索
    get () {
      var _this = this
      _this.list = []
      _this.pageNum = 1
      _this.handlePageList()
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
      _this.$axios.get(this.baseUrl + 'kd/searchSong/', {
        params: {
          userId: _this.$cookieStore.getCookie('userId'),
          pageNum: _this.pageNum,
          pageSize: _this.pageSize,
          songName: _this.searchName
        }
      }).then(function (res) {
        console.log(res)
         console.log("res")
        for (let i = 0; i < res.data.payload.list.length; i++) {
          _this.list.push({
            id: res.data.payload.list[i].id,
            number: i + 1,
            songid: res.data.payload.list[i].songid,
            name: res.data.payload.list[i].name,
            singer: res.data.payload.list[i].singer,
            pic: res.data.payload.list[i].pic,
            url: res.data.payload.list[i].url,
            time: Math.floor(res.data.payload.list[i].time / 60) + ":" + (res.data.payload.list[i].time % 60 / 100).toFixed(2).slice(-2),
            lrc: res.data.payload.list[i].lrc
          })
        }
        _this.totalDataList = res.data.payload.total
        _this.pageSize =  res.data.payload.pageSize
        _this.pageNum =  res.data.payload.pageNum
        // _this.handlePageList()
        _this.initAudio ()
      }, function () {
        console.log('请求失败处理')
      })
    },
    
     toSearch () {
      this.$router.push('/search')
    },
    showInfo () {
      this.show = !this.show
    },
    // 获取用户信息
    getUserInfo() {
      var _this = this
       _this.name = _this.$cookieStore.getCookie('name')
      _this.sex = _this.$cookieStore.getCookie('sex')
      _this.address = _this.$cookieStore.getCookie('address')
    },
    signOut () {
      this.$router.push('/login')
    }
  },
  created () {
    console.log("create生命周期触发")
  },
  mounted () {
    // this.get()
    this.getUserInfo()
  }
}
</script>

<style lang="scss" scoped>
.search-input {
  width: 80%;
  margin: 40px auto 80px;
}
.iconfont {
  font-size: 20px;
}
.el-table {
  bottom: 70px;
}
.audio-flag, .audio{
    display: flex;
    display: -webkit-flex;
    align-items: center;
}
.audio {
    height: 70px;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color:rgba(0, 0, 0, 0.8);
    color: #fff;
}
.audio > div {
    padding: 15px;
}
.audio-btns span {
    font-size: 30px;
    padding: 5px;
}
.audio-img {
    width: 40px;
    height: 40px;
    border: 1px #ccc solid;
}
.audio-play {
    flex-grow: 1;
}
.audio-play-bar {
    margin: 5px auto;
    height: 10px;
    border: 1px #ccc solid;
    border-radius: 5px;
}
.audio-play-info span{
    padding: 5px;
}
.audio-flag > div {
    padding: 5px;
    font-size: 18px;
}
.song-name {
    font-size: 16px;
}
.singer-name {
    font-size: 14px;
    color: #ccc;
}
.progress-btn {
    position : relative;
    top: -0.18rem;
    box-sizing : border-box;
    width : 1rem;
    height : 1rem;
    border : 0.06rem solid #ccc;
    border-radius : 50%;
    background :  #fff;
}

.bar{
    width:100%;
    height:30px;
    line-height:30px;
}
.bar .progressbar{
    width: 100%;
    height:10px;
    background-color: #999999;
    margin-top:10px;
    border-radius:30px;
    position: relative;
}
.bar .greenbar {
    width: 0%;
    height:10px;
    border-radius:30px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;
}
.bar .greenbar .yuan{
    display: inline-block;
    background-color: #ffffff;
    border-radius: 50%;
    position: absolute;
}
.iconcollection {
  color: red;
}

.nav {
  width: 100%;
  height: 100px;
  background-color: black;
  margin: auto;
  padding: 20px 0;
  display: flex;
  display: -webkit-flex;
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
.el-menu--horizontal>.el-submenu .el-submenu__title:hover, .el-menu-demo:hover, .el-submenu, .el-submenu:hover, .el-menu, .el-menu-item, .el-submenu__title:hover, .el-menu-item:hover {
  background-color: black !important;
  color: #fff !important;
}

.user {
  color: #fff;
  margin-right: 30px;
  position: relative;
}
.user img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.user-info {
  border: 1px #ffffff solid;
  border-radius: 10px;
  background-color: #27120e3b;
  position: absolute;
  right: 0px;
  z-index: 9999;
  width: 150px;
  padding: 10px;
}
.user-info-ul li span{
  display: inline-block;
  margin: 10px 6px;
}
.el-menu--horizontal>.el-menu-item.is-active {
  border: 0;
}
.index-pagination {
  margin-bottom: 80px;
}
</style>
