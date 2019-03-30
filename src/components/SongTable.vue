<template>
  <el-table
    :data="list"
    stripe
    style="width: 100%">
    <el-table-column
      prop="number"
      label=""
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
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
  </el-table>
</template>

<script>
export default {
  name: 'SongTable',
  props: {
    list: {
      type: Array,
      default () {
        return ['']
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>
