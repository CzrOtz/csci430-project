class Settings {
    constructor() {}

   
    resetPassword(NewPasscode) {
        let user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            user = {};
        }
        user.passcode = NewPasscode;
        localStorage.setItem("user", JSON.stringify(user));
    }

    
    confirmAction() {
        return confirm("Are you sure you want to reset the password?");
    }

    
    verifyPassword(oldPasscode) {
        let user = JSON.parse(localStorage.getItem("user"));
        if (user && user.passcode === oldPasscode) {
            return true;
        }
        return false;
    }

    
    comparePasswords(NewPasscode1, NewPasscode2) {
        return NewPasscode1 === NewPasscode2;
    }

    error(old, new1, new2) {
        alert("Wrong password entered or new passwords do not match");
    }

    
    displayUserInfo() {
        let user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            let userInfo = `
                <p><strong>First Name:</strong> ${user.firstName}</p>
                <p><strong>Last Name:</strong> ${user.lastName}</p>
                <p><strong>Birth Date:</strong> ${user.birthDate}</p>
                <p><strong>Email:</strong> ${user.email}</p>
            `;
            $("#userInfo").html(userInfo);
        }
    }
}

const userSettings = new Settings();

$(document).ready(function() {
    userSettings.displayUserInfo(); 

    $("#submit").click(function(event) {
        event.preventDefault(); 

        let oldPasscode = $("#oldPass").val();
        let newPasscode1 = $("#newPass").val();
        let newPasscode2 = $("#confirmPass").val();

        if (userSettings.verifyPassword(oldPasscode) && userSettings.comparePasswords(newPasscode1, newPasscode2)) {
            if (userSettings.confirmAction()) {
                userSettings.resetPassword(newPasscode1);
                alert("Password has been reset");
                window.location.href = "userMenu.html";
            }
        } else {
            userSettings.error(oldPasscode, newPasscode1, newPasscode2);
        }
    });
});





