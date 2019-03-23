<template>
  <div id="search">
    <NavMenu></NavMenu>
    <el-input
      placeholder="请输入内容"
      v-model="input23">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
    <SongTable></SongTable>
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
      input23: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.el-input {
  width: 80%;
  margin: 20px auto;
}
</style>
