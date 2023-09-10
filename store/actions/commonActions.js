import { firestoreAction } from 'vuexfire'
import 'firebase/firestore'
import Swal from 'sweetalert2'

export default {
  AlertMessageLoading () {
    Swal.fire({
      title: 'Завантаження...',
      showConfirmButton: false
    })
  },
  bindCountDocument: firestoreAction(async function ({ commit, bindFirestoreRef }) {
    const ref = this.$fireStore
      .collection('songs')
    await bindFirestoreRef('Songs', ref, { wait: true }).then((documents) => {
      // commit('LAST_DOC', documents[documents.length - 1]);
      commit('FIREBASE_SONGS2', documents)
    })
  }),
  FIREBASE ({ commit }, message) {
    commit('FIREBASE_MUTATIONS', message)
  },
  async sortByCategories ({ commit, getters, dispatch }, category) {
    await dispatch('bindCountDocument')

    const SONGS = await getters.getSongs

    const sortedSongs = []
    await SONGS.forEach((item) => {
      if (item.category === category.name) {
        sortedSongs.push(item)
      }
    })
    const selected = category.name
    commit('SORT_SONGS', sortedSongs)
    commit('SELECT_CATEGORY_SONGS', selected)
  },
  // eslint-disable-next-line no-empty-pattern
  async deleteSong ({}, id) {
    await Swal.fire({
      title: 'Ви впевнені?',
      text: 'Ви не зможете відновити це!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Так, видалити це!'
    })
      .then((result) => {
        if (result.value) {
          Swal.fire({
            title: 'Іде видалення...',
            text: '',
            imageUrl: '352.gif',
            showConfirmButton: false
          })

          this.$fireStore
            .collection('songs')
            .doc(`${id}`)
            .delete()
            .then(function () {
              Swal.close()

              Swal.fire({
                title: 'Видалено!',
                text: 'Пісня видалена.',
                type: 'success'
              })
            }).catch(function (error) {
            // eslint-disable-next-line no-console
              console.error('Помилка при видаленні документа: ', error)
            })
        }
      })
  }
}
