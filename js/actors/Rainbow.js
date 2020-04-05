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
        if (cameraPosition >= Utils.locationInSong(1, 0, 0) - 0.1) {
           this.rainbow.visible = false;
        }

        if (cameraPosition >= Utils.locationInSong(0, 38, 0) - 0.1) {
            this.rainbow.visible = true;
        }
    }

}

export default Rainbow;