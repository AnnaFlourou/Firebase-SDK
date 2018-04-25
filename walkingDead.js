let config = {
    apiKey: "AIzaSyAXS-Uk1EMdB8wx7dWdidwkEhRPGH8tHyc",
    authDomain: "sdk-twd-b5899.firebaseapp.com",
    databaseURL: "https://sdk-twd-b5899.firebaseio.com",
    projectId: "sdk-twd-b5899",
    storageBucket: "sdk-twd-b5899.appspot.com",
    messagingSenderId: "789025319481"
};

firebase.initializeApp(config);
firebase.auth().languageCode = 'fr';
/* Part 2 */

const uiConfig = {
    signInSuccessUrl: 'index.html',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: 'http://localhost:8080/cgu' // conditions générales d'utilisation
};
// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
const preObject = document.getElementById('object');

const dbRefObject = firebase.database().ref().child('object');
let myUid = "";

function initApp() {

    firebase.auth().onAuthStateChanged(function (user) {
        document.getElementById("login_div").style.display = "none";
        if (user) {
            // All datas
            // User is signed in.
            document.getElementById("login_div").style.display = "block";

            const displayName = user.displayName;
            const email = user.email;
            const emailVerified = user.emailVerified;
            const photoURL = user.photoURL;
            const uid = user.uid;
            const phoneNumber = user.phoneNumber;
            const providerData = user.providerData;


            // retour de l'utilisateur après authentification
            user.getIdToken().then((accessToken) => {
                document.getElementById('sign-in-status').textContent = 'Signed in';
                document.getElementById('sign-in').textContent = 'Sign out';
                document.getElementById('account-details').textContent = JSON.stringify({
                    displayName: displayName,
                    email: email,
                    emailVerified: emailVerified,
                    phoneNumber: phoneNumber,
                    photoURL: photoURL,
                    uid: uid,
                    accessToken: accessToken,
                    providerData: providerData
                }, null, '  ');
            });
            myUid = user.uid;
        } else {

            // Gestion de la deconnexion
            document.getElementById('sign-in-status').textContent = 'Signed out';
            document.getElementById('sign-in').textContent = 'Sign in';
            document.getElementById('account-details').textContent = 'null';
        }
    }, (error) => { // gestion de erreur de connexion
        console.error(error);
    });
}
initApp();


/*part 1*/



dbRefObject.on('value', snapshot => {
    snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        if (childData.uid === myUid || !childData.uid)
            document.getElementById('object').innerHTML += '<li>' + childData.name + '</li>';
    });
});

function writeUserData(Name) {
    firebase.database().ref('object/' + name).push({
        name: Name,
        uid: myUid
    });

}

function PushOnFirebase() {
    let name = document.getElementById("Name").value;
    writeUserData(name);
    window.location.reload();
}

function logOut() {
    firebase.auth().signOut().then(function() {

    }).catch(function (error) {});
}











