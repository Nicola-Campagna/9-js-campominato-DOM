// bottone per iniziare il gioco
const btnEl = document.getElementById("start");
let bombeEl;
let gameover = false;

// al click si genera la tabella di gioco con le celle
btnEl.addEventListener(
    "click",
    function () {
        // tabella di gioco
        let tabella = document.getElementById("tabella");
        // select della difficoltà del gioco
        let difficolta = document.getElementById("level");
        // livello di gioco
        let level = difficolta.value;

        gameover = false;
        // GENERA TABELLA E CELLE DI GIOCO
        generaTabella(tabella, level);

    }
)



/************************
 *     FUNCTIONS
 ************************/


/**
 * funzione per generare una tabella di gioco
 * @param {*} grid tabella di gioco
 * @param {*} difficolta livello di gioco 
 */

function generaTabella(grid, difficolta) {
    grid.innerHTML = "";

    let numeroCelle;
    // SE il livello è 1 (FACILE) 10x10
    if (difficolta == 1) {
        numeroCelle = 100;
    }
    // ALTRIEMENTI SE il livello è 2 (MEDIO) 9x9
    else if (difficolta == 2) {
        numeroCelle = 81;
    }
    // ALTRIEMENTI il livello è 3 (DIFFICILE) 7x7
    else {
        numeroCelle = 49;
    }

    // ciclo per generare numero di celle in base alla 
    for (let i = 0; i < numeroCelle; i++) {
        // variabile d'appoggio per invocare e creare la cella
        const testoCella = i + 1;
        const cella = generaCella(difficolta, testoCella, numeroCelle);
        // appendo nella tabella la cella creata
        grid.append(cella);
    }

    // BOMBE
    bombeEl = generaBombe(difficolta, numeroCelle);
    console.log("bombe generate: " + bombeEl);

}



/**
 * funzione per generare celle da inserire nella tabella di gioco
 * @param {int} difficolta valore che indica a seconda della difficolta di gioco il numero di celle da inserire nella tabella
 * @param {*} testo (i+1)
 * @returns {HTMLElement} elemnto da ritornare sarà una cella
 */

function generaCella(difficolta, testo, numeroCelle) {
    // creo la cella
    const cellaEl = document.createElement("div");
    // aggiungo la classe css
    cellaEl.classList.add("cella");


    // SE il livello è DIFFICILE aggiungi la classe "difficile" per avere una tabella 7x7
    if (difficolta == 3) {
        cellaEl.classList.add("difficile");
    }
    // ALTRIMENTI SE il livello è MEDIO aggiungi la classe "medio" per avere una tabella 9x9
    else if (difficolta == 2) {
        cellaEl.classList.add("medio");
    }

    // testo all'interno della cella nel DOM
    cellaEl.innerHTML = testo;
    // nascondiamo il valore della cella all'utente settando un attributo html
    cellaEl.setAttribute("data-index", testo);
    // al click si accende o spegne
    cellaEl.addEventListener(
        "click",
        function () {
            if (!gameover) {

                // prendiamo l'atttributo html e lo inseriamo in una variabile 
                const cellaIndex = this.getAttribute("data-index");
                // prendiamo tutte le celle cliccate
                const activeCelle = document.querySelectorAll(".cella.active");

                console.log("hai cliccato la cella: " + cellaIndex);

                // SE le bombe includono la cella clicccata diventa rossa e perdiamo
                if (bombeEl.includes(parseInt(cellaIndex))) {
                    // diventa rossa
                    this.classList.add("active-red");
                    console.log("hai cliccato la bomba");
                    // TERMINA  PARTITA PERDE (0=FALSE)
                    gameOver(activeCelle, false);
                }
                // ALTRIMENTI
                else {
                    // assegniamo la classe active
                    this.classList.add("active");
                    console.log("era libera");
                }
                // SE era l'ultima cella cliccabile ...
                if (activeCelle.length == numeroCelle - bombeEl.length - 1) {
                    // HAI VINTO e TERMINA PARTITA (1=TRUE)
                    gameOver(activeCelle, true);
                }
            }

        }
    )
    // ritorno la cella creata
    return cellaEl;
}




/**
 * funzione che genera delle bombe per la tabella che non si ripetono mai
 * @param {int} difficolta valore che indica a seconda della difficolta di gioco il numero di celle da inserire nella tabella
 * @param {int} numeroCelle numero di celle (numero massimo da moltiplicare) per generare le bombe
 * @returns {int[]} array di numeri (bombe)
 */
function generaBombe(difficolta, numeroCelle) {
    // 16 bombe casuali
    const bombe = [];
    while (bombe.length < 16) {
        const randomNumber = Math.floor(Math.random() * numeroCelle + 1);
        if (!bombe.includes(randomNumber)) {
            bombe.push(randomNumber)
        }
    }
    return bombe;
}



/**
 * 
 * @param {*} activeCelle 
 * @param {boolean} userWin 
 */
function gameOver(activeCelle, userWin) {
    gameover = true;
    // const activeCelle = document.querySelectorAll(".cella.active");
    console.log(activeCelle);
    if (userWin) {
        alert("HAI VINTO , hai fatto " + activeCelle.length + " punti");

    } else {
        alert("HAI PERSO , hai fatto " + activeCelle.length + " punti");

    }
}
