

function getBoxplotVals(array) {

    sort(array);
    var len = array.length;

    var r = {};
    
    r.median = array[len/2];
    r.Q1 = array[len/4];
    r.Q3 = array[3*len/4];

    r.IQR = r.Q3 - r.Q1;

    r.whisker_lo = r.Q1 - 1.5 * r.IQR;
    r.whisker_hi = r.Q3 + 1.5 * r.IQR;

    return r;
};


function variance(array) {
    var mean = getMean(array);

    var sumOfSquares = 0;
    array.forEach(function(x) {
        sumOfSquares += (x - mean) * (x - mean);
    });

    var variance = sumOfSquares / (array.length - 1);
    return variance;
};

function standardDev(array) {
    return Math.sqrt(variance(array));
};


function getMean(array) {
    var sum = 0;
    array.forEach(function(x) {
        sum += x;
    });

    return sum / array.length;
};

function zValues(array) {
    var mean = getMean(array);
    var sd = standardDev(array);

    return array.map(function(obj) {
        return (obj - mean) / sd;
    });
};


module.exports = {
    mean: getMean,
    sd: standardDev,
    zvals: zValues
}
