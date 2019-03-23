<template>
     <div class="audio">
        <div class="audio-btns">
            <span class="iconfont iconshangyishou"></span>
            <span class="iconfont" :class="iconPlay" @click="togglePlay()"></span>
            <span class="iconfont iconxiayishou"></span>
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
            <span>00:00</span>
            <span>/</span>
            <span>00:00</span>
        </div>
        <div class="audio-flag">
            <div class="iconfont iconshengyin"></div>
            <div class="iconfont iconziyuanldpi"></div>
            <div class="iconfont iconlist-2-copy"></div>
        </div>
        <audio ref="audio" id="audio" :src="audioSrc"></audio>
    </div>
</template>

<script>
export default {
  name: 'Audio',
  props: {
    msg: String
  },
  data () {
    return {
      iconPlay: 'iconbofang1',
      dialogVisible: false,
      currentTime: 0,
      playing: false,
      audioSrc: ' http://music.163.com/song/media/outer/url?id=460578140',
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
    }
  }
}
</script>

<style scoped lang="scss">
 .audio-flag, .audio{
    display: flex;
    display: -webkit-flex;
    align-items: center;
}
.audio {
    height: 70px;
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
