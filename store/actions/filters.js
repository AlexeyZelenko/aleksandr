import { firestoreAction } from 'vuexfire'
import 'firebase/firestore'
// import Swal from 'sweetalert2'

export default {
  bindCountDocument: firestoreAction(async function ({ commit, bindFirestoreRef }) {
    try {
      const ref = this.$fireStore.collection('songs')
      const documents = await bindFirestoreRef('Songs', ref, { wait: true })
      // Якщо вам потрібно отримати останній документ, розкоментуйте наступний рядок:
      // commit('LAST_DOC', documents[documents.length - 1]);
      commit('FIREBASE_SONGS2', documents)

      const ref2 = this.$fireStore.collection('calendar')
      const eventDocuments = await bindFirestoreRef('Events', ref2, { wait: true })
      commit('CALENDAR_EVENTS', eventDocuments)
    } catch (error) {
      // Обробка помилок
      // eslint-disable-next-line no-console
      console.error('Помилка при отриманні документів:', error)
    }
  }),
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
  }
}
