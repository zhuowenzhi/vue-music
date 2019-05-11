<template>
  <div id="mymusic">
    <div id="nav">
      <NavMenu></NavMenu>
    </div>
      <div class="main">
        <!-- <Aside></Aside> -->
         <div class="main-right">
           <div class="main-right-songinfo">
             <img :src="pic_url" alt="">
             <div class="main-right-songinfo-right">
                <div class="main-right-songinfo-listname">
                  <el-button type="danger">歌单</el-button>
                  <div class="song-list-name">收藏的歌曲</div>
                  <!-- <Dialog></Dialog> -->
                  <!-- <span>我喜欢的音乐</span> -->
                </div>
                <div class="main-right-songinfo--userinfo">
                  <img :src="pic_url" alt="">
                  <span>{{name}}</span>
                  <!-- <span>2017-04-25创建</span> -->
                </div>
                <div>
                  <!-- <el-button type="success" icon="el-icon-caret-right">播放</el-button> -->
                  <!-- <el-button type="info" icon="el-icon-tickets">信息按钮</el-button> -->
                </div>
                <!-- <div class="introduces" ref="desc"  :class="showTotal ? 'total-introduce' : 'detailed-introduce'">
                  <div class="intro-content" :title="introduce" ref="desc">
                    <span class="merchant-desc" v-if="introduce">
                      {{introduce}}
                    </span>
                    <div class="unfold" @click="showTotalIntro" v-if="showExchangeButton">
                      <p>{{exchangeButton ? '展开' : '收起'}}</p>
                    </div>
                  </div>
                </div> -->
             </div>
           </div>
           <h1>收藏的歌曲</h1>
           <!-- <SongTable :send-params="sendParams" :params="params"></SongTable> -->
           <SongList :send-params="sendParams" :params="params"></SongList>
        </div>
      </div>
  </div>
</template>

<script>
import NavMenu from '../components/NavMenu.vue'
// import SongTable from '../components/SongTable.vue'
import SongList from '../components/SongList.vue'
export default {
  name: 'UserSong',
  show: false,
  components: {
    NavMenu,
    // SongTable
    SongList
  },
  data () {
    return {
      introduce: '拥有财富、名声、权力，这世界上的一切的男人--哥尔·D·罗杰，在被行刑受死之前说了一句话，让全世界的人都涌向了大海。“想要我的宝藏吗？如果想要的话，那就到海上去找吧，我全部都放在那里。”，世界开始迎接“大海贼时代”的来临。拥有财富、名声、权力，这世界上的一切的男人 “海贼王”哥尔·D·罗杰，在被行刑受死之前说了一句话，让全世界的人都涌向了大海。“想要我的宝藏吗？如果想要的话，那就到海上去找吧，我全部都放在那里。”，世界开始迎接“大海贼时代”的来临。',
      showTotal: false,
      exchangeButton: true,
      showExchangeButton: true,
      rem: '',
      list: [],
      name:'',
      pic_url: 'http://localhost:8088/music/image/user.jpg',
      sendParams: {
        url: this.baseUrl + 'kd/getLikeSongList/',
      },
      params: {
        userId: this.$cookieStore.getCookie('userId'),
        pageSize: 20,
        pageNum: 1
      }
    }
  },
  methods: {
    showTotalIntro () {
      this.showTotal = !this.showTotal
      this.exchangeButton = !this.exchangeButton
    },
    getRem () {
      console.log('getRem')
      const defaultRem = 15
      let winWidth = window.innerWidth
      console.log('winWidth' + winWidth)
      let rem = winWidth / 375 * defaultRem
      return rem
    },
    getUSerInfo () {
      this.name = this.$cookieStore.getCookie('name')
    }
  },
  created () {
    this.getUSerInfo()
    this.$emit('public_audio', true)
  },
  watch: {
    currentSong(newSong, oldSong) {
      this.$nextTick(() => {
        if (newSong.id !== oldSong.id) {
          this.$refs.audio.play()
        }
      })
    },
    'introduce': function () {
      this.$nextTick(function () {
        console.log('nextTick')
        // 判断介绍是否超过四行
        let rem = parseFloat(this.getRem())
        console.log('watch 中的rem', rem)
        if (!this.$refs.desc) {
          console.log('desc null')
          return
        }
        let descHeight = window.getComputedStyle(this.$refs.desc).height.replace('px', '')
        console.log('descHeight:' + descHeight)
        console.log('如果 descHeight 超过' + (5.25 * rem) + '就要显示展开按钮')
        if (descHeight > 5.25 * rem) {
          console.log('超过了四行')
          // 显示展开收起按钮
          this.showExchangeButton = true
          this.exchangeButton = true
          // 不是显示所有
          this.showTotal = false
        } else {
          // 不显示展开收起按钮
          this.showExchangeButton = false
          // 没有超过四行就显示所有
          this.showTotal = true
          console.log('showExchangeButton', this.showExchangeButton)
          console.log('showTotal', this.showTotal)
        }
      }.bind(this))
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 1080px;
  display:flex;
  margin: 0 auto 100px;
}
.main-right {
  flex-grow: 1;
  border-right: 1px #ccc solid;
}
.main-right h1{
  border-bottom: 2px red solid;
  padding-bottom: 20px;
}
.main-right-songinfo {
  padding: 30px;
}
.main-right-songinfo-listname {
  display: flex;
  display: -webkit-flex;
  height: 40px;
  line-height: 40px;
}
.main-right-songinfo-listname span{
  margin: 10px ;
  font-size: 18px;
}
.song-list-name {
  margin: 0 10px;
}
.main-right-songinfo-right{
  flex-grow: 1;
  padding: 20px;
}
.main-right-songinfo-right > div {
  margin-top: 15px;
}
.main-right-songinfo img{
  width: 250px;
  height: 250px;
}
.main-right-songinfo, .main-right-songinfo--userinfo {
  display: flex;
  display: -webkit-flex;
  flex-grow: 1;
}
.main-right-songinfo--userinfo {
  height: 50px;
  line-height: 50px;
}

.main-right-songinfo--userinfo span{
  margin-left: 10px;
}
.main-right-songinfo--userinfo img{
  width: 50px;
  height: 50px;
}
.my-audio {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
}
.introduces {
  width: 100%;
  overflow: hidden;
  border: 1px solid #ccc;
}

.total-introduce {
  height: auto;
  overflow: hidden;
  font-size: 14px;
  color: #434343;
  margin: 10px;
  .intro-content {
    .merchant-desc {
      width: 100%;
      line-height: 21px;
    }
  }
  .unfold {
    display: block;
    z-index: 11;
    float: right;
    width: 40px;
    height: 21px;
    p {
      margin: 0;
      line-height: 21px;
      color: #7fbe87;
    }
  }
}
.detailed-introduce {
  font-size: 14px;
  color: #434343;
  position: relative;
  overflow: hidden;
  .intro-content {
    // 最大高度设为4倍的行间距
    max-height: 84px;
    line-height: 21px;
    word-wrap: break-word;
    /*强制打散字符*/
    word-break: break-all;
    /*同背景色*/
    color: #ffffff;
    overflow: hidden;
    .merchant-desc {
      padding: 10px;
      width: 100%;
      line-height: 21px;
    }
    &:after,
    // 这是展开前实际显示的内容
    &:before {
      content: attr(title);
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      color: #434343
      // overflow: hidden;
    }
    // 把最后最后一行自身的上面三行遮住
    &:before {
      display: block;
      overflow: hidden;
      z-index: 1;
      max-height: 63px;
      background: #ffffff;
    }
    &:after {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      height: 81px;
      /*截取行数*/
      -webkit-line-clamp: 4;
      text-overflow: ellipsis;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      /*行首缩进字符数，值为[(截取行数-1)*尾部留空字符数]*/
      text-indent: -12em;
      /*尾部留空字符数*/
      padding-right: 4em;
    }
    .unfold {
      z-index: 11;
      width: 40px;
      height: 21px;
      outline: 0;
      position: absolute;
      right: 0;
      bottom: 0;
      p {
        margin: 0;
        line-height: 21px;
        color: #7fbe87;
      }
    }
  }
}
</style>
