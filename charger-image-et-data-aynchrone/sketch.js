/****************************************************************
V3 https://editor.p5js.org/Anne-Laure/sketches/JsVMS3ENO

Charger 1 image aléatoire sur unsplash et afficher son url

Partie de V2 https://editor.p5js.org/Anne-Laure/sketches/6S4MxN6zw
****************************************************************/

var imgURL ;
var drawLoop = true ;
var dataLoaded = false ;

function preload() {
  
  fetch(`https://source.unsplash.com/random/512x302`).then((response)=> {  
    imgURL = response.url ;
    print("---", imgURL) ;
    // charger l'image 
    img = loadImage( imgURL );
    return imgURL ;
    
  })   
}

function setup() {
  
  createCanvas(windowWidth, windowHeight);

    // voir aussi https://p5js.org/reference/#/p5/loadJSON 
    print("aaa", imgURL) ;

}

function draw() {
    
  if ( drawLoop ) { 
    waitForElement( imgURL )  ;
    if ( dataLoaded ) {       
      print('draw rrr', imgURL ) ; 
      drawLoop = false ;

    } 
      
  } else {
    
      background(220) ;
      image(img, 10,10) ;
      text( imgURL, 10, img.height + 30 ) ;
      
  } 
}

function waitForElement( variable ){
  // source https://stackoverflow.com/questions/7307983/while-variable-is-not-defined-wait
    if(typeof variable !== "undefined"){
        //variable exists, do what you want
        print("zzz", variable) ;
        dataLoaded = true ;
    }
    else{
        setTimeout(waitForElement, 250);
        dataLoaded = false ;
    }
}