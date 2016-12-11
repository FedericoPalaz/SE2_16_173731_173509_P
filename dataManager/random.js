//shuffle-array library
var shuffle = require('shuffle-array');

var numbers;

/**
 * @brief Funzione random.
 * @param [in|out] input--> min e max --> Intervallo di valori per cui fare la random.
 * @return 
 */
function init(min,max) {
    numbers=[];
    for(var i=min;i<max;i++){
        numbers[i]=i;
    }
    shuffle(numbers);
}

// @return Funzione che ritorna il valore in cima alla pila 
function getNum() {
    return numbers.pop();
}


// @return array number Length 
function getLength() {
    return numbers.length;
}

exports.init=init;
exports.getNum=getNum;
exports.getLength=getLength;
