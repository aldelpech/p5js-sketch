/****************************************************************
 * bases d'un emporte-pièce qui vient prendre des morceaux d'une image
 * pour les recoller ailleurs
 * 
 * exemple qui fonctionne bien : 
 * https://editor.p5js.org/Anne-Laure/sketches/TmFQ0ZJ8q
 ****************************************************************/

var img; // l'image que l'on va découper
var msk; // l'emporte-pièce ou masque de découpe
var imgZone; // ce qui pourra être sauvegardé en image
var texte1;

function preload() {

  img = loadImage("https://source.unsplash.com/random/1280x640");

}

function setup() {

  createCanvas(windowWidth, windowHeight);
  img.resize(width * 0.9, 0);
  msk = createGraphics(int(img.width * 0.8), int( img.height * 0.8));
  frameRate(8);

  // texte à afficher
  texte1 = "Touches e ou E --- enregistrer écran et original";

}

function draw() {

  background(240);
  pixEllipse();
  text(texte1, 10, 20 + img.height);
}

function pixEllipse(index) {

  // définir la zone qui sera sauvegardée
  imgZone = createGraphics(int(img.width), int(img.height));
  let mskPosX = round(random(1.1 * img.width), 2);
  let mskPosY = round(random(1.2 * img.height), 2)

  let maskH = width / 40;
  let maskV = height / 16;
  msk.ellipse(mskPosX, mskPosY, maskH, maskV);

  let imgclone2;
  (imgClone2 = img.get()).mask(msk.get());

  image(imgClone2, 0, 0);

  // dessiner le contenu du masque dans la partie à sauver également
  imgZone.image(imgClone2, 0, 0);
}

function keyReleased() {
  if (key == 'e' || key == 'E') {
    // https://github.com/processing/p5.js/issues/2841
    var imgG = createImage(imgZone.width + 20, imgZone.height + 20);
    imgG.copy(imgZone, 0, 0, imgZone.width, imgZone.height, 10, 10, imgZone.width, imgZone.height);

    imgG.save("reconst" + frameCount, '.png');
    // sauver l'image originelle
    img.save("Original" + frameCount, '.png');
  }
}