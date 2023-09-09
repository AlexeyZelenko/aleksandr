import { vuexfireMutations } from 'vuexfire'

export default {
  ...vuexfireMutations,
  FIREBASE_SONGS2: (state, documents) => {
    // console.log(documents)
    state.Songs = documents
  },
  FIREBASE_MUTATIONS: (state, message) => {
    state.songs = message
  },
  setError (state, error) {
    state.error = error
  },
  USER_ENTRANCE: (state, userEntrance) => {
    state.userEntrance = userEntrance
  },
  USER_ID_ENTRANCE: (state, userID) => {
    state.userId = userID
  },
  LIST_USERS: (state, userOnlain) => {
    state.listUsers = userOnlain
  },
  ADMIN_ENTRANCE: (state, adminEntrance) => {
    state.adminEntrance = adminEntrance
  },
  USER_INFO: (state, info) => {
    state.InfoUser = info
  },

  FIREBASE_SONGS: (state, data) => {
    state.Songs = data
  },
  SORT_SONGS: (state, sortedSongs) => {
    state.sortedSongs = sortedSongs
  },
  SELECT_CATEGORY_SONGS: (state, selected) => {
    state.selected = selected
  }
}
