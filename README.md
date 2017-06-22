# SE2_16_173731_173509_P

## SE2 Progetto


Autori
--------------
##### Federico Palazzini
##### Zihadul Azam

Scopo e Descrizione
----------
Il progetto è stato creato per semplificare l'ordinazione e la valutazione dei pasti da parte degli anziani per un'Agenzia di Trento. Quello che si può trovare su git è solo una parte, cioè solo la parte di ordinazione perchè purtroppo per i tempi ristretti non si è potuto sviluppare tutta l'app.

Tecnologie e Librerie Usate
------
* [node.js] - è un framework che permette di per usare V8, l'interprete JavaScript di `Google` anche per realizzare web application e applicazioni fortemente orientate al networking
* [Materialize] - è un responsive framework per front-end basto su Material Design
* [Github] -  è una piattaforma per lo sviluppo collaborativo di software
* [jQuery] - è una libreria JavaScript che semplifica l'attraversamento dei    documenti HTML, la gestione degli eventi, le animazioni e le interazioni `AJAX` per migliorare e velocizzare lo sviluppo web.
* [Express] - è un framework per applicazioni web `Node.js` flessibile e leggero che fornisce una serie di funzioni avanzate per le applicazioni web e per dispositivi mobili.
* [Request]: è una libreria per inviare `HTTP` request.
* [Sequelize]: è un promise-based `ORM` (Object-Relational Mapping) per `Node.js`.
* [pg]: libreria per utilizzare PostgresDB.
* [EJS]: (Embedded JavaScrip) è un linguaggio di `templating` da parte del cliente.
* [Shuffle-Array]: è una libreria per mescolare un `array`.

Come Eseguire
--------
Se si vuole provarlo in locale bisogna installare `node.js`, `npm`, `postgresDB`. Una volta installato bisogna creare un db vuoto e per connettersi bisogna usare la seguente stringa di connessione:
```sh
DATABASE_URL= ('postgres://<username>:<password>@localhost:<porta>/<nome_db>')
```
Note: Per configurare questa stringa bisogna andare nel file db.js. 

Per far partire l'app in locale prima bisogna installare tutte le dipendenze ed avviare il sever con heroku local (non node index.js).

```sh
$ npm install -d
$ heroku local
```


Testing
-----
Per il testing viene fatto in locale quindi necessità il corretto funzionamento del database e la parte di script per la creazione delle tabelle se c'è ne bisogno. Per fare il testing è stato usato jasmine-node e installato tutte le sue dipendenze.
Api sono state descritte nel file swagger.yaml che si trova nella cartella API.

Link
-----
Si trova su heroku al seguente link:
https://progettosw2.herokuapp.com/
[![N|Solid](http://darkorbithach.weebly.com/uploads/2/2/0/9/22097034/2592297_orig.png)](https://progettosw2.herokuapp.com/)

## Licenza

Copyright © 2016, Realizzato Da [Federico Palazzini](https://github.com/FedericoPalaz) e [Zihadul Azam](https://github.com/zihadulazam)

***

v0.0.1, on Dec 14, 2016.

   [node.js]: <http://nodejs.org>
   [Materialize]: <http://materializecss.com/>
   [Sequelize]: <http://docs.sequelizejs.com/en/latest/>
   [jQuery]: <http://jquery.com>
   [Github]: <https://github.com/>
   [express]: <http://expressjs.com>
   [Request]: <https://www.npmjs.com/package/request>
   [pg]: <https://www.npmjs.com/package/pg>
   [EJS]: <http://www.embeddedjs.com/>
   [Shuffle-Array]: <https://www.npmjs.com/package/shuffle-array>
