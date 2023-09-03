const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  user: state => {
    const user = sessionStorage.getItem('user')
    if (user) {
      console.log('sess')
      return JSON.parse(user)
    } else {
      console.log('state')

      return state.user.user
    }
  }
}
export default getters
