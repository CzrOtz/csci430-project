$(document).ready(function() {
    $("#submit").click(function(event) {
        event.preventDefault(); // Prevent default form submission

        const enteredPassword = $("#password").val();
        const user = JSON.parse(localStorage.getItem("user"));

        if (user && user.passcode === enteredPassword) {
            
            
            window.location.href = "plantInfo.html";
        } else {
            
            alert("Incorrect password. Please try again.");
        }
    });
});
