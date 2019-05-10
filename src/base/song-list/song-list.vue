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
export default {
  props: {},
  components: {
  },
  data () {
    return {
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
      _this.$axios.get(_this.baseUrl + 'kd/getMusicSheetById/', {
        params: {
          songlistId: _this.$route.query.songlistId,
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

  },
  
}
</script>

<style lang="scss" scoped>
.iconfont {
  font-size: 20px;
}

</style>
