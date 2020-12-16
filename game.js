"use strict";
window.onload = function() {
  // var maDiv = document.getElementById("container");
  var miniJeuValideDiv = document.getElementById("miniJeuxValide");
  var miniJeuValidePoint = 0;
  var maps1 = true;
  var maps2 = false;
  var maps3 = false;
  var html = document.querySelector("body");
  var modalJeu1 = document.getElementById("modalJeu1");
  var modalJeu2 = document.getElementById("modalJeu2");
  var modalJeu3 = document.getElementById("modalJeu3");
  var accesCV = document.getElementById("accesCV");
  var cvPage = document.getElementById("cvPage");
  var cv = document.getElementById("cv");

  var afficheOuPas = false;
  cv.addEventListener("click", actionCV);
  function actionCV() {
    if (afficheOuPas == false) {
      cvPage.style.display = "block";
      window.scrollTo(0, 780);
      afficheOuPas = true;
      // html.style.backgroundColor = "white";
    } else {
      window.scrollTo(0, 0);
      cvPage.style.display = "none";
      afficheOuPas = false;
      // html.style.backgroundColor = "#696667ff";
    }
  }

  // touches utilisées pendant le jeu
  var key = {
    37: false,
    38: false,
    39: false,
    40: false
  };
  // initialisation du plan 2d avec canvas
  var monCanvas = document.getElementById("monCanvas");
  var ctx = monCanvas.getContext("2d");
  monCanvas.width = 1000;
  monCanvas.height = 700;

  // On cache le canvas jusqu'a que le joueur commence la partie et decide de son personnage
  modalJeu1.style.display = "none";
  modalJeu2.style.display = "none";
  modalJeu3.style.display = "none";
  var choixPersonnage = window.document.getElementById("choixPersonnage");
  choixPersonnage.style.display = "none";
  monCanvas.style.display = "none";
  var btnJouer = window.document.getElementById("btnJouer");
  btnJouer.addEventListener("click", jouer);
  function jouer() {
    choixPersonnage.style.display = "flex";
    btnJouer.style.display = "none";
  }

  // fonction constructeur pour creer un personnage ES6
  class CreerPerso {
    constructor() {
      this.x = 0;
      this.y = 220;
      this.width = 32;
      this.height = 48;
      this.imgSpriteX = 0;
      this.imgSpriteY = 0;
      this.vitesse = 2;
      this.estEnMouvement = false;
    }
    getTop() {
      return this.y;
    }
    getBottom() {
      return this.y + this.height;
    }
    getLeft() {
      return this.x;
    }
    getRight() {
      return this.x + this.width;
    }
  }

  var perso = new CreerPerso();

  // dessiner Logo et obstacle version constructeur ES6
  class DessinerObstacle {
    constructor(imageSrc, dx, dy, dWidth, dHeight) {
      this.imageSrc = imageSrc;
      this.dx = dx;
      this.dy = dy;
      this.dWidth = dWidth;
      this.dHeight = dHeight;
    }
    dessiner(imageSrc, dx, dy, dWidth, dHeight) {
      ctx.drawImage(monObstacle, dx, dy, dWidth, dHeight);
    }
    getTop() {
      return this.dy;
    }
    getBottom() {
      return this.dy + this.dHeight;
    }
    getLeft() {
      return this.dx;
    }
    getRight() {
      return this.dx + this.dWidth;
    }
  }
  var Obstacle = new DessinerObstacle(monObstacle, 350, 350, 30, 30);
  console.log(Obstacle.dy);

  //algo verifiant collision simplifié grace au getters initialisés en prototypes de nos objets CreerPerso et DessinerObstacle
  // et renvoyant un boolean
  function verifieCollision(perso, Obstacle) {
    if (
      perso.getTop() > Obstacle.getBottom() ||
      perso.getRight() < Obstacle.getLeft() ||
      perso.getBottom() < Obstacle.getTop() ||
      perso.getLeft() > Obstacle.getRight()
    ) {
      return false;
    }
    return true;
  }

  ///////////////////

  var monSprite = new Image();
  monSprite.src = "./src/perso1.png";
  var background = new Image();
  background.src = "./src/background1.jpg";
  // background.src = "./src/background2.jpg";
  var monObstacle = new Image();
  monObstacle.src = "./src/javascript.png";

  // Fleche indiquant les maps disponible pour le sprite
  var FlecheHaut = new Image();
  FlecheHaut.src = "./src/haut.png";
  var FlecheBas = new Image();
  FlecheBas.src = "./src/bas.png";
  var FlecheGauche = new Image();
  FlecheGauche.src = "./src/gauche.png";
  var FlecheDroite = new Image();
  FlecheDroite.src = "./src/droite.png";

  //changement de personnage
  var perso2 = window.document.getElementById("perso2");
  var perso3 = window.document.getElementById("perso3");
  var perso4 = window.document.getElementById("perso4");
  // window.document.getElementById("perso2").onclick = function clickperso2() {
  //   monSprite.src = "./src/perso2.png";
  // };

  //// Event click sur perso pour changer de perso

  perso1.addEventListener("click", function() {
    choixPersonnage.style.display = "none";
    monSprite.src = "./src/perso1.png";
    animation();
    monCanvas.style.display = "flex";
  });

  perso2.addEventListener("click", function() {
    choixPersonnage.style.display = "none";
    monSprite.src = "./src/perso2.png";
    animation();
    monCanvas.style.display = "flex";
  });

  perso3.addEventListener("click", function() {
    choixPersonnage.style.display = "none";
    monSprite.src = "./src/perso3.png";
    animation();
    monCanvas.style.display = "flex";
  });

  perso4.addEventListener("click", function() {
    monSprite.src = "./src/perso4.png";
    choixPersonnage.style.display = "none";
    animation();
    monCanvas.style.display = "flex";
  });

  // fonction dessinant Sprite
  // doc mdn ctx.drawImage(image, sx, sy, sLargeur, sHauteur, dx, dy, dLargeur, dHauteur);
  function dessinerSprite(
    imageSrc,
    sX,
    sY,
    sWidth,
    sHeight,
    dx,
    dy,
    dWidth,
    dHeight
  ) {
    ctx.drawImage(imageSrc, sX, sY, sWidth, sHeight, dx, dy, dWidth, dHeight);
  }

  // function dessinant Fleche sur la maps
  function dessinerFleche(image, dx, dy, dLargeur, dHauteur) {
    ctx.drawImage(image, dx, dy, dLargeur, dHauteur);
  }
  // fonction dessinant le Background du Canvas
  function dessinerBackground(background) {
    ctx.drawImage(background, 0, 0, monCanvas.width, monCanvas.height);
  }
  // var fond1 = dessinerBackground(background);

  // fonction appelée dans la boucle general pour activer les mouvements du sprite utilisé
  setInterval(function() {
    if (key["37"] || key["38"] || key["39"] || key["40"]) {
      if (perso.imgSpriteX < 3 && perso.estEnMouvement) {
        perso.imgSpriteX++;
      } else {
        perso.imgSpriteX = 0;
      }
    }
  }, 100);

  var compteurToucheElement = false;
  var persoHeight = 48;
  var persoWidth = 32;
  var jeu1 = false;
  var jeu2 = false;
  var jeu3 = false;

  // fonction s'executant en boucle via un requestanimationframe pour afficher tout les changements
  // et evenement provoquês par l'utilisateur
  function animation() {
    // .clearRect on efface l'image pour la recreer juste ensuite et donner l'effet d'une animation
    ctx.clearRect(0, 0, monCanvas.width, monCanvas.height);
    dessinerBackground(background);
    dessinerSprite(
      monSprite,
      perso.width * perso.imgSpriteX,
      perso.height * perso.imgSpriteY,
      perso.width,
      perso.height,
      perso.x,
      perso.y,
      persoWidth /* *1.5 */,
      persoHeight /* *1.5 */
    );

    // À chaque maps, logo et fleches correspondante
    if (maps1 == true) {
      dessinerFleche(FlecheDroite, 950, 350, 30, 30);
      if (!jeu1) {
        var Obstacle = new DessinerObstacle(monObstacle, 350, 350, 50, 50);
        Obstacle.dessiner(monObstacle, 350, 350, 50, 50);
      }
    }
    if (maps2 == true) {
      dessinerFleche(FlecheBas, 420, 650, 30, 30);
      dessinerFleche(FlecheHaut, 447, 243, 10, 10);
      if (!jeu2) {
        var Obstacle = new DessinerObstacle(monObstacle, 90, 300, 180, 180);
        Obstacle.dessiner(monObstacle, 90, 300, 180, 180);
      }
    }
    if (maps3 == true) {
      dessinerFleche(FlecheDroite, 970, 520, 20, 20);
      dessinerFleche(FlecheGauche, 5, 520, 20, 20);
      if (!jeu3) {
        var Obstacle = new DessinerObstacle(monObstacle, 700, 430, 70, 70);
        Obstacle.dessiner(monObstacle, 800, 490, 70, 70);
      }
    }

    // Condition verifiant la collision du sprite une fois avec l'obstacle en question
    // et mettant en premier plan le mini jeu en fonction de la maps
    if ((!jeu1 || !jeu2 || !jeu3) && typeof Obstacle !== "undefined") {
      if (verifieCollision(perso, Obstacle)) {
        if (compteurToucheElement == false) {
          // alert("collision!!");
          compteurToucheElement = true;
          miseAZero();
          if (maps1 == true && !jeu1) {
            modalJeu1.style.display = "flex";
          }
          if (maps2 == true && !jeu2) {
            modalJeu2.style.display = "flex";
          }
          if (maps3 == true && !jeu3) {
            modalJeu3.style.display = "flex";
          }
        }
      }
    }

    miniJeuValideDiv.innerHTML = `Vous avez reussi ${miniJeuValidePoint}/3 mini-jeux !`;

    // appel de la fonction gerant la touche appuyé key["..."]
    mouvementPerso();

    // requestAnimationFrame(animation) appel la fonction en continue 60fois par sec
    requestAnimationFrame(animation);
  }

  // fonction mettant à zero les mouvement et les touches appuyés
  function miseAZero() {
    key[37] = false;
    key[38] = false;
    key[39] = false;
    key[40] = false;
    perso.estEnMouvement = false;
  }

  // fonction s'executant à l'evenement touche clavier appuyée
  window.addEventListener("keydown", function(event) {
    key[event.which] = true;
    perso.estEnMouvement = true;
    console.log(key[event.which]);
    console.log(key);
  });

  // fonction s'executant à l'evenement touche clavier retirée
  window.addEventListener("keyup", function(event) {
    key[event.which] = false;
    perso.estEnMouvement = false;
    perso.imgSpriteX = 0;
    console.log(key);
  });

  // fonction effectuant des actions selon la touche etant préssée

  function mouvementPerso() {
    if (key["37"] == true && !key["38"] && !key["39"] && !key["40"]) {
      if (perso.x > 0 && (maps1 == true || maps2 == true)) {
        perso.x = perso.x - perso.vitesse;
        perso.imgSpriteY = 1;
        configMouvMaps2();
      }
      if (maps3 == true) {
        perso.x = perso.x - perso.vitesse - 1;
        perso.imgSpriteY = 1;
        if (perso.x < 0) {
          etatArriveeMaps2();
          etatArriveeMaps2DepuisMaps3();
        }
      }
    }
    // && (maps1 == true || maps2 == true)
    if (key["38"] == true && !key["37"] && !key["39"] && !key["40"]) {
      if (perso.y > 220 && (maps1 == true || maps2 == true)) {
        perso.y = perso.y - perso.vitesse;
        //ajustement de la taille du sprite pour donner un effet perspective
        persoWidth = persoWidth - (persoWidth * 1) / 180;
        persoHeight = persoHeight - (persoHeight * 1) / 180;
        perso.imgSpriteY = 3;
        configMouvMaps2();
      }
      if (perso.y < 245 && maps2 == true) {
        etatArriveeMaps1();
      }
      // if (perso.y > 400 && maps3 == true) {
      //   perso.y = perso.y - perso.vitesse;
      //   //ajustement de la taille du sprite effet perspective
      //   persoWidth = persoWidth - (persoWidth * 1) / 180;
      //   persoHeight = persoHeight - (persoHeight * 1) / 180;
      //   perso.imgSpriteY = 3;
      // }
    }
    if (key["39"] == true && !key["37"] && !key["38"] && !key["40"]) {
      if (
        perso.x < monCanvas.width - persoWidth &&
        (maps1 == true || maps2 == true)
      ) {
        perso.x = perso.x + perso.vitesse;
        perso.imgSpriteY = 2;
        configMouvMaps2();
      }
      if (perso.x > monCanvas.width - persoWidth && maps1 == true) {
        etatArriveeMaps2();
      }
      if (maps3 == true) {
        perso.x = perso.x + perso.vitesse + 1;
        perso.imgSpriteY = 2;
        if (perso.x > monCanvas.width - persoWidth) {
          // final
          if (miniJeuValidePoint == 3) {
            accesCV.style.display = "flex";
            etatArriveeMaps3();
            setTimeout(function() {
              accesCV.style.display = "none";
              actionCV();
            }, 2000);
          } else {
            etatArriveeMaps3();
            alert("Vous n'avez pas terminé vos mini-jeux !");
            miseAZero();
          }
        }
      }
    }
    if (key["40"] == true && !key["37"] && !key["38"] && !key["39"]) {
      if (
        perso.y < monCanvas.height - persoHeight &&
        (maps1 == true || maps2 == true)
      ) {
        perso.y = perso.y + perso.vitesse;
        //ajustement de la taille du sprite pour donner un effet perspective
        persoWidth = persoWidth + (persoWidth * 1) / 180;
        persoHeight = persoHeight + (persoHeight * 1) / 180;
        perso.imgSpriteY = 0;
        configMouvMaps2();
      }
      if (maps2 == true && perso.y > monCanvas.height - persoHeight) {
        etatArriveeMaps3();
      }
    }
    // console.log(persoHeight);
    // console.log(persoWidth);
    // console.log(perso.y);
  }

  //////////////
  ///
  // Etat du sprite et de l'obstacle lors du changement de map
  ///
  //////////////
  function etatArriveeMaps1() {
    background.src = "./src/background1.jpg";
    monObstacle.src = "./src/javascript.png";
    persoHeight = 48;
    persoWidth = 32;
    perso.y = 270;
    perso.x = monCanvas.width - persoWidth - 20;
    maps1 = true;
    maps2 = false;
    maps3 = false;
    persoHeight = 48;
    persoWidth = 32;
    miseAZero();
    perso.vitesse = 2;
    compteurToucheElement = false;
  }
  function etatArriveeMaps2() {
    background.src = "./src/background2.jpg";
    monObstacle.src = "./src/angular1.png";
    perso.y = 250;
    perso.x = 400;
    maps1 = false;
    maps2 = true;
    maps3 = false;
    persoHeight = 96;
    persoWidth = 64;
    miseAZero();
    perso.vitesse = 0.1;
    compteurToucheElement = false;
  }
  function etatArriveeMaps2DepuisMaps3() {
    background.src = "./src/background2.jpg";
    monObstacle.src = "./src/angular1.png";
    perso.y = 280;
    perso.x = 350;
    maps1 = false;
    maps2 = true;
    maps3 = false;
    persoHeight = 418;
    persoWidth = 280;
    miseAZero();
    perso.vitesse = 0.1;
    perso.imgSpriteY = 3;
    compteurToucheElement = false;
  }
  function etatArriveeMaps3() {
    background.src = "./src/background3.png";
    monObstacle.src = "./src/node.js1.png";
    perso.x = 20;
    perso.y = 430;
    maps1 = false;
    maps2 = false;
    maps3 = true;
    persoHeight = 120;
    persoWidth = 80;
    miseAZero();
    perso.vitesse = 2;
    perso.imgSpriteY = 2;
    compteurToucheElement = false;
  }
  function configMouvMaps2() {
    // le sprite en grossisant et dimunuant pour donner un effet 3d en perspective sur l'axe y dévie
    // naturellement -> correction trajectoire
    if (maps2 == true) {
      if (key["40"]) {
        perso.x = perso.x - 0.3;
      }
    }
    if (maps2 == true) {
      if (key["39"] == true) {
        perso.x = perso.x + 2;
      }
    }
    if (maps2 == true) {
      if (key["38"] == true) {
        perso.x = perso.x + 0.3;
      }
    }
    if (maps2 == true) {
      if (key["37"] == true) {
        perso.x = perso.x - 2;
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////
  /////
  ///
  // Jeu pierre feuille ciseau avec reponse aleatoire de l'ordinateur
  ///
  /////
  ////////////////////////////////////////////////////////////////////////

  // getRandomInt doc mdn JS
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  var compteurPointJoueur1 = 0;
  var compteurPointRobot1 = 0;

  const jeu = ["Pierre", "Feuille", "Ciseau"];

  let pierre = document.getElementById("pierre");
  let feuille = document.getElementById("feuille");
  let ciseau = document.getElementById("ciseau");
  let resultat = document.getElementById("resultat");
  let repTour = document.getElementById("reponseTour");
  let repRobot = document.getElementById("repRobot");

  pierre.addEventListener("click", clickPierre);
  function clickPierre() {
    let repOrdinateur = jeu[getRandomInt(3)];
    // alert(repOrdinateur);
    if (repOrdinateur == "Ciseau") {
      compteurPointJoueur1++;
      // alert("Vous marquez 1 point");
      repTour.innerHTML = "Vous marquez 1 point";
      repRobot.innerHTML = "✌🏼";
    }
    if (repOrdinateur == "Feuille") {
      compteurPointRobot1++;
      // alert("Le robot marque 1 point");
      repTour.innerHTML = "Le robot marque 1 point";
      repRobot.innerHTML = "🖐🏼";
    }
    if (repOrdinateur == "Pierre") {
      // alert("Le robot a egalement fait pierre");
      repTour.innerHTML = "Le robot a également fait pierre";
      repRobot.innerHTML = "👊🏼";
    }

    resultat.innerHTML = `Vous : ${compteurPointJoueur1} ||  Robot: ${compteurPointRobot1}`;
    unGagnant();
  }
  feuille.addEventListener("click", clickFeuille);
  function clickFeuille() {
    let repOrdinateur = jeu[getRandomInt(3)];
    if (repOrdinateur == "Ciseau") {
      compteurPointRobot1++;
      // alert("Le robot marque 1 point");
      repTour.innerHTML = "Le robot marque 1 point";
      repRobot.innerHTML = "✌🏼";
    }
    if (repOrdinateur == "Feuille") {
      // alert("Le robot a egalement fait feuille");
      repTour.innerHTML = "Le robot a également fait feuille";
      repRobot.innerHTML = "🖐🏼";
    }
    if (repOrdinateur == "Pierre") {
      compteurPointJoueur1++;
      // alert("Vous marquez 1 point");
      repTour.innerHTML = "Vous marquez 1 point";
      repRobot.innerHTML = "👊🏼";
    }

    resultat.innerHTML = `Vous : ${compteurPointJoueur1} ||  Robot: ${compteurPointRobot1}`;
    unGagnant();
  }
  ciseau.addEventListener("click", clickCiseau);
  function clickCiseau() {
    let repOrdinateur = jeu[getRandomInt(3)];
    if (repOrdinateur == "Ciseau") {
      // alert("Le robot a egalement fait ciseau");
      repTour.innerHTML = "Le robot a également fait ciseau";
      repRobot.innerHTML = "✌🏼";
    }
    if (repOrdinateur == "Feuille") {
      compteurPointJoueur1++;
      // alert("Vous marquez 1 point");
      repTour.innerHTML = "Vous marquez 1 point";
      repRobot.innerHTML = "🖐🏼";
    }
    if (repOrdinateur == "Pierre") {
      compteurPointRobot1++;
      // alert("Le robot marque 1 point");
      repTour.innerHTML = "Le robot marque 1 point";
      repRobot.innerHTML = "👊🏼";
    }

    resultat.innerHTML = `Vous : ${compteurPointJoueur1} ||  Robot: ${compteurPointRobot1}`;
    unGagnant();
  }

  function unGagnant() {
    if (compteurPointJoueur1 === 3) {
      // resultat.innerHTML = "Vous avez Gagné le premier mini-jeu !!";
      compteurPointJoueur1 = 0;
      compteurPointRobot1 = 0;
      miniJeuValidePoint++;
      repRobot.innerHTML = "Vous avez Gagné !!";
      repTour.innerHTML = "";
      jeu1 = true;
      setTimeout(function() {
        repTour.innerHTML = "";
        resultat.innerHTML = "";
        modalJeu1.style.display = "none";
      }, 2500);
    }
    if (compteurPointRobot1 === 3) {
      // resultat.innerHTML = `Vous avez perdu...`;
      compteurPointJoueur1 = 0;
      compteurPointRobot1 = 0;
      compteurToucheElement = 0;
      repRobot.innerHTML = "Vous avez perdu...";
      repTour.innerHTML = "";
      if (maps1 == true) {
        perso.x = 0;
      }
      setTimeout(function() {
        repTour.innerHTML = "";

        resultat.innerHTML = "";
        modalJeu1.style.display = "none";
      }, 2500);
    }
  }

  ////////////////////////////////////////////////////////////////////////
  /////
  ///
  // Jeu trouvez un nom entre 0 et 100
  ///
  /////
  ////////////////////////////////////////////////////////////////////////

  var nbSaisie = document.getElementById("nbSaisie");
  var resultatNb = document.getElementById("resultatNb");
  var repNb = document.getElementById("repNb");
  var chancesRestantes = document.getElementById("chancesRestantes");
  var affichageChances = "❤️ ";
  var nbhasardRobot;
  var totalChances = 7;

  var nbhasardRobot = getRandomInt(101);

  resultatNb.addEventListener("click", jeuDevine);

  function jeuDevine() {
    if (nbSaisie.value != "") {
      console.log(nbhasardRobot);
      console.log(nbSaisie.value);
      if (nbSaisie.value == nbhasardRobot) {
        console.log("Vous avez gagné !!");
        repNb.innerHTML = `Vous avez gagné !!`;
        jeu2 = true;
        miniJeuValidePoint++;
        setTimeout(function() {
          modalJeu2.style.display = "none";
        }, 2000);
      }
      if (nbSaisie.value < nbhasardRobot) {
        console.log("Le nombre est plus grand");
        totalChances--;
        // .repeat fonction prototype string par default
        chancesRestantes.innerHTML = affichageChances.repeat(totalChances);
        repNb.innerHTML = `Le nombre est plus grand`;
      }
      if (nbSaisie.value > nbhasardRobot) {
        console.log("Le nombre est plus petit");
        totalChances--;
        repNb.innerHTML = `Le nombre est plus petit`;
        chancesRestantes.innerHTML = affichageChances.repeat(totalChances);
      }
      if (totalChances == 0) {
        repNb.innerHTML = `Vous avez perdu... Le nombre était ${nbhasardRobot}`;
        etatArriveeMaps2();
        configMouvMaps2();
        totalChances = 7;
        nbhasardRobot = getRandomInt(101);
        console.log("perdu..");

        setTimeout(function() {
          chancesRestantes.innerHTML = affichageChances.repeat(totalChances);
          repNb.innerHTML = "Réessayez";
          modalJeu2.style.display = "none";
        }, 2000);
        // repNb.innerHTML = "Perdu :(";
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////
  /////
  ///
  // Jeu Morpion avec reponse aleatoire de l'ordinateur
  ///
  /////
  ////////////////////////////////////////////////////////////////////////
  const tourJoueur = document.getElementById("tourDeJouer");
  let jeuActif = true;
  let croix = "X";
  var etatJeu = ["", "", "", "", "", "", "", "", ""];
  const gagnant = document.getElementById("gagnant");
  var aGagner = false;
  const schemasGagnant = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  //msg
  let gagne = "Vous avez gagnez";
  let perd = "Vous avez gagnez";
  let egalite = "Égalité !!! On réesaye !";

  let toutLesCarre = document.querySelectorAll(".carre"); // renvoie un tab de tout les carré

  // aide stack over flow faire un addEventListener sur un foreach
  toutLesCarre.forEach(carre =>
    carre.addEventListener("click", actionClickCase)
  );
  function actionClickCase() {
    jeuActif = true;
    // // this represente l'element sur lequel on vient de cliquer
    // Creation data-id pour pourvoir recuperer les donnees via dataset en js
    console.log("case tape");
    console.log(this.dataset.id - 1);
    var indiceCaseAppuye = parseInt(this.dataset.id) - 1; // -1 pour que la case corresponde au tableau car indice commencant à 0

    if (etatJeu[indiceCaseAppuye] != "" || !jeuActif) {
      return;
    }
    etatJeu[indiceCaseAppuye] = "X";
    this.innerHTML = "X";
    verifieGagnant();

    var nbCarreRempli = 0;
    toutLesCarre.forEach(carre => {
      // console.log(carre.innerHTML);
      if (carre.innerHTML != "") {
        nbCarreRempli++;
        console.log("nbCarreRempli - O");
        console.log(nbCarreRempli);
      }
    });
    if (nbCarreRempli >= 8 && aGagner == false) {
      gagnant.innerHTML = "Égalité !!! On réesaye !";
      console.log("rempli");
      jeuActif = false;
      setTimeout(function() {
        toutLesCarre.forEach(carre => {
          carre.innerHTML = ""; //
          //a mettre a zero faire aussi pour le tab etatjeu en perdant
        });
        for (var i = 0; i <= 8; i++) {
          etatJeu[i] = "";
        }
        modalJeu3.style.display = "none";
        etatArriveeMaps3();
        gagnant.innerHTML = "";
      }, 2000);
      return;
    }

    // tour robot
    if (jeuActif && nbCarreRempli < 9) {
      actionRobot();
      verifieGagnant();
    }
  }

  function actionRobot() {
    var nonCasee = false;
    while (nonCasee == false) {
      var caseRobot = getRandomInt(9);
      if (etatJeu[caseRobot] != "O" && etatJeu[caseRobot] != "X") {
        etatJeu[caseRobot] == "O";
        etatJeu[caseRobot] = "O";
        document.getElementById(`case${caseRobot + 1}`).innerHTML = "O";
        nonCasee = true;
      }
    }
  }

  function verifieGagnant() {
    for (let schemaGagnant of schemasGagnant) {
      // on verifie que les 3 cases soient identiques et pas vides
      if (
        etatJeu[schemaGagnant[0]] == etatJeu[schemaGagnant[1]] &&
        etatJeu[schemaGagnant[1]] == etatJeu[schemaGagnant[2]] &&
        etatJeu[schemaGagnant[0]] != "" &&
        etatJeu[schemaGagnant[1]] != "" &&
        etatJeu[schemaGagnant[2]] != ""
      ) {
        if (etatJeu[schemaGagnant[0]] == "X") {
          aGagner = true;
          gagnant.innerHTML = "Vous avez gagnez";
          jeu3 = true;
          jeuActif = false;
          miniJeuValidePoint++;
          setTimeout(function() {
            modalJeu3.style.display = "none";
            toutLesCarre.forEach(carre => {
              // console.log(this.innerHTML);
              carre.innerHTML = "";
              //a mettre a zero faire aussi pour le tab etatjeu en perdant
            });
            for (var i = 0; i <= 8; i++) {
              etatJeu[i] = "";
            }
            gagnant.innerHTML = "";
            console.log(etatJeu);
          }, 2000);
        }
        if (etatJeu[schemaGagnant[0]] == "O") {
          gagnant.innerHTML = "Vous avez Perdu";
          jeuActif = false;
          toutLesCarre.forEach(carre => {
            // console.log(this.innerHTML);
            carre.innerHTML = "";
            //a mettre a zero faire aussi pour le tab etatjeu en perdant
          });

          for (i = 0; i <= 8; i++) {
            etatJeu[i] = "";
          }
          setTimeout(function() {
            modalJeu3.style.display = "none";
            etatArriveeMaps3();
            gagnant.innerHTML = "";
          }, 2000);
        }
      }
    }
  }
}; /* fin onload */
