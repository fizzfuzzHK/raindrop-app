//making sound by Tone.js
var delay = new Tone.FeedbackDelay(0.6,0.5);
delay.wet.value = 0.4;

var limiter = new Tone.Limiter(-6);

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

//create Synth
const synth = new Tone.Synth(option).chain(delay, limiter, Tone.Master);

//p5.js
var isRainMade = false;
var rains = []

//Rain class
class Rain{
  constructor(x,y){
  this.x = x;
  this.y = y;
  this.gravity = int(random(2,5));
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

//setup
function setup(){
  createCanvas(800,300);
  frameRate(100);

}

//create instance when mouseClicked
function mouseClicked(){
  var g = new Rain(mouseX,mouseY);
  rains.push(g);
  isRainMade = true;
  return false;
  }

//draw
function draw(){
  background(27,15,66);

  let d = color(221,253,254);
  fill(d);

  if(isRainMade == true){
    for(let i = rains.length -1 ; i >= 0 ;i--){
      rains[i].draw();
      rains[i].fall();

      if(rains[i].y > 300){
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
      if(rains[i].y > 303){
        rains.splice(i,1);
      }
    }
  }
}
