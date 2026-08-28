import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";
export function createSkybox(scene, camera) {
    const texture =
        new THREE.TextureLoader().load(
            "Skybox.webp"
        );
    texture.colorSpace =
        THREE.SRGBColorSpace;
    const material1 =
        new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.BackSide
        });
    const material2 =
        new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.BackSide
        });
    const material3 =
        new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.BackSide
        });
    const material4 =
        new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.BackSide
        });
    const material5 =
        new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.BackSide
        });
    const material6 =
        new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.BackSide
        });
    const geometry =
        new THREE.BoxGeometry(
            1000,
            1000,
            1000
        );
    const skybox =
        new THREE.Mesh(
            geometry,
            [
                material1,
                material2,
                material3,
                material4,
                material5,
                material6
            ]
        );
    scene.add(skybox);
    skybox.position.copy(
        camera.position
    );
    return skybox;
}
