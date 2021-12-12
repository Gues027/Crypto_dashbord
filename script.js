/*
Projet Jquerry N3 WebTech
date : 04/12/2021
author : Hugo SCHRAM
*/ 

let page = 0;

$(document).ready(function() {

    $crypto = $('div#container');
    $forward = $('#arrow-forward');
    $back = $('#arrow-back');
    params = '/coins?skip=0&limit=10&currency=EUR';

    

    // Bouton forward/page suivante
    $forward.on('click', function() {
      console.log("Page suivante");
      page = page + 10;
      params = `/coins?skip=${page}&limit=10&currency=EUR`;
      getCrypto(params);
    });
  
    // Bouton back/page précédente
    $back.on('click', function() {
      console.log("Page précédente");
      page = page - 10;
      params = `/coins?skip=${page}&limit=10&currency=EUR`;
      getCrypto(params);
    });

    //request ajax inital
    getCrypto(params);
});


function getCrypto(params) {
    // Construction de l'URL, en utilisant le nombre de page si défini
    let url = "https://api.coinstats.app/public/v1";
    if(params) url += params;
  
    // Reset crypto (sinon la liste s'ajoute au fur et à mesure)
    $crypto.empty();

    // Définition de l'appel Ajax
    $.ajax({
      url: url,
      method: "GET",
      dataType : "json",
    }).then(function(response) {
      // Liste des cryptos
      let cryptos = response.coins;
      for(let coin of cryptos){
          $crypto.append(createDiv(coin));
      }
      
       // Affichage des boutons de changement de page
      afficheCacheBoutons(page);
     
    });

  }

  //change la couleur des poucentages
  function Evolutions1h(coin){

    if(coin.priceChange1h < 0)return "red";
    else if(coin.priceChange1h == 0)return "gray";
    
    return "green";
  }

  function Evolution1w(coin){

    if(coin.priceChange1w < 0) return "red";
    else if(coin.priceChange1w == 0) return "gray";
    return "green";
  }

  // Création <div> pour chaque user
  function createDiv(coin) {
    if(!coin) return "";
    return `<div class=cryptos>
      <h3>${coin.id}</h3>
      <a href=${coin.websiteUrl}><img src=${coin.icon} width=55 height=55></img></a>
      <a href=${coin.twitterUrl}><img src=https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/langfr-1024px-Twitter_Bird.svg.png width=55 height=55"></img></a>
      <p>${arrondi(coin.price)}</p>
      <div class="evo">
          <p>Price Change 1 Hour : <br><span style="color:${Evolutions1h(coin)}";>${arrondi(coin.priceChange1h)}</span></br></p>
      </div>

      <div class="evo">
          <p>Price Change 1 week : <br><span style="color:${Evolution1w(coin)}";>${arrondi(coin.priceChange1w)}</span></br></p>
      </div>
    </div>`;
  }

  //fonction arrondi a 2 chiffre apres la virgule
  function arrondi(num){
    let m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
  
  }

  // Permet de gérer l'affichage ou le masquage des boutons (si première ou dernière page)
  function afficheCacheBoutons(page) {
    
    if(page<=30) {
      $('#arrow-forward').show();
    } else {
      $('#arrow-forward').hide();
    }
    if(page>0) {
      $('#arrow-back').show();
    } else {
      $('#arrow-back').hide();
    }
  }
