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
        for (let i = 0; i < 700; i++) {
            let path = paths[i % paths.length];
            let scale = 4;
            let cutout = loader.getPlane(path, scale);
            let crowdDepth = Utils.locationInSong(2, 0, 0);
            let loc = Utils.locationInSong(0, 42, 0) - crowdDepth;
            let xPos = loc +  Utils.randomInt(crowdDepth) + Math.random() * .2;
            let yPos =  Utils.randomInt(48) - 24;
            let zPos = -1 * Utils.randomInt(Math.abs(yPos)) + 0.25 * Math.abs(yPos) - 1.5;
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
        if (cameraPosition > Utils.locationInSong(0, 40, 0)) {
            // this.group.visible = true;
            this.group.position.x += 0.095 * fpsAdjustment;
        }

        if (cameraPosition >= Utils.locationInSong(0, 41, 0)) {
            this.group.position.x -= 0.095 * fpsAdjustment;
        }

        if (cameraPosition >= Utils.locationInSong(0, 42, 0)) {
            this.group.visible = true;
            this.group.position.x += 0.095 * fpsAdjustment;
            this.group.position.x += 0.02 * fpsAdjustment;
        }

        if (cameraPosition >= Utils.locationInSong(0, 43, 0)) {
            this.group.position.x -= 0.095 * fpsAdjustment;
        }

        if (cameraPosition >= Utils.locationInSong(0, 44, 0)) {
            this.group.visible = false;
        }



        if (cameraPosition >= Utils.locationInSong(0, 46, 0)) {
            this.group.visible = true;
            this.group.position.x += 0.02 * fpsAdjustment;
        }


        if (cameraPosition >= Utils.locationInSong(0, 48, 0)) {
            this.group.visible = false;
        }


        this.cutouts.forEach(cutout => {
            // if (cutout.position.x < cameraPosition + 4) {
            //     cutout.rotation.y += 0.02 * fpsAdjustment;
                // center.position.x -= 0.1;
                // cutout.position.y -= 0.1;
            // }
        });
    }

}

export default Swimmers;