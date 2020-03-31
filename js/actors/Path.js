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
        let height = 100;
        let width = 3;
        // let geometry = new THREE.PlaneGeometry(length, width);
        let pedestalGeometry = new THREE.BoxGeometry(length, width, height);
        let path = new THREE.Mesh(pedestalGeometry, floorMaterial);
        path.position.x = Utils.locationInSong(0 , 4, 0) + length / 2;
        path.position.z = -2 - (height / 2);
        this.plane = path;

        let baseGeometry = new THREE.BoxGeometry(length, 10, height);
        let base = new THREE.Mesh(baseGeometry, floorMaterial);
        base.position.x = Utils.locationInSong(0 , 4, 0) + length / 2;
        base.position.z = -10 - (height / 2);
        this.base = base;

        scene.add(path);
        // scene.add(base);
    }



    update(cameraPosition, fpsAdjustment) {
        // if (cameraPosition >= Utils.locationInSong(0, 40, 0)) {
        //     this.plane.material.color = new THREE.Color('black');
        // }
    }

}

export default Path;