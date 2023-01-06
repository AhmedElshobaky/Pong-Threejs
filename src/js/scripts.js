import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';


const renderer = new THREE.WebGLRenderer();


renderer.shadowMap.enabled = true;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
const orbit = new OrbitControls( camera, renderer.domElement );

const axesHelper = new THREE.AxesHelper( 3 );


scene.add( axesHelper );
camera.position.set( 0, 40, 40 );
orbit.update();

const p1Geometry = new THREE.BoxGeometry(1, 1, 6);
const p1Material = new THREE.MeshStandardMaterial( { color: 0xffa400 } );
const p1 = new THREE.Mesh( p1Geometry, p1Material )
p1.position.set( -29.5, 0.5, 0 );
scene.add(p1);
p1.castShadow = true;

const p2Geometry = new THREE.BoxGeometry(1, 1, 6);
const p2Material = new THREE.MeshStandardMaterial( { color: 0xff00f0 } );
const p2 = new THREE.Mesh( p2Geometry, p2Material )
p2.position.set( 29.5, 0.5, 0 );
scene.add(p2);
p2.castShadow = true;

// create fruit basket geometry
// const basketGeometry = new THREE.CylinderGeometry( 4, 2, 2, 100,1, true );
// const basketMaterial = new THREE.MeshStandardMaterial( { color: 0x8b4513, wireframe: false } );
// const basketInnerMaterial = new THREE.MeshStandardMaterial( { color: 0x8b4513, wireframe: false, side: THREE.BackSide} );


// const basketBottom = new THREE.CircleGeometry( 3, 100 );
// const basketBottomMaterial = new THREE.MeshBasicMaterial( { color: 0x8b4513, wireframe: true } );
// const basketBottomMesh = new THREE.Mesh( basketBottom, basketBottomMaterial );
// basketBottomMesh.rotation.x = -0.5 * Math.PI;

// const basketInner = new THREE.Mesh( basketGeometry, basketInnerMaterial );
// const basket = new THREE.Mesh( basketGeometry, basketMaterial );
// basket.add( basketInner );
// basket.add( basketBottomMesh );
// basket.position.set( 0, 1, 0 );
// scene.add( basket );
// basket.castShadow = true;


const planeGeometry = new THREE.PlaneGeometry( 60, 30 );
const planeMaterial = new THREE.MeshStandardMaterial( { color: 0xffffff, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.rotation.x = -0.5 * Math.PI;
scene.add( plane );
plane.receiveShadow = true;

var grid=[];
var qty=2;
var hz_qty=30;
var vt_qty=5;
var half_hz=(qty*hz_qty)/2;
for(let p=1;p<=qty;p++){
	grid[p]=new THREE.GridHelper(hz_qty,vt_qty,'#666','#666');
	grid[p].position.set(-half_hz+(hz_qty*p)-hz_qty/2,0,0);
	scene.add(grid[p]);
}



const sphereGeometry = new THREE.SphereGeometry( 1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial( { color: 0x0000ff, wireframe: false } );
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere.position.set( -8, 1, 0 );
sphere.castShadow = true;


const ambiantLight = new THREE.AmbientLight( 0x333333, 0.5);
scene.add( ambiantLight );

// const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8);
// scene.add( directionalLight );
// directionalLight.position.set( -30, 50, 0 );
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.bottom = -10;


// const dLightHelper = new THREE.DirectionalLightHelper( directionalLight, 5);
// scene.add( dLightHelper );

// const dLightShadowHelper = new THREE.CameraHelper( directionalLight.shadow.camera );
// scene.add( dLightShadowHelper );

const spotLight = new THREE.SpotLight( 0xffffff, 1);
scene.add( spotLight );
spotLight.position.set( -30, 70, 0 );
spotLight.castShadow = true;
spotLight.angle = 0.50;


const sLightHelper = new THREE.SpotLightHelper( spotLight );
scene.add( sLightHelper );


const gui = new dat.GUI();

const options = {
    sphereColor: 0x0000ff,
    wireframe: false,
    HorizontalSpeed: 0.05,
    VerticalSpeed: 0.05
};

gui.addColor( options, 'sphereColor' ).onChange(function(e){
    sphere.material.color.set(e);
})

gui.add( options, 'wireframe' ).onChange(function(e){
    sphere.material.wireframe = e;
})

gui.add( options, 'HorizontalSpeed', 0, 0.1, 0.005 );
gui.add( options, 'VerticalSpeed', 0, 0.1, 0.005 );
document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);

//var positionX = basket.position.x;
//var positionZ = basket.position.z;
var position1 = p1.position.z;
var position2 = p2.position.z;


var move1  = 0;
var move2 = 0;


function onKeyDown(event) {
  if (event.keyCode == 87) {
    //console.log("p1Up");
    move1 = -0.2;
  }
  if (event.keyCode == 83) {
    //console.log("p1Down");
    move1 = 0.2;
  }
  if (event.keyCode == 38) {
    //console.log("p2Up");
    move2 = -0.2;
  }
    if (event.keyCode == 40) {
    //console.log("p2Down");
    move2 = 0.2;
    }
}

function onKeyUp(event) {
  if (event.keyCode == 87) {
    move1 = 0;
  }
  if (event.keyCode == 83) {
    move1 = 0;
  }
    if (event.keyCode == 38) {
    move2 = 0;
    }
    if (event.keyCode == 40) {
    move2 = 0;
    }
}

function updatePlayersPosition() {
  position1 += move1;
  position2 += move2;

  if (position1 < -12) {
    position1 = -12;
  }else if(position1 > 12) {
    position1 = 12;
  }

  if (position2 < -12) {
    position2 = -12;
  }else if(position2 > 12) {
    position2 = 12;
  }

  p1.position.z = position1;
  p2.position.z = position2;
}
var p1Counter = 0;
var p2Counter = 0;
var sphereHorizontalDirection = 1;
var sphereVerticalDirection = 1;
function updateSpherePosition() {
    sphere.position.x = sphere.position.x + options.HorizontalSpeed * sphereHorizontalDirection;
    sphere.position.z = sphere.position.z + options.VerticalSpeed * sphereVerticalDirection;
    //if sphere hit the edge of the field or players then change direction
    if (sphere.position.z < -14 || sphere.position.z >14) {
     sphereVerticalDirection *= -1;
    }
    //p2 scored
    if (sphere.position.x < -31) {
      p2Counter++;
      resetSphere()
      updateScoreHTML()
    }
    //p1 scored
    if (sphere.position.x > 31) {
      p1Counter++;
      resetSphere()
      updateScoreHTML()
    }
    // if sphere hits a player it changes direction
    if (sphere.position.x < -28 && sphere.position.z > p1.position.z - 3 && sphere.position.z < p1.position.z + 3) {
      sphereHorizontalDirection *= -1;
      // increase speed by small random amount
      if (options.HorizontalSpeed > 0.2 || options.VerticalSpeed > 0.2) {
        options.HorizontalSpeed = 0.2;
        options.VerticalSpeed = 0.2;
      }else{
      options.HorizontalSpeed += Math.random() * 0.025;
      options.VerticalSpeed += Math.random() * 0.025;
      }
      updateSpeedHTML()
    }
    if (sphere.position.x > 28 && sphere.position.z > p2.position.z - 3 && sphere.position.z < p2.position.z + 3) {
      sphereHorizontalDirection *= -1;
      if (options.HorizontalSpeed > 0.2 || options.VerticalSpeed > 0.2) {
        options.HorizontalSpeed = 0.2;
        options.VerticalSpeed = 0.2;
      }else{
      options.HorizontalSpeed += Math.random() * 0.025;
      options.VerticalSpeed += Math.random() * 0.025;
      }
      updateSpeedHTML()
    }
    //   if (sphere.position.x > basket.position.x - 4 &&
  //     sphere.position.x < basket.position.x + 4 &&
  //     sphere.position.z > basket.position.z - 4 &&
  //     sphere.position.z < basket.position.z + 4
  //     ) {
  //       scene.remove(sphere);
  //       sphere.position.x = Math.random() * 20 - 10;
  //       sphere.position.z = Math.random() * 20 - 10;
  //       sphere.position.y = 20;
  //       scene.add(sphere);
  //       counter++;
  //       if (counter % 3 == 0) {
  //         options.speed += 0.01;
  //       }
        
  //     }else{
  //       isPlaying = false;
  //     const msg = document.getElementById("gameOver");
  //     msg.style.display = "block";
  //     scene.remove(sphere);
  // }
  // document.getElementById("counter").innerHTML = '<p>Score: '+counter+ ' <br><br> Level: ' + ((options.speed.toFixed(2).slice(2)) - 4)+ '</p>';

}
function updateScoreHTML() {
  const msg = document.getElementById("score");
  msg.innerHTML = '<h1>'+p1Counter+ ' : ' + p2Counter+ '</h1>';
  msg.style.display = "block";
}
function updateSpeedHTML() {
  const msg = document.getElementById("counter");
  msg.innerHTML = '<p>Horizontal Speed: '+(options.HorizontalSpeed.toFixed(2).slice(2) -5)+'<br>Vertical Speed: ' +(options.HorizontalSpeed.toFixed(2).slice(2) -5)+ '</p>';
}
function resetSphere() {
  animateFalling();
  sphere.position.x = 0;
  sphere.position.z = 0;
  sphere.position.y = 5;
  options.HorizontalSpeed = 0.05;
  options.VerticalSpeed = 0.05;
  updateSpeedHTML();
  updateScoreHTML();
}
function animateFalling() {
    var interval = setInterval(function() {
        sphere.position.y -= 0.1;
        if (sphere.position.y < 1) {
            clearInterval(interval);
        }
    }, 1000/60);
}
var isPlaying  = false;
const button = document.getElementById("start");
button.addEventListener("click", function(){
    p1Counter = 0;
    p2Counter = 0;
    scene.add(sphere);
    updateScoreHTML();
    updateSpeedHTML();
    button.style.display = "none";
    isPlaying = true;
});
function animate() {

    updatePlayersPosition();
    if(isPlaying){
        updateSpherePosition();
    }

    renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );



