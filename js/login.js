function validateLogin() {
    var email = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var errorMessageElement = document.getElementById('login-message');

    if (!email || !password) {
        errorMessageElement.innerHTML = "Please enter both username and password.";
        return;
    }
    
    if (email === "admin" && password === "admin") {
        sessionStorage.setItem('isLoggedIn', 'true');
        window.location.href = "dashboard.html";
    } else {
        errorMessageElement.innerHTML = "Invalid username or password. Please try again.";
    }
}

function checkLoggedIn() {
    var isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        
        console.log('User is logged in.');
    } else {
        
        console.log('User is not logged in.');
        window.location.href = "login.html";
    }
}
