import * as THREE from "../../lib/three/build/three.module.js";
import * as Utils from "../Utils.js";
import Actor from "./Actor.js";


class Buildings extends Actor {

    constructor(scene, clock, loader) {
        super(scene, clock, loader);
        let shinyMaterial = new THREE.MeshStandardMaterial({
            color: 0x95D1F9,
            roughness: 1,
            flatShading: true
        });

        let arenaSize = 50;
        let canyonWidth = 6;
        let leftBound = -canyonWidth;
        let rightBound = canyonWidth;
        for (let i = 0; i < 500; i++) {
            let cubeX = Utils.randomInt(arenaSize) + Utils.locationInSong(0,4,0);
            let cubeY = Utils.randomInt(arenaSize) - arenaSize / 2;
            if (cubeY > leftBound && cubeY < rightBound) continue;
            let geometry = new THREE.BoxGeometry(1, 1, Utils.randomInt(15) + 5);
            let cube = new THREE.Mesh(geometry, shinyMaterial);

            cube.position.x = cubeX;
            cube.position.y = cubeY;
            scene.add(cube);
        }
    }



    update(cameraPosition, fpsAdjustment) {

    }

}

export default Buildings;