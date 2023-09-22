import { firestoreAction } from 'vuexfire'
import 'firebase/firestore'
import Swal from 'sweetalert2'

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
    const confirmResult = await Swal.fire({
      title: 'Ви впевнені?',
      text: 'Ви не зможете відновити це!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Так, видалити це!'
    })

    if (confirmResult.value) {
      Swal.fire({
        title: 'Іде видалення...',
        text: '',
        imageUrl: '352.gif',
        showConfirmButton: false
      })

      try {
        await this.$fireStore.collection('songs').doc(`${id}`).delete()
        Swal.close()
        Swal.fire({
          title: 'Видалено!',
          text: 'Пісня видалена.',
          type: 'success'
        })
      } catch (error) {
        // Обробка помилок
        // eslint-disable-next-line no-console
        console.error('Помилка при видаленні документа:', error)
        Swal.close()
        Swal.fire({
          title: 'Помилка при видаленні!',
          text: 'Сталася помилка при видаленні пісні.',
          type: 'error'
        })
      }
    }
  },
  async deleteEventFromCalendar ({ commit, dispatch }, id) {
    try {
      await this.$fireStore.collection('calendar').doc(`${id}`).delete()
      Swal.fire({
        title: 'Видалено!',
        text: 'Подія видалена.',
        type: 'success'
      })
      // Викликайте дію (action) для оновлення лічильника документів
      dispatch('bindCountDocument')
    } catch (error) {
      // Обробка помилок
      // eslint-disable-next-line no-console
      console.error('Помилка при видаленні документа:', error)
      Swal.fire({
        title: 'Помилка при видаленні!',
        text: 'Сталася помилка при видаленні події.',
        type: 'error'
      })
    }
  },
  async editEventFromCalendar ({ commit }, event) {
    try {
      await this.$fireStore.collection('calendar').doc(`${event.id}`).update({
        order: event.order,
        description: event.description
      })

      Swal.fire({
        title: 'Змінено!',
        text: 'Подія змінена.',
        type: 'success'
      })
    } catch (error) {
      // Обробка помилок
      // eslint-disable-next-line no-console
      console.error('Помилка при редагуванні документа:', error)

      Swal.fire({
        title: 'Помилка при редагуванні!',
        text: 'Сталася помилка при редагуванні події.',
        type: 'error'
      })
    }
  },
  async editUsersList ({ commit, dispatch }, event) {
    try {
      await this.$fireStore.collection('calendar').doc(`${event.id}`).update({
        selected: event.selected
      })

      Swal.fire({
        title: 'Змінено!',
        text: 'Подія змінена.',
        type: 'success'
      })

      // Викликайте дію (action) для оновлення лічильника документів
      dispatch('bindCountDocument')
    } catch (error) {
      // Обробка помилок
      // eslint-disable-next-line no-console
      console.error('Помилка при редагуванні документа:', error)

      Swal.fire({
        title: 'Помилка при редагуванні!',
        text: 'Сталася помилка при редагуванні події.'
      })
    }
  }
}
