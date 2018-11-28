
//variabili

var angle = 0;
var w = 40;
var ma;
var massimaD;
var sound, fft, amplitude;

function preload() {
  sound = loadSound('assets/youngpope.mp3'); //caricamento dell'assets
}

function setup() {
  createCanvas(windowWidth, windowHeight,WEBGL); //definisco il cavas ed introduco webgl per introdurre la grafica 3d

//3d

  ma = atan(cos(QUARTER_PI));
  massimaD = dist(0, 0, 100, 200);

//sonoro

  fft = new p5.FFT();
  fft.setInput(sound);
  sound.play();
  amplitude = new p5.Amplitude();
  amplitude.setInput(sound);


}


function draw() {
  background(160);
  ortho(1000, -1000, -1000, 1000, 0, 2000); //definisco la visualizzazione ortogonale

  rotateX(-ma); //per ortho
  rotateY(-QUARTER_PI)﻿;

  push();
  strokeWeight(0);


//luci:
//creo un ambientLight per illuminare tutta la scena in maniera monodirezionale, con intensità e colore fissi
ambientLight(110, 110, 110);
pointLight(255, 255, 255, 0, -100, 0);

// I ciclo for
  for (var z = 0; z < height; z += w) {
    for (var x = 0; x < width; x += w) {
      push();
      var d = dist(x, z, width / 2, height / 2);
      var gap = map(d, 0, massimaD, -PI, PI);
      var a = angle + gap;
      var h = floor(map(cos(a), -1, 1, 50, 200)); //gestisco l'altezza atraverso la funzione map: assegno il valore cos(a) "come valore da mappare" che, invece, nell'oggetto sottostante risponderà al seno per creare una visuale che rappresenti la "complementarietà" --> da qui i valori -1/1
      translate(x - width / 2, height / 2, z - height / 2); //traslo i box
      specularMaterial(255, 0, 20); //setto il materiale ed il colore
      box(w, h, w); //definisco i parametri che gestiscono il box
      pop();
    }
  }

  // II ciclo for
  for (var z = 0; z < height; z += w) {
      for (var x = 0; x < width; x += w) {
        push();
        var d = dist(x, z, width / 2, height / 2);
        var gap = map(d, 0, massimaD, PI, -PI);
        var a = angle + gap;
        var h = floor(map(sin(a), 1, -1, 50, 200));
        translate(x - width / 2, height / 16, z - height / 2);
        specularMaterial(250, 255, 250);
        box(w, h, w);
        pop();
      }
    }
  angle -= 1.5*amplitude.getLevel();

}
function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}
