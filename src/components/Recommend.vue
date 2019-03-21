<template>
  <div class="recommend">
  
     <div class="main-row" >
        <a :href="item.recommendUrl" v-for="(item, index) in objectRecommends" :key="index" class="main-row-col">
            <div class="main-row-col-img">
                <img :src="item.imgUrl" alt="">
                <div class="main-row-col-listeners">
                  <i class="el-icon-service"></i>
                  <span>{{item.person}}</span>
                  <i class="el-icon-caret-right"></i>
                </div>
            </div>
            <span class="main-row-col-span">{{item.title}}</span>
        </a>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Recommend',
  props: {
    msg: String
  },
  data () {
    return {
      objectRecommends: [
        {
          recommendUrl: '#',
          imgUrl: 'http://img.hb.aicdn.com/adbde61e4343dedd21e97ea7f22666825a8db7d077ffe-qn8Pjn_fw658',
          person: '1233',
          title: '话语速爆歌单1'
        },
        {
          recommendUrl: '#',
          imgUrl: 'http://img.hb.aicdn.com/adeed7d28df6e776c2fa6032579c697381d1a82b7fe00-fwRqgn_fw658',
          person: '1233',
          title: '话语速爆歌单2'
        },
        {
          recommendUrl: '#',
          imgUrl: 'http://img.hb.aicdn.com/ab7f48509b3c0353017d9a85ef1d12400c9b2724540d4-p3zouo_fw658',
          person: '1233',
          title: '话语速爆歌单3'
        },
        {
          recommendUrl: '#',
          imgUrl: 'http://img.hb.aicdn.com/60f788fc2a846192f224b9e6d4904b30e54926211d3d67-ACFJ9G_fw658',
          person: '1233',
          title: '话语速爆歌单4'
        },
        {
          recommendUrl: '#',
          imgUrl: 'http://img.hb.aicdn.com/60f788fc2a846192f224b9e6d4904b30e54926211d3d67-ACFJ9G_fw658',
          person: '1233',
          title: '话语速爆歌单5'
        }
      ]
    }
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
