/****************************************************************
https://editor.p5js.org/Anne-Laure/sketches/isSlIPoVn
Dessiner un rectangle qui prend 95% de la hauteur ou largeur d'écran et se centre

Voir mon article https://knowledge.parcours-performance.com/p5js-canevas-responsive/ 
****************************************************************/

var grafSize;
var grafPos;
var ratio = 16 / 9; // ratio du rectangle que je veux dessiner w = ratio * h 

var drawLoop = true ; // arrêter la boucle draw
function setup() {

  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);

  grafSize = createVector(0, 0);
  grafPos = createVector(0, 0);

}

function draw() {

  if( drawLoop) {
    
    background(95) ;
    let col = random(100) ; // couleur
    grafSize = ajustImage("sz", ratio);
    grafPos = ajustImage("ps", ratio);
    fill( col, 80, 80, 100 ) ;
    rect(grafPos.x, grafPos.y, grafSize.x, grafSize.y);  
    drawLoop = false ;
    
  }

}


function ajustImage(txt, ratio) {

  // RAPPEL ratio = 3/4 ; // ratio du rectangle que je veux dessiner w= 3 --> h = 4
  let coeff = 0.95; // on veut que l'image ne représente que 95% du plus petit côté du canevas
  let CanR = width / height;
  print(txt, " Canevas W/H ", CanR);

  let maxSize = createVector(0, 0);
  let gPos = createVector(0, 0);

  if (CanR >= 1) {
    // la largeur est supérieure à la hauteur. C'est la hauteur qui nous limite
    if ( height * coeff * ratio >= width * coeff ) {
        
      // il faut que la hauteur soit réduite malgré tout
      maxSize.y = width * coeff / ratio ;
    } else {
      // il faut que la largeur ne dépasse pas la largeur moins la bordure prévue
      maxSize.y = height * coeff ; 
    }   
    maxSize.x = maxSize.y * ratio ;
    
  } else {
    // la hauteur est supérieure à la largeur. C'est la largeur qui nous limite
    /* maxSize.x est le plus petit de 
        - la largeur du canevas * le coefficient d'occupation (pour avoir une bordure)
        - la hauteur du dessin qui doit quand même respecter le ratio initial sans dépasser la hauteur du canevas
    */
    if ( width * coeff / ratio >= height * coeff ) {
        
      // il faut que la largeur soit réduite malgré tout
      maxSize.x = height * coeff * ratio ;
    } else {
      // il faut que la largeur ne dépasse pas la largeur moins la bordure prévue
      maxSize.x = width * coeff ; 
    }
    
    maxSize.y = maxSize.x / ratio ;
  }

  maxSize.x = int(maxSize.x);
  maxSize.y = int(maxSize.y);
  gPos.x = (width - maxSize.x) / 2;
  gPos.y = (height - maxSize.y) / 2;


  if (txt == "sz") {
    print(txt, "l canvas, l size, h canvas, h size ", width, maxSize.x, height, maxSize.y);
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