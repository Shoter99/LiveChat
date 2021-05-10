const auth = firebase.auth();


const whenSignIn = document.getElementById('LogedIn')
const whenSignOut = document.getElementById('LogedOut')

const signInBtn = document.getElementById('signInBtn')
const signOutBtn = document.getElementById('signOutBtn')
const anSignInBtn = document.getElementById('anSignIn')

const usernameInput = document.getElementById('username')

const provider = new firebase.auth.GoogleAuthProvider()

signInBtn.onclick = () => auth.signInWithPopup(provider)
signOutBtn.onclick = () => auth.signOut()
anSignInBtn.onclick = () => auth.signInAnonymously()

firebase.auth().onAuthStateChanged(user => {
    if(user){
        // User is signed in
        whenSignIn.hidden = false
        whenSignOut.hidden = true
        username.value = user.displayName
    }
    else{
        // No user is sign in
        whenSignIn.hidden = true
        whenSignOut.hidden = false
    }
})