//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var camera, camera1, camera2, camera3, camera4, camera5;
var scene, renderer;
var material, geometry, mesh;
var right_arm, left_arm, chest, right_leg, right_foot, left_leg, left_foot, head;

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
    createRigthArm();
    createLeftLeg();
    createRightLeg();
    createHead();

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
    camera5.rotateZ(Math.PI);
}

/////////////////////
/* CREATE LIGHT(S) */
/////////////////////

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

function createChest() {
    'use strict'

    chest = new THREE.Object3D(); // abdomen of the chest
    material = new THREE.MeshBasicMaterial ({color: 0x00ff210, wireframe: false });
    geometry = new THREE.BoxGeometry(8, 4, 16);
    mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(0, 2, 0);
    chest.add(mesh);


    material = new THREE.MeshBasicMaterial ({color: 0xfb3210, wireframe: false });
    geometry = new THREE.BoxGeometry(16, 4, 16);
    mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(0, -2, 0);
    chest.add(mesh);


    material = new THREE.MeshBasicMaterial ({color: 0x0000ff, wireframe: false });
    geometry = new THREE.BoxGeometry(8, 12, 16);
    mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(0, 10, 0);
    chest.add(mesh);


    material = new THREE.MeshBasicMaterial ({color: 0x00ffff, wireframe: false });
    geometry = new THREE.BoxGeometry(4, 12, 12);
    mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(6, 10, 2);
    chest.add(mesh);


    material = new THREE.MeshBasicMaterial ({color: 0x00ffff, wireframe: false });
    geometry = new THREE.BoxGeometry(4, 12, 12);
    mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(-6, 10, 2);
    chest.add(mesh);

    material = new THREE.MeshBasicMaterial ({color: 0xff00ff, wireframe: false });
    geometry = new THREE.CylinderGeometry( 3, 3, 3, 64);
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI / 2;
    mesh.rotation.z = Math.PI / 2;

    mesh.position.set(10, -4, 2);
    chest.add(mesh);

    material = new THREE.MeshBasicMaterial ({color: 0xff00ff, wireframe: false });
    geometry = new THREE.CylinderGeometry( 3, 3, 3, 64);
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI / 2;
    mesh.rotation.z = Math.PI / 2;

    mesh.position.set(-10, -4, 2);
    chest.add(mesh);

    scene.add(chest);
}

function createLeftArm() {
    'use strict';
    
    left_arm = new THREE.Object3D(); // right of the chest
    material = new THREE.MeshBasicMaterial ({color: 0x000000, wireframe: false });
    geometry = new THREE.BoxGeometry(4, 4, 12);
    mesh = new THREE.Mesh(geometry, material);

    left_arm.add(mesh);
    
    material = new THREE.MeshBasicMaterial ({color: 0x000000, wireframe: false });
    geometry = new THREE.BoxGeometry(4, 16, 4);
    mesh = new THREE.Mesh(geometry, material);
    
    mesh.position.set(0, 6, -8);
    left_arm.add(mesh);
    material = new THREE.MeshBasicMaterial ({color: 0xFF00FF, wireframe: false });
    geometry = new THREE.CylinderGeometry(1, 1, 8, 30);
    mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(3, 13, -8);
    left_arm.add(mesh);

    left_arm.position.set(6, 2, 2);

    scene.add(left_arm);
}

function createRigthArm() {
    'use strict';
    
    right_arm = new THREE.Object3D(); // right of the chest
    material = new THREE.MeshBasicMaterial ({color: 0x000000, wireframe: false });
    geometry = new THREE.BoxGeometry(4, 4, 12);
    mesh = new THREE.Mesh(geometry, material);

    right_arm.add(mesh);
    
    material = new THREE.MeshBasicMaterial ({color: 0x000000, wireframe: false });
    geometry = new THREE.BoxGeometry(4, 16, 4);
    mesh = new THREE.Mesh(geometry, material);
    
    mesh.position.set(0, 6, -8);
    right_arm.add(mesh);

    material = new THREE.MeshBasicMaterial ({color: 0xFF00FF, wireframe: false });
    geometry = new THREE.CylinderGeometry(1, 1, 8, 30);
    mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(-3, 13, -8);
    right_arm.add(mesh);

    right_arm.position.set(-6, 2, 2);

    scene.add(right_arm);
}

function createHead(){
    'use strict';

    head = new THREE.Object3D();
    
    material = new THREE.MeshBasicMaterial ({color: 0x9B59B6, wireframe: false });
    geometry = new THREE.BoxGeometry(6, 6, 6);
    mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(0, 0, 0);
    head.add(mesh);

    material = new THREE.MeshBasicMaterial ({color: 0x000000, wireframe: false });
    geometry = new THREE.BoxGeometry(1, 1, 1);
    mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(2, 0, 3);
    head.add(mesh);

    material = new THREE.MeshBasicMaterial ({color: 0x000000, wireframe: false });
    geometry = new THREE.BoxGeometry(1, 1, 1);
    mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(-2, 0, 3);
    head.add(mesh);

    material = new THREE.MeshBasicMaterial ({color: 0xFF00FF, wireframe: false });
    geometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 30);
    mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(3.5, 3.5, 0);
    head.add(mesh);

    material = new THREE.MeshBasicMaterial ({color: 0xFF00FF, wireframe: false });
    geometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 30);
    mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(-3.5, 3.5, 0);
    head.add(mesh);

    head.position.set(0, 20, 0);

    scene.add(head);
}

function createLeftLeg() {
    'use strict';
    
    left_leg = new THREE.Object3D(); // leg
    material = new THREE.MeshBasicMaterial ({color: 0xaa00ff, wireframe: false });
    geometry = new THREE.BoxGeometry(4, 16, 4)
    mesh = new THREE.Mesh(geometry, material);
    
    mesh.position.set(0,10, -1)
    left_leg.add(mesh);

    material = new THREE.MeshBasicMaterial ({color: 0xff00ff, wireframe: false });
    geometry = new THREE.CylinderGeometry( 3, 3, 3, 64);
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI / 2;
    mesh.rotation.z = Math.PI / 2;

    mesh.position.set(4, 1, 0);
    left_leg.add(mesh);

    mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI / 2;
    mesh.rotation.z = Math.PI / 2;

    mesh.position.set(4, 8.5, 0);

    left_leg.add(mesh);

    left_leg.position.set(4, -22, 0);

    scene.add(left_leg);

    left_foot = new THREE.Object3D(); 
    left_foot.userData = { movingUp: false, movingDown: false, step: 0, angle:0 };

    material = new THREE.MeshBasicMaterial ({color: 0xaa00ff, wireframe: false });
    geometry = new THREE.BoxGeometry(5, 4, 8)
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 1);
    var cube = new THREE.Object3D();
    cube.add(mesh);
    left_foot.add(cube)
    left_foot.position.set(4, -22, -1);
    
    scene.add(left_foot);
}

function createRightLeg() {
    'use strict';

    right_leg = new THREE.Object3D(); // right of the chest
    material = new THREE.MeshBasicMaterial ({color: 0xaa00ff, wireframe: false });
    geometry = new THREE.BoxGeometry(4, 16, 4)
    mesh = new THREE.Mesh(geometry, material);
    
    mesh.position.set(0, 10, -1)
    right_leg.add(mesh);

    material = new THREE.MeshBasicMaterial ({color: 0xff00ff, wireframe: false });
    geometry = new THREE.CylinderGeometry( 3, 3, 3, 64);
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI / 2;
    mesh.rotation.z = Math.PI / 2;

    mesh.position.set(-4, 1, 0);
    right_leg.add(mesh);

    mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI / 2;
    mesh.rotation.z = Math.PI / 2;

    mesh.position.set(-4, 8.5, 0);

    right_leg.add(mesh);

    right_leg.position.set(-4, -22, 0);

    scene.add(right_leg);

    right_foot = new THREE.Object3D(); // right of the chest
    material = new THREE.MeshBasicMaterial ({color: 0xaa00ff, wireframe: false });
    geometry = new THREE.BoxGeometry(5, 4, 8)
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 1);
    var cube = new THREE.Object3D();

    cube.add(mesh);
    right_foot.add(cube);

    right_foot.position.set(-4, -22, -1);
    
    scene.add(right_foot);
    
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
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';
    
    if (left_foot.userData.step <= 0) {
        left_foot.userData.movingDown = false;
    } 
    if (left_foot.userData.step >= 30) {
        left_foot.userData.movingUp = false;
    }

    if (left_foot.userData.movingUp) { 

        left_foot.userData.step += 1 ;
        left_foot.rotateX(Math.PI/60);
        right_foot.rotateX(Math.PI/60);
        
        if (left_foot.userData.step == 30) {
            left_foot.userData.movingUp = !left_foot.userData.movingUp;
        }
        
    }
    if (left_foot.userData.movingDown) {

        left_foot.userData.step -= 1 ;
        left_foot.rotateX(-Math.PI/60);
        right_foot.rotateX(-Math.PI/60);
        
        if (left_foot.userData.step == 0) {
            left_foot.userData.movingDown = !left_foot.userData.movingDown;
        }
    }

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

        case 49: // 1
            camera = camera1;
            break;
        case 50: // 2
            camera = camera2;
            break;
        case 51: // 3
            camera = camera3;
            break;
        case 52: // 4
            camera = camera4;
            break;
        case 53: // 5
            camera = camera5;
            break;
        case 65: // A
        case 97: // a
            // move left feet
            left_foot.userData.movingUp = !left_foot.userData.movingUp;
            break;

        case 81: // Q
        case 113: //q
            // move right feet
            left_foot.userData.movingDown = !left_foot.userData.movingDown;
    }       
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

    switch(e.keyCode) {
        case 65: // A
        case 97: // a
            // move left foot
            left_foot.userData.movingUp = !left_foot.userData.movingUp;
            break;
        case 81: // Q
        case 113: //q
            // move right feet
            left_foot.userData.movingDown = !left_foot.userData.movingDown;


    }

}