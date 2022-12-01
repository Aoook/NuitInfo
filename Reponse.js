// variables globales
var fond_carte = ['#e0115f', '#ccc500'];
var elements = document.getElementsByClassName('interieurSecondaire');
var etat;
var titre;
var validePage;
var maxCarte;
var firstLoad = 0; // 0 = premier load ||| 1 = premier load déjà effectué



function initialisation(titre2){
    if(firstLoad == 0){ // si premier chargement; initier tous les cookies à faux par défaut
    }
    maxCarte=elements.length;
    titre = titreNom[titre2] // mise en place du bon titre
    // initialisation des couleurs de toutes les cartes -- version cookie à faire (meilleur)
    etat = new Array(maxCarte);
    for(var i=0; i<=maxCarte; i++){
        etat[i] = get_cookie(`${titre}${i}`);
        if(etat[i] == undefined){
            elements[i] = 1;
        }
        else if(etat[i] == 0){
            elements[i].style.backgroundColor = fond_carte[0];
        }
    }
}


function colorEdit(nbre){ // changer la couleur de la carte au clic
    // prendre valeur cookie de l'état du div
    var bin = get_cookie(`${titre}${nbre}`);
    if(bin == 0){ // ajoute 1
        elements[nbre].style.backgroundColor = fond_carte[1];
        bin = 1;
        document.cookie = `${titre}${nbre}=${bin}; SameSite=None; Secure`; // update l'état cookie
        textePanierUpdate(1);

    } 
    else if(bin == 1 || bin == -1){ // retire 1
        elements[nbre].style.backgroundColor = fond_carte[0];
        bin = 0;
        document.cookie = `${titre}${nbre}=${bin}; SameSite=None; Secure`; // update l'état cookie
        textePanierUpdate(2);
    }

}

function get_cookie(cookie_name) { // rend la valeur du cookie
    let c_name = cookie_name + "=";
    let cookie_decoded = decodeURIComponent(document.cookie);
    let cookie_parts = cookie_decoded.split(';');
    
    for(let i = 0; i <cookie_parts.length; i++) {
        let c = cookie_parts[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(c_name) == 0) {
            return c.substring(c_name.length, c.length);
        }
    }
    return "-1"; // si erreur, = -1
}

