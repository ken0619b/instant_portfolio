import firebase from 'firebase'

  var config = {
    apiKey: "AIzaSyCmUdS4Ze_XFFhWmxzQZZ1qEdcMKxfyV3g",
    authDomain: "instant-portfolio.firebaseapp.com",
    databaseURL: "https://instant-portfolio.firebaseio.com",
    projectId: "instant-portfolio",
    storageBucket: "instant-portfolio.appspot.com",
    messagingSenderId: "403121867957"
  };

  if(!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  export default firebase
