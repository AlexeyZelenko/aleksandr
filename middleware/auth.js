export default function ({ store, redirect }) {
  if (!store.getters.adminEntrance) {
    redirect('/about?message=about')
  }
}
