import * as THREE from "../../lib/three/build/three.module.js";
import * as Utils from "../Utils.js";
import Actor from "./Actor.js";


class Sunset extends Actor {

    constructor(scene, clock, loader) {
        super(scene, clock, loader);
        let rainbow = loader.getPlane("images/sunset.png", 350);
        rainbow.position.z = 200;
        rainbow.material.fog = false;
        rainbow.visible = false;
        scene.add(rainbow);
        this.fade = rainbow;
    }


    update(cameraPosition, fpsAdjustment) {
        this.fade.position.x = cameraPosition + 50;
        let a = Utils.locationInSong(0, 26, 0) - 0.1;
        let b = Utils.locationInSong(0, 30, 0) - 0.1;
        if (cameraPosition >= a && cameraPosition < b) {
            this.fade.visible = true;
            let desiredZ = -90;
            if (this.fade.position.z > desiredZ) {

                let delta = (this.fade.position.z - desiredZ) * .9;
                //let change = Math.min(delta, 0.3);
                let change = 0.4;
                this.fade.position.z -= change * fpsAdjustment
            } else {
                this.fade.position.z = desiredZ;
            }
        }
        if (cameraPosition >= b) {
            this.fade.visible = false;
        }
    }

}

export default Sunset;