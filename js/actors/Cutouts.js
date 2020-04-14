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
        // paths.push("images/blank.png");
        let namesB = loader.names.slice(0,5);
        for (let i = 0; i < namesB.length; i++) {
            let girl = namesB[i];
            paths.push("images/girls/" + girl + "/main.png");
        }

        let group = new THREE.Group();
        let cutouts = [];
        for (let i = 0; i < paths.length; i++) {
            let path = paths[i];
            let scale = 4;
            let plane = loader.getPlane(path, scale);
            let loc = Utils.locationInSong(1 + Math.floor(i / 2), i % 2 * 2, 0);
            plane.position.set(loc, 0, Utils.pathPosition() + scale / 2);
            cutouts.push(plane);
            if (i > 0) plane.visible = false;
            group.add(plane);
        }
        scene.add(group);
        this.group = group;
        this.cutouts = cutouts;

    }


    update(cameraPosition, fpsAdjustment) {
        if (cameraPosition > Utils.locationInSong(1,0,0) - .1) {
            this.cutouts.forEach(cutout => {
                cutout.visible = true;
            });
        }
    }

}

export default Cutouts;