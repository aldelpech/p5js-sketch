/****************************************************************
https://editor.p5js.org/Anne-Laure/sketches/I4K--pRHH
Dessiner des polygones à l'intérieur d'un rectangle qui s'ajustent à la taille du rectangle
Suite de https://editor.p5js.org/Anne-Laure/sketches/isSlIPoVn
****************************************************************/

// les caractéristiques du rectangle de base
var grafSize;
var grafPos;
var ratio = 16 / 9; // ratio du rectangle w = ratio * h 

var graf  ;    // le GRAPHICS qui va porter tout
var offsetY = 50 ;  // l'espace en hauteur dédié à autre chose

var drawLoop = true ; // arrêter la boucle draw

var polyG = [] ; // le rectangle et les 4 polygones

function setup() {

  createCanvas(windowWidth, windowHeight);

  grafSize = createVector(0, 0);
  grafPos = createVector(0, 0);

}

function draw() {

  if( drawLoop) {
    
    
    background( 255) ;

    /*** initialiser les GRAPHICS, calculer les tailles  ***/
    grafSize = ajustImage("sz", ratio);
    
    graf = createGraphics(grafSize.x, grafSize.y + offsetY );
    
    for (let i = 0; i <5; i++) {
      // renderer les formes
      polyG[i] = createGraphics(grafSize.x, grafSize.y );
    }

    grafPos = ajustImage("ps", ratio);

    /*** créer les GRAPHICS  ***/    
    // graf est le renderer principal, celui qui sera sauvegardé
    graf.background( 220 ) ;
    
    /* créer les formes polyG[i]  */
    
    // i = 0 un simple rectangle blanc
    polyG[0].fill( 255 ) ;
    polyG[0].rect(0,0,graf.width, graf.height) ;
    
    // i = 1 à 4 des polygones plus compliqués
    let ep = grafSize.x/20 ; // espace autour des rectangles
    let w = grafSize.x/2 - 3 * ep/2 ;
    let h = grafSize.y/2 - 3 * ep/2;

    polyG[1].fill( 255, 0, 0 ) ;
    polyG[1].rect(ep,ep,w, h) ;   
    polyG[2].fill( 0, 255, 0 ) ;
    polyG[2].rect(w+2*ep,ep,w, h) ;       
    polyG[3].fill( 0, 0, 255 ) ;
    polyG[3].rect(w+2*ep,h+2*ep,w,h) ;   
    polyG[4].fill( 155, 55, 0 ) ;
    polyG[4].rect(ep,h+2*ep,w, h) ;   

    for (let i = 0; i < 5; i++) {
      // afficher les polygones dans graf
      graf.image( polyG[i], 0, 0) ;
    }
    
    // graf.stroke(0) ;
    graf.fill(0) ;
    graf.textSize(offsetY/3) ;
    graf.text("Et voilà !", 10, grafSize.y + 25 ) ;
    graf.ellipse(grafSize.x/8, grafSize.y/4, 20, 20 ) ;
    image( graf, grafPos.x, grafPos.y  ) ;    
    drawLoop = false ;
    
  }

}

function ajustPolygon() {
  
  
}


function ajustImage(txt, ratio) {

  // RAPPEL ratio = 3/4 ; // ratio du rectangle que je veux dessiner w= 3 --> h = 4
  let coeff = 0.95; // on veut que l'image ne représente que 95% du plus petit côté du canevas
  let OffH = height - offsetY ; // laisser place pour texte)
  let CanR = width / OffH;
  print(txt, " Canevas W/H ", CanR);

  let maxSize = createVector(0, 0);
  let gPos = createVector(0, 0);

  if (CanR >= 1) {
    // la largeur est supérieure à la hauteur. C'est la hauteur qui nous limite
    if ( OffH * coeff * ratio >= width * coeff ) {
        
      // il faut que la hauteur soit réduite malgré tout
      maxSize.y = width * coeff / ratio ;
    } else {
      // il faut que la largeur ne dépasse pas la largeur moins la bordure prévue
      maxSize.y = OffH * coeff ; 
    }   
    maxSize.x = maxSize.y * ratio ;
    
  } else {
    // la hauteur est supérieure à la largeur. C'est la largeur qui nous limite
    /* maxSize.x est le plus petit de 
        - la largeur du canevas * le coefficient d'occupation (pour avoir une bordure)
        - la hauteur du dessin qui doit quand même respecter le ratio initial sans dépasser la hauteur du canevas
    */
    if ( width * coeff / ratio >= OffH * coeff ) {
        
      // il faut que la largeur soit réduite malgré tout
      maxSize.x = OffH * coeff * ratio ;
    } else {
      // il faut que la largeur ne dépasse pas la largeur moins la bordure prévue
      maxSize.x = width * coeff ; 
    }
    
    maxSize.y = maxSize.x / ratio ;
  }

  maxSize.x = int(maxSize.x);
  maxSize.y = int(maxSize.y);
  gPos.x = (width - maxSize.x) / 2;
  gPos.y = (OffH - maxSize.y) / 2;


  if (txt == "sz") {
    print(txt, "l canvas, l size, h canvas, h size ", width, maxSize.x, OffH, maxSize.y);
    return maxSize;
  } else if (txt == "ps") {
    print(txt, "x, y totx toty", gPos.x, gPos.y, maxSize.x + 2 * gPos.x, maxSize.y + 2 * gPos.y);
    return gPos;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // redessiner avec draw()
  drawLoop = true ;
}