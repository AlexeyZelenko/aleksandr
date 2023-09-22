export default {
  SONGS: s => s.Songs,
  USER_ID: s => s.userId,
  User_Entrance: s => s.userEntrance,
  GET_ADMIN_ENTRANCE: s => s.adminEntrance,
  locale: s => s.locale,
  error: s => s.error,
  getSongs (state) {
    return state.Songs
  },
  categories: s => s.categories,
  sortedSongs: s => s.sortedSongs,
  selected: s => s.selected,
  Songs: s => s.Songs,
  user: s => s.user,
  userEntrance: s => s.userEntrance,
  adminEntrance: s => s.adminEntrance,
  listUsers: s => s.listUsers,
  infoUser: s => s.infoUser,
  userId: s => s.userId,
  eventsCalendar: s => s.eventsCalendar
}
