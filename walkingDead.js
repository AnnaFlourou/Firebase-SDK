var config = {
    apiKey: "AIzaSyAXS-Uk1EMdB8wx7dWdidwkEhRPGH8tHyc",
    authDomain: "sdk-twd-b5899.firebaseapp.com",
    databaseURL: "https://sdk-twd-b5899.firebaseio.com",
    projectId: "sdk-twd-b5899",
    storageBucket: "sdk-twd-b5899.appspot.com",
    messagingSenderId: "789025319481"
};


firebase.initializeApp(config);

const preObject = document.getElementById('object');

const dbRefObject = firebase.database().ref().child('object');


dbRefObject.on('value', snapshot => {
    snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        document.getElementById('object').innerHTML += '<li>' + childData.name + '</li>';
    });
});

function writeUserData(Name) {
    firebase.database().ref('object/' + name).push({
        name: Name
    });

}

function PushOnFirebase() {
    let name = document.getElementById("Name").value;
    writeUserData(name);
    window.location.reload();
}









