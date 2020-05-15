/*
API unsplash Avec lien V5 https://editor.p5js.org/Anne-Laure/sketches/3981uPnuE

un mix de 
https://editor.p5js.org/Anne-Laure/sketches/E9jQED3qk
récupère 12 images aléatoires de unsplash et les affichent
https://editor.p5js.org/Anne-Laure/sketches/XwhEZT8Jv
récupère 3 images aléatoires avec leurs url en utilisant load Json

*/

// pour l'api unsplash
var client_id ="1424074b20f17701ec8c0601fd15ca686c70e2cb0e645f8137533d8063e664bc" ;
var nbImg = 12 ;

var img = [];   		// images  
var imgUrl = [] ;		// url de l'image entière
var croppedUrl = [] ;	// url de l'image découpée

function preload() {
 let url = 'https://api.unsplash.com/photos/random/?client_id=';
  url = url + client_id + '&count=' + nbImg ;

  print("url",url) ;
  
  loadJSON(url, processJson );
  
}

function processJson( data ) {
  
  
  // charger les imaged 
  for (let i = 0; i < nbImg; i++) {
    
    imgUrl[i] = data[i].urls.full ;
    // découpe l'image de manière aléatoire pour qu'elle fasse 1080 de large max
    croppedUrl[i] = imgUrl[i] + '&crop=entropy&h=600&w=1500&fit=crop' ;
    img[i] = loadImage( croppedUrl[i] );
    print(i, "full", imgUrl[i] ) ;
    print(i, "cropped", croppedUrl[i] ) ;    
    // img[i] = loadImage( data[i].urls.full );

  }
}



function setup() {

  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < nbImg; i++) { 
    let newW = width / 4 -( 10 * 4 ) ;
    img[i].resize( newW, 0) ;
  }
  noLoop();
}

function draw() {
  
  
   background(200);
   let pos = createVector(10,10) ;
   for (let i = 0; i < nbImg; i++) {  
      
     image(img[i], pos.x, pos.y ) ;
      
     pos.x = pos.x + img[i].width + 10 ;
     if ( (pos.x + img[i].width) > width ) {
       pos.x = 0 ;
       pos.y = pos.y + img[i].height + 10 ;
     }  
   }
  
  pos.y = pos.y + 20 ;
  text( "full URLs", 20, pos.y  ) ; 
  for (let i = 0; i < nbImg; i++) {  
     pos.x = 20 ;
     pos.y = pos.y + 15 ;
     text( imgUrl[i], pos.x, pos.y ) ;
  }  


  pos.y = pos.y +20 ;
  text( "cropped URLs", 20, pos.y  ) ; 
  for (let i = 0; i < nbImg; i++) {  
     pos.x = 20 ;
     pos.y = pos.y + 15 ;
     text( croppedUrl[i], pos.x, pos.y ) ;
  } 

}



