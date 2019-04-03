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
        <span class="iconfont iconbofang1" @click="play(song.row)"></span>
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
      <img class="audio-img" :src="imgUrl" alt="">
      <div class="audio-play">
          <div class="audio-play-info">
              <span class="song-name">{{ songName }}</span>
              <span class="singer-name">{{ singerName }}</span>
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
          <span>{{ currentTime }}</span>
          <span>/</span>
          <span>{{ totalTime }}</span>
      </div>
      <div class="audio-flag">
          <div class="iconfont iconcollection"></div>
          <div class="iconfont iconshengyin"></div>
          <div class="iconfont iconziyuanldpi"></div>
          <div class="iconfont iconlist-2-copy"></div>
      </div>
      <audio ref="audio" id="audio" :src="audioSrc" @timeupdate="updateTime"></audio>
    </div>
</div>
 
</template>

<script>
import { setTimeout } from 'timers';

export default {
  props: {},
  data () {
    return {
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
      currentTime: '00:00',
      totalTime: '00:00',
      playing: false,
      audioSrc: ' ',
      imgUrl: '',
      songName: '',
      singerName: '',
      audio: {
        currentTime: 0,
        maxTime: 0,
        // playing: false,
        muted: false,
        speed: 1,
        waiting: true,
        preload: 'auto'
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
  watch: {
    currentSong(newSong, oldSong) {
      // 当列表没有歌曲时 直接return
      if (!newSong.id) return

      if (newSong === oldSong) {
        return
      }

      // 防止歌词切换跳动
      if (this.currentLyric) {
        this.currentLyric.stop()
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$refs.audio.play()
        this.getLyric()
      }, 1000)
    },
    playing(newPlaying) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause()
      })
    }
  },
  methods: {
    initAudio () {
      var _this = this
      setTimeout( ()=> {
        _this.imgUrl = _this.list[0].pic
        _this.singerName = _this.list[0].singer
        _this.songName = _this.list[0].name
        _this.totalTime = _this.list[0].time
        _this.currentTime = _this.$refs.audio.currentTime
        _this.audioSrc =  _this.list[0].url
      }, 1000)
    },
    play (song) {
      this.audioSrc = song.url
      this.imgUrl = song.pic
      this.singerName = song.singer
      this.songName = song.name
      this.totalTime = song.time
      this.currentTime = this.$refs.audio.currentTime
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
    },
    prev() {
      if (!this.songReady) {
        return
      }
      if (this.list.length === 1) {
        this.loop()
      } else {
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.list.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlay()
        }
      }
      this.songReady = false
    },
    next() {
      if (!this.songReady) {
        return
      }
      // 列表只有一首歌曲则单曲循环
      if (this.list.length === 1) {
        this.loop()
      } else {
        let index = this.currentIndex + 1
        if (index === this.list.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlay()
        }
      }
      this.songReady = false
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
      this.currentTime = Math.floor(e.target.currentTime / 60) + ":" + (e.target.currentTime % 60 / 100).toFixed(2).slice(-2)
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
      console.log(self.timeDuration)
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
        // _this.list = JSON.parse(JSON.stringify( _this.list))
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
    console.log(this.$refs.audio)
    console.log(this.$refs.runbar)
    console.log(this.$refs.runfatbar.offsetWidth)
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
