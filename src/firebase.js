import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyBtNm5setCj1czuQFgBCEDLzF9xI-mFXU4',
  authDomain: 'vote-your-hero.firebaseapp.com',
  databaseURL: 'https://vote-your-hero.firebaseio.com',
  projectId: 'vote-your-hero',
  storageBucket: 'vote-your-hero.appspot.com',
  messagingSenderId: '652756463987'
}

firebase.initializeApp(config)

export default firebase
