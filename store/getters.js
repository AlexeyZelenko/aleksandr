export default {
  GET_SONGS_FROM_DB: state => state.Songs,
  SONGS: s => s.Songs,
  USER_ID: s => s.userId,
  LOCALE_CHANGE: s => s.locale,
  User_Entrance: s => s.userEntrance,
  GET_LIST_USERS: s => s.listUsers,
  GET_ADMIN_ENTRANCE: s => s.adminEntrance,
  GET_InfoUser: s => s.InfoUser,
  locale: s => s.locale,
  error: s => s.error
}
