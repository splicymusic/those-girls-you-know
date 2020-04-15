import * as THREE from "../../lib/three/build/three.module.js";
import * as Utils from "../Utils.js";
import Actor from "./Actor.js";


class Wave extends Actor {

    constructor(scene, clock, loader) {
        super(scene, clock, loader);
        let paths = [];
        loader.imageList.forEach(image => {
            if (image.includes("girls") && !image.endsWith(".png")) {
                paths.push(image);
            }
        });

        let xLoc = Utils.locationInSong(0, 30, 0);
        this.amplitude = 0;
        let arenaSize = 50;
        let canyonWidth = 2;
        let cardWidth = 2;
        let leftBound = -canyonWidth;
        let rightBound = canyonWidth;

        let buildings = [];
        let group = new THREE.Group();

        let xMin = xLoc;
        let xMax = xLoc + arenaSize;
        let yMin = arenaSize / -2;
        let yMax = arenaSize / 2;
        let xPos = xMin;
        let spacing = cardWidth;
        let count = 0;
        while (xPos <= xMax) {
            let yPos = yMin;
            while (yPos <= yMax ) {

                // if (yPos > leftBound && yPos < rightBound) {
                //     yPos += spacing;
                //     continue;
                // }
                let path;
                if (xPos === 250 && yPos === 1) {
                    path = "images/mom/IMG_0066.JPG";
                } else {
                    path = paths[count % paths.length];
                }
                let building = loader.getPlane(path, cardWidth);


                building.position.x = xPos + Math.random() * 2;
                building.position.y = yPos;
                building.position.z = -2;
                if (path.endsWith("Dey/1.jpg")) {
                    console.log("dey: " + xPos + "," + yPos);
                }
                buildings.push(building);
                group.add(building);
                yPos += spacing;
                count++;
            }
            xPos += spacing;
        }
        console.log("pics created: " + count);



        this.buildings = buildings;

        // group.visible = false;
        this.group = group;
        scene.add(group);
    }


    update(cameraPosition, fpsAdjustment) {
        if (cameraPosition > Utils.locationInSong(0, 29.125, 0) - 0.1) {
            if (this.amplitude < 1) {
                this.amplitude += .005 * fpsAdjustment;
            } else {
                this.amplitude = 1;
            }

            this.buildings.forEach(building => {
                // amplitude will vary sinusoidally
                let xFactor =  Math.sin((building.position.x - cameraPosition) * Math.PI / 16);
                let yFactor =  Math.sin((building.position.y - cameraPosition) * Math.PI / 16);
                building.position.z = xFactor * yFactor * 4 * this.amplitude -2  ;
            });
        }


    }

}

export default Wave;