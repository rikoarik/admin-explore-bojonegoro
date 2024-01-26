import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCt5I-Ww0rw56q4sI_NxXoNHkFklDYm0UQ",
    authDomain: "explorebojonegoro-7a669.firebaseapp.com",
    databaseURL: "https://explorebojonegoro-7a669-default-rtdb.firebaseio.com",
    projectId: "explorebojonegoro-7a669",
    storageBucket: "explorebojonegoro-7a669.appspot.com",
    messagingSenderId: "968195432323",
    appId: "1:968195432323:web:04c5641bb2aacff48860b6",
    measurementId: "G-9TGN2QB0F7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function validateLogin() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var errorMessageElement = document.getElementById('login-message');

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            errorMessageElement.innerHTML = "";
            window.location.href = "./public/dashboard/Dashboard.html";
        })
        .catch((error) => {
            errorMessageElement.innerHTML = "Invalid username or password. Please try again.";
        });
}

document.getElementById('btLogin').addEventListener('click', validateLogin);