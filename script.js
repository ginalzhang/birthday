function validateForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Simulate basic validation for empty fields
    if (username === "" || password === "") {
        errorMessage.textContent = "Please fill in both fields.";
        return false;
    }

    // Example of simple username and password check
    if (username !== "bdayboy" || password !== "miguel") {
        errorMessage.textContent = "hint: the user is bdayboy and the pw is ur name!";
        return false;
    }
 alert("welcome.");

    // Redirect to puzzle.html page upon successful login
    window.location.href = "birthdaybook.html"; // Ensure "puzzle.html" is correct relative path
    return false; // Prevent form submission and page refresh
}
