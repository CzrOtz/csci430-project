$(document).ready(function() {
    $("#calculate").click(function() {
        const voltage = parseFloat($("#voltage").val());
        const amperage = parseFloat($("#amperage").val());
        const time = parseFloat($("#timeDuration").val());

        if (!isNaN(voltage) && !isNaN(amperage) && !isNaN(time)) {
            const powerConsumed = voltage * amperage * time;
            $("#powerConsumed").text(powerConsumed.toFixed(2) + " Wh");
        } else {
            alert("Please enter valid numbers for voltage, amperage, and time duration.");
        }
    });
});
