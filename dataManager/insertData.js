//import random.js
var random=require('./random.js');

//funzione che inserisce i valori casuali alle tabelle
/**
 * @brief funzione che inserisce i valori casuali alle tabelle.
 * @param [in|out] input--> user nome tabella.
 * @param [in|out] input--> giorno nome tabella.
 * @param [in|out] input--> pasto nome tabella.
 * @param [in|out] input--> menu_giorno nome tabella.
 * @param [in|out] input--> pasto_scelto nome tabella.
 * @return Description of returned value.
 */
function insertData(user,giorno,pasto,menu_giorno,pasto_scelto) {
    //crea un user
    user.create({
            first_name: 'Rossi',
            last_name: 'Mario'
    });
    //crea giorni
    giorno.create({
            nome_giorno: 'lun'
    });
    giorno.create({
            nome_giorno: 'mar'
    });
    giorno.create({
            nome_giorno: 'mer'
    });
    giorno.create({
            nome_giorno: 'gio'
    });
    giorno.create({
            nome_giorno: 'ven'
    });
    giorno.create({
            nome_giorno: 'sab'
    });
    giorno.create({
            nome_giorno: 'dom'
    });

    //crea pasti
    //crea parimi
    pasto.create({
            nome_pasto: 'Pasta al pomodoro',
            tipo: 'primo',
            dettagli: 'Scaldate in una casseruola un velo di olio con uno spicchio di aglio sbucciato. Unite i pomodori non appena l\'aglio comincia a sfrigolare. Aggiungete quindi una generosa presa di sale. Completate con un ciuffetto di basilico e mescolate; cuocete senza coperchio per 10 circa.'
    });
    pasto.create({
            nome_pasto: 'Pasta con la ricotta in bianco',
            tipo: 'primo',
            dettagli: 'La pasta con la ricotta in bianco è un esempio di come possa essere facile e veloce preparare un piatto di pasta veramente buono.'
    });
    pasto.create({
            nome_pasto: 'Minestrone',
            tipo: 'primo',
            dettagli: 'Il minestrone di verdure è un primo piatto salutare, di semplice ma lunga realizzazione, per via della pulizia e del taglio delle molte verdure!'
    });
    pasto.create({
            nome_pasto: 'Risotto',
            tipo: 'primo',
            dettagli: 'Il risotto è un primo piatto tipico della cucina italiana, diffuso in numerose versioni in tutto il paese anche se più consumato al nord.'
    });
    pasto.create({
            nome_pasto: 'Lasagna',
            tipo: 'primo',
            dettagli: 'Le lasagne al forno sono costituite da una sfoglia di pasta madre, oggi quasi sempre all\'uovo, tagliata in fogli grossolanamente rettangolari (losanghe), dette lasagna le quali, una volta bollite e scolate, vengono disposte in una sequenza variabile di strati, ognuno dei quali separato da una farcitura che varia in relazione alle diverse tradizioni locali.'
    });
    //create secondo
    pasto.create({
            nome_pasto: 'Bistecca alla Fiorentina',
            tipo: 'secondo',
            dettagli: 'La bistecca alla fiorentina è un taglio di carne di vitellone o di scottona che, unito alla specifica preparazione, ne fa uno dei piatti più conosciuti della cucina toscana. Si tratta di un taglio alto comprensivo dell\'osso, da cuocersi sulla brace o sulla griglia, con grado di cottura "al sangue".'
    });
    pasto.create({
            nome_pasto: 'Salmone in crosta',
            tipo: 'secondo',
            dettagli: 'Il salmone in crosta con spinaci è una delle ricette tipiche della vigilia e di Capodanno: durante queste occasioni non potrà di certo mancare il salmone! '
    });
    pasto.create({
            nome_pasto: 'Pollo al forno',
            tipo: 'secondo',
            dettagli: 'Le cosce di pollo al forno sono un tipico secondo piatto della cucina italiana, un classico per gustare il pollo con contorno di patate!'
    });
    pasto.create({
            nome_pasto: 'Arrosto di lonza',
            tipo: 'secondo',
            dettagli: 'Tradizionale, genuino e ricco di gusto. La lonza arrosto al vino bianco è davvero un piatto che non può mancare nella vostra lista dei manicaretti casalinghi. '
    });
    //create contorno
    pasto.create({
            nome_pasto: 'Patatine fritte',
            tipo: 'contorno',
            dettagli: 'Patatine fritte'
    });
    pasto.create({
            nome_pasto: 'Patate al forno',
            tipo: 'contorno',
            dettagli: 'patate al forno'
    });
    pasto.create({
            nome_pasto: 'Carote',
            tipo: 'contorno',
            dettagli: 'Carote'
    });
    pasto.create({
            nome_pasto: 'Fagiolini',
            tipo: 'contorno',
            dettagli: 'Fagiolini'
    });
    pasto.create({
            nome_pasto: 'Insalata',
            tipo: 'contorno',
            dettagli: 'Insalata verde fresca'
    });

    //create dolce
    pasto.create({
            nome_pasto: 'Budino',
            tipo: 'dolce',
            dettagli: 'Il budino è composto da una parte liquida, generalmente costituita da latte, da zucchero e da vari ingredienti o aromi che gli danno il gusto desiderato: frutta, cioccolato, nocciole, caramello, liquori, vaniglia ed altri ancora. A questi si uniscono spesso degli ingredienti che servono a legare il composto, cioè a renderlo più corposo e solido.'
    });
    pasto.create({
            nome_pasto: 'Yogurt',
            tipo: 'dolce',
            dettagli: 'Yogurt con tanti gusti'
    });
    pasto.create({
            nome_pasto: 'Frutta',
            tipo: 'dolce',
            dettagli: 'Frutta fresca'
    });
    pasto.create({
            nome_pasto: 'Crostata',
            tipo: 'dolce',
            dettagli: 'La crostata è un dolce tipico italiano basato su un impasto di pasta frolla coperto con confettura, crema o frutta fresca. Dolci simili sono diffusi in tutta Europa.'
    });

    //inserire menu_giorno in modo casuale
    random.init(0,18);
    for(var i=0;i<10;i++){
        var num=random.getNum();
        if(num>0){
            menu_giorno.create({
                pasto_id: num,
                giorno_id: 1
            });
        }
    }
    random.init(0,18);
    for(var i=0;i<10;i++){
        var num=random.getNum();
        if(num>0){
            menu_giorno.create({
                pasto_id: num,
                giorno_id: 2
            });
        }
    }
    random.init(0,18);
    for(var i=0;i<10;i++){
        var num=random.getNum();
        if(num>0){
            menu_giorno.create({
                pasto_id: num,
                giorno_id: 3
            });
        }
    }
    random.init(0,18);
    for(var i=0;i<10;i++){
        var num=random.getNum();
        if(num>0){
            menu_giorno.create({
                pasto_id: num,
                giorno_id: 4
            });
        }
    }
    random.init(0,18);
    for(var i=0;i<10;i++){
        var num=random.getNum();
        if(num>0){
            menu_giorno.create({
                pasto_id: num,
                giorno_id: 5
            });
        }
    }
    random.init(0,18);
    for(var i=0;i<10;i++){
        var num=random.getNum();
        if(num>0){
            menu_giorno.create({
                pasto_id: num,
                giorno_id: 6
            });
        }
    }
    random.init(0,18);
    for(var i=0;i<10;i++){
        var num=random.getNum();
        if(num>0){
            menu_giorno.create({
                pasto_id: num,
                giorno_id: 7
            });
        }
    }
}

//esporta la funzione
exports.insertData=insertData;