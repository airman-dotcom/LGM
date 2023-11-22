//const camX = 0, camY = 2, camZ = 0;
const width = window.innerWidth;
const canvas = document.getElementById("canvas");
const height = window.innerHeight;
/*const realCamX = (width / 2) + theoCamX, realCamY = (height / 2) + theoCamY, realCamZ = theoCamZ;*/
/*
<------x------>


^
|
|
|
y
|
|
v

z (towards and away from you)

*/


function calcR(x,y,z){
  return Math.sqrt(x**2 + y**2 + z**2);
}


class Point {
  constructor(x, y, z, s, cam){
    this.x = x;
    this.y = y;
    this.z = z;
    this.s = s;
    this.r = 1/(calcR(x,y,z));
    this.ratio = s/this.r;
    this.cam = cam;
    this.point;
    this.draw();
  }
  draw(){
    let awayX = this.x - (this.cam.x ) ;
    console.log(this.cam.x)
    let awayY = this.y - (this.cam.y);
    let awayZ = this.z - this.cam.z;
    let point = document.createElement("img");
    point.style.position = "absolute";
    point.src = "dot.png";
    point.width = this.s;
    point.height = this.s;
    point.style.left = `${(awayX + 50) + 50}vh`;
    point.style.top = `${50 - awayY}vh`;
    this.point = point;
    canvas.appendChild(this.point);
  }
  move(type, amount){
    if (type == "x"){
      this.x += amount;
    } else if (type == "y"){
      this.y += amount;
    } else {
      this.z += amount;
    }
    this.r = 1/(calcR(this.x, this.y, this.z))
    this.s = this.r * this.ratio

    clear();
    this.draw();
  }
}

class Camera {
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
    this.canvas = canvas;
  }
  move(type, amount){
    if (type == "x"){
      this.x += amount;
    } else if (type == "y"){
      this.y -= amount;
    } else {
      this.h += amount;
      this.w += amount;
    }
  }
}
let camera = new Camera(0, 0, 0);

function clear(){
  for (let i = 0;i<canvas.childElementCount + 1;i++){
    canvas.removeChild(canvas.children[i]);
  }
}
let p1 = new Point(0,0,5,60, camera);
//let p2 = new Point(4,4,5, 5,5, camera);

p1.draw();
document.body.addEventListener("keydown", e => {
  if (e.keyCode == 38){
    console.log(e)
    //up
    p1.move("z", 0.5);
  } else if (e.keyCode == 40){
    p1.move("z", -0.5)
  } else if (e.keyCode == 87){
    //y up
    p1.move("y", 0.5)
  } else if (e.keyCode == 83){
    p1.move("y", -0.5);
  } else if (e.keyCode == 68){
    p1.move("x", 0.5)
  } else if (e.keyCode == 65){
    p1.move("x", -0.5)
  }
})