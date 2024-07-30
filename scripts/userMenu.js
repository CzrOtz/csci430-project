
$(document).ready(function() {
    if (localStorage.getItem("plant") === null) {
        $("#status-message").html('<span style="background-color: black; color: yellow;">Your account is not complete, fill out plant info or you will lose all progress</span>');
    } else {
        const plant = JSON.parse(localStorage.getItem("plant"));
        $("#status-message").html('<span>For plant: ' + plant.Name + '</span>');
    }

    $("#syncRecords").click(function() {
        alert("Records Synced");
    });
});
