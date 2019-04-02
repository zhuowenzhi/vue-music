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
          <div class="audio-play-bar"></div>
      </div>
      <div class="audio-time">
          <span>{{ currentTime }}</span>
          <span>/</span>
          <span>{{ totalTime }}</span>
      </div>
      <div class="audio-flag">
          <div class="iconfont iconshengyin"></div>
          <div class="iconfont iconziyuanldpi"></div>
          <div class="iconfont iconlist-2-copy"></div>
      </div>
      <audio ref="audio" id="audio" :src="audioSrc" @timeupdate="updateTime"></audio>
    </div>
</div>
 
</template>

<script>
export default {
  props: {},
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
      list: [],
      iconPlay: 'iconbofang1',
      dialogVisible: false,
      currentTime: '00:00',
      totalTime: '00:00',
      playing: false,
      audioSrc: 'http://music.163.com/song/media/outer/url?id=218153',
      imgUrl: 'http://img.hb.aicdn.com/22ded455284aab361b8d2056e82f74a891a019704296a-PSraEB_fw658" alt="',
      songName: '你离开的事实',
      singerName: 'zzz',
      audio: {
        currentTime: 0,
        maxTime: 0,
        playing: false,
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
      }
    }
  },
  methods: {
    play (song) {
      console.log(song)
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

    // 歌曲切换上一首下一首
    pre () {
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex - 1
      if (index === -1) {
        index = this.playList.length - 1
      }
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.togglePlay () 
      }
      this.songReady = false
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
      })
    },
  },
  created () {
    this.handlePageList()
  },
  mounted () {
    this.addEventListeners()
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
</style>
