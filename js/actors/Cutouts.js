import * as THREE from "../../lib/three/build/three.module.js";
import * as Utils from "../Utils.js";
import Actor from "./Actor.js";


class Cutouts extends Actor {

    constructor(scene, clock, loader) {
        super(scene, clock, loader);

        let paths = [
            "images/title card.png",
        ];

        // 16
        for (let i = 0; i < loader.names.length; i++) {
            let girl = loader.names[i];
            paths.push("images/girls/" + girl + "/main.png");
        }

        paths.push("images/title card.png");
        for (let i = 0; i < loader.names.length; i++) {
            let girl = loader.names[i];
            paths.push("images/girls/" + girl + "/main.png");
        }


        for (let i = 0; i < paths.length; i++) {
            let path = paths[i];
            let scale = 4;
            let plane = loader.getPlane(path, scale);
            let loc = Utils.locationInSong(1 + Math.floor(i / 2), i % 2 * 2, 0);
            plane.position.set(loc, 0, 0);
            scene.add(plane);
        }

    }


    update(cameraPosition, fpsAdjustment) {

    }

}

export default Cutouts;