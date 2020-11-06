// il va me servir a avoir un tab des jours de la semaine a partir du jour ou je regarde lapp

const joursSemaine = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi']


let ajd = new Date();
let options = {weekday:'long'}; //
let jourActuel = ajd.toLocaleDateString('fr-FR',options) ;

// console.log(ajd);
// console.log(jourActuel);

jourActuel = jourActuel.charAt(0).toUpperCase()+jourActuel.slice(1); //slice a partir de la 2EME lettre

let tabJourOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat(joursSemaine.slice(0,joursSemaine.indexOf(jourActuel)));

// console.log(tabJourOrdre);


export default tabJourOrdre;