<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle">
      <div class="filter"></div>
    </div>
    <song-list @select="selectItem" :song="song"></song-list>
  </div>
</template>

<script>
import songList from 'base/song-list/song-list'
import mapActions from 'vuex'
export default {
  props: {
    props: {
      bgImage: {
            type: String,
            default: ''
      },
      songs: {
            type: Array,
            default: []
      },
      title: {
            type: String,
            default: ''
      }
    }
  },
  components: {
    songList
  },
  methods: {
    selectItem (index, song) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    ...mapActions([
      'selectPlay'
    ])
  }
}
</script>