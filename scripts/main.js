const CLEFAPI = "b93bf2e390b99c07d176f7c11e5b0012";
let resultAPI;

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
    })
}