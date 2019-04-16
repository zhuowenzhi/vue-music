<template>
  <div class="search">
    <div class="nav">
    <el-menu class="el-menu-demo" mode="horizontal">
      <el-menu-item class="title"><i class="el-icon-upload"></i>云音乐</el-menu-item>
      <el-menu-item index="1" @click="() => this.$router.push('/')">发现音乐</el-menu-item>
      <el-menu-item index="1" @click="() => this.$router.push('/songlist')">歌单</el-menu-item>
      <el-menu-item index="1" @click="() => this.$router.push('/singer')">歌手</el-menu-item>
      <el-submenu index="1" background-color="#545c64">
        <template slot="title" @click="() => this.$router.push('/userlike')">我的音乐</template>
        <el-menu-item index="2-2" @click="() => this.$router.push('/userhistory')">历史歌曲</el-menu-item>
        <el-menu-item index="2-1" @click="() => this.$router.push('/userlike')">收藏歌曲</el-menu-item>
      </el-submenu>
      <!-- <el-menu-item>
        <el-input placeholder="请输入歌曲名词" v-model="searchName">
        <i slot="prefix" class="el-input__icon el-icon-search"  @click="get()"></i>
      </el-input>
      </el-menu-item> -->
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
    <div>
      <el-table
        :data="list"
        stripe
        style="width: 100%">
        <el-table-column 
          prop="number"
          label=""
          width="40">
        </el-table-column>
        <el-table-column width="40">
          <template scope="song">
            <span class="iconfont iconbofang1" @click="play(song.$index, song.row)"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="歌曲标题"
        >
        </el-table-column>
        <el-table-column
          prop="time"
          label="时长">
        </el-table-column>
        <el-table-column
          prop="singer"
          label="歌手">
        </el-table-column>
      </el-table>
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
      <div class="audio">
        <div class="audio-btns">
            <span class="iconfont iconshangyishou" @click="prev()"></span>
            <span class="iconfont" :class="iconPlay" @click="togglePlay()"></span>
            <span class="iconfont iconxiayishou" @click="next()"></span>
        </div>
        <img class="audio-img" :src="audio.imgUrl" alt="">
        <div class="audio-play">
            <div class="audio-play-info">
                <span class="song-name">{{ audio.songName }}</span>
                <span class="singer-name">{{ audio.singerName }}</span>
            </div>
            <!-- <div class="audio-play-bar">
              <div class="progress-btn"></div>
            </div> -->
            <div class="bar">
            <div class="progressbar" ref="runfatbar" @click="playMusic">
              <div class="greenbar" ref="runbar">
                <span class="yuan" draggable="true"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="audio-time">
            <span>{{ audio.currentTime }}</span>
            <span>/</span>
            <span>{{ audio.totalTime }}</span>
        </div>
        <!-- <div class="audio-flag">
            <div class="iconfont iconcollection" @click="addLikeSong()" :disabled="isDisable"></div>
            <div class="iconfont iconshengyin"></div>
            <div class="iconfont iconziyuanldpi"></div>
            <div class="iconfont iconlist-2-copy"></div>
        </div> -->
         <div class="audio-flag">
          <div class="iconfont iconshoucang" @click="addLikeSong()"></div>
          <div class="iconfont" :class="iconVolt" @click="changedMuted()"></div>
          <div class="iconfont iconziyuanldpi"></div>
          <div class="iconfont iconlist-2-copy"></div>
      </div>
        <audio ref="audio" id="audio" :src="audio.audioSrc" @timeupdate="updateTime"></audio>
      </div>
    </div>
 
  </div>
</template>

<script>
import NavMenu from '../components/NavMenu.vue'
import { setTimeout } from 'timers'
import { mapState } from 'vuex'
// import SingleSong from '../components/SingleSong.vue'
export default {
  name: 'Search',
  components: {
    NavMenu
    // SingleSong
  },
  data () {
    return {
      iconVolt: 'iconshengyin',
      searchName: '',
      activeIndex: '1',
      activeIndex2: '1',
      name:'',
      address: '',
      sex: '',
      pic_url: 'http://localhost:8088/music/image/user.jpg',
      show: false,
      id: '',
      number: '',
      songid: '',
      name: '',
      singer: '',
      pic: '',
      url: '',
      time: '',
      lrc: '',
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
      audio: {
        songId: '',
        audioSrc: ' ',
        imgUrl: '',
        songName: '',
        singerName: '',
        currentTime: '00:00',
        totalTime: '00:00',
      },
      sliderTime: 0,
      volumeShow: false,
      sliderVolume: true,
      controlList: {
        noDownload: true
      },
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
     // 添加喜欢的歌曲
    addLikeSong () {
       var _this = this
      //  _this.isDisable = true
       console.log(_this.isDisable )
         _this.$axios.get(this.baseUrl + 'kd/setLikeSong/',{
        params: {
          userId: _this.$cookieStore.getCookie('userId'),
          songId:  _this.audio.songId
        }
      }).then(function (res){
        console.log(res)
        console.log("喜欢")
         _this.isDisable = false
        console.log(_this.isDisable )
      }).catch(function (error) {
        console.log(error)
      })
    },
    initAudio () {
      var _this = this
      setTimeout( ()=> {
        console.log('_this.list[0].id' + _this.list[0].id)
         _this.$axios.get(this.baseUrl + 'kd/getSongById/',{
        params: {
          userId: _this.$cookieStore.getCookie('userId'),
          songId: _this.list[0].songid
        }
      }).then(function (res){
        console.log(res)
        _this.audio.audioSrc = res.data.payload.url
        _this.audio.imgUrl = res.data.payload.pic
        _this.audio.singerName = res.data.payload.singer
        _this.audio.songName = res.data.payload.name
        _this.audio.totalTime = res.data.payload.time
        _this.audio.currentTime = _this.$refs.audio.currentTime
        _this.audio.songId = res.data.payload.songid
      }).catch(function (error) {
        console.log(error)
      })
      }, 1000)
    },
    play (index, song) {
      var _this = this  
      
      console.log(_this.audio.currentTime + _this.audio.songName)
      //发送日志1
      _this.sendLog(_this.audio.songId, _this.audio.currentTime)

      index && (this.currentIndex = index)
      _this.audio.audioSrc = song.url
      _this.audio.imgUrl = song.pic
      _this.audio.singerName = song.singer
      _this.audio.songName = song.name
      _this.audio.totalTime = song.time
      _this.audio.currentTime = _this.$refs.audio.currentTime
      _this.audio.songId = song.songid
       

      //发送数据到后台
      _this.$axios.get(this.baseUrl + 'kd/getSongById/',{
      params: {
        userId: _this.$cookieStore.getCookie('userId'),
        songId: song.songid
      }
      }).then(function (res){
        
        _this.iconPlay = 'iconbofang'
         if (!_this.playing) {
          _this.playing = !_this.playing
        }
        _this.$refs.audio.play()
        
      }).catch(function (error) {
        console.log(error)
      })

    },
    sendLog(songid, currentTime) {
      var _this = this
      var min = currentTime.split(':')[0]
      var sec = currentTime.split(':')[1]
      _this.$axios.get(_this.baseUrl + 'kd/logSongTime/',{
        params: {
          userId: _this.$cookieStore.getCookie('userId'),
          songId: songid,
          time: Number(min*60) + Number(sec)
        } 
      }).then(function (res){
        console.log(res.data.msg)
      }).catch(function (error) {
        console.log(error)
      })
    },
    prev() {
      var _this = this
      if (_this.list.length === 1) {
        _this.loop()
      } else {
        //sendLog2
        _this.sendLog(_this.audio.songId, _this.audio.currentTime)

        let index = --_this.currentIndex;
        if (index === _this.list.length) {
          index = 0
        }
        let _audio = _this.$refs.audio;
        let prevTime = _audio.currentTime;
        console.log('上一首播放时长'+prevTime);

        console.log(_this.list[index].url)
        _this.audio.audioSrc = _this.list[index].url
        _this.audio.imgUrl = _this.list[index].pic
        _this.audio.singerName = _this.list[index].singer
        _this.audio.songName = _this.list[index].name
        _this.audio.totalTime = Math.floor(_this.list[index].time / 60) + ":" + (_this.list[index].time % 60 / 100).toFixed(2).slice(-2)
        _this.audio.currentTime = _this.list[index].currentTime
        _this.audio.songId = _this.list[index].songid
        _this.$refs.audio.src = _this.audio.audioSrc;
        console.log(_this.audio.audioSrc);

        _this.up_play(index,_this.list[index])
      }
      console.log('next finish')
    },
    next() {
      var _this = this

      console.log('next start')
      console.log( _this.list)
      console.log(_this.currentIndex)
      console.log(_this.list[_this.currentIndex])
      // 列表只有一首歌曲则单曲循环
      if (_this.list.length === 1) {
        _this.loop()
      } else {
//sendLog3
      _this.sendLog(_this.audio.songId, _this.audio.currentTime)

        let index = _this.currentIndex
        if (index === _this.list.length) {
          _this.currentIndex = 0
          index = 0
        } else {
          index = ++_this.currentIndex;
        }
        let _audio = _this.$refs.audio;
        let prevTime = _audio.currentTime;
        console.log('上一首播放时长'+prevTime);


        console.log(_this.list[index].url)
        _this.audio.audioSrc = _this.list[index].url
        _this.audio.imgUrl = _this.list[index].pic
        _this.audio.singerName = _this.list[index].singer
        _this.audio.songName = _this.list[index].name
        _this.audio.totalTime = Math.floor(_this.list[index].time / 60) + ":" + (_this.list[index].time % 60 / 100).toFixed(2).slice(-2)
        _this.audio.currentTime = _this.list[index].currentTime
        _this.audio.songId = _this.list[index].songid
        _this.$refs.audio.src = _this.audio.audioSrc;
        console.log(_this.audio.audioSrc);
        console.log('嘉实基金大家啊数据大数据登记')

         _this.next_play(index,_this.list[index])
      }
      console.log('next finish')
    },
    up_play(index,song) {
      this.next_play(--index, song)
    },
    next_play(index,song ){
      // 现在跑的是next逻辑
      index && (this.currentIndex = index)
      console.log(" next_play currentIndex.currentIndex:" + this.currentIndex)
      var _this = this
      if(!_this.playing) {
        _this.playing = !_this.playing
      }
      // if (!_this.playing) {
      _this.iconPlay = 'iconbofang'
      // _this.$refs.audio.play()
      // if (_this.$refs.audio.currentTime >= _this.$refs.audio.totalTime) {
      //   _this.$refs.audio.currentTime = _this.$refs.audio.totalTime
      //   _this.iconPlay = 'iconbofang1'
      // }

      _this.audio.audioSrc = song.url
      _this.audio.imgUrl = song.pic
      _this.audio.singerName = song.singer
      _this.audio.songName = song.name
      _this.audio.totalTime = song.time
      _this.audio.currentTime = _this.$refs.audio.currentTime
      _this.audio.songId = song.songid

      // todo 发送到后台
      _this.$axios.get(this.baseUrl + 'kd/getSongById/',{
      params: {
        userId: _this.$cookieStore.getCookie('userId'),
        songId: song.songid
      }
    }).then(function (res){
      _this.$refs.audio.play()
    }).catch(function (error) {
      console.log(error)
    })
    },
    loop() {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()

      // 循环播放 歌词回到开始的时候
      if (this.currentLyric) {
        this.currentLyric.seek(0)
      }
    },
    togglePlay () {
      if (!this.playing) {
        this.iconPlay = 'iconbofang'
        this.$refs.audio.play()
        this.playing = !this.playing
      } else {
        this.iconPlay = 'iconbofang1'
        this.$refs.audio.pause()
        this.audio.currentTime = 0
        this.playing = !this.playing
      }
      console.log(this.list)
    },
    updateTime (e) {
      this.audio.currentTime = Math.floor(e.target.currentTime / 60) + ":" + (e.target.currentTime % 60 / 100).toFixed(2).slice(-2)
    },
    addEventListeners () {
      const self = this
      self.$refs.audio.addEventListener('timeupdate', self._currentTime),
      self.$refs.audio.addEventListener('canplay', self._durationTime)
    },
    removeEventListeners () {
      const self = this
      self.$refs.audio.removeEventListener('timeupdate', self._currentTime)
      self.$refs.audio.removeEventListener('canplay', self._durationTime)
    },
    _currentTime () {
      const self = this
      // self.currentTime = parseInt(self.$refs.audio.currentTime)
      self.currentTime = Math.floor(self.$refs.audio.currentTime / 60) + ":" + (self.$refs.audio.currentTime % 60 / 100).toFixed(2).slice(-2)
    },
    _durationTime () {
      const self = this
      self.timeDuration =  parseInt(self.$refs.audio.duration)
      // console.log(self.timeDuration)
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
      // _this.$axios.get(_this.baseUrl + 'kd/searchSong/', {
      //   params: {
      //     songlistId: _this.$route.query.songlistId,
      //     pageSize: _this.pageSize + 2,
      //     pageNum: _this.pageNum
      //   }
      // }).then(function (res) {
      //   console.log(res)
      //   for (let i = 0; i < res.data.payload.list.length; i++) {
      //     _this.list.push({
      //       id: res.data.payload.list[i].id,
      //       number: i + 1,
      //       name: res.data.payload.list[i].name,
      //       songid: res.data.payload.list[i].songid,
      //       singer: res.data.payload.list[i].singer,
      //       pic: res.data.payload.list[i].pic,
      //       url: res.data.payload.list[i].url,
      //       time: Math.floor(res.data.payload.list[i].time / 60) + ":" + (res.data.payload.list[i].time % 60 / 100).toFixed(2).slice(-2),
      //       lrc: res.data.payload.list[i].lrc,
      //     })
      //   }
      //     // currentPage: res.data.payload.currentPage,
      //     //   pageSize: res.data.payload.pageSize,
      //     //   pageNum: res.data.payload.pageNum
      //   _this.totalDataList = res.data.payload.total
      //   _this.pageNum = res.data.payload.pageNum
      //   console.log( _this.list)
      // })
    },
    // 点击进度条事件
    playMusic(e){
      const music = this.$refs.audio // 音频所在对象
      const barWidth = e.pageX / this.$refs.runfatbar.offsetWidth // 计算点击位置相对父元素总宽的比例
      this.$refs.runbar.style.width = `${barWidth * 100}%` // 进度条应所在的比例总宽
      music.currentTime = music.duration * barWidth // 计算点击时应播放所在的时间
      music.play(); // 播放音频
      this.play = true; // 更改播放暂停按钮为播放
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
      // _this.$axios.get(_this.baseUrl + 'user/getUserInfo/',{
      //   params: {
      //     userId:  _this.$cookieStore.getCookie('userId')
      //   }
      // }).then(function (res) {
      //   _this.name = res.data.payload.name
      //   _this.sex = res.data.payload.sex
      //   _this.address = res.data.payload.address
      // })
    },
    signOut () {
      this.$router.push('/login')
    }
  },
  created () {
    //this.handlePageList()
    console.log("create生命周期触发")
  },
  mounted () {
    // this.get()
    this.getUserInfo()
    this.addEventListeners()
    // this. initAudio()
    const music = this.$refs.audio  // 音频所在对象
    const musicBar = this.$refs.runbar  // 颜色进度条所在对象
    const musicWidth = this.$refs.runfatbar.offsetWidth // 底部进度条总宽
    // console.log(this.$refs.audio)
    // console.log(this.$refs.runbar)
    // console.log(this.$refs.runfatbar.offsetWidth)
    // 初始化音频信息
    music.addEventListener('canplay', () => {
      const musicTime = music.duration; // 获得音频时长
      const branch = Math.floor(musicTime / 60); // 计算音频分钟
      const second = Math.ceil(musicTime % 60); // 计算音频秒

      if(branch < 10 && second < 10){  // 四种情况判断音频总时间
        this.dTime = `0${branch}:0${second}`
      }else if(branch < 10){
        this.dTime = `0${branch}:${second}`
      }else if(second < 10){
        this.dTime = `${branch}:0${second}`
      }else{
        this.dTime = `${branch}:${second}`
      }
    })

    // 音频正在播放
    music.addEventListener('timeupdate',() => {
      const musicTime = music.duration // 获得音频时长
      const stopTime = music.currentTime // 获得已播放的音频时长

      musicBar.style.width = `${(stopTime / musicTime) * 100}%` // 计算进度条所在比例宽度
      const branch = Math.floor(stopTime / 60) // 计算已播放的音频分钟
      const second = Math.floor(stopTime % 60) // 计算已播放的音频秒

      if (branch < 10 && second < 10) { // 四种情况判断显示音频以播放时间
        this.cTime = `0${branch}:0${second}`
      } else if (branch < 10) {
        this.cTime = `0${branch}:${second}`
      } else if (second < 10) {
        this.cTime = `${branch}:0${second}`
      } else {
        this.cTime = `${branch}:${second}`
      }
    })

    // 移动端监听进度条触摸拖动
    musicBar.addEventListener('touchmove',(event) => {
      const events = event.targetTouches[0].pageX // 获得触摸拖动的距离
      musicBar.style.width = `${(events / musicWidth) * 100}%` // 计算进度条所在比例宽度
      music.pause(); // 触摸拖动时停止播放
    })

    // 移动端监听进度条触摸拖动结束
    musicBar.addEventListener('touchend',() => {
      const touwidth = (musicBar.offsetWidth / musicWidth) // 计算进度条所在比例
      music.currentTime = music.duration * touwidth // 通过所在比例赋值给音频应在的播放时间
      music.play() // 根据播放时间开始播放
      this.play = true // 更改播放暂停按钮为播放
    })
  },
  beforeDestroyed() {
    this.removeEventListeners()
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
