// getters 是对数据的映射，映射到组件，可以是函数，根据state不同值计算

export const singer = state => state.singer

export const playing = state => state.playing

export const playList = state => state.playList

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {}
}
