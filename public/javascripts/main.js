



var isRainMade = false;
var rains = new Array(20);
var a = 0;

var delay = new Tone.FeedbackDelay(0.6,0.5);
var limiter = new Tone.Limiter(-6);

delay.wet.value = 0.4;
let masterComp = new Tone.Compressor(-30,3).toMaster();

var option = {
 oscillator: {
 type: "sine"//"triangle"
 },
 envelope: {
 attack: 0.005,
 decay: 0.1,
 sustain: 0.3,
 release: 4.5
 }
};
const synth = new Tone.Synth(option).chain(delay, limiter, Tone.Master);


class Rain{
  constructor(x,y){
  this.x = x;
  this.y = y;
  this.gravity = 2;
  }

  draw(x,y){
    stroke(255);
    ellipse(this.x,this.y,10,10);

  }

  fall(){
    if(this.y <= 305){
      this.y += this.gravity;
    }
  }

}

function setup(){
  createCanvas(800,300);
  frameRate(100);

}

function mouseClicked(){
  rains[a] = new Rain(mouseX,mouseY);
  a += 1;

  isRainMade = true;
  console.log(a);
  console.log(rains[0].y);
  return false;
  }


function draw(){
  background(27,15,66);

   let d = color(221,253,254);
  fill(d);

  if(isRainMade == true){
  for(let i = 0; i < a ;i++){
  rains[i].draw();
  rains[i].fall();
  console.log(rains[0].y);

  if(rains[i].y == 300.5 || rains[i].y == 299.5){
    var c;
    if(rains[i].x > 0 && rains[i].x < 100){
      c = "C5";
    }
    else if(rains[i].x > 100 && rains[i].x < 200){
      c = "D5";
    }
    else if(rains[i].x > 200 && rains[i].x < 300){
      c = "G5";
    }
    else if(rains[i].x > 300 && rains[i].x < 400){
      c = "A5";
    }
    else if(rains[i].x > 400 && rains[i].x < 500){
      c = "B5";
    }
    else if(rains[i].x > 500 && rains[i].x < 600){
      c = "C6";
    }
    else if(rains[i].x > 600 && rains[i].x < 700){
      c = "D6";
    }
    else if(rains[i].x > 700 && rains[i].x < 800){
      c = "E6";
    }
    synth.triggerAttackRelease(c, "8n");
     }

  }

  }
}
