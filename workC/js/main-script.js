//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var camera, camera1, camera2, camera3, camera4, camera5, cameraGrass, cameraSky;
var scene, renderer;
var material, geometry, mesh, ovni, house;
var clock = new THREE.Clock();
var ovni_directions = new THREE.Vector3(0,0,0);
var grass_scene, sky_scene;
var textureBuffer;
var renderer_sky, renderer_grass;

var flower_color_array = ["ffffff", "ffff00", "c8a2c8", "add8e6"]

var verticesH = new Float32Array([
                
    // Triangle 1 
    0, 0, 0,             // Vertex 1
    3, 0, 0,             // Vertex 2
    3, 24, 0,            // Vertex 3

    // Triangle 2
    3, 24, 0,            // Vertex 1
    0, 24, 0,            // Vertex 2
    0, 0, 0,             // Vertex 3

    // Triangle 3
    3, 0, 0,             // Vertex 1
    24, 0, 0,            // Vertex 2
    24, 15, 0,           // Vertex 3

    // Triangle 4
    3, 15, 0,            // Vertex 1
    3, 0, 0,             // Vertex 2
    24, 15, 0,           // Vertex 3

    // Triangle 5
    3, 15, 0,            // Vertex 1
    6, 15, 0,            // Vertex 2
    3, 21, 0,            // Vertex 3

    // Triangle 6
    6, 21, 0,            // Vertex 1
    3, 21, 0,            // Vertex 2
    6, 15, 0,            // Vertex 3

    // Triangle 7
    12, 15, 0,            // Vertex 1
    15, 15, 0,            // Vertex 2
    12, 21, 0,            // Vertex 3

    // Triangle 8
    15, 15, 0,            // Vertex 1
    15, 21, 0,            // Vertex 2
    12, 21, 0,            // Vertex 3

    // Triangle 9
    21, 21, 0,            // Vertex 1
    21, 15, 0,            // Vertex 2
    24, 15, 0,            // Vertex 3

    // Triangle 10
    24, 15, 0,            // Vertex 1
    24, 21, 0,            // Vertex 2
    21, 21, 0,            // Vertex 3

    // Triangle 11
    3, 27, 0,            // Vertex 1
    3, 21, 0,            // Vertex 2
    84, 21, 0,            // Vertex 3

    // Triangle 12
    3, 27, 0,            // Vertex 1
    84, 21, 0,            // Vertex 2
    84, 27, 0,            // Vertex 3

    // Triangle 13
    0, 27, 0,            // Vertex 1
    0, 24, 0,            // Vertex 2
    3, 27, 0,            // Vertex 3

    // Triangle 14
    3, 27, 0,            // Vertex 1
    0, 24, 0,            // Vertex 2
    3, 24, 0,            // Vertex 3
    
    // Triangle 15
    42, 24, 0,            // Vertex 1
    33, 24, 0,            // Vertex 2
    33, 0, 0,            // Vertex 3

    // Triangle 16
    42, 24, 0,            // Vertex 1
    33, 0, 0,            // Vertex 2
    42, 0, 0,            // Vertex 3

    // Triangle 17
    42, 15, 0,            // Vertex 1
    42, 0, 0,            // Vertex 2
    84, 0, 0,            // Vertex 3

    // Triangle 18
    84, 0, 0,            // Vertex 1
    84, 15, 0,            // Vertex 2
    42, 15, 0,            // Vertex 3

    // Triangle 19
    48, 21, 0,            // Vertex 1
    48, 15, 0,            // Vertex 2
    72, 21, 0,            // Vertex 3

    // Triangle 20
    72, 15, 0,            // Vertex 1
    72, 21, 0,            // Vertex 2
    48, 15, 0,            // Vertex 3

    // Triangle 21
    78, 21, 0,            // Vertex 1
    78, 15, 0,            // Vertex 2
    84, 21, 0,            // Vertex 3

    // Triangle 22
    84, 15, 0,            // Vertex 1
    84, 21, 0,            // Vertex 2
    78, 15, 0,            // Vertex 3

    // Triangle 26
    84, 15, -36,            // Vertex 1
    84, 0, 0,            // Vertex 2
    84, 0, -36,            // Vertex 3

    // Triangle 27
    84, 15, 0,            // Vertex 1
    84, 0, 0,            // Vertex 2
    84, 15, -36,            // Vertex 3

    // Triangle 28
    84, 15, 0,            // Vertex 1
    84, 21, -27,            // Vertex 2
    84, 21, 0,            // Vertex 3

    // Triangle 29
    84, 15, -27,            // Vertex 1
    84, 21, -27,            // Vertex 2
    84, 15, 0,            // Vertex 3

    // Triangle 30
    84, 27, 0,             // Vertex 1
    84, 21, 0,            // Vertex 2
    84, 21, -36,           // Vertex 3
    
    // Triangle 31
    84, 21, -36,            // Vertex 1
    84, 27, -36,            // Vertex 2
    84, 27, 0,            // Vertex 3

    // Triangle 32
    84, 15, -33,            // Vertex 1
    84, 21, -36,            // Vertex 2
    84, 21, -33,            // Vertex 3

    // Triangle 33
    84, 15, -33,            // Vertex 1
    84, 15, -36,            // Vertex 2
    84, 21, -36,            // Vertex 3

    // Triangle 34
    69, 0, -36,             // Vertex 2  /* RESOLVIDO ATE AQUI */
    84, 15, -36,             // Vertex 1
    84, 0, -36,            // Vertex 3

    // Triangle 35
    69, 15, -36,            // Vertex 2
    84, 15, -36,            // Vertex 1
    69, 0, -36,             // Vertex 3

    // Triangle 36
    84, 21, -36,            // Vertex 2
    84, 15, -36,             // Vertex 1
    81, 15, -36,           // Vertex 3

    // Triangle 37
    81, 21, -36,             // Vertex 2
    84, 21, -36,            // Vertex 1
    81, 15, -36,           // Vertex 3

    // Triangle 38
    84, 27, -36,            // Vertex 2
    84, 21, -36,            // Vertex 1
    0, 21, -36,            // Vertex 3

    // Triangle 39
    0, 27, -36,            // Vertex 2
    84, 27, -36,            // Vertex 1
    0, 21, -36,            // Vertex 3

    // Triangle 40
    75, 21, -36,            // Vertex 2
    75, 15, -36,            // Vertex 1
    69, 21, -36,            // Vertex 3

    // Triangle 41
    69, 21, -36,            // Vertex 2    
    75, 15, -36,            // Vertex 1
    69, 15, -36,            // Vertex 3

    // Triangle 42
    60, 15, -36,            // Vertex 2
    60, 0, -36,            // Vertex 1
    0, 15, -36,            // Vertex 3

    // Triangle 43
    0, 15, -36,            // Vertex 2
    60, 0, -36,            // Vertex 1
    0, 0, -36,            // Vertex 3
    
    // Triangle 44
    60, 21, -36,            // Vertex 2
    60, 15, -36,            // Vertex 1
    51, 15, -36,            // Vertex 3

    // Triangle 45
    51, 21, -36,            // Vertex 2
    60, 21, -36,            // Vertex 1
    51, 15, -36,            // Vertex 3

    // Triangle 46
    45, 21, -36,            // Vertex 2
    45, 15, -36,            // Vertex 1
    0, 15, -36,            // Vertex 3

    // Triangle 47
    0, 21, -36,            // Vertex 2
    45, 21, -36,            // Vertex 1
    0, 15, -36,            // Vertex 3

    // Triangle 48
    0, 15, -36,            // Vertex 2
    0, 0, -36,            // Vertex 1
    0, 0, 0,            // Vertex 3

    // Triangle 49
    0, 15, 0,            // Vertex 2
    0, 15, -36,            // Vertex 1
    0, 0, 0,            // Vertex 3

    // Triangle 50
    0, 21, -36,            // Vertex 2
    0, 15, -36,            // Vertex 1
    0, 15, -33,            // Vertex 3
    
    // Triangle 51
    0, 21, -33,            // Vertex 2
    0, 21, -36,            // Vertex 1
    0, 15, -33,            // Vertex 3

    // Triangle 52
    0, 21, -27,            // Vertex 2
    0, 15, -27,            // Vertex 1
    0, 15, 0,            // Vertex 3

    // Triangle 53
    0, 21, 0,            // Vertex 2
    0, 21, -27,            // Vertex 1
    0, 15, 0,            // Vertex 3
    
    // Triangle 54
    0, 27, -36,            // Vertex 2
    0, 21, -36,            // Vertex 1
    0, 21, 0,            // Vertex 3

    // Triangle 55
    0, 27, 0,            // Vertex 2
    0, 27, -36,            // Vertex 1
    0, 21, 0,            // Vertex 3

    // Triangle 56
    0, 39, -18,            // Vertex 2
    0, 27, -36,            // Vertex 1
    0, 27, -18,            // Vertex 3

    // Triangle 57
    0, 39, -18,            // Vertex 2
    0, 27, -18,            // Vertex 1
    0, 27, 0,              // Vertex 3

    // Triangle 58
    84, 27, -36,           // Vertex 1
    84, 39, -18,           // Vertex 2
    84, 27, -18,           // Vertex 3

    // Triangle 59
    84, 27, -18,           // Vertex 1
    84, 39, -18,           // Vertex 2
    84, 27, 0,             // Vertex 3


    
    
]);

var indicesH = new Uint16Array([
   0, 1, 2,             // Triangle 1
   3, 4, 5,             // Triangle 2
   6, 7, 8,             // Triangle 3
   9, 10, 11,           // Triangle 4
   12, 13, 14,          // Triangle 5
   15, 16, 17,          // Triangle 6
   18, 19, 20,          // Triangle 7
   21, 22, 23,          // Triangle 8
   24, 25, 27,          // Triangle 9
   27, 28, 29,          // Triangle 10
   30, 31, 32,          // Triangle 11
   33, 34, 35,          // Triangle 12
   36, 37, 38,          // Triangle 13
   39, 40, 41,          // Triangle 14
   42, 43, 44,          // Triangle 15
   45, 46, 47,          // Triangle 16
   48, 49, 50,          // Triangle 17
   51, 52, 53,          // Triangle 18
   54, 55, 56,          // Triangle 19
   57, 58, 59,          // Triangle 20
   60, 61, 62,          // Triangle 21
   63, 64, 65,          // Triangle 22
   66, 67, 68,          // Triangle 26
   69, 70, 71,          // Triangle 27
   72, 73, 74,          // Triangle 28
   75, 76, 77,          // Triangle 29
   78, 79, 80,          // Triangle 30
   81, 82, 83,          // Triangle 31
   84, 85, 86,          // Triangle 32
   87, 88, 89,          // Triangle 33
   90, 91, 92,          // Triangle 34
   93, 94, 95,          // Triangle 35
   96, 97, 98,          // Triangle 36
   99, 100, 101,        // Triangle 37
   102, 103, 104,       // Triangle 38 
   105, 106, 107,       // Triangle 39
   108, 109, 110,       // Triangle 40
   111, 112, 113,       // Triangle 41
   114, 115, 116,       // Triangle 42
   117, 118, 119,       // Triangle 43
   120, 121, 122,       // Triangle 44
   123, 124, 125,       // Triangle 45
   126, 127, 128,       // Triangle 46
   129, 130, 131,       // Triangle 47
   132, 133, 134,       // Triangle 48
   135, 136, 137,       // Triangle 49 
   138, 139, 140,       // Triangle 50
   141, 142, 143,       // Triangle 51
   144, 145, 146,       // Triangle 52
   147, 148, 149,       // Triangle 53
   150, 151, 152,       // Triangle 54
   153, 154, 155,       // Triangle 55
   156, 157, 158,       // Triangle 56
   159, 160, 161,       // Triangle 57
   162, 163, 164,       // Triangle 58
   165, 166, 167,       // Triangle 59
]);

var verticesW = new Float32Array([
        // Square 1
        6, 15, 0, // Vertex 1
        12, 15, 0,  // Vertex 2
        12, 21, 0,   // Vertex 3
        6, 21, 0,   // Vertex 4

        // Square 2
        15, 15, 0, // Vertex 1
        21, 15, 0,  // Vertex 2
        21, 21, 0,   // Vertex 3
        15, 21, 0,   // Vertex 4

        // Square 3
        42, 15, 0, // Vertex 1
        48, 15, 0,  // Vertex 2
        48, 21, 0,   // Vertex 3
        42, 21, 0,   // Vertex 4
        
        
        // Square 4
        72, 15, 0, // Vertex 1
        78, 15, 0,  // Vertex 2
        78, 21, 0,   // Vertex 3
        72, 21, 0,   // Vertex 4

        // Square 5
        84, 15, -27, // Vertex 1
        84, 15, -33,  // Vertex 2
        84, 21, -33,   // Vertex 3
        84, 21, -27,   // Vertex 4

        // Square 6
        81, 15, -36,  // Vertex 2
        75, 15, -36, // Vertex 1
        75, 21, -36,   // Vertex 4
        81, 21, -36,   // Vertex 3

        // Square 7
        51, 15, -36,  // Vertex 2
        45, 15, -36, // Vertex 1
        45, 21, -36,   // Vertex 4
        51, 21, -36,   // Vertex 3

        // Square 8
        0, 15, -33,  // Vertex 2
        0, 15, -27, // Vertex 1
        0, 21, -27,   // Vertex 4
        0, 21, -33,   // Vertex 3
        
        
                    
    ]);

var indicesW = new Uint16Array([
        0, 1, 2,             // Square 1
        0, 2, 3,

        4, 5, 6,             // Square 2
        4, 6, 7,

        8, 9, 10,             // Square 3
        8, 10, 11,

        12, 13, 14,             // Square 4
        12, 14, 15,

        16, 17, 18,             // Square 5
        16, 18, 19,

        20, 21, 22,             // Square 6
        20, 22, 23,

        24, 25, 26,             // Square 7
        24, 26, 27,

        28, 29, 30,             // Square 8
        28, 30, 31,
    ]);

var verticesD = new Float32Array([
        // Square 1
        69, 0, -36,  // Vertex 2
        60, 0, -36, // Vertex 1
        60, 21, -36,   // Vertex 4
        69, 21, -36,   // Vertex 3

        // Square 2
        24, 0, 0, // Vertex 1
        33, 0, 0,  // Vertex 2
        33, 21, 0,   // Vertex 3
        24, 21, 0,   // Vertex 4
    ]);

var indicesD = new Uint16Array([
        0, 1, 2,             // Square 1
        0, 2, 3,

        4, 5, 6,             // Square 2
        4, 6, 7,

    ]);

var verticesT = new Float32Array([
        // Triangle 60
    0, 39, -18,            // Vertex 1
    0, 27, 0,              // Vertex 2
    84, 27, 0,             // Vertex 3

    // Triangle 61
    84, 39, -18,           // Vertex 1
    0, 39, -18,            // Vertex 2
    84, 27, 0,             // Vertex 3

    // Triangle 62
    0, 27, -36,              // Vertex 2
    0, 39, -18,            // Vertex 1
    84, 27, -36,             // Vertex 3

    // Triangle 63
    0, 39, -18,            // Vertex 2
    84, 39, -18,           // Vertex 1
    84, 27, -36,           // Vertex 3
]);

var indicesT = new Uint16Array([
    0, 1, 2,             // Triangle 1
    3, 4, 5,             // Triangle 2
    6, 7, 8,             // Triangle 3
    9, 10, 11,           // Triangle 4
    ]);


/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene() {
    'use strict';

    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(40));

    scene.background = new THREE.Color( 0xE7DAF9 );

    createOvni();
    createHouse();
    createTerrain();


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
    camera1.position.z = 800;
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

    camera2.position.x = 800;
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
    camera3.position.y = -800;
    camera3.position.z = 0;
    camera3.lookAt(scene.position);
    camera3.rotateZ(Math.PI/2);
}

// Ortogonal
function createCamera4() {
    'use strict';

    const aspectRatio = window.innerWidth / window.innerHeight;
    const frustumSize = 300;

    camera4 = new THREE.OrthographicCamera(
        frustumSize * aspectRatio / -2,
        frustumSize * aspectRatio / 2,
        frustumSize / 2,
        frustumSize / -2,
        1,
        2000
    );

    camera4.position.x = 600;
    camera4.position.y = 600;
    camera4.position.z = 600;
    camera4.lookAt(scene.position);
}

// Perspetiva 
function createCamera5() {
    'use strict';
    camera5 = new THREE.PerspectiveCamera(1000,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera5.position.x = 200;
    camera5.position.y = 200;
    camera5.position.z = 200;
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

function createHouse() {
    'use strict';

    house = new THREE.Object3D();
    geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(verticesH, 3));
    geometry.setIndex(new THREE.BufferAttribute(indicesH, 1));


    material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    var triangle = new THREE.Mesh(geometry, material);

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(verticesW, 3));
    geometry.setIndex(new THREE.BufferAttribute(indicesW, 1));

    material = new THREE.MeshBasicMaterial({ color: 0x0099cc });
    var windows = new THREE.Mesh(geometry, material);

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(verticesD, 3));
    geometry.setIndex(new THREE.BufferAttribute(indicesD, 1));

    material = new THREE.MeshBasicMaterial({ color: 0x0099cc });
    var doors = new THREE.Mesh(geometry, material);

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(verticesT, 3));
    geometry.setIndex(new THREE.BufferAttribute(indicesT, 1));

    material = new THREE.MeshBasicMaterial({ color: 0xaa6500 });
    var roof = new THREE.Mesh(geometry, material);



    house.add(triangle);
    house.add(windows);
    house.add(doors);
    house.add(roof);

    house.position.set(-50,0,80);
    scene.add(house);
}

function createTerrain(){
    const heightMapTexture = new THREE.TextureLoader().load("../workC/heightmap.png");

    const geometry = new THREE.PlaneGeometry(400, 400, 99, 99);

    geometry.rotateX(-Math.PI / 2);


    const material = new THREE.MeshPhongMaterial({
        displacementMap: heightMapTexture,
        displacementScale: 50,
        color: 0x00ff00,
        wireframe: true
    });

   const mesh = new THREE.Mesh(geometry, material);
   scene.add(mesh);
}

function createGrassField(){
    grass_scene = new THREE.Scene();
    grass_scene.background = new THREE.Color(0x90EE90);

    var geometry = new THREE.SphereGeometry(2, 32, 16);

    for (var i = 0; i < 300; i += 1) {

        colour = new THREE.Color();
        colour.setHex(`0x${flower_color_array[Math.floor(Math.random() * flower_color_array.length)]}`);

        material = new THREE.MeshBasicMaterial({ color: colour });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = (Math.random()) * 396 - 198;
        mesh.position.y = (Math.random()) * 396 - 198;
        mesh.position.z = 0;

        grass_scene.add(mesh);
    }

    const frustumSize = 401;

    cameraGrass = new THREE.OrthographicCamera(
        frustumSize / -2,
        frustumSize / 2,
        frustumSize / 2,
        frustumSize / -2,
        1,
        1000
    );

    cameraGrass.position.x = 0;
    cameraGrass.position.y = 0;
    cameraGrass.position.z = 200;

    cameraGrass.lookAt(grass_scene.position);

}


function createNightSky(){
    sky_scene = new THREE.Scene();
    sky_scene.background = new THREE.Color(0x00008B);

    var geometry = new THREE.SphereGeometry(2, 32, 16);

    for (var i = 0; i < 300; i += 1) {

        colour = new THREE.Color();
        colour.setHex(0xffffff);

        material = new THREE.MeshBasicMaterial({ color: colour });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = (Math.random()) * 396 - 198;
        mesh.position.y = (Math.random()) * 396 - 198;
        mesh.position.z = 0;

        sky_scene.add(mesh);
    }
    const frustumSize = 401;

    cameraSky = new THREE.OrthographicCamera(
        frustumSize / -2,
        frustumSize / 2,
        frustumSize / 2,
        frustumSize / -2,
        1,
        1000
    );

    cameraSky.position.x = 0;
    cameraSky.position.y = 0;
    cameraSky.position.z = 200;

    cameraSky.lookAt(sky_scene.position);

}


function createGrassTexture(){
    grass_scene = new THREE.Scene();

    textureBuffer = new THREE.WebGLRenderTarget(400, 400, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter});

    createGrassField();

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setSize(400,400);
    renderer.setRenderTarget(textureBuffer);
    renderer.render(grass_scene, cameraGrass);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setRenderTarget(null);

    
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