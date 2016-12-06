//import random.js
var random=require('./random.js');

//funzione che inserisce i valori casuali alle tabelle
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
            nome_pasto: 'Pasta bianca',
            tipo: 'primo'
    });
    pasto.create({
            nome_pasto: 'Minestrone',
            tipo: 'primo'
    });
    pasto.create({
            nome_pasto: 'Risotto',
            tipo: 'primo'
    });
    pasto.create({
            nome_pasto: 'Lasagna',
            tipo: 'primo'
    });
    //create secondo
    pasto.create({
            nome_pasto: 'Bistecca di Manzo',
            tipo: 'secondo'
    });
    pasto.create({
            nome_pasto: 'Salmone in crosta',
            tipo: 'secondo'
    });
    pasto.create({
            nome_pasto: 'Pollo al forno',
            tipo: 'secondo'
    });
    pasto.create({
            nome_pasto: 'Arrosto di lonza',
            tipo: 'secondo'
    });
    //create contorno
    pasto.create({
            nome_pasto: 'Patatine fritte',
            tipo: 'contorno'
    });
    pasto.create({
            nome_pasto: 'Patate al forno',
            tipo: 'contorno'
    });
    pasto.create({
            nome_pasto: 'Carote',
            tipo: 'contorno'
    });
    pasto.create({
            nome_pasto: 'Funghi',
            tipo: 'contorno'
    });
    pasto.create({
            nome_pasto: 'Insalata',
            tipo: 'contorno'
    });

    //create dolce
    pasto.create({
            nome_pasto: 'Budino',
            tipo: 'dolce'
    });
    pasto.create({
            nome_pasto: 'Yogurt',
            tipo: 'dolce'
    });
    pasto.create({
            nome_pasto: 'Frutta',
            tipo: 'dolce'
    });
    pasto.create({
            nome_pasto: 'Crostata',
            tipo: 'dolce'
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

    //create Menu scelto dal user num 1
    pasto_scelto.create({
        user_id: 1,
        pasto_id: 2,
        giorno_id:1
    });
    pasto_scelto.create({
        user_id: 1,
        pasto_id: 7,
        giorno_id:1
    });
    pasto_scelto.create({
        user_id: 1,
        pasto_id: 11,
        giorno_id:1
    });
    pasto_scelto.create({
        user_id: 1,
        pasto_id: 17,
        giorno_id:1
    });
}

exports.insertData=insertData;