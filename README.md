# SE2_16_173731_173509_P
## SE2 Progetto
Il progetto è stato creato per semplificare l'ordinazione e la valutazione dei pasti da parte degli anziani per un'Agenzia di Trento. Quello che si può trovare su git è solo una parte, cioè solo la parte di ordinazione perchè purtroppo per i tempi ristretti non si è potuto sviluppare tutta l'app.
#
Se si vuole provarlo in locale bisogna avere creato un db vuoto e se si vuole connettersi bisogna usare la seguente stringa: DATABASE_URL= ('postgres://dbSW:password@localhost:5432/swDBFinal').
Se si volesse cambiarla si trova nella cartella dataManager nel file db.js.
Per far partire l'app in locale bisogna fare heroku local e non node index.js.
#
Per il testing viene fatto in locale quindi necessità il corretto funzionamento del database e la parte di script per la creazione delle tabelle se c'è ne bisogno. Per fare il testing è stato usato jasmine-node e installato tutte le sue dipendenze.
Api sono state descritte nel file swagger.yaml che si trova nella cartella API.
#

Si trova su heroku al seguente link:
https://progettosw2.herokuapp.com/
