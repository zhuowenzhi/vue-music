// state 是定义原始底层数据
import { playMode } from 'common/js/config'
const state = {
  singer: {},
  playing: false,
  // fullScreen: false,
  // 播放列表
  playlist: [],
  // 顺序列表
  sequenceList: [],
  // 播放模式
  mode: playMode.sequence,
  // 播放索引
  currentIndex: -1
}

export default state
