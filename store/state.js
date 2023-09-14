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
  Songs: [],
  sortedSongs: [],
  selected: null,
  plannerCalendar: {
    events: [
      {
        name: 'Слава Богу',
        category: 'Поклоніння',
        start: '2023-09-03 10:10:00',
        end: '2023-09-03 11:00:00',
        color: 'orange',
        timed: false,
        order: 2
      }
    ]
  }
})
