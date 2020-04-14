import * as THREE from "../../lib/three/build/three.module.js";
import * as Utils from "../Utils.js";
import Actor from "./Actor.js";


class FinalImage extends Actor {

    constructor(scene, clock, loader) {
        super(scene, clock, loader);
        let rainbow = loader.getPlane("images/title card.png", 4);
        rainbow.position.z = Utils.pathPosition() + 2.5;
        rainbow.material.fog = false;
        rainbow.visible = false;
        scene.add(rainbow);
        this.fade = rainbow;
    }


    update(cameraPosition, fpsAdjustment) {

        let a = Utils.locationInSong(0, 48, 0) - 0.1;
        if (cameraPosition >= a ) {
            this.fade.visible = true;
            this.fade.position.x = cameraPosition + 4;

        }
    }

}

export default FinalImage;