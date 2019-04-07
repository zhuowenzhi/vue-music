<template>
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
          <span class="iconfont" :class="iconPlay" @click="play()"></span>
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
      <div class="audio-flag">
          <div class="iconfont iconshoucang" @click="addLikeSong()"></div>
          <div class="iconfont" :class="iconVolt" @click="changedMuted()"></div>
          <div class="iconfont iconziyuanldpi"></div>
          <div class="iconfont iconlist-2-copy"></div>
      </div>
      <audio ref="audio" id="audio" :src="audio.audioSrc" @timeupdate="updateTime"></audio>
    </div>
</div>
 
</template>

<script>
import { setTimeout } from 'timers'
import { mapState } from 'vuex'
export default {
  props: {},
  components: {
  },
  data () {
    return {
      iconVolt: 'iconshengyin',
      songReady: false,
      currentLyric: null,
      currentLineNum: 0,
      currentShow: 'cd',
      playingLyric: '',
      currentPage: 1,
      // page: 1,
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
      list: [],
      iconPlay: 'iconbofang1',
      dialogVisible: false,
      // currentTime: '00:00',
      // totalTime: '00:00',
      playing: false,
      // audioSrc: ' ',
      // imgUrl: '',
      // songName: '',
      // singerName: '',
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
      currentIndex: 0
    }
  },
  watch: {
    playing(newPlaying) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause()
      })
    }
  },
  computed: {

  },
  methods: {
    changedMuted () {
      this.$refs.audio.muted = !this.$refs.audio.muted
      if (this.$refs.audio.muted) {
        this.iconVolt = 'iconjingyin'
      } else {
        this.iconVolt = 'iconshengyin'
      }
      console.log(this.$refs.audio.muted)
    },
    // 添加喜欢的歌曲
    addLikeSong () {
       var _this = this
         _this.$axios.get('http://localhost:8088/music/kd/setLikeSong/',{
        params: {
          userId: _this.$cookieStore.getCookie('userId'),
          songId:  _this.audio.songId
        }
      }).then(function (res){
        console.log(res)
        console.log("喜欢")
      }).catch(function (error) {
        console.log(error)
      })
    },
    initAudio () {
      console.log('init ---->')
      var _this = this
      setTimeout( ()=> {
        _this.currentIndex = 0
        console.log('_this.list[0].id' + _this.list[0].id)
         _this.$axios.get('http://localhost:8088/music/kd/getSongById/',{
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
        _this.audio.totalTime = Math.floor(res.data.payload.time / 60) + ":" + (res.data.payload.time % 60 / 100).toFixed(2).slice(-2)
        _this.audio.currentTime = _this.$refs.audio.currentTime
        _this.audio.songId = res.data.payload.songid
      }).catch(function (error) {
        console.log(error)
      })
      }, 1000)
    },
    play (index, song) {
      this.currentIndex = index
      console.log("currentIndex.currentIndex:" + this.currentIndex)
      var _this = this
      if (!_this.playing) {
        _this.iconPlay = 'iconbofang'
        _this.$refs.audio.play()
        if (_this.$refs.audio.currentTime >= _this.$refs.audio.totalTime) {
          _this.$refs.audio.currentTime = _this.$refs.audio.totalTime
          _this.iconPlay = 'iconbofang1'
        }
        _this.playing = !_this.playing
        _this.$axios.get('http://localhost:8088/music/kd/getSongById/',{
        params: {
          userId: _this.$cookieStore.getCookie('userId'),
          songId: song.songid
        }
      }).then(function (res){
        _this.audio.audioSrc = res.data.payload.url
        _this.audio.imgUrl = res.data.payload.pic
        _this.audio.singerName = res.data.payload.singer
        _this.audio.songName = res.data.payload.name
        _this.audio.totalTime = Math.floor(res.data.payload.time / 60) + ":" + (res.data.payload.time % 60 / 100).toFixed(2).slice(-2)
        _this.audio.currentTime = _this.$refs.audio.currentTime
        _this.audio.songId = res.data.payload.songid
        if (_this.audioSrc !== _this.audioSrc) {
           _this.$axios.get('http://localhost:8088/music/kd/songLogTime/',{
            params: {
              userId: _this.$cookieStore.getCookie('userId'),
              playTime: _this.$refs.audio.currentTime
            }
          }).then(function (res) {
            console.log(res)
            console.log("触发提交时间")
          })
        }
      }).catch(function (error) {
        console.log(error)
      })
        console.log('bbobob')
      } else {
        _this.$refs.audio.pause()
        _this.iconPlay = 'iconbofang1'
        _this.audio.currentTime = 0
        _this.playing = !_this.playing
        console.log('ttttt')
      }
    },
    prev() {
      var _this = this
      if (_this.list.length === 1) {
        _this.loop()
      } else {
        _this.currentIndex = _this.currentIndex - 1
        if (_this.currentIndex === -1) {
          _this.currentIndex = _this.list.length - 1
        }
        console.log(_this.list[_this.currentIndex].url)
        console.log(_this.audio.currentTime)
        _this.audio.audioSrc = _this.list[_this.currentIndex].url
        _this.audio.imgUrl = _this.list[_this.currentIndex].pic
        _this.audio.singerName = _this.list[_this.currentIndex].singer
        _this.audio.songName = _this.list[_this.currentIndex].name
        _this.audio.totalTime = _this.list[_this.currentIndex].time
        _this.audio.currentTime = _this.list[_this.currentIndex].currentTime
        _this.audio.songId = _this.list[_this.currentIndex].songid
        _this.$refs.audio.play()
      }
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
        _this.currentIndex = _this.currentIndex + 1
        if (_this.currentIndex === _this.list.length) {
          _this.currentIndex = 0
        }
        console.log(_this.list[_this.currentIndex].url)
        console.log(_this.list[_this.currentIndex].time)
        _this.audio.audioSrc = _this.list[_this.currentIndex].url
        _this.audio.imgUrl = _this.list[_this.currentIndex].pic
        _this.audio.singerName = _this.list[_this.currentIndex].singer
        _this.audio.songName = _this.list[_this.currentIndex].name
        _this.audio.totalTime = _this.list[_this.currentIndex].time
        _this.audio.currentTime = _this.list[_this.currentIndex].currentTime
        _this.audio.songId = _this.list[_this.currentIndex].songid
        _this.$refs.audio.play()
      }
      console.log('next finish')
    },
    loop() {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
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
      // 喜欢的歌曲LikeSong
      // localhost:8088/music/kd/getLikeSongList?userId=3&pageNum=1&pageSize=10
      _this.$axios.get('http://localhost:8088/music/kd/getLikeSongList/', {
        params: {
        userId: _this.$cookieStore.getCookie('userId'),
        pageSize: _this.pageSize + 2,
        pageNum: _this.pageNum
        }
      }).then(function (res) {
        console.log(res)
        for (let i = 0; i < res.data.payload.list.length; i++) {
          _this.list.push({
            id: res.data.payload.list[i].id,
            number: i + 1,
            name: res.data.payload.list[i].name,
            songid: res.data.payload.list[i].songid,
            singer: res.data.payload.list[i].singer,
            pic: res.data.payload.list[i].pic,
            url: res.data.payload.list[i].url,
            time: Math.floor(res.data.payload.list[i].time / 60) + ":" + (res.data.payload.list[i].time % 60 / 100).toFixed(2).slice(-2),
            lrc: res.data.payload.list[i].lrc,
            currentPage: res.data.payload.currentPage,
            pageSize: res.data.payload.pageSize,
            pageNum: res.data.payload.pageNum
          })
        }
        _this.totalDataList = res.data.payload.total
        _this.pageNum = res.data.payload
        console.log( _this.list)
      })
    },
    // 点击进度条事件
    playMusic(e){
      const music = this.$refs.audio // 音频所在对象
      const barWidth = e.pageX / this.$refs.runfatbar.offsetWidth // 计算点击位置相对父元素总宽的比例
      this.$refs.runbar.style.width = `${barWidth * 100}%` // 进度条应所在的比例总宽
      music.currentTime = music.duration * barWidth // 计算点击时应播放所在的时间
      music.play(); // 播放音频
      this.play = true; // 更改播放暂停按钮为播放
    }
  },
  created () {
    this.handlePageList()
  },
  mounted () {
    this.addEventListeners()
    this. initAudio()
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
  beforeDestroyed () {
    this.removeEventListeners()
  }
}
</script>

<style lang="scss" scoped>
.iconfont {
  font-size: 20px;
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
</style>
