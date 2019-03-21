<template>
  <div class="aside">
    <!-- 榜单名称 -->
    <div class="aside-title">
       <el-button class="aside-title-button" type="info" plain>创建的歌单</el-button>
       <Dialog></Dialog>
    </div>
    <!-- 榜单名称 -->
    <div class="aside-history">
        <a href="" v-for="(item,index) in lists" :key="index" class="aside-history-list">
            <img :src="item.imgUrl">
            <div class="aside-history-list-div">
                <h5>{{ item.name }}</h5>
                <p>{{ item.number }}首</p>
            </div>
        </a>
    </div>
  </div>
</template>

<script>
import Dialog from '../components/Dialog.vue'
export default {
  name: 'Aside',
  props: {
    msg: String
  },
  components: {
    Dialog
  },
  data () {
    return {
      lists: [
        {
          listUrl:'',
          imgUrl: 'http://img.hb.aicdn.com/22ded455284aab361b8d2056e82f74a891a019704296a-PSraEB_fw658" alt="',
          name: '我喜欢的音乐',
          number: '9'
        },
        {
          listUrl:'',
          imgUrl: 'http://img.hb.aicdn.com/22ded455284aab361b8d2056e82f74a891a019704296a-PSraEB_fw658" alt="',
          name: '轻音乐',
          number: '10'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.aside {
  width: 300px;
  padding-left: 20px;
  border: 1px #ccc solid;
}
.aside-title {
  line-height: 40px;
  margin-bottom: 20px;
  font-size: 20px;
  padding: 20px 0 0 20px;
  display: flex;
  display: -webkit-flex;
  border-bottom: 1px solid #000;
}
.aside-title-button {
  border: none;
}
.aside-title-a {
  flex-grow: 1;
  text-align: right;
}
.el-icon-circle-plus {
  font-size: 20px;
  line-height: 30px;

}
.aside-history {
  width: 100%;
  padding: 20px;
}

.aside-history-list {
  display: flex;
  display: -webkit-flex;
  background-color: #f9f9f9;
  color: #000;
  text-decoration: none;
}
.aside-history-list:hover {
   background-color: #e6e6e6;
}
.aside-history-list img{
  height: 62px;
  width: 62px;
  border: 1px #ccc solid;
}

.aside-history-list-div {
  flex-grow: 1;
  margin-left: 5px;
}

.aside-history-list-div h5 {
  color: #000;
}

.aside-history-list-div p {
  color: #999;;
}
.aside {
    padding: 10px;
}

.aside-title {
    padding: 0;
    border-bottom: none;
    margin-top: 20px;
}

.aside-title h4 {
    margin: 0;
    color: #000;
    flex-grow: 1;
}
.aside-history {
    padding: 0;
}

/* 歌曲榜单 */
.top-list {
    width: 100%;
}
.top-list-top {
    height: auto;
}
.top-list-top img{
    width: 150px;
    height: 150px;
}

.top-list-right {
    margin: 50px 0 0 15px;
}

.top-list-btns {
    display: flex;
    display: -webkit-flex;
    margin-top: 30px;
}
.top-list-btns > a{
    display: inline-block;
    width: 90px;
    height: 30px;
    border: 1px #ccc solid;
    margin: 2px;
    font-size: 12px;
    line-height: 30px;
    text-align: center;
    border-radius: 5px;
    text-decoration: none;
}

.u-title {
    width: 100%;
    height: 30px;
    display: flex;
    display: -webkit-flex;
    margin-top: 50px;
}

.u-title > div {
    width: 50%;
    text-align: center;
}
</style>
