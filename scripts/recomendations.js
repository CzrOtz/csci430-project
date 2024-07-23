class Recomendation {
    constructor() {}

    averageTheValues(values) {
        if (values.length === 0) return 0; // Handle case where there are no values

        let totalSum = 0;

        for (let i = 0; i < values.length; i++) {
            totalSum += parseFloat(values[i].power.split(" ")[0]); // Adding each element of values into totalSum
        }

        let average = totalSum / values.length; // Calculate the average
        return average;
    }

    getLastValue() {
        let values = JSON.parse(localStorage.getItem('powerHistory')) || [];
        if (values.length === 0) return null; // Handle case where there are no values

        let lastValue = values[values.length - 1];
        return lastValue;
    }

    getPercentageChange(current, previous) {
        return ((current - previous) / previous) * 100;
    }

    calculateAveragesAndDifferences() {
        let values = JSON.parse(localStorage.getItem('powerHistory')) || [];
        if (values.length === 0) return null; // Handle case where there are no values

        let historicAverage = this.averageTheValues(values);
        let lastSevenValues = values.slice(-7);
        let lastSevenAverage = this.averageTheValues(lastSevenValues);

        let lastValue = this.getLastValue();
        let lastPowerValue = parseFloat(lastValue.power.split(" ")[0]);

        let lastVsHistoricChange = this.getPercentageChange(lastPowerValue, historicAverage);
        let lastVsSevenDayChange = this.getPercentageChange(lastPowerValue, lastSevenAverage);
        let historicVsSevenDayChange = this.getPercentageChange(lastSevenAverage, historicAverage);

        return {
            historicAverage,
            lastSevenAverage,
            lastPowerValue,
            lastVsHistoricChange,
            lastVsSevenDayChange,
            historicVsSevenDayChange
        };
    }
}

$(document).ready(function() {
    let recommendation = new Recomendation();
    let results = recommendation.calculateAveragesAndDifferences();

    if (results) {
        $('#displayHistoricAverage').text(`Historical Average: ${results.historicAverage.toFixed(2)} Wh`);
        $('#displaySevenDayAverage').text(`Last Seven Days Average: ${results.lastSevenAverage.toFixed(2)} Wh`);
        $('#lastValue').text(`Last Value: ${results.lastPowerValue.toFixed(2)} Wh`);

        let comparisonClassHistoric = results.lastVsHistoricChange > 0 ? 'value-up' : 'value-down';
        let comparisonClassSevenDay = results.lastVsSevenDayChange > 0 ? 'value-up' : 'value-down';
        let comparisonClassHistoricVsSeven = results.historicVsSevenDayChange > 0 ? 'value-up' : 'value-down';

        $('#percentageLastVsHistoric').text(`Last value vs Historic Average: ${Math.abs(results.lastVsHistoricChange).toFixed(2)}% ${results.lastVsHistoricChange > 0 ? 'up' : 'down'}`)
            .removeClass('value-up value-down')
            .addClass(comparisonClassHistoric);

        $('#percentageLastVsSevenDay').text(`Last value vs Seven Day Average: ${Math.abs(results.lastVsSevenDayChange).toFixed(2)}% ${results.lastVsSevenDayChange > 0 ? 'up' : 'down'}`)
            .removeClass('value-up value-down')
            .addClass(comparisonClassSevenDay);

        $('#percentageHistoricVsSevenDay').text(`Historic Average vs Seven Day Average: ${Math.abs(results.historicVsSevenDayChange).toFixed(2)}% ${results.historicVsSevenDayChange > 0 ? 'up' : 'down'}`)
            .removeClass('value-up value-down')
            .addClass(comparisonClassHistoricVsSeven);
    }
});








