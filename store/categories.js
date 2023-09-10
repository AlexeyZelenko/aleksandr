import { firestoreAction } from 'vuexfire'

export const state = () => ({
  categories: [
    { name: 'Поклоніння', value: 'worship' },
    { name: 'Прославління', value: 'glorification' },
    { name: 'Хвала', value: 'praise' },
    { name: 'Інше', value: 'other' },
    { name: 'Всі', value: 'all' }
  ],
  // sortedSongs: [],
  selected: 'Категорії',
  Songs: []
})

export const mutations = {
  FIREBASE_PRODUCTS: (state, data) => {
    state.Songs = data
  }
  // SORT_SONGS: (state, sortedSongs) => {
  //   state.sortedSongs = sortedSongs
  // },
  // SELECT_SONGS: (state, selected) => {
  //   state.selected = selected
  // }
}

export const actions = {
  bindCountDocument: firestoreAction(async function ({ commit, bindFirestoreRef }) {
    const ref = this.$fireStore
      .collection('songs')
    await bindFirestoreRef('Songs', ref, { wait: true }).then((documents) => {
      // commit('LAST_DOC', documents[documents.length - 1]);
      commit('FIREBASE_SONGS', documents)
    })
  }),
  // async readFromFirestore({commit}) {
  //   const promises = []
  //   await this.$fireStore.collection("products")
  //     .get()
  //     .then(function(querySnapshot) {
  //       querySnapshot.forEach(function(doc) {
  //         const data = doc.data()
  //         promises.push(
  //           data
  //         )
  //       })
  //     })
  //   const ProductsAll = await Promise.all(promises)
  //   commit('FIREBASE_PRODUCTS', ProductsAll)
  // },

  async sortByCategories ({ commit, getters, dispatch }, category) {
    await dispatch('bindCountDocument')

    const SONGS = await getters.getSongs

    const sortedSongs = []
    await SONGS.map((item) => {
      if (item.category === category.name) {
        sortedSongs.push(item)
      }
    })
    const selected = category.name
    commit('SORT_SONGS', sortedSongs)
    commit('SELECT_SONGS', selected)
  }
}

export const getters = {
  getSongs (state) {
    return state.Songs
  }
}
