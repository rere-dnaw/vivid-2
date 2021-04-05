import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import * as dat from 'three/examples/jsm/libs/dat.gui.module.js'

import 'three/examples/jsm/lines/LineSegmentsGeometry.js';
import {LineGeometry} from 'three/examples/jsm/lines/LineGeometry.js';
import 'three/examples/jsm/lines/WireframeGeometry2.js';

import 'three/examples/jsm/lines/LineMaterial.js';
import 'three/examples/jsm/lines/LineSegments2.js';
import {Line2} from 'three/examples/jsm/lines/Line2.js';


function cube(size) {

    var h = size * 0.5;
    var position = [];
    // NOTE 3 + 4: Return the position array directly so it can be 
    // passed into the LineGeometry directy and create a cube out
    // of a single path.
    position.push(
        - h, - h, - h,
        - h, h, - h,
        h, h, - h,
        h, - h, - h,
        - h, - h, - h,

        - h, - h, h,
        - h, h, h,
        - h, h, - h,
        - h, h, h,

        h, h, h,
        h, h, - h,
        h, h, h,

        h, - h, h,
        h, - h, - h,
        h, - h, h,
        - h, - h, h,

    );

    return position;

}



// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.BoxGeometry();

// console.log({ LineGeometry })
var geometry1 = new LineGeometry();
geometry1.setPositions(cube(1));


// Materials

const material = new THREE.MeshLambertMaterial({ color: 0xffffff });
var materialsArray = getMaterialsArray()

// NOTE 3: Create a Line2 Object
const wireframe = new Line2(geometry1, material);
scene.add(wireframe);

// Mesh Groups
var groupsMesh = new Array()

// Mesh
const centerX = 0
const centerY = 0
const centerZ = 0
const amountX = 3
const amountY = 5
const amountZ = 3
const separation = 3

var firstGroup = createGeometryBlock(centerX, centerY, centerZ, amountX, amountY, amountZ, separation)

scene.add(firstGroup)


// Lights

const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.x = -0.65
pointLight.position.y = 3
pointLight.position.z = -14.09
scene.add(pointLight)


const light1 = gui.addFolder('Light 1')

light1.add(pointLight.position, 'x').min(-20).max(20).step(0.01)
light1.add(pointLight.position, 'y').min(-20).max(20).step(0.01)
light1.add(pointLight.position, 'z').min(-20).max(20).step(0.01)
light1.add(pointLight, 'intensity').min(-20).max(20).step(0.01)

const lightColor = {
    color: 0x1544be
}

light1.addColor(lightColor, 'color')
    .onChange(() => {
        pointLight.color.set(lightColor.color)
    })


const pointLight2 = new THREE.PointLight(0xffffff, 1.8)
pointLight2.position.x = -0.13
pointLight2.position.y = 4.84
pointLight2.position.z = 17.67
scene.add(pointLight2)

const light2 = gui.addFolder('Light 2')

light2.add(pointLight2.position, 'x').min(-20).max(20).step(0.01)
light2.add(pointLight2.position, 'y').min(-20).max(20).step(0.01)
light2.add(pointLight2.position, 'z').min(-20).max(20).step(0.01)
light2.add(pointLight2, 'intensity').min(-20).max(20).step(0.01)

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
// scene.add(pointLightHelper)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = -35.16
camera.position.y = 17.85
camera.position.z = 28.83
camera.rotation.x = -0.4115
camera.rotation.y = -0.273
camera.rotation.z = -0.3422
scene.add(camera)


const cam1 = gui.addFolder('Camera')

cam1.add(camera.position, 'x').min(-100).max(100).step(0.01)
cam1.add(camera.position, 'y').min(-100).max(100).step(0.01)
cam1.add(camera.position, 'z').min(-100).max(100).step(0.01)

cam1.add(camera.rotation, 'x').min(-3.14).max(3.14).step(0.0001)
cam1.add(camera.rotation, 'y').min(-3.14).max(3.14).step(0.0001)
cam1.add(camera.rotation, 'z').min(-3.14).max(3.14).step(0.0001)


// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: false
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
const stats = Stats();
document.body.appendChild(stats.dom);

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    // Update objects

    // for (let ix = 0; ix < amountX; ix++) {
    //     for (let iz = 0; iz < amountZ; iz++) {
    //         for (let iy = 0; iy < amountY; iy++) {
    //             if (randomObj != null) {
    //                 gridArray[ix][iz][iy].rotation.x = .5 * elapsedTime
    //                 gridArray[ix][iz][iy].rotation.y = .5 * elapsedTime
    //             }
    //         } 
    //     }
    // }
    controls.update();
    stats.update();
    var randomObj = firstGroup.children[randomNumber(0, firstGroup.children.length - 1)]
    randomObj.material = materialsArray[randomNumber(0, materialsArray.length - 1)]
    firstGroup.rotation.x = .5 * elapsedTime / 4


    renderer.render(scene, camera)
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function createGeometryBlock(centerX, centerY, centerZ, amountX, amountY, amountZ, separation) {
    var gridArray = new Array(amountX)

    const group = new THREE.Group();

    for (let ix = 0; ix < amountX; ix++) {
        gridArray[ix] = new Array(amountZ)
        for (let iz = 0; iz < amountZ; iz++) {
            gridArray[ix][iz] = new Array(amountY)
            for (let iy = 0; iy < amountY; iy++) {
                if (randomNumber(0, 1) == 1) {
                    gridArray[ix][iz][iy] = new THREE.Mesh(geometry, material)
                    gridArray[ix][iz][iy].position.x = ix * separation - (amountX * separation) / 2
                    gridArray[ix][iz][iy].position.z = iz * separation - (amountZ * separation) / 2
                    gridArray[ix][iz][iy].position.y = iy * separation - (amountY * separation) / 2
                    group.add(gridArray[ix][iz][iy])
                } else {
                    gridArray[ix][iz][iy] = null
                }
            }
        }
    }
    return group
}

function getMaterialsArray() {
    var matarialsArray = new Array()
    matarialsArray.push(new THREE.MeshLambertMaterial({ color: 0x143D86 }))
    matarialsArray.push(new THREE.MeshLambertMaterial({ color: 0x036D19 }))
    matarialsArray.push(new THREE.MeshLambertMaterial({ color: 0xA52422 }))
    matarialsArray.push(new THREE.MeshLambertMaterial({ color: 0xE0CA3C }))
    matarialsArray.push(new THREE.MeshLambertMaterial({ color: 0xDC136C }))
    matarialsArray.push(new THREE.MeshLambertMaterial({ color: 0xffffff }))

    return matarialsArray
}

tick()