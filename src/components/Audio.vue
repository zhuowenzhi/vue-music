<template>
<div id="audio">
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
import {mapGetters} from 'vuex'
import { constants } from 'crypto'
import bus from '../common/js/bus.js'
export default {
  computed: {
    ...mapGetters([
      // playlist控制播放器的显示
      'playlist',
    ])
  },
  data () {
    return {
      currentSongList: [],
      iconVolt: 'iconshengyin',
      currentLyric: null,
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
      currentIndex: 0
    }
  },
  watch () {
    // playing(newPlaying) {
    //   const audio = this.$refs.audio
    //   this.$nextTick(() => {
    //     newPlaying ? audio.play() : audio.pause()
    //   })
    // },
    // 获取点击SongList传来的歌曲信息
      bus.$on('selectItem', (index, song) => {
        this.selectSong.index = index
        const currentSong = JSON.parse(sessionStorage.getItem('currentSong'))
        console.warn(currentSong)
        this.audioInfo(currentSong)
        this.selectSong.song = song
        console.log(this.selectSong)
      })
  },
  methods: {
    // 获取点击SongList传来的歌曲信息
    getSelectItem () {
      bus.$on('selectItem', (index, song) => {
        this.selectSong.index = index
        const currentSong = JSON.parse(sessionStorage.getItem('currentSong'))
        console.warn(currentSong)
        this.audioInfo(currentSong)
        this.selectSong.song = song
        console.log(this.selectSong)
      })
    },
    // 初始化audio
    initAudio () {
      this.currentSongList = JSON.parse(sessionStorage.getItem('currentSongList'))
      this.list = this.currentSongList 
      let song = this.currentSongList[0]
      sessionStorage.setItem('currentSong', JSON.stringify(song))
      const currentSong = JSON.parse(sessionStorage.getItem('currentSong'))
      console.log(currentSong)
      this.audioInfo(currentSong)
    },
    // 将数据加入audio
    audioInfo (song) {
      var _this = this
      _this.audio.audioSrc = song.url
      _this.audio.imgUrl = song.pic
      _this.audio.singerName = song.singer
      _this.audio.songName = song.name
      _this.audio.totalTime = Math.floor(song.time / 60) + ":" + (song.time % 60 / 100).toFixed(2).slice(-2)
      _this.audio.currentTime = song.currentTime
      _this.audio.songId = song.songid
      _this.$refs.audio.src = song.audioSrc
    },
    play (index, song) {
      index && (this.currentIndex = index)
      console.log("currentIndex.currentIndex:" + this.currentIndex)
      var _this = this
      //发送日志1
      _this.sendLog(_this.audio.songId, _this.audio.currentTime)
      _this.audio.audioSrc = song.url
      _this.audio.imgUrl = song.pic
      _this.audio.singerName = song.singer
      _this.audio.songName = song.name
      _this.audio.totalTime = song.time
      _this.audio.currentTime = _this.$refs.audio.currentTime
      _this.audio.songId = song.songid
      //发送数据到后台
      _this.$axios.get(this.baseUrl + 'kd/getSongById/', {
        params: {
          userId: _this.$cookieStore.getCookie('userId'),
          songId: song.songid
        }
      }).then(function (res) {
         if (!_this.playing) {
          _this.playing = !_this.playing
          _this.iconPlay = 'iconbofang'
        }
        _this.$refs.audio.play()
        
      }).catch(function (error) {
        console.log(error)
      })
    },
    // 切换静音
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
         _this.$axios.get(this.baseUrl + 'kd/setLikeSong/',{
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
    // 点击发送播放时间
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
    // 上一首
    prev() {
      var _this = this
      if (_this.list.length === 1) {
        _this.loop()
      } else {
      //发送日志1
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
        //发送日志1
      _this.sendLog(_this.audio.songId, _this.audio.currentTime)
      
        let index = ++_this.currentIndex;
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
      console.log("currentIndex.currentIndex:" + this.currentIndex)
      var _this = this
      if(!_this.playing) {
        _this.playing = !_this.playing
      }
      // if (!_this.playing) {
      _this.iconPlay = 'iconbofang'
      // _this.$refs.audio.play()
      if (_this.$refs.audio.currentTime >= _this.$refs.audio.totalTime) {
        _this.$refs.audio.currentTime = _this.$refs.audio.totalTime
        _this.iconPlay = 'iconbofang1'
      }

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

  mounted () {
    setTimeout( ()=> {
      this.initAudio()
    },1000)
    this.addEventListeners()
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
#audio {
  position: fixed;
  bottom: 0;
  z-index: 10;
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
