var shuffle = require('shuffle-array');

var numbers;

function init(min,max) {
    numbers=[];
    for(var i=min;i<=max;i++){
        numbers[i]=i;
    }
    shuffle(numbers);
}

function getNum() {
    return numbers.pop();
}

exports.init=init;
exports.getNum=getNum;
