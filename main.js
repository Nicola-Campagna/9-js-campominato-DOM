// tabella di gioco
const tabella = document.getElementById("tabella");

generaTabella(tabella, 1);


/************************
 *     FUNCTIONS
 ************************/


/**
 * funzione per generare una tabella di gioco
 * @param {*} grid tabella di gioco
 * @param {*} difficolta livello di gioco 
 */

function generaTabella(grid, difficolta) {
    grid.innnerHTML = "";
    // ciclo per generare numero di celle in base alla 
    for (let i = 0; i < 100; i++) {
        // variabile d'appoggio per invocare e creare la cella
        const testoCella = i + 1;
        const cella = generaCella(1, testoCella);
        // appendo nella tabella la cella creata
        grid.append(cella);
    }
}



/**
 * funzione per generare celle da inserire nella tabella di gioco
 * @param {int} difficolta valore che indica a seconda della difficolta di gioco il numero di celle da inserire nella tabella
 * @param {*} testo (i+1)
 * @returns {HTMLElement} elemnto da ritornare sarà una cella
 */

function generaCella(difficolta, testo) {
    // creo la cella
    const cellaEl = document.createElement("div");
    // aggiungo la classe css
    cellaEl.classList.add("cella");
    // testo all'interno della cella nel DOM
    cellaEl.innerHTML = testo;
    // al click si accende o spegne
    cellaEl.addEventListener(
        "click",
        function () {
            // accendi o spegni
            this.classList.toggle("active");
            console.log("hai cliccato la cella: " + this.innerHTML);
        }
    )
    // ritorno la cella creata
    return cellaEl;
}