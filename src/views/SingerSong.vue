<template>
  <div id="mymusic">
    <div id="nav">
      <NavMenu></NavMenu>
    </div>
      <div class="main">
        <!-- <Aside></Aside> -->
         <div class="main-right">
           <div class="main-right-songinfo">
             <h2>{{name}}</h2>
             <img :src="picurl">
           </div>
           <h1>歌曲列表</h1>
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
import { setTimeout } from 'timers'
export default {
  name: 'SingerSong',
  show: false,
  components: {
    NavMenu,
    // SongTable,
    SongList
  },
  data () {
    return {
      pageSize: 10,
      pageNum: 1,
      name: '',
      picurl : '',
      sendParams: {
        url: this.baseUrl + '/rank/getAllSongBySingerId/',
      },
      params: {
        singerId: this.$route.query.singerId,
        pageSize: 20,
        pageNum: 1
      }
    }
  },
  methods: {
    //   获取歌手名称和图片
    getSingerInfo () {
      setTimeout(() => {
        var _this = this
       _this.$axios.get(this.baseUrl+ 'rank/getSingerInfo/', {
        params: {
          singerId: _this.$route.query.singerId
        }
      }).then(function (res) {
        console.log(res)
        _this.name = res.data.payload.name
        _this.picurl = res.data.payload.picurl
      }).catch(function (error) {
        console.log(error)
      })
      },1000)
    }
  },
  created () {
    this.getSingerInfo ()
  },
  watch: {
    currentSong(newSong, oldSong) {
      this.$nextTick(() => {
        if (newSong.id !== oldSong.id) {
          this.$refs.audio.play()
        }
      })
    },
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
.main-right-songinfo h2 {
    margin: 20px 0;
}
.main-right-songinfo {
  padding: 30px;
}

.main-right-songinfo img{
  width: 1200px;
  height: 400px;
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
