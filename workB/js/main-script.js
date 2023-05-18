//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var camera, camera1, camera2, camera3, camera4, camera5;
var scene, renderer;
var material, geometry, mesh;

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene() {
    'use strict';

    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(20));
    scene.background = new THREE.Color( 0xE7DAF9 );

    createChest();
    createLeftArm();
    createRigthArm()

}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////

// Frontal
function createCamera1() {
    'use strict';
    camera1 = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera1.position.x = 0;
    camera1.position.y = 0;
    camera1.position.z = 50;
    camera1.lookAt(scene.position);
}

// Lateral
function createCamera2() {
    'use strict';
    camera2 = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera2.position.x = 50;
    camera2.position.y = 0;
    camera2.position.z = 0;
    camera2.lookAt(scene.position);
}

// Topo
function createCamera3() {
    'use strict';
    camera3 = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera3.position.x = 0;
    camera3.position.y = 50;
    camera3.position.z = 0;
    camera3.lookAt(scene.position);
}

// Ortogonal
function createCamera4() {
    'use strict';
    camera4 = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera4.position.x = 50;
    camera4.position.y = 50;
    camera4.position.z = 50;
    camera4.lookAt(scene.position);
}

// Perspetiva 
function createCamera5() {
    'use strict';
    camera5 = new THREE.PerspectiveCamera(1000,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera5.position.x = 0;
    camera5.position.y = 0;
    camera5.position.z = 100;
    camera5.lookAt(scene.position);
    camera5.rotateZ(Math.PI)
}

/////////////////////
/* CREATE LIGHT(S) */
/////////////////////

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

function createChest() {
    'use strict'

    var cube1 = new THREE.Object3D(); // abdomen of the chest
    material = new THREE.MeshBasicMaterial ({color: 0x00ff210, wireframe: false });
    geometry = new THREE.BoxGeometry(4, 2, 8)
    mesh = new THREE.Mesh(geometry, material);

    cube1.add(mesh);
    cube1.position.set(0, 1, 0);

    scene.add(cube1);

    var cube2 = new THREE.Object3D(); // bottom of the chest
    material = new THREE.MeshBasicMaterial ({color: 0xfb3210, wireframe: false });
    geometry = new THREE.BoxGeometry(8, 2, 8)
    mesh = new THREE.Mesh(geometry, material);

    cube2.add(mesh);
    cube2.position.set(0, -1, 0);

    scene.add(cube2);

    var cube3 = new THREE.Object3D(); // front of the chest
    material = new THREE.MeshBasicMaterial ({color: 0x0000ff, wireframe: false });
    geometry = new THREE.BoxGeometry(4, 6, 8)
    mesh = new THREE.Mesh(geometry, material);

    cube3.add(mesh);
    cube3.position.set(0, 5, 0);

    scene.add(cube3);

    var cube4 = new THREE.Object3D(); // left of the chest
    material = new THREE.MeshBasicMaterial ({color: 0x00ffff, wireframe: false });
    geometry = new THREE.BoxGeometry(2, 6, 6)
    mesh = new THREE.Mesh(geometry, material);

    cube4.add(mesh);
    cube4.position.set(3, 5, 1);

    scene.add(cube4);

    var cube5 = new THREE.Object3D(); // right of the chest
    material = new THREE.MeshBasicMaterial ({color: 0x00ffff, wireframe: false });
    geometry = new THREE.BoxGeometry(2, 6, 6)
    mesh = new THREE.Mesh(geometry, material);

    cube5.add(mesh);
    cube5.position.set(-3, 5, 1);

    scene.add(cube5);
}

function createLeftArm() {
    'use strict';
    
    var cube1 = new THREE.Object3D(); // right of the chest
    material = new THREE.MeshBasicMaterial ({color: 0x000000, wireframe: false });
    geometry = new THREE.BoxGeometry(2, 2, 6)
    mesh = new THREE.Mesh(geometry, material);

    cube1.add(mesh);
    
    material = new THREE.MeshBasicMaterial ({color: 0x000000, wireframe: false });
    geometry = new THREE.BoxGeometry(2, 8, 2)
    mesh = new THREE.Mesh(geometry, material);
    
    mesh.position.set(0,3, -4)
    cube1.add(mesh);
    cube1.position.set(3, 1, 1);

    scene.add(cube1);
}

function createRigthArm() {
    
    var cube1 = new THREE.Object3D(); // right of the chest
    material = new THREE.MeshBasicMaterial ({color: 0x000000, wireframe: false });
    geometry = new THREE.BoxGeometry(2, 2, 6)
    mesh = new THREE.Mesh(geometry, material);

    cube1.add(mesh);
    
    material = new THREE.MeshBasicMaterial ({color: 0x000000, wireframe: false });
    geometry = new THREE.BoxGeometry(2, 8, 2)
    mesh = new THREE.Mesh(geometry, material);
    
    mesh.position.set(0,3, -4)
    cube1.add(mesh);
    cube1.position.set(-3, 1, 1);

    scene.add(cube1);
}


//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions(){
    'use strict';

}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions(){
    'use strict';

}

////////////
/* UPDATE */
////////////
function update(){
    'use strict';

}

/////////////
/* DISPLAY */
/////////////
function render() {
    'use strict';
    renderer.render(scene, camera);
}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////
function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();

    createCamera1();
    createCamera2();
    createCamera3();
    createCamera4();
    createCamera5();

    camera = camera4; // start with ortogonal

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';

    render();

    requestAnimationFrame(animate);

}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() { 
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }


}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {

        case 49:
            camera = camera1;
            break;
        case 50:
            camera = camera2;
            break;
        case 51:
            camera = camera3;
            break;
        case 52:
            camera = camera4;
            break;
        case 53:
            camera = camera5;
            break;
    }
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

}