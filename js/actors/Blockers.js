import * as THREE from "../../lib/three/build/three.module.js";
import * as Utils from "../Utils.js";
import Actor from "./Actor.js";


class Blockers extends Actor {

    constructor(scene, clock, loader) {
        super(scene, clock, loader);

        let material = new THREE.MeshBasicMaterial({
            color:  0x000000, // top
            fog: false,
        });

        let geometry = new THREE.BoxGeometry(32, 1, 100);
        let left = new THREE.Mesh(geometry, material);
        let right = new THREE.Mesh(geometry, material);

        right.position.y = 10;
        left.position.y = -10;
        right.position.x = 16;
        left.position.x = 16;
        // right.rotation.z = Math.PI / 10;
        scene.add(right);
        scene.add(left);
    }



    update(cameraPosition, fpsAdjustment) {

    }

}

export default Blockers;