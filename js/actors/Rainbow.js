import * as THREE from "../../lib/three/build/three.module.js";
import * as Utils from "../Utils.js";
import Actor from "./Actor.js";


class Rainbow extends Actor {

    constructor(scene, clock, loader) {
        super(scene, clock, loader);
        let rainbow = loader.getPlane("images/rainbow.png", 50);
        rainbow.position.z = -2;
        rainbow.material.fog = false;
        scene.add(rainbow);
        this.rainbow = rainbow;
    }


    update(cameraPosition, fpsAdjustment) {
        this.rainbow.position.x = cameraPosition + 20;
        // this.rainbow.position.z = -2 + Math.sin(cameraPosition / 2) * 5;
        if (cameraPosition >= Utils.locationInSong(0, 0, 25) - 0.1 && cameraPosition <= Utils.locationInSong(2, 0, 0)) {
            let desiredZ = 25;
            if (this.rainbow.position.z < desiredZ) {
                this.rainbow.position.z += 0.1;
            } else {
                this.rainbow.position.z = desiredZ;
            }
        }

        if (cameraPosition >= Utils.locationInSong(2, 0, 0) - 0.1 && cameraPosition < Utils.locationInSong(0, 39, 0) - 0.1) {
            this.rainbow.position.z = 25;
        }


        if (cameraPosition >= Utils.locationInSong(0, 39, 0) - 0.1) {
            let desiredZ = -2;
            if (this.rainbow.position.z > desiredZ) {

                let delta = (this.rainbow.position.z - desiredZ) * .9;
                let change = Math.min(delta, 0.15);
                this.rainbow.position.z -= change * fpsAdjustment
            } else {
                this.rainbow.position.z = desiredZ;
            }
        }
    }

}

export default Rainbow;