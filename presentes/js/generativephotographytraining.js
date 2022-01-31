// let valTarget = 0;

var GenerativePhotographyTraining = function(p) {

  let img;
  // let movie;
  
  // let val = 0;

  p.preload = function() {
    img = p.loadImage('image/liveactSpektrum.jpg');
  }

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    img.resize(p.windowWidth, p.windowHeight);
    // p.noStroke();
    // p.rectMode(p.CENTER);
    // p.fill(255,0,0)
    p.frameRate(30);
    
  }

  p.draw = function() {
    var scrollMaxY = window.scrollMaxY || (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    let scrollMapped = p.map(scrollPx, 0, scrollMaxY, 0, 255);
    // let scrollMapped = p.map(scrollPx, 0, document.body.scrollHeight, 0, 255);
    // if ( val < valTarget) {
    //   val+=10;
    // } else {
    //   val-=10;
    // }
    // val = p.constrain(val, 0, 250);
    p.pixelDensity(1);
    // let d = p.pixelDensity();
    //val = p.map(p.mouseX, 0, p.width, 0, 255);
    //p.background(0,0,0);
    // img.updatePixels();
    p.image(img,0,0);
    img.loadPixels();
    p.loadPixels();
    for (let i = 0; i < img.pixels.length; i+=4) {
      p.pixels[i+0] = img.pixels[i+0] + scrollMapped/2;  // R
      p.pixels[i+1] = img.pixels[i+1] + scrollMapped; // G 
      p.pixels[i+2] = img.pixels[i+2] + scrollMapped*2 ;  // B 
      // img.pixels[i+0] = img.pixels[(img.pixels.length-i)+0] ; //* p.cos(p.frameCount*0.001) ;  // R
      // img.pixels[i+1] = img.pixels[i+1] + (p.sin(p.frameCount*0.05)*2); // G 
      // img.pixels[i+2] = img.pixels[i+2] + (p.cos(p.frameCount*0.05)*5);  // B
      p.pixels[i+3] = 255;              // A 
    }
    p.updatePixels();
    //p.image(img,0,0);

  }

  // p.windowResized = function() {
  //   p.resizeCanvas(p.windowWidth, p.windowHeight);
  // }


}


