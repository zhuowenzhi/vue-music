<template>
  <div class="recommend">
     <div class="main-row">
        <div v-for="(item, index) in list" ref="item.songlistid" @click="getId(item.songlistid)" :key="index" class="main-row-col">
            <div class="main-row-col-img">
                <img :src="item.songlistpic" alt="">
                <div class="main-row-col-listeners">
                  <i class="el-icon-service"></i>
                  <span>{{item.songlistplaycount}}</span>
                  <i class="el-icon-caret-right"></i>
                </div>
            </div>
            <span class="main-row-col-span">{{item.songlistname}}</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Recommend',
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
      pageSize: 12,
      pageNum: 1,
      currentPage: 1,
      value: {}
    }
  },
  methods: {
    getId (songlistid) {
      var _this = this
      _this.$axios.get('http://localhost:8088/music/kd/getMusicSheetById', {
        params: {
          songlistId: songlistid,
          pageSize: _this.pageSize,
          pageNum: _this.pageNum
        }
      }).then(function (res) {
        _this.$router.push({
          path: '/mymusic',
          name: 'MyMusic',
          query: {
            songlistId: songlistid
          }
        })
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  created () {
    this.Bus.$emit('txt', this.value)
  }
}
</script>

<style scoped lang="scss">
.recommend {
  width: 100%;
  margin: 30px auto;
}
.main-row {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
}
.main-row-col{
  width: 20%;
  height: 230px;
  margin: 2.5%;
}
.main-row-col-img {
  width: 100%;
  height: 190px;
  position: relative;
  border: 1px #ccc solid;
}

.main-row-col-img > img {
  width: 100%;
  height: 100%;
}

.main-row-col-img > div {
  width: 100%;
  height: 27px;
  position: absolute;
  bottom: 0;
  opacity: 0.5;
  color: #fff;
}

.main-row-col-span {
  font-size: 12px;
  max-width: 100%;
  display: inline-block;
  color: #000;
}

.main-row-col-listeners {
    background-color:rgba(0,0,0,0.8);
    color: #ccc;
    display: flex;
    display: -webkit-flex;
    padding: 0 5px;
}
.main-row-col-listeners span{
    flex-grow: 1;
    text-align: center;
    line-height: 27px;
}
.main-row-col-listeners i {
    font-size: 20px;
    line-height: 27px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
