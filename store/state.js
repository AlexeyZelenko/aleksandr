export default () => ({
  adminEntrance: false,
  authUser: null,
  userEntrance: false,
  error: null,
  songs: [],
  userId: null,
  listUsers: [],
  Users: [],
  InfoUser: [],
  user: null,

  categories: [
    { name: 'Поклоніння', value: 'worship' },
    { name: 'Прославління', value: 'glorification' },
    { name: 'Хвала', value: 'praise' },
    { name: 'Інше', value: 'other' }
  ],
  sortedSongs: [],
  selected: 'Категорії',
  Songs: []
})
