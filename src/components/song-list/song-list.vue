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
        <span class="iconfont iconbofang1" @click="selectItem(song.$index, song.row)"></span>
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
</div>
 
</template>

<script>
import { setTimeout } from 'timers'
import { mapState } from 'vuex'
import { constants } from 'crypto';
export default {
  props: {
    sendParams: {
      type: Object
    },
    params: {
      type: Object
    }
  },
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
      currentIndex: 0
    }
  },

  methods: {
    selectItem (index, song) {
        this.$emit('select', index, song)
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
      _this.$axios.get(_this.sendParams.url, {
        params: _this.params
      }).then(function (res) {
        _this.list = [];
        for (let i = 0; i < res.data.payload.list.length; i++) {
          _this.list.push({
            id: res.data.payload.list[i].id,
            number: i + 1,
            name: res.data.payload.list[i].name,
            songid: res.data.payload.list[i].songid,
            singer: res.data.payload.list[i].singer,
            pic: res.data.payload.list[i].pic,
            url: res.data.payload.list[i].url,
            time: Math.floor(res.data.payload.list[i].time / 60) + ':' + (res.data.payload.list[i].time % 60 / 100).toFixed(2).slice(-2),
            lrc: res.data.payload.list[i].lrc
          })
        }
        _this.totalDataList = res.data.payload.total
        _this.pageNum = res.data.payload.pageNum
        //_this.audioSrc = _this.list[0].url
        var song = _this.list[0]
        _this.audio.audioSrc = song.url
        _this.audio.imgUrl = song.pic
        _this.audio.singerName = song.singer
        _this.audio.songName = song.name
        _this.audio.totalTime = song.time
        _this.audio.currentTime = 0
        _this.audio.songId = song.songid
      })
    },
  },
  created () {
    this.handlePageList()
  }
}
</script>

<style lang="scss" scoped>

.iconcollection {
  color: red;
}
</style>
