//shuffle-array library, serve per mescolare un array
var shuffle = require('shuffle-array');

var numbers;

/**
 * @brief Funzione random. Crea un array con dentro i numeri inclusi nel intervallo dati nel input, dopo mescola
 * @param [in] input--> min e max --> Intervallo di valori per cui fare la random.
 * @return 
 */
function init(min,max) {
    if (typeof min == 'number' && typeof max == 'number'){
        numbers=[];
        for(var i=min;i<max;i++){
            numbers[i]=i;
        }
        shuffle(numbers);
    }
}

// @return Funzione che ritorna il valore in cima alla pila 
function getNum() {
    return numbers.pop();
}


// @return array number Length, (used for testing) 
function getLength() {
    return numbers.length;
}

// @return array, (used for testing)
function getNumbers() {
    return numbers;
}

//esporta le fuonzioni
exports.init=init;
exports.getNum=getNum;
exports.getLength=getLength;
exports.getNumbers=getNumbers;
