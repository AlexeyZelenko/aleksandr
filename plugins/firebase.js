import { initializeApp, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCbqbD8YMtX8uoJHsEgwKk4UvYwLPODYk4',
  authDomain: 'oleksandr-3787c.firebaseapp.com',
  databaseURL: 'https://oleksandr-3787c-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'oleksandr-3787c',
  storageBucket: 'oleksandr-3787c.appspot.com',
  messagingSenderId: '623016667362',
  appId: '1:623016667362:web:26fb4984975eff32d456bb'
}
let firebaseApp
try {
  firebaseApp = getApp()
} catch (e) {
  firebaseApp = initializeApp(firebaseConfig)
}
const db = getFirestore(firebaseApp, {})
export { db }
