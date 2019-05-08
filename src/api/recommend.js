import axios from 'axios'

export function getSongList () {
  const url = this.baseUrl + 'kd/recommendSong/'
  const params = {
    userId: this.$cookieStore.getCookie('userId'),
    pageNum: 1,
    pageSize: 20
  }
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
