import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

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

function handleLogout() {
    signOut(auth)
        .then(() => {
            window.location.href = "/public/index.html";
        })
        .catch((error) => {
            console.error("Error during logout:", error);
        });
}
document.getElementById('btLogout').addEventListener('click', handleLogout);
