// import Swal from 'sweetalert2'

export default {
  getUid () {
    const user = new this.$fireAuthObj().currentUser
    return user ? user.uid : null
  },
  async ADD_TO_FAVORITE ({ dispatch, commit }, payload) {
    const uid = await dispatch('getUid')
    if (uid) {
      const user = await this.$fireStore.collection('users')
        .doc(`${uid}`)
        .get()
        .then((snapshot) => {
          // do something with document
          return snapshot.data()
        })

      await this.$fireStore.collection('users')
        .doc(`${uid}`)
        .set({
          ...user,
          listFavoriteSongs: [...user.listFavoriteSongs, payload]
        })

      await this.$fireStore.collection('users')
        .doc(uid)
        .get()
        .then((snapshot) => {
          const document = snapshot.data()
          // do something with document
          commit('USER_INFO', document)
        })
    }
  },
  async REMOVE_FROM_FAVORITE ({ dispatch, commit }, itemDelete) {
    const uid = await dispatch('getUid')
    if (uid) {
      const cartUser = await this.$fireStore.collection('users')
        .doc(uid)
        .get()
        .then((snapshot) => {
          const document = snapshot.data()
          // do something with document
          return document.listFavoriteSongs
        })

      const newcartInfo = cartUser.filter(item => item.arrayImagesViews !== itemDelete.arrayImagesViews)
      const user = { ...this.user }

      user.listFavoriteSongs = newcartInfo

      this.$fireStore.collection('users')
        .doc(uid)
        .update(user)
        .then(() => {})

      await this.$fireStore.collection('users')
        .doc(uid)
        .get()
        .then((snapshot) => {
          const document = snapshot.data()
          // do something with document
          commit('USER_INFO', document)
        })
    } else {
      // commit('REMOVE_FROM_CART', itemDelete)
    }
  }
}
