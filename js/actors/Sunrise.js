import * as THREE from "../../lib/three/build/three.module.js";
import * as Utils from "../Utils.js";
import Actor from "./Actor.js";


class Sunrise extends Actor {

    constructor(scene, clock, loader) {
        super(scene, clock, loader);
        let rainbow = loader.getPlane("images/sunrise.png", 350);
        rainbow.position.z = -90;
        rainbow.material.fog = false;
        rainbow.visible = false;
        scene.add(rainbow);
        this.fade = rainbow;
    }


    update(cameraPosition, fpsAdjustment) {
        this.fade.position.x = cameraPosition + 48;
        let a = 0;
        let b = Utils.locationInSong(0, 4, 0) - 0.1;
        if (cameraPosition >= a && cameraPosition < b) {
            this.fade.visible = true;
            let desiredZ = 200;
            if (this.fade.position.z < desiredZ) {
                this.fade.position.z += 0.4 * fpsAdjustment
            } else {
                this.fade.position.z = desiredZ;
            }
        }
        if (cameraPosition >= b) {
            this.fade.visible = false;
        }
    }

}

export default Sunrise;