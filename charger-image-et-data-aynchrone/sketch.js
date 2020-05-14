/****************************************************************
https://editor.p5js.org/Anne-Laure/sketches/w_cCQUJyQ

Charger 1 image aléatoire sur unsplash et afficher son url

construite à partir de https://editor.p5js.org/Anne-Laure/sketches/JsVMS3ENO 
****************************************************************/

var imgURL ;
var drawLoop = true ;

function preload() {
  
  fetch(`https://source.unsplash.com/random/512x302`).then((response)=> {  
    imgURL = response.url ;
    print("---", imgURL) ;
    // charger l'image 
    img = loadImage( imgURL, waitForElement );
    return imgURL ;
    
  })   
}

function setup() {
  
  createCanvas(windowWidth, windowHeight);

    // voir aussi https://p5js.org/reference/#/p5/loadJSON 
    print("aaa", imgURL) ;

}

function draw() {
    
  if ( !drawLoop ) { 
    
      background(220) ;
      image(img, 10,10) ;
      text( imgURL, 10, img.height + 30 ) ;
      
  } 
}

function waitForElement( variable ){
  // voir https://stackoverflow.com/questions/7307983/while-variable-is-not-defined-wait
    if(typeof variable !== "undefined"){
        //variable exists, do what you want
        print("zzz", variable) ;
        drawLoop = false ;
    }
    else{
        setTimeout(waitForElement, 250);
    }
}