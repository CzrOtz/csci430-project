
function addValueToPassword(button) {
    var currVal = $("#passcode").val();
    if (button == "bksp") {
        $("#passcode").val(currVal.substring(0, currVal.length - 1));
    } else {
        $("#passcode").val(currVal.concat(button));
    }
}

// Function to retrieve the password
function getPassword() {
    if (typeof(Storage) == "undefined") {
        alert("Your browser does not support HTML5 localStorage. Try upgrading");
    } else if (localStorage.getItem("user") != null) {
        return JSON.parse(localStorage.getItem("user")).passcode;
    } else {
        // Default password
        return "2345";
    }
}

// Function to retrieve the plant ID
function getPlantID() {
    if (typeof(Storage) == "undefined") {
        alert("Your browser does not support HTML5 localStorage. Try upgrading");
    } else if (localStorage.getItem("plant") != null) {
        return JSON.parse(localStorage.getItem("plant")).ID;
    } else {
        // Default plant ID
        return "9876";
    }
}

// Function to check if the entered values are correct
function checkCredentials(enteredPassword, storedPassword, enteredPlantID, storedPlantID) {
    return enteredPassword === storedPassword && enteredPlantID === storedPlantID;
}

// Function to handle routing based on the credentials check
function handleRouting() {
    // Check to see if the user has already agreed to the legal notice
    const agreedToLegal = localStorage.getItem("agreedToLegal");
    const user = localStorage.getItem("user");

    if (agreedToLegal == null) {
        alert("New user, redirected to disclaimer page");
        window.location.href = "pages/disclaimer.html";
    } else if (agreedToLegal === "true") {
        // Check if the user has already filled out their information
        if (user == null) {
            alert("User information not found, redirecting to user creation page");
            window.location.href = "pages/enterUserInfo.html";
        } else {
            window.location.href = "pages/userMenu.html";
        }
    }
}

// Function to handle the credentials logic
function credentialsLogic(event) {
    event.preventDefault(); // Prevent default form submission behavior
    var enteredPassword = document.getElementById("passcode").value;
    var storedPassword = getPassword();
    var enteredPlantID = document.getElementById("plantID").value;
    var storedPlantID = getPlantID();

    if (checkCredentials(enteredPassword, storedPassword, enteredPlantID, storedPlantID)) {
        handleRouting();
    } else {
        alert("Incorrect credentials, please try again");
    }
}

// Ensure DOM is fully loaded before binding click event
$(document).ready(function() {
    
    $("#btnEnter").click(credentialsLogic);
});


