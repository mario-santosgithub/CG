//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var camera, camera1, camera2, camera3, camera4, camera5;
var scene, renderer;
var material, geometry, mesh, wireFrameBool;
var right_arm, left_arm, chest, right_leg, right_foot, left_leg, left_foot, head, head_pivot;
var trailer, colisionTruck, colisionTrailer;
var maxPointTrailer, minPointTrailer, maxPointTruck, minPointTruck;

var components = [m1 = new THREE.MeshBasicMaterial ({color: 0x00ff21, wireframe: false }),
    m2 = new THREE.MeshBasicMaterial ({color: 0xff00ff, wireframe: false }),
    m3 = new THREE.MeshBasicMaterial ({color: 0xfb3210, wireframe: false }),
    m4 = new THREE.MeshBasicMaterial ({color: 0x0000ff, wireframe: false }), 
    m5 = new THREE.MeshBasicMaterial ({color: 0x00ffff, wireframe: false }),
    m6 = new THREE.MeshBasicMaterial ({color: 0x000000, wireframe: false }),
    m7 = new THREE.MeshBasicMaterial ({color: 0x9B59B6, wireframe: false }),
    m8 = new THREE.MeshBasicMaterial ({color: 0xaa00ff, wireframe: false }),
    m9 = new THREE.MeshBasicMaterial ({color: 0xffff21, wireframe: false })]; 

var movements_allowed = true, animations_allowed = true, cameras_allowed = true, reboque_ligado = false;

var trailer_directions = new THREE.Vector3(0,0,0);

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

    createTrailer();


}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////

// Frontal
function createCamera1() {
    'use strict';
    
    const aspectRatio = window.innerWidth / window.innerHeight;
    const frustumSize = 100;

    camera1 = new THREE.OrthographicCamera(
        frustumSize * aspectRatio / -2,
        frustumSize * aspectRatio / 2,
        frustumSize / 2,
        frustumSize / -2,
        1,
        1000
    );

    camera1.position.x = 0;
    camera1.position.y = 0;
    camera1.position.z = 100;
    camera1.lookAt(scene.position);
}

// Lateral
function createCamera2() {
    'use strict';
    const aspectRatio = window.innerWidth / window.innerHeight;
    const frustumSize = 100;

    camera2 = new THREE.OrthographicCamera(
        frustumSize * aspectRatio / -2,
        frustumSize * aspectRatio / 2,
        frustumSize / 2,
        frustumSize / -2,
        1,
        1000
    );

    camera2.position.x = 100;
    camera2.position.y = 0;
    camera2.position.z = 0;
    camera2.lookAt(scene.position);
}

// Topo
function createCamera3() {
    'use strict';
    const aspectRatio = window.innerWidth / window.innerHeight;
    const frustumSize = 100;

    camera3 = new THREE.OrthographicCamera(
        frustumSize * aspectRatio / -2,
        frustumSize * aspectRatio / 2,
        frustumSize / 2,
        frustumSize / -2,
        1,
        1000
    );

    camera3.position.x = 0;
    camera3.position.y = 100;
    camera3.position.z = 0;
    camera3.lookAt(scene.position);
}

// Ortogonal
function createCamera4() {
    'use strict';

    const aspectRatio = window.innerWidth / window.innerHeight;
    const frustumSize = 100;

    camera4 = new THREE.OrthographicCamera(
        frustumSize * aspectRatio / -2,
        frustumSize * aspectRatio / 2,
        frustumSize / 2,
        frustumSize / -2,
        1,
        1000
    );

    camera4.position.x = 100;
    camera4.position.y = 100;
    camera4.position.z = 100;
    camera4.lookAt(scene.position);
}

// Perspetiva 
function createCamera5() {
    'use strict';
    camera5 = new THREE.PerspectiveCamera(1000,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera5.position.x = 80;
    camera5.position.y = 80;
    camera5.position.z = 80;
    camera5.lookAt(scene.position);
    camera5.rotateZ(Math.PI);    
}

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

function createTrailer() {
    'use strict';

    trailer = new THREE.Object3D(); // abdomen of the chest
    geometry = new THREE.BoxGeometry(20, 30, 60);
    mesh = new THREE.Mesh(geometry, components[0]);

    mesh.position.set(0, 0, 0);

    trailer.add(mesh);

    geometry = new THREE.BoxGeometry(20, 4, 20);
    mesh = new THREE.Mesh(geometry, components[8]);

    mesh.position.set(0,-17,-20);
    trailer.add(mesh);

    geometry = new THREE.CylinderGeometry( 3, 3, 3, 64);
    mesh = new THREE.Mesh(geometry, components[1]);
    mesh.rotation.x = Math.PI / 2;
    mesh.rotation.z = Math.PI / 2;

    mesh.position.set(10, -19, -25);
    trailer.add(mesh);

    mesh = new THREE.Mesh(geometry, components[1]);
    mesh.rotation.x = Math.PI / 2;
    mesh.rotation.z = Math.PI / 2;
    
    mesh.position.set(10, -19, -16);
    trailer.add(mesh);

    mesh = new THREE.Mesh(geometry, components[1]);
    mesh.rotation.x = Math.PI / 2;
    mesh.rotation.z = Math.PI / 2;
    
    mesh.position.set(-10, -19, -16);
    trailer.add(mesh);

    mesh = new THREE.Mesh(geometry, components[1]);
    mesh.rotation.x = Math.PI / 2;
    mesh.rotation.z = Math.PI / 2;
    
    mesh.position.set(-10, -19, -25);
    trailer.add(mesh);

    trailer.position.set(0,15,-60);

    trailer.userData = { moving_left: 0, moving_right: 0, moving_forward: 0, moving_back: 0, colisions: true};

    scene.add(trailer);


}

function createChest() {
    'use strict'

    chest = new THREE.Object3D(); // abdomen of the chest
    geometry = new THREE.BoxGeometry(8, 4, 16);
    mesh = new THREE.Mesh(geometry, components[0]);

    mesh.position.set(0, 2, 0);
    chest.add(mesh);

    geometry = new THREE.BoxGeometry(16, 4, 16);
    mesh = new THREE.Mesh(geometry, components[2]);

    mesh.position.set(0, -2, 0);
    chest.add(mesh);

    geometry = new THREE.BoxGeometry(8, 12, 16);
    mesh = new THREE.Mesh(geometry, components[3]);

    mesh.position.set(0, 10, 0);
    chest.add(mesh);

    geometry = new THREE.BoxGeometry(4, 12, 12);
    mesh = new THREE.Mesh(geometry, components[4]);

    mesh.position.set(6, 10, 2);
    chest.add(mesh);

    geometry = new THREE.BoxGeometry(4, 12, 12);
    mesh = new THREE.Mesh(geometry, components[4]);

    mesh.position.set(-6, 10, 2);
    chest.add(mesh);

    geometry = new THREE.CylinderGeometry( 3, 3, 3, 64);
    mesh = new THREE.Mesh(geometry, components[1]);
    mesh.rotation.x = Math.PI / 2;
    mesh.rotation.z = Math.PI / 2;

    mesh.position.set(9, -4, 2);
    chest.add(mesh);

    geometry = new THREE.CylinderGeometry( 3, 3, 3, 64);
    mesh = new THREE.Mesh(geometry, components[1]);
    mesh.rotation.x = Math.PI / 2;
    mesh.rotation.z = Math.PI / 2;

    mesh.position.set(-9, -4, 2);
    chest.add(mesh);

    scene.add(chest);
}

function createLeftArm() {
    'use strict';
    
    left_arm = new THREE.Object3D(); // right of the chest
    geometry = new THREE.BoxGeometry(4, 4, 12);
    mesh = new THREE.Mesh(geometry, components[5]);

    left_arm.add(mesh);
    
    geometry = new THREE.BoxGeometry(4, 16, 4);
    mesh = new THREE.Mesh(geometry, components[5]);
    
    mesh.position.set(0, 6, -8);
    left_arm.add(mesh);
    geometry = new THREE.CylinderGeometry(1, 1, 8, 30);
    mesh = new THREE.Mesh(geometry, components[1]);

    mesh.position.set(3, 13, -8);
    left_arm.add(mesh);

    left_arm.position.set(6, 2, 2);

    left_arm.userData = { moving_out: 0, moving_in: 0, step: 0 };

    scene.add(left_arm);
}

function createRigthArm() {
    'use strict';
    
    right_arm = new THREE.Object3D(); // right of the chest
    geometry = new THREE.BoxGeometry(4, 4, 12);
    mesh = new THREE.Mesh(geometry, components[5]);

    right_arm.add(mesh);
    
    geometry = new THREE.BoxGeometry(4, 16, 4);
    mesh = new THREE.Mesh(geometry, components[5]);
    
    mesh.position.set(0, 6, -8);
    right_arm.add(mesh);

    geometry = new THREE.CylinderGeometry(1, 1, 8, 30);
    mesh = new THREE.Mesh(geometry, components[1]);

    mesh.position.set(-3, 13, -8);
    right_arm.add(mesh);

    right_arm.position.set(-6, 2, 2);

    right_arm.userData = { moving_out: 0, moving_in: 0, step: 0 };

    scene.add(right_arm);
}

function createHead(){
    'use strict';

    head = new THREE.Object3D();
    head_pivot = new THREE.Object3D(); 
    head_pivot.userData = { movingUp: 0, movingDown: 0, step: 0};

    geometry = new THREE.BoxGeometry(6, 6, 6);
    mesh = new THREE.Mesh(geometry, components[6]);

    mesh.position.set(0, 5, 0);
    head.add(mesh);

    geometry = new THREE.BoxGeometry(1, 1, 1);
    mesh = new THREE.Mesh(geometry, components[5]);

    mesh.position.set(2, 5, 3);
    head.add(mesh);

    geometry = new THREE.BoxGeometry(1, 1, 1);
    mesh = new THREE.Mesh(geometry, components[5]);

    mesh.position.set(-2, 5, 3);
    head.add(mesh);

    geometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 30);
    mesh = new THREE.Mesh(geometry, components[1]);

    mesh.position.set(3.5, 8.5, 0);
    head.add(mesh);

    geometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 30);
    mesh = new THREE.Mesh(geometry, components[1]);

    mesh.position.set(-3.5, 8.5, 0);
    head.add(mesh);

    head_pivot.add(head);

    head_pivot.position.set(0, 14, 0);

    scene.add(head_pivot);
}

function createLeftLeg() {
    'use strict';
    
    left_leg = new THREE.Object3D(); // leg
    left_leg.userData = { movingUp: 0, movingDown: 0, step: 0 };
    
    var leg = new THREE.Object3D();
    geometry = new THREE.BoxGeometry(4, 18, 4)
    mesh = new THREE.Mesh(geometry, components[7]);
    
    mesh.position.set(0,20, -1)
    leg.add(mesh);

    geometry = new THREE.CylinderGeometry( 3, 3, 3, 64);
    mesh = new THREE.Mesh(geometry, components[1]);
    mesh.rotation.x = Math.PI / 2;
    mesh.rotation.z = Math.PI / 2;

    mesh.position.set(3.51, 18, 1);
    leg.add(mesh);

    mesh = new THREE.Mesh(geometry, components[1]);
    mesh.rotation.x = Math.PI / 2;
    mesh.rotation.z = Math.PI / 2;

    mesh.position.set(3.81, 10.5, 1);

    leg.add(mesh);

    leg.position.set(4, -22, 2);

    scene.add(leg);

    left_foot = new THREE.Object3D(); 
    left_foot.userData = { movingUp: 0, movingDown: 0, step: 0 };

    geometry = new THREE.BoxGeometry(5, 4, 8)
    mesh = new THREE.Mesh(geometry, components[7]);
    mesh.position.set(0, 0, 1);
    var cube = new THREE.Object3D();
    cube.add(mesh);
    left_foot.add(cube)
    left_foot.position.set(0, 9.2, -1);
    
    leg.add(left_foot);
    leg.position.set(4, -30, 2);
    left_leg.add(leg);
    left_leg.position.set(0, -1, -2);
    scene.add(left_leg);
}

function createRightLeg() {
    'use strict';

    right_leg = new THREE.Object3D(); // leg
    right_leg.userData = { movingUp: 0, movingDown: 0, step: 0 };

    var leg = new THREE.Object3D();
    geometry = new THREE.BoxGeometry(4, 18, 4)
    mesh = new THREE.Mesh(geometry, components[7]);

    mesh.position.set(0,20, -1)
    leg.add(mesh);

    geometry = new THREE.CylinderGeometry( 3, 3, 3, 64);
    mesh = new THREE.Mesh(geometry, components[1]);
    mesh.rotation.x = Math.PI / 2;
    mesh.rotation.z = Math.PI / 2;

    mesh.position.set(-3.51, 18, 1);
    leg.add(mesh);

    mesh = new THREE.Mesh(geometry, components[1]);
    mesh.rotation.x = Math.PI / 2;
    mesh.rotation.z = Math.PI / 2;

    mesh.position.set(-3.81, 10.5, 1);

    leg.add(mesh);

    leg.position.set(4, -22, 2);

    scene.add(leg);

    right_foot = new THREE.Object3D(); 
    right_foot.userData = { movingUp: 0, movingDown: 0, step: 0 };     // tirado angle: 0 não estava a fazer nada

    geometry = new THREE.BoxGeometry(5, 4, 8)
    mesh = new THREE.Mesh(geometry, components[7]);
    mesh.position.set(0, 0, 1);
    var cube = new THREE.Object3D();
    cube.add(mesh);
    right_foot.add(cube)
    right_foot.position.set(0, 9.2, -1);

    leg.add(right_foot);
    leg.position.set(-4, -30, 2);
    right_leg.add(leg);
    right_leg.position.set(0, -1, -2);     // estava -1.2 na altura , havia 2 pixeis das pernas abaixo da cabine
    scene.add(right_leg);
    
}


//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions(){
    'use strict';

    minPointTrailer = new THREE.Vector3(trailer.position.x-11,trailer.position.y-16, trailer.position.z-31);
    maxPointTrailer = new THREE.Vector3(trailer.position.x+11,trailer.position.y+16, trailer.position.z+31);

    minPointTruck = new THREE.Vector3(chest.position.x-9, chest.position.y-11, chest.position.z-29);
    maxPointTruck = new THREE.Vector3(chest.position.x+9, chest.position.y+11, chest.position.z+9);

    if (minPointTrailer.x <= maxPointTruck.x &&
        maxPointTrailer.x >= minPointTruck.x &&
        minPointTrailer.y <= maxPointTruck.y &&
        maxPointTrailer.y >= minPointTruck.y &&
        minPointTrailer.z <= maxPointTruck.z &&
        maxPointTrailer.z >= minPointTruck.z) {

            return true;
    }

    return false;

}

function resetMovement(){
    trailer.userData.moving_left = 0;
    trailer.userData.moving_right = 0;
    trailer.userData.moving_forward = 0;
    trailer.userData.moving_back = 0;
}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions(){
    'use strict';

    var expectedPosition = new THREE.Vector3(10, 30, -9);
    var mov_left = 0, mov_right = 0, mov_forward = 0, mov_back = 0;

    if (maxPointTrailer.x < expectedPosition.x) {
        mov_left = 1;
    }
    else if (maxPointTrailer.x > expectedPosition.x){
        mov_right = 1;
    }

    if (maxPointTrailer.z < expectedPosition.z) {
        mov_forward = 1;
    }
    else if (maxPointTrailer.z > expectedPosition.z){
        mov_back = 1;
    }

    
    if(expectedPosition.x != maxPointTrailer.x || expectedPosition.z != maxPointTrailer.z){
        if (Math.abs(maxPointTrailer.x - expectedPosition.x) < 0.5) {
            trailer.translateX(Math.abs(maxPointTrailer.x - expectedPosition.x) * ( mov_left - mov_right ));
        }
        else{
            trailer.translateX( 0.5 * ( mov_left - mov_right ));
        }
        if (Math.abs(maxPointTrailer.z - expectedPosition.z) < 0.5) {
            trailer.translateZ(Math.abs(maxPointTrailer.z - expectedPosition.z) * ( mov_forward - mov_back ));
        }
        else{
            trailer.translateZ( 0.5 * ( mov_forward - mov_back ));
        }
    }
    else{
        reboque_ligado = true;
    }


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
    wireFrameBool = false;
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

    trailer_directions.x += 0.5 * ( trailer.userData.moving_left - trailer.userData.moving_right );
    trailer_directions.z += 0.5 * ( trailer.userData.moving_forward - trailer.userData.moving_back );

    if(!trailer_directions.equals((0,0,0))){
        trailer.position.add(trailer_directions);

        trailer_directions.set(0,0,0);
    }

    var movement_feet = 1 * (left_foot.userData.movingDown - left_foot.userData.movingUp);
    var feet_updated_step = left_foot.userData.step + movement_feet;

    if (feet_updated_step <= 30 && feet_updated_step >= 0) { 

        left_foot.userData.step += movement_feet ;
        left_foot.rotation.x += Math.PI/60 * movement_feet;
        right_foot.rotation.x += Math.PI/60 * movement_feet;
        
    }

    var movement_legs = 1 * (left_leg.userData.movingUp - left_leg.userData.movingDown);
    var leg_updated_step = left_leg.userData.step + movement_legs;

    if (leg_updated_step <= 30 && leg_updated_step >= 0) { 

        left_leg.userData.step += movement_legs ;
        left_leg.rotation.x += Math.PI/60 * movement_legs;
        right_leg.rotation.x += Math.PI/60 * movement_legs;
        
    }

    var movement_head = 1 * (head_pivot.userData.movingUp - head_pivot.userData.movingDown);
    var head_updated_step = head_pivot.userData.step + movement_head;

    if (head_updated_step <= 40 && head_updated_step >= 0) { 

        head_pivot.userData.step += movement_head ;
        head_pivot.rotation.x -= Math.PI/40 * movement_head;
    }

    var movement_arms = 0.25 * (left_arm.userData.moving_out - left_arm.userData.moving_in);
    var arm_updated_step = left_arm.userData.step +  movement_arms;

    if( arm_updated_step <= 4 && arm_updated_step >= 0 ){
        left_arm.userData.step = arm_updated_step;
        left_arm.translateX(movement_arms);
        right_arm.translateX(-movement_arms);
    }

    if (feet_updated_step == 30 && leg_updated_step == 30 && head_updated_step == 40 && arm_updated_step == 0) {

        if (checkCollisions()) {
            if(!reboque_ligado){
                resetMovement();
                movements_allowed = false;
                animations_allowed = false;
                cameras_allowed = false;
                handleCollisions();
            }
        }
        else{
            reboque_ligado = false;
            movements_allowed = true;
            animations_allowed = true;
            cameras_allowed = true;
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
        case 37:
            if(movements_allowed || reboque_ligado){
                trailer.userData.moving_left = 1;
            }
            break;
        case 38:
            if(movements_allowed || reboque_ligado){
                trailer.userData.moving_forward = 1;
            }
            break;
        case 39:
            if(movements_allowed || reboque_ligado){
                trailer.userData.moving_right = 1;
            }
            break;
        case 40:
            if(movements_allowed || reboque_ligado){
                trailer.userData.moving_back = 1;
            }
            break;

        case 49: // 1
            if(cameras_allowed || reboque_ligado){
                camera = camera1;
            }
            break;
        case 50: // 2
            if(cameras_allowed || reboque_ligado){
                camera = camera2;
            }
            break;
        case 51: // 3
            if(cameras_allowed || reboque_ligado){
                camera = camera3;
            }
            break;
        case 52: // 4
            if(cameras_allowed || reboque_ligado){
                camera = camera4;
            }
            break;
        case 53: // 5
            if(cameras_allowed || reboque_ligado){
                camera = camera5;
            }
            break;
        case 54: // 6
            for (let i = 0; i < components.length; i++) {
                const scene_element = components[i];
                scene_element.wireframe = !scene_element.wireframe;
            }
            break;
        case 65: // A
        case 97: // a
            // move left feet
            if(animations_allowed){
                left_foot.userData.movingDown = 1;
                right_foot.userData.movingDown = 1;
            }
            break;
        case 81: // Q
        case 113: //q
            // move right feet
            if(animations_allowed){
                left_foot.userData.movingUp = 1;
                right_foot.userData.movingUp = 1;
            }
            break;
        case 83: // S
        case 115: // s
            if(animations_allowed){
                left_leg.userData.movingUp = 1;
                right_leg.userData.movingUp = 1;
            }
            break;
        case 87: // W
        case 119: // w
            if(animations_allowed){
                left_leg.userData.movingDown = 1;
                right_leg.userData.movingDown = 1;
            }
            break;
        case 82: // R
        case 114:// r
            if(animations_allowed){
                head_pivot.userData.movingDown = 1;
            }
            break;
        case 70: // F
        case 102: // f
            if(animations_allowed){
                head_pivot.userData.movingUp = 1;
            }
            break;
        case 68: //D
        case 100: //d
            if(animations_allowed){
                right_arm.userData.moving_out = 1;
                left_arm.userData.moving_out = 1;
            }
            break;
        case 69: //E
        case 101: //e
            if(animations_allowed){
                right_arm.userData.moving_in = 1;
                left_arm.userData.moving_in = 1;
            }
            break;
    }       
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

    switch(e.keyCode) {
        case 37:
            if(movements_allowed || reboque_ligado){
                trailer.userData.moving_left = 0;
            }
            break;
        case 38:
            if(movements_allowed || reboque_ligado){
                trailer.userData.moving_forward = 0;
            }
            break;
        case 39:
            if(movements_allowed || reboque_ligado){
                trailer.userData.moving_right = 0;
            }
            break;
        case 40:
            if(movements_allowed || reboque_ligado){
                trailer.userData.moving_back = 0;
            }
            break;
        case 65: // A
        case 97: // a
            // move left foot
            if(animations_allowed){
                left_foot.userData.movingDown = 0;
                right_foot.userData.movingDown = 0;
            }
            break;
        case 81: // Q
        case 113: //q
            // move right feet
            if(animations_allowed){
                left_foot.userData.movingUp = 0;
                right_foot.userData.movingUp = 0;
            }
            break;
        case 83: // S
        case 115: // s
            if(animations_allowed){
                left_leg.userData.movingUp = 0;
                right_leg.userData.movingUp = 0;
            }
            break;
        case 87: // W
        case 119: // w
            if(animations_allowed){
                left_leg.userData.movingDown = 0;
                right_leg.userData.movingDown = 0;
            }
            break;
        case 82: // R
        case 114:// r
            if(animations_allowed){
                head_pivot.userData.movingDown = 0;
            }
            break;
        case 70: // F
        case 102: // f
            if(animations_allowed){
                head_pivot.userData.movingUp = 0;
            }
            break;
        case 68: //D
        case 100: //d
            if(animations_allowed){
                right_arm.userData.moving_out = 0;
                left_arm.userData.moving_out = 0;
            }
            break;
        case 69: //E
        case 101: //e
            if(animations_allowed){
                right_arm.userData.moving_in = 0;
                left_arm.userData.moving_in = 0;
            }
            break;
    }

}