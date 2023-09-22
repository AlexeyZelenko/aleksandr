// import Swal from 'sweetalert2'

export default {
  getUid () {
    const user = new this.$fireAuthObj().currentUser
    return user ? user.uid : null
  },
  async ADD_TO_FAVORITE ({ dispatch, commit }, payload) {
    const uid = await dispatch('getUid')

    if (uid) {
      try {
        const userRef = this.$fireStore.collection('users').doc(uid)
        const userSnapshot = await userRef.get()
        const userData = userSnapshot.data()

        if (userData) {
          userData.listFavoriteSongs.push(payload)
          await userRef.set(userData)
          commit('USER_INFO', userData)
        }
      } catch (error) {
        // Обробка помилок
        // eslint-disable-next-line no-console
        console.error('Помилка при додаванні до обраного:', error)
      }
    }
  },

  async REMOVE_FROM_FAVORITE ({ dispatch, commit }, itemDelete) {
    const uid = await dispatch('getUid')

    if (uid) {
      try {
        const userRef = this.$fireStore.collection('users').doc(uid)
        const userSnapshot = await userRef.get()
        const userData = userSnapshot.data()

        if (userData) {
          userData.listFavoriteSongs = userData.listFavoriteSongs.filter(
            item => item !== itemDelete
          )

          await userRef.update(userData)
          commit('USER_INFO', userData)
        }
      } catch (error) {
        // Обробка помилок
        // eslint-disable-next-line no-console
        console.error('Помилка при видаленні з обраного:', error)
      }
    }
  }

}
