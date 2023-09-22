import Swal from 'sweetalert2'

export default {
  getUid () {
    const currentUser = this.$fireAuthObj().currentUser
    return currentUser ? currentUser.uid : null
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

        if (user) {
          const profile = user.providerData[0]
          const infoData = {
            SignInProvider: profile.providerId,
            Name: profile.displayName,
            Email: profile.email,
            PhotoURL: profile.photoURL,
            ProviderSpecificUID: profile.uid
          }

          await this.$fireDbObj().ref(`/users/${uid}/info`).set(infoData)
        }
      }

      // Получить корзину для ткущего пользователя
      const userDocument = await this.$fireStore.collection('users').doc(uid).get()
      const user = userDocument.data()

      if (!user || Object.keys(user).length === 0) {
        await this.$fireStore.collection('users').doc(uid).set({
          listFavoriteSongs: [],
          orderInfo: []
        })
      }

      if (['6XUeVk6rJKcsFvkgIRHcKhWqx523', 'aB67CVm6SmTTAmQqL8Cj2Xpcl662', '0FvqtO9OJYcOM8ugqeJOVTVUlAY2'].includes(uid)) {
        // Ось код для адміністратора, якщо потрібно
        // await dispatch('saveMessagingDeviceToken');

        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Адмін увійшов!',
          showConfirmButton: false,
          timer: 1500
        })
        // router.push('/admin');
      } else {
        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Ви ввійшли!',
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
      const isAdmin = ['6XUeVk6rJKcsFvkgIRHcKhWqx523', 'aB67CVm6SmTTAmQqL8Cj2Xpcl662', '0FvqtO9OJYcOM8ugqeJOVTVUlAY2'].includes(USER_ID)
      commit('ADMIN_ENTRANCE', isAdmin)

      const currentUser = this.$fireAuthObj().currentUser
      if (currentUser) {
        const userOnlain = currentUser.providerData[0]
        commit('AUTH_USER', userOnlain)

        const uid = await dispatch('getUid')
        if (uid) {
          const userSnapshot = await this.$fireStore.collection('users')
            .doc(uid)
            .get()
          const user = userSnapshot.data()
          commit('USER_INFO', user)
        }
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

        this.$router.push('/')

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
    const adminEntrance = ['6XUeVk6rJKcsFvkgIRHcKhWqx523', 'aB67CVm6SmTTAmQqL8Cj2Xpcl662', '0FvqtO9OJYcOM8ugqeJOVTVUlAY2'].includes(USER_ID)

    commit('ADMIN_ENTRANCE', adminEntrance)
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
