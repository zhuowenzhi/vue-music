<template>
<div>
   <el-table 
    v-show="list.length > 0"
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
  <div class="index-pagination" v-show="list.length > 0">
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
import { constants } from 'crypto'
import bus from '../common/js/bus.js'
import { getSongList } from '../api/recommend'
export default {
  props: {
    sendParams: {
      type: Object
    },
    params: {
      type: Object
    }
  },
  data () {
    return {
      totalDataList: 0,
      currentPage: 1,
      pageSize: 10,
      pageNum: 1,
      list: [],
      iconPlay: 'iconbofang1',
      currentSongList: []
    }
  },
  created () {
    this.handlePageList()
    this._getSongList()
  },
  methods: {
    selectItem (index, song) {
      console.log("SongList--------------currentSong................")
      console.log(index)
      console.log(song)
      sessionStorage.setItem('currentSong', JSON.stringify(song))
      const currentSong = JSON.parse(sessionStorage.getItem('currentSong'))
      console.log(currentSong)
      console.log("SongList--------------currentSong................")
      bus.$emit('selectItem', index, song)
    },
    _getSongList () {
      getSongList().then((res) => {
        console.log(">>>>>>>>>>>getTopList>>>>>>>>>>>>")
        console.log(res)
      })
    },
    // 分页的条数
    handleSizeChange (size) {
      var _this = this
      _this.pageSize = size
      _this.handlePageList()
    },
    // 分页的当前页码
    handleCurrentChange (currentPage) {
      var _this = this
      _this.pageNum = currentPage
      _this.list = []
      _this.currentSongList = []
      _this.handlePageList()
    },
    // 分页的数据
    handlePageList () {
      
      this.loading = true
      var _this = this
      _this.$axios.get(_this.sendParams.url, {
        params: _this.params
      }).then(function (res) {
        let songList = res.data.payload.list
        sessionStorage.setItem('currentSongList', JSON.stringify(songList))
        _this.currentSongList = JSON.parse(sessionStorage.getItem('currentSongList'))
        console.log("要播放的列表_this.currentSongList")
        console.log(_this.currentSongList)
        _this.list = []
        for (let i = 0; i < _this.currentSongList.length; i++) {
          _this.list.push({
            id: _this.currentSongList[i].id,
            number: i + 1,
            name: _this.currentSongList[i].name,
            songid: _this.currentSongList[i].songid,
            singer: _this.currentSongList[i].singer,
            pic: _this.currentSongList[i].pic,
            url: _this.currentSongList[i].url,
            time: Math.floor(_this.currentSongList[i].time / 60) + ':' + (_this.currentSongList[i].time % 60 / 100).toFixed(2).slice(-2),
            lrc: _this.currentSongList[i].lrc
          })
        }
        _this.totalDataList = res.data.payload.total
        _this.pageNum = res.data.payload.pageNum
      })
    }
  },
 
}
</script>

<style lang="scss" scoped>
.iconfont {
  font-size: 20px;
}
</style>
