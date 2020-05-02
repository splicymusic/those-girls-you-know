import * as THREE from "../../lib/three/build/three.module.js";
import * as Utils from "../Utils.js";
import Actor from "./Actor.js";


class Cutouts extends Actor {

    constructor(scene, clock, loader) {
        super(scene, clock, loader);

        let paths = [
            "images/title card.png",
        ];

        for (let i = 0; i < loader.names.length; i++) {
            let girl = loader.names[i];
            paths.push("images/girls/" + girl + "/main.png");
        }

        paths.push("images/title card.png");
        // paths.push("images/blank.png");
        let namesB = loader.names2;
        for (let i = 0; i < namesB.length; i++) {
            let girl = namesB[i];
            paths.push("images/girls2/" + girl + "/main.png");
        }

        let group = new THREE.Group();
        let cutouts = [];
        for (let i = 0; i < paths.length; i++) {
            let path = paths[i];
            let scale = 4;
            let plane = loader.getPlane(path, scale);
            let loc = Utils.locationInSong(1 + Math.floor(i / 2), i % 2 * 2, 0);
            let zPos = Utils.pathPosition() + scale / 2;
            let yPos = 0;
            if (path.endsWith("card.png")) {
                zPos += 0.5;
            }
            if (path.endsWith("Bisett/main.png")) {
                yPos = -1.1;
            }
            plane.position.set(loc, yPos, zPos);
            plane.material.fog = false;
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