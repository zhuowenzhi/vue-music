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
    <div class="song-list" v-show="showList">
      <ul class="song-list-ul" v-for="(song, index) in currentSongList" :key="index">
        <li><span class="song-list-li-index">{{index + 1}}</span><span class="iconfont iconbofang1" @click="selectItem(index, song)"></span><span>{{song.name}}</span></li>
      </ul>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>对不起，您搜索的歌曲不存在！！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
</div>
 
</template>

<script>
import { setTimeout } from 'timers'
import { mapState } from 'vuex'
import { constants } from 'crypto'
import bus from '../common/js/bus.js'
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
      dialogVisible: false,
      totalDataList: 0,
      currentPage: 1,
      pageSize: 10,
      pageNum: 1,
      list: [],
      iconPlay: 'iconbofang1',
      currentSongList: [],
      showList: false,
      paramsData: this.params,
    }
  },
  created () {
    this.handlePageList()
  },
  watch: {
    'params.rankId' () {
      console.log('监听不同排行榜书籍')
      console.log(this.params.rankId)
      this.handlePageList()
    },
    'params.songName' () {
      console.log('监听不同搜索歌曲')
      console.log(this.params.songName)
      this.handlePageList()
    }
  },
 
  methods: {
     // 搜索无结果时
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 点击列表播放按钮
    selectItem (index, song) {
      localStorage.setItem('currentSong', JSON.stringify(song))
      const currentSong = JSON.parse(localStorage.getItem('currentSong'))
      bus.$emit('selectItem', index, song)
    },
    // 分页的条数
    handleSizeChange (size) {
      var _this = this
      _this.params.pageNum = size
      _this.handlePageList()
    },
    // 分页的当前页码
    handleCurrentChange (currentPage) {
      var _this = this
      _this.params.pageNum = currentPage
      _this.list = []
      _this.currentSongList = []
      _this.handlePageList()
    },
    // 分页的数据
    handlePageList () {
      
      this.loading = true
      var _this = this
      _this.$axios.get(_this.sendParams.url, {
        params: _this.paramsData
      }).then(function (res) {
        let songList = []
        if (res.data.payload.list.length == 0 ) {
          _this.dialogVisible = true
        }
        for (let i = 0; i < res.data.payload.list.length; i++) {
          songList.push({
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

        localStorage.setItem('currentSongList', JSON.stringify(songList))
        _this.currentSongList = JSON.parse(localStorage.getItem('currentSongList'))
        console.log("要播放的列表_this.currentSongList")
         // 开始时间
        var start = new Date().getTime()
        console.log(_this.currentSongList)
        _this.list = []
        _this.list = _this.currentSongList
        // 结束时间
        var end = new Date().getTime()
        console.log('end - start')
        console.log(end - start)
        _this.totalDataList = res.data.payload.total
        _this.params.pageNum = res.data.payload.pageNum
      })
    }
  },
  mounted () {
    bus.$on('showList', () => {
     this.showList = !this.showList
    })
  }
}
</script>

<style lang="scss" scoped>
.iconfont {
  font-size: 20px;
}
.song-list {
  width: 400px;
  position: fixed;
  bottom: 70px;
  right: 0;
  background-color:rgba(0, 0, 0, 0.8);
  color: #fff;
}
.song-list-ul {
  padding: 10px;
}

.song-list-ul li {
  margin: 2px 0;
}
.song-list-ul li span {
  padding: 0 8px;
}
.song-list-li-index {
  font-size: 20px;
}
</style>
