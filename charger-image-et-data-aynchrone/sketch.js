/****************************************************************
V2 https://editor.p5js.org/Anne-Laure/sketches/6S4MxN6zw

Charger 1 image aléatoire sur unsplash et afficher son url

Partie de V1 V1 https://editor.p5js.org/Anne-Laure/sketches/yLg3LMzqL
****************************************************************/

var numItemsToGenerate = 1; 
var imgURL ;
var drawLoop = true ;
var dataLoaded = false ;

function renderItem(){
  
  //https://dev.to/desi/using-the-unsplash-api-to-display-random-images-15co
  
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
  for(let i=0;i<numItemsToGenerate;i++){
    let test = renderItem();

    // A ce stade test ne contient encore rien
    print("aaa", test) ;
  }
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