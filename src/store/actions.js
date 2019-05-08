// 异步操作
import * as types from './mutation-types'

export const selectPlay = function ({ commit, state }, { list, index }) {
  commit(types.SET_SONG_NAME, list)
  commit(types.SET_SINGER_NAME, list)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_SEQUENCE_LIST, list)
}
