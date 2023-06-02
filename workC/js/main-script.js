//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var camera, camera1, camera2, camera3, camera4, camera5;
var scene, renderer;
var material, geometry, mesh, wireFrameBool;
var clock = new THREE.Clock();

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene() {
    'use strict';

    scene = new THREE.Scene();


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

    chest = new THREE.Object3D(); // abdomen of the chest
    const geometry = new THREE.SphereGeometry( 15, 32, 16 ); 
    const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
    const mesh = new THREE.Mesh( geometry, material ); scene.add( sphere );

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
        
    }       
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

    switch(e.keyCode) {
        
    }

}