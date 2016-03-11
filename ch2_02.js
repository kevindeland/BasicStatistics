var ch1 = require('./ch1');
var chalk = require('chalk');
var _ = require('underscore');

var bodyMass = [50, 100, 200, 300];
var chocolate = [50, 70, 70, 95];

/*
console.log('mean x:', chalk.blue(ch1.mean(chocolate)));
console.log('sd x: ', chalk.yellow(ch1.sd(chocolate)));
console.log('mean y:', chalk.blue(ch1.mean(bodyMass)));
console.log('sd y: ', chalk.yellow(ch1.sd(bodyMass)));


console.log('z-vals x:', ch1.zvals(bodyMass));
console.log(ch1.zvals(chocolate));
*/
function pearson(x, y) {
    var zx = ch1.zvals(x);
    var zy = ch1.zvals(y);
    
    var product = _.map(zx, function(a, i) {
        return  a * zy[i];
    });

    var sum = _.reduce(product, function(mem, num) {
        return mem + num
    }, 0);

    return sum / (x.length - 1);
}

console.log(pearson(bodyMass, chocolate));


function regression(x, y) {

    var N = x.length;

    var productXYs = _.map(x, function(xi, i) {
        return xi * y[i]
    });
    

    var squareXs = _.map(x, function(xi, i) {
        return xi * xi;
    });

    var sumX = sum(x);
    console.log('sum Xs:', chalk.green(sumX));
    var sumY = sum(y);
    console.log('sum Ys:', chalk.green(sumY));
    
    var b1 = (sum(productXYs) - (sumX * sumY / N)) / (sum(squareXs) - (sumX * sumX / N));

    console.log(b1);

    var b0 = ch1.mean(y) - b1 * ch1.mean(x);

    return {b1: b1, b0: b0, regression: function(x){
        return b1 * x + b0;
    }};
}

var r = regression(chocolate, bodyMass);
console.log(r.b1, r.b0);
_.each(chocolate, function(x, i) {
    var predicted = r.regression(x);
    var actual = bodyMass[i];
    var err = actual - predicted;
    console.log(chalk.green(actual), chalk.blue(predicted), chalk.red(err));
});


function sum(array) {
    return _.reduce(array, function(mem, num) {
        return mem + num
    }, 0);
}

