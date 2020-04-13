import * as THREE from "../../lib/three/build/three.module.js";
import * as Utils from "../Utils.js";
import Actor from "./Actor.js";


class Swimmers extends Actor {

    constructor(scene, clock, loader) {
        super(scene, clock, loader);

        let paths = [];

        for (let i = 0; i < loader.names.length; i++) {
            let girl = loader.names[i];
            paths.push("images/girls/" + girl + "/main.png");
        }

        let cutouts = [];
        let group = new THREE.Group();
        // a little deeper than 2 measures so it's full to off camera at beginning
        let crowdDepth = Utils.locationInSong(2, 1, 0);
        let loc = Utils.locationInSong(0, 39, 0) - crowdDepth;
        let scale = 4;
        for (let i = 0; i < 700; i++) {
            let path = paths[i % paths.length];
            let cutout = loader.getPlane(path, scale);
            let xPos = loc +  Utils.randomInt(crowdDepth) + Math.random() * .2;
            let yPos =  Utils.randomInt(48) - 24;
            //let zPos = -1 * Utils.randomInt(Math.abs(yPos)) + 0.25 * Math.abs(yPos) - 1.5;
            let zPos = Math.sin((yPos) * Math.PI / 4)- 4;
            // let zPos = 0;
            if (Math.abs(yPos) < 3) continue;
            cutout.position.set(xPos,yPos, zPos);
            cutouts.push(cutout);
            group.add(cutout);
        }
        this.cutouts = cutouts;
        group.visible = false;
        this.group = group;
        scene.add(group);

    }


    update(cameraPosition, fpsAdjustment) {
        let a = Utils.locationInSong(0, 39, 0);
        let b = Utils.locationInSong(0, 40, 0) - 0.1;
        let c = Utils.locationInSong(0, 44, 0) - 0.1;
        let d = Utils.locationInSong(0, 46, 0) - 0.1;
        let e = Utils.locationInSong(0, 48, 0) - 0.1;

        if (cameraPosition >= a && cameraPosition < b) {
            this.group.visible = true;
            this.group.position.x += 0.3 * fpsAdjustment;
        }

        if (cameraPosition >= b && cameraPosition < e) {
            this.group.position.x = Utils.locationInSong(0, 10, 0);
            this.cutouts.forEach(cutout => {
                cutout.position.z = Math.sin((cutout.position.y + this.clock.eighthsFraction) * Math.PI / 4) * 1 - 4;
            });

        }

        if (cameraPosition > e) {
            this.group.visible = false;
        }

    }

}

export default Swimmers;