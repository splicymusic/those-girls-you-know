import * as THREE from "../../lib/three/build/three.module.js";
import * as Utils from "../Utils.js";
import Actor from "./Actor.js";


class Path extends Actor {

    constructor(scene, clock, loader) {
        super(scene, clock, loader);

        // floor
        let floorMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFCCDD,
            roughness: 1,
            flatShading: true
        });
        let length = 1000;
        let floorGeometry = new THREE.PlaneGeometry(length, 3);
        let plane = new THREE.Mesh(floorGeometry, floorMaterial);
        //plane.position.x = Utils.locationInSong(1 , 0, 0) + length / 2;
        // plane.position.y += 1000 / 2;
        plane.position.x = 0
        plane.position.z = -2;
        scene.add(plane);
    }



    update(cameraPosition, fpsAdjustment) {

    }

}

export default Path;