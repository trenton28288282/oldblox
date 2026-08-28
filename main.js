import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";
import { createSkybox } from "./skybox.js";
const scene =
    new THREE.Scene();
const camera =
    new THREE.PerspectiveCamera(
        70,
        window.innerWidth /
        window.innerHeight,
        0.1,
        1000
    );
camera.position.set(
    0,
    2,
    8
);
const renderer =
    new THREE.WebGLRenderer({
        antialias: false
    });
renderer.setSize(
    window.innerWidth,
    window.innerHeight
);
document.body.appendChild(
    renderer.domElement
);
const skybox =
    createSkybox(
        scene,
        camera
    );
const sunlight =
    new THREE.DirectionalLight(
        0xffffff,
        2
    );
sunlight.position.set(
    10,
    20,
    10
);
scene.add(
    sunlight
);
scene.add(
    new THREE.AmbientLight(
        0xffffff,
        0.6
    )
);
const textureLoader =
    new THREE.TextureLoader();
const studs =
    textureLoader.load(
        "studs.png"
    );
studs.wrapS =
    THREE.RepeatWrapping;
studs.wrapT =
    THREE.RepeatWrapping;
studs.repeat.set(
    40,
    40
);
const baseplate =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            40,
            1,
            40
        ),
        new THREE.MeshLambertMaterial({
            map: studs
        })
    );
scene.add(
    baseplate
);
let velocityY = 0;
let grounded = true;
const playerHeight = 2;
const joystick =
    document.getElementById(
        "joystick"
    );
const stick =
    document.getElementById(
        "stick"
    );
let joyX = 0;
let joyY = 0;
let joystickActive = false;
const maxDistance = 35;
joystick.addEventListener(
    "touchstart",
    event => {
        joystickActive = true;
        event.preventDefault();
    },
    { passive: false }
);
joystick.addEventListener(
    "touchmove",
    event => {
        if (!joystickActive)
            return;
        const touch =
            event.touches[0];
        const rect =
            joystick.getBoundingClientRect();
        let x =
            touch.clientX -
            (rect.left + 60);
        let y =
            touch.clientY -
            (rect.top + 60);
        const distance =
            Math.sqrt(
                x * x +
                y * y
            );
        if (
            distance >
            maxDistance
        ) {
            x =
                x /
                distance *
                maxDistance;
            y =
                y /
                distance *
                maxDistance;
        }
        stick.style.left =
            (35 + x) + "px";
        stick.style.top =
            (35 + y) + "px";
        joyX =
            x /
            maxDistance;
        joyY =
            y /
            maxDistance;
        event.preventDefault();
    },
    { passive: false }
);
joystick.addEventListener(
    "touchend",
    () => {
        joystickActive = false;
        joyX = 0;
        joyY = 0;
        stick.style.left =
            "35px";
        stick.style.top =
            "35px";
    }
);
const lookArea =
    document.getElementById(
        "lookArea"
    );
let looking = false;
let lastTouchX = 0;
let lastTouchY = 0;
let cameraYaw = 0;
let cameraPitch = 0;
lookArea.addEventListener(
    "touchstart",
    event => {
        looking = true;
        lastTouchX =
            event.touches[0].clientX;
        lastTouchY =
            event.touches[0].clientY;
        event.preventDefault();
    },
    { passive: false }
);
lookArea.addEventListener(
    "touchmove",
    event => {
        if (!looking)
            return;
        const touch =
            event.touches[0];
        const deltaX =
            touch.clientX -
            lastTouchX;
        const deltaY =
            touch.clientY -
            lastTouchY;
        lastTouchX =
            touch.clientX;
        lastTouchY =
            touch.clientY;
        cameraYaw -=
            deltaX * 0.005;
        cameraPitch -=
            deltaY * 0.005;
        cameraPitch =
            Math.max(
                -1.4,
                Math.min(
                    1.4,
                    cameraPitch
                )
            );
        camera.rotation.order =
            "YXZ";
        camera.rotation.y =
            cameraYaw;
        camera.rotation.x =
            cameraPitch;
        event.preventDefault();
    },
    { passive: false }
);
lookArea.addEventListener(
    "touchend",
    () => {
        looking = false;
    }
);
const jump =
    document.getElementById(
        "jump"
    );
jump.addEventListener(
    "touchstart",
    event => {
        if (grounded) {
            velocityY =
                0.18;
            grounded =
                false;
        }
        event.preventDefault();
    },
    { passive: false }
);
function updatePlayer() {
    const speed = 0.10;
    camera.translateX(
        joyX * speed
    );
    camera.translateZ(
        joyY * speed
    );
    velocityY -=
        0.008;
    camera.position.y +=
        velocityY;
    if (
        camera.position.y <=
        playerHeight
    ) {
        camera.position.y =
            playerHeight;
        velocityY = 0;
        grounded = true;
    }
}
function updateSkybox() {
    skybox.position.x =
        camera.position.x;
    skybox.position.y =
        camera.position.y;
    skybox.position.z =
        camera.position.z;
    skybox.rotation.set(
        0,
        0,
        0
    );
}
window.addEventListener(
    "resize",
    () => {
        camera.aspect =
            window.innerWidth /
            window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }
);
function animate() {
    requestAnimationFrame(
        animate
    );
    updatePlayer();
    updateSkybox();
    renderer.render(
        scene,
        camera
    );
}
animate();
