import * as THREE from "../../lib/three/build/three.module.js";
import * as Utils from "../Utils.js";
import Actor from "./Actor.js";


class Path extends Actor {

    constructor(scene, clock, loader) {
        super(scene, clock, loader);

        // floor
        let floorMaterial = new THREE.MeshBasicMaterial({
            color: 0xFFC0CB,

        });
        let length = 1000;
        let height = 100;
        let width = 3;
        // let geometry = new THREE.PlaneGeometry(length, width);
        let pedestalGeometry = new THREE.BoxGeometry(length, width, height);
        let path = new THREE.Mesh(pedestalGeometry, floorMaterial);
        path.position.x = Utils.locationInSong(0 , 4, 0) + length / 2;
        path.position.z = Utils.pathPosition() - (height / 2);
        path.visible = false;
        this.path = path;



        scene.add(path);
    }



    update(cameraPosition, fpsAdjustment) {
        if (cameraPosition >= Utils.locationInSong(1, 0, 0) - .1) {
            this.path.visible = true;
            //this.plane.material.color = new THREE.Color('black');
        }
    }

}

export default Path;