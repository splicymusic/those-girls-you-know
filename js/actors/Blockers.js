import * as THREE from "../../lib/three/build/three.module.js";
import * as Utils from "../Utils.js";
import Actor from "./Actor.js";


class Blockers extends Actor {

    constructor(scene, clock, loader) {
        super(scene, clock, loader);

        let material = new THREE.MeshBasicMaterial({
            color: 0x000000, // top
            fog: false,
        });

        let geometry = new THREE.BoxGeometry(1, 50, 100);
        let left = new THREE.Mesh(geometry, material);
        let right = new THREE.Mesh(geometry, material);

        let offset = 35;
        right.position.y = offset;
        left.position.y = -offset;
        right.position.x = Utils.locationInSong(0, 2, 0);
        left.position.x = Utils.locationInSong(0, 2, 0);
        // right.rotation.z = Math.PI / 10;
        this.left = left;
        this.right = right;
        scene.add(right);
        scene.add(left);
    }


    update(cameraPosition, fpsAdjustment) {
        if (cameraPosition >= Utils.locationInSong(0, 0, 25)) {
            // this.left.visible = false;
            // this.right.visible = false;
            this.right.position.x -= .05 * fpsAdjustment;
            this.left.position.x -= .05 * fpsAdjustment;
        } else {
            this.right.position.x = Utils.locationInSong(0, 2, 0) + cameraPosition;
            this.left.position.x = Utils.locationInSong(0, 2, 0) + cameraPosition;
        }

    }

}

export default Blockers;