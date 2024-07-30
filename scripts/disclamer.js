function reject() {
    alert("To proceed, you must accept the terms of this website. You are now being redirected to the login page.");
}

// Method to delete specific local storage keys
function clearLocalStorage() {
    localStorage.removeItem("plant");
    localStorage.removeItem("user");
    localStorage.removeItem("powerHistory");
}

function accept() {
    const agree = localStorage.setItem("agreedToLegal", "true");
    clearLocalStorage();
    return agree;
}

$(document).ready(function() {
    $("#noticeNo").click(function() {
        reject();
        window.location.href = "../index.html";
    });

    $("#noticeYes").click(function() {
        accept();
        alert("Response recorded");
        window.location.href = "pages/enterUserInfo.html";
    });
});