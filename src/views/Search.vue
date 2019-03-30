<template>
  <div class="search">
    <NavMenu></NavMenu>
    <div class="search-input" >
      <el-input placeholder="请输入歌曲名词">
        <i slot="prefix" class="el-input__icon el-icon-search" @click="get()"></i>
      </el-input>
    </div>
    <SongTable :list="list"></SongTable>
  </div>
</template>

<script>
import NavMenu from '../components/NavMenu.vue'
import SongTable from '../components/SongTable.vue'
export default {
  name: 'Search',
  components: {
    NavMenu,
    SongTable
  },
  data () {
    return {
      id: '',
      number: '',
      songid: '',
      name: '',
      singer: '',
      pic: '',
      url: '',
      time: '',
      lrc: '',
      list: []
    }
  },
  methods: {
    get () {
      var _this = this
      _this.$axios.get('http://localhost:8088/music/kd/getMusicSheetById?songlistId=2475637358&pageNum=1&pageSize=10').then(function (res) {
        for (let i = 0; i < res.data.payload.list.length; i++) {
          _this.list.push({
            id: res.data.payload.list[i].id,
            number: i + 1,
            songid: res.data.payload.list[i].songid,
            name: res.data.payload.list[i].name,
            singer: res.data.payload.list[i].singer,
            pic: res.data.payload.list[i].pic,
            url: res.data.payload.list[i].url,
            time: res.data.payload.list[i].time,
            lrc: res.data.payload.list[i].lrc
          })
        }
        console.log(_this.list)
        console.log(_this.list.length)
        console.log(_this.list.id)
      }, function () {
        console.log('请求失败处理')
      })
    },
    mounted () {
      this.get()
    }
  }
}
</script>

<style lang="scss" scoped>
.search-input {
  width: 80%;
  margin: 20px auto;
}
</style>
