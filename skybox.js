import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

export function createSkybox(scene, camera) {

    const texture =
        new THREE.TextureLoader().load(
            "Skybox.webp"
        );

    const materials = [

        new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.BackSide
        }),

        new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.BackSide
        }),

        new THREE.MeshBasicMaterial({
            color: 0x87ceeb,
            side: THREE.BackSide
        }),

        new THREE.MeshBasicMaterial({
            color: 0x87ceeb,
            side: THREE.BackSide
        }),

        new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.BackSide
        }),

        new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.BackSide
        })

    ];

    const skybox =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                500,
                500,
                500
            ),
            materials
        );

    scene.add(skybox);

    return skybox;
}
