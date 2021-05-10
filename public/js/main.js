const auth = firebase.auth();

const whenSignIn = document.getElementById('LogedIn')
const whenSignOut = document.getElementById('LogedOut')

const signInBtn = document.getElementById('signInBtn')
const signOutBtn = document.getElementById('signOutBtn')

const provider = new firebase.auth.GoogleAuthProvider()

signInBtn.onclick = () => auth.signInWithPopup(provider)

signOutBtn = () => auth.signOut()