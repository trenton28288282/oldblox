import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

export function createSkybox(scene) {

    const texture =
        new THREE.TextureLoader()
        .load("Skybox.webp");

    texture.colorSpace =
        THREE.SRGBColorSpace;

    const material =
        new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.BackSide
        });

    const skybox =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1000,
                1000,
                1000
            ),
            material
        );

    skybox.position.set(
        0,
        500,
        0
    );

    scene.add(skybox);

    return skybox;
}
