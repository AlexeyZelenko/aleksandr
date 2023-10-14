import { firestoreAction } from 'vuexfire'

export const state = () => ({
  categories: [
    { name: 'Поклоніння', value: 'worship' },
    { name: 'Прославління', value: 'glorification' },
    { name: 'Інше', value: 'other' },
    { name: 'Всі', value: 'all' }
  ],
  selected: 'Категорії',
  Songs: []
})

export const mutations = {}

export const actions = {
  bindCountDocument: firestoreAction(async function ({ commit, bindFirestoreRef }) {
    const songsRef = this.$fireStore.collection('songs')
    const songs = await bindFirestoreRef('Songs', songsRef, { wait: true })

    commit('FIREBASE_SONGS', songs)
  })
}

export const getters = {}
