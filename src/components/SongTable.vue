<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="number"
      label=""
      width="180">
    </el-table-column>
    <el-table-column
      prop="title"
      label="歌曲标题"
      width="180">
    </el-table-column>
    <el-table-column
      prop="time"
      label="时长">
    </el-table-column>
    <el-table-column
      prop="singer"
      label="歌手">
    </el-table-column>
    <el-table-column
      prop="album"
      label="专辑">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'SongTable',
    data() {
      return {
        tableData: [{
          number: '1',
          title: '你离开的事实',
          time: '04:03',
          singer: '任贤齐',
          album: 'My view'
        }, {
          number: '2',
          title: '你离开的事实',
          time: '04:03',
          singer: '任贤齐',
          album: 'My view'
        }, {
          number: '3',
          title: '你离开的事实',
          time: '04:03',
          singer: '任贤齐',
          album: 'My view'
        }, {
          number: '3',
          title: '你离开的事实',
          time: '04:03',
          singer: '任贤齐',
          album: 'My view'
        }, {
          number: '3',
          title: '你离开的事实',
          time: '04:03',
          singer: '任贤齐',
          album: 'My view'
        }, {
          number: '3',
          title: '你离开的事实',
          time: '04:03',
          singer: '任贤齐',
          album: 'My view'
        }, {
          number: '3',
          title: '你离开的事实',
          time: '04:03',
          singer: '任贤齐',
          album: 'My view'
        }, {
          number: '3',
          title: '你离开的事实',
          time: '04:03',
          singer: '任贤齐',
          album: 'My view'
        }, {
          number: '3',
          title: '你离开的事实',
          time: '04:03',
          singer: '任贤齐',
          album: 'My view'
        }, {
          number: '4',
          title: '你离开的事实',
          time: '04:03',
          singer: '任贤齐',
          album: 'My view'
        }]
      }
    }
  }
</script>


