//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var camera, camera1, camera2, camera3, camera4, camera5;
var scene, renderer;
var material, geometry, mesh, ovni;
var clock = new THREE.Clock();
var ovni_directions = new THREE.Vector3(0,0,0);

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene() {
    'use strict';

    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(40));

    scene.background = new THREE.Color( 0xE7DAF9 );

    createOvni();


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
    camera3.position.y = -100;
    camera3.position.z = 0;
    camera3.lookAt(scene.position);
    camera3.rotateZ(Math.PI/2);
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

function createOvni(){
    'use strict'

    ovni = new THREE.Object3D(); 
    geometry = new THREE.SphereGeometry( 10, 32, 30 );
    material = new THREE.MeshBasicMaterial( { color: 0x34eb3a, wireframe: false } ); 

    mesh = new THREE.Mesh( geometry, material );
    mesh.scale.set(1,0.2,1);
    ovni.add(mesh);

    geometry = new THREE.SphereBufferGeometry(5, 30, 30, 0, 2*Math.PI, 0, 0.5 * Math.PI);
    material = new THREE.MeshBasicMaterial( { color: 0x91a191, wireframe: false } );
    mesh = new THREE.Mesh( geometry, material);

    ovni.add(mesh);

    const nLights = 8;

    var i = 0;

    while( i < nLights ){
        var spherePos = new THREE.Object3D();

        spherePos.rotation.y = i * (2 * Math.PI)/nLights

        ovni.add(spherePos);

        geometry = new THREE.SphereGeometry( 1, 32, 30 );
        material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: false } );
        mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(6,-1, 0);
        spherePos.add(mesh);
        i++;
    }

    geometry = new THREE.CylinderGeometry( 3, 3, 1, 64);
    material = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: false } );
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, -2, 0);

    ovni.add(mesh);

    ovni.position.set(0,30,0);

    ovni.userData = { moving_left: 0, moving_right: 0, moving_forward: 0, moving_back: 0, colisions: true};
    scene.add(ovni);
}

////////////
/* UPDATE */
////////////
function update(){
    'use strict';
    const delta = clock.getDelta();
    const movement_speed = delta * 30;
    ovni_directions.x += (ovni.userData.moving_left - ovni.userData.moving_right);
    ovni_directions.z += (ovni.userData.moving_forward - ovni.userData.moving_back);

    if (!ovni_directions.equals(0, 0, 0)) {
    ovni_directions.normalize();

    ovni_directions.multiplyScalar(movement_speed);

    ovni.position.add(ovni_directions);
    ovni_directions.set(0, 0, 0);
    }


    ovni.rotation.y += 2 * delta;

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
    clock.start();

    createCamera1();
    createCamera2();
    createCamera3();
    createCamera4();
    createCamera5();

    camera = camera4; // start with ortogonal


    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';

    update();
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
        ovni.userData.moving_left = 1;
        break;
    case 38:
        ovni.userData.moving_forward = 1;
        break;
    case 39:
        ovni.userData.moving_right = 1;
        break;
    case 40:
        ovni.userData.moving_back = 1;
        break;    
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
        
    }       
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

    switch(e.keyCode) {
        case 37:
        ovni.userData.moving_left = 0;
        break;
    case 38:
        ovni.userData.moving_forward = 0;
        break;
    case 39:
        ovni.userData.moving_right = 0;
        break;
    case 40:
        ovni.userData.moving_back = 0;
        break;    
        
    }

}