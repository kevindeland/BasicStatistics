function init() {
    var app = angular.module('learn', []);

    app.controller('ContingencyTableController', function() {
        var stat = this;

        // original data
        this.data = [
            [25, 31, 12], //high
            [17, 38, 26],
            [8, 40, 64]
        ];
        this.cols = ['High', 'Middle', 'Low'];
        this.rows = ['Agree', 'Agree/disagree', 'Disagree'];
        this.dim = {
            c: this.cols.length,
            r: this.rows.length
        }


        // generate sums
        this.sums = {
            rows: [],
            cols: []
        }
        for(var r=0; r < this.dim.r; r++) {
            this.sums.rows.push(0);
            for(var c=0; c < this.dim.c; c++) {
                if(r == 0) this.sums.cols.push(0);
                this.sums.rows[r] += this.data[r][c];
                this.sums.cols[c] += this.data[r][c];
            }
        }

        // generate percentages
        this.percents = [];
        for(var r=0; r < this.dim.r; r++) {
            this.percents.push([]);
            for(var c=0; c < this.dim.c; c++) {
                this.percents[r][c] = Math.round(this.data[r][c] / this.sums.cols[c] * 100);
            }
        }

        this.getDisplay = function (r, c){
            return this.percent ? this.percents[r][c] : this.data[r][c];
        }
        
        console.log(this.percents);

        this.rowTotal = function(r) {
            var sum = 0;
            this.data[r].forEach(function(datum) {
                sum += datum
            });
            return sum;
        };

        this.colTotal = function(c) {
            var sum = 0;
            this.data.forEach(function(row) {
                sum += row[c];
            });
            return sum;
        };

        this.grandTotal = function() {
            var sum = 0;
            console.log(this.rows.length);
            this.data.forEach(function(row) {
                row.forEach(function(x) {
                    sum += x;
                });
            });
            return sum;
        };

        this.percent = false;
        
        this.togglePercent = function() {
            this.percent = !this.percent;
            console.log(this.percent);
        }

        this.getButtonLabel = function() {
            return this.percent ? 'Show numbers' : 'Show percentages';
        }

        this.getBgColor = function(r, c) {
            if(!this.percent) return "#FFFFFF";

            var p = this.percents[r][c];

            if(p < 10) {
                return "#77FFFF";
            } else if (p < 20) {
                return "#99FFFF";
            } else if (p < 30) {
                return "#BBFFFF";
            } else if (p < 40) {
                return "#DDFFFF";
            } else if (p < 50) {
                return "#FFFFFF";
            } else if (p < 60) {
                return "#FFDDFF";
            } else if (p < 70) {
                return "#FFBBFF";
            } else if (p < 80) {
                return "#FF99FF";
            } else if (p < 90) {
                return "#FF77FF";
            } else {
                return "#FF55FF";
            }

        }


    });

};
init();
