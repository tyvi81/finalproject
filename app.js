
const txtEma = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');
const whenSignedOut = document.getElementById('whenSignedOut');
const whenSignedIn = document.getElementById('whenSignedIn');
const errorMessage = document.getElementById('err');
const navigation = document.getElementById('nav');
const content = document.getElementsByClassName('content');

btnLogin.addEventListener('click', e => {
    const email = txtEma.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => errorMessage.innerText = e.message);
});

btnSignUp.addEventListener('click', e => {
    const email = txtEma.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    // promise.catch(e => errorMessage.innerText = e.message);
    promise.catch(e => errorMessage.innerText = e.message);

});

btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
})

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // console.log('login success');
        // btnLogout.classList.remove('hide');
        for (let i = 0; i < content.length; i++) {
            content[i].hidden = false;
        }
        navigation.hidden = false;
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
    } else {
        // console.log('logout failure');
        // btnLogout.classList.add('hide');
        for (let i = 0; i < content.length; i++) {
            content[i].hidden = true;
        }
        navigation.hidden = true;
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
    }
});