import tabJourOrdre from './Utilitaire/gestionTemps.js';

console.log('Depuis main js',tabJourOrdre);
const CLEFAPI = "b93bf2e390b99c07d176f7c11e5b0012";
let resultAPI;

const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const jour = document.querySelectorAll('.jour-prevision-nom');
const tempJours = document.querySelectorAll('.jour-prevision-temps');
const imgIcon = document.querySelector('.logo-meteo');
const chargement = document.querySelector('.overlay-icon-chargement')

// ce qui ns interesse ce longitude et latitude car on va extraire et le mettre ds des variable et on fait appel a l'API avec cette posiition
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
        //1er param : position longitude ... 
        //console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long,lat);
    },()=>{
        alert('vous avez refusez la géolocalisation , veuillez l\'activez')
    })
}

function AppelAPI(long,lat){
    //console.log(long,lat)
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&unites=metric&lang=fr&appid=${CLEFAPI}`) //elle ns permet de faire une requete http
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        console.log(data);
        resultAPI = data;

        temps.innerText = resultAPI.current.weather[0].description;
        temperature.innerText = `${Math.trunc(resultAPI.current.temp/10)}°` //trunc:pour enlever les chiffres aprés la virgule
        localisation.innerText = resultAPI.timezone;

        //les heures , par tranche de trois avec leur température
        let heureActuelle = new Date().getHours();


        for (let i = 0; i < heure.length; i++) {
            
            let heureIncr = heureActuelle+i*3;

            if(heureIncr>24){
                heure[i].innerText = `${heureIncr-24} h`;
            }else if(heureIncr === 24){
                heure[i].innerText = `00 h`;
            }else{
                heure[i].innerText = `${heureIncr} h`;
            }
            
        }

        //temp pour 3h

        for (let j = 0; j < tempPourH.length; j++) {
            tempPourH[j].innerText = `${Math.trunc(resultAPI.hourly[j*3].temp/10)}°`
            
        }

        //Trois premieres lettres des jours
        for(let k=0; k<tabJourOrdre.length;k++){
            jour[k].innerText= tabJourOrdre[k].slice(0,3);
        }

        //temp par jour

        for(let m=0;m<7;m++){
            tempJours[m].innerText = `${Math.trunc(resultAPI.daily[m+1].temp.day/10)}°`
        }

        //Icone dynamique :
        if(heureActuelle>=6 && heureActuelle<21){
            imgIcon.src = `ressources/jour/${resultAPI.current.weather[0].icon}.svg`
        }else{
            imgIcon.src = `ressources/nuit/${resultAPI.current.weather[0].icon}.svg`
        }


        chargement.classList.add('disparition')

    })
}