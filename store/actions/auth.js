import Swal from 'sweetalert2'

export default {
  getUid () {
    const user = new this.$fireAuthObj().currentUser
    return user ? user.uid : null
  },
  async signInWithGoogle ({ commit, dispatch }) {
    try {
      const provider = new this.$fireAuthObj.GoogleAuthProvider()
      await this.$fireAuthObj().signInWithPopup(provider)
      const uid = await dispatch('getUid')

      await this.$fireAuth.setPersistence(
        this.$fireAuthObj.Auth.Persistence.LOCAL
      )

      // Получить информацию из Database текущего пользователя
      const info = (await this.$fireDbObj().ref(`/users/${uid}/info`).once('value')).val()
      // Если нет инфо, создать
      if (!info) {
        const user = this.$fireAuthObj().currentUser
        let array = []
        await user.providerData.forEach((profile) => {
          array = [profile.providerId, profile.uid, profile.displayName, profile.email, profile.photoURL]
          return array
        })
        await this.$fireDbObj().ref(`/users/${uid}/info`).set({
          SignInPprovider: array[0],
          Name: array[2],
          Email: array[3],
          PhotoURL: array[4],
          ProviderSpecificUID: array[1]
        })
      }

      // Получить корзину для ткущего пользователя
      await this.$fireStore.collection('users')
        .doc(uid)
        .get()
        .then((snapshot) => {
          const document = snapshot.data()
          // Если нет никаких данных
          if (!document) {
            this.$fireStore.collection('users')
              .doc(uid)
              .set({
                listFavoriteSongs: [],
                orderInfo: []
              })
            return document
          }
          // Если нет никаких данных-пользователь удалил
          if (document === {}) {
            this.$fireStore.collection('users').doc(uid).set({
              listFavoriteSongs: [],
              orderInfo: []
            })
            return document
          }
          return document.listFavoriteSongs
        })
      // Проверка администратора
      if (['6XUeVk6rJKcsFvkgIRHcKhWqx523', 'aB67CVm6SmTTAmQqL8Cj2Xpcl662', '0FvqtO9OJYcOM8ugqeJOVTVUlAY2']
        .some(elem => elem === `${uid}`)) {
        // Получение ТОКЕНА администратора
        // await dispatch('saveMessagingDeviceToken')

        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Адмін увійшов!',
          showConfirmButton: false,
          timer: 1500
        })
        // router.push('/admin')
      } else {
        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Ви війшли!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } catch (e) {
      commit('setError', e)
      throw e
    }

    const userEntrance = !!this.$fireAuthObj().currentUser
    const USER_ID = await dispatch('getUid')
    if (userEntrance) {
      const adminEntrance = await ['6XUeVk6rJKcsFvkgIRHcKhWqx523', 'aB67CVm6SmTTAmQqL8Cj2Xpcl662', '0FvqtO9OJYcOM8ugqeJOVTVUlAY2'].includes(USER_ID)
      commit('ADMIN_ENTRANCE', adminEntrance)

      const user = await this.$fireAuthObj().currentUser
      const userOnlain = user.providerData[0]

      commit('AUTH_USER', userOnlain)

      const uid = await dispatch('getUid')
      if (uid) {
        const user = await this.$fireStore.collection('users')
          .doc(`${uid}`)
          .get()
          .then((snapshot) => {
            // do something with document
            return snapshot.data()
          })
        commit('USER_INFO', user)
      }
    }
    commit('USER_ENTRANCE', userEntrance)
  },
  async logout ({ commit }) {
    await this.$fireAuthObj().signOut()
      .then(() => {
        const userEntrance = !!this.$fireAuthObj().currentUser

        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Ви успішно вийшли!',
          showConfirmButton: false,
          timer: 1500
        })

        commit('USER_ENTRANCE', userEntrance)
        commit('ADMIN_ENTRANCE', userEntrance)
      })
  },
  displayName () {
    return this.$fireAuthObj().currentUser.displayName
  },
  getProfilePicUrl () {
    return this.$fireAuthObj().currentUser.photoURL || '@/assets/images/profile-pic-placeholder.png'
  },
  async userEntrance ({ commit, dispatch }) {
    const USER_ID = await dispatch('getUid')
    const userEntrance = !!this.$fireAuthObj().currentUser
    if (userEntrance) {
      const adminEntrance = await ['6XUeVk6rJKcsFvkgIRHcKhWqx523', 'aB67CVm6SmTTAmQqL8Cj2Xpcl662', '0FvqtO9OJYcOM8ugqeJOVTVUlAY2'].includes(USER_ID)
      commit('ADMIN_ENTRANCE', adminEntrance)
    }
    commit('USER_ENTRANCE', userEntrance)
  }
  // async USER_ID_ACTIONS ({ commit }) {
  //   const user = this.$fireAuthObj().currentUser
  //   const userID = user ? user.uid : null
  //   if (userID) {
  //     commit('USER_ID_ENTRANCE', userID)
  //   } else {
  //     console.log('Незарегестрированый пользователь')
  //   }
  // }
}
