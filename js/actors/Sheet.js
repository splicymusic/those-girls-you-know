import * as THREE from "../../lib/three/build/three.module.js";
import * as Utils from "../Utils.js";
import Actor from "./Actor.js";


class Sheet extends Actor {

    constructor(scene, clock, loader) {
        super(scene, clock, loader);
        let paths = [];
        loader.imageList.forEach(image => {
           if (image.includes("girls") && !image.endsWith(".png")) {
               paths.push(image);
           }
        });
        let group = new THREE.Group();
        let cardWidth = 3;
        let widthCount = 20;
        let heightMax = widthCount * cardWidth;
        let widthMax = heightMax;
        for (let i = 0; i < widthCount; i++) {
            let heightTally = 0;
            while (heightTally < heightMax) {
                let path = paths[Utils.randomInt(paths.length)];
                let card = loader.getPlane(path, cardWidth);
                let xPos = 0;
                let yPos =  i * cardWidth - widthMax / 2;
                let zPos = 20 - heightTally;
                card.position.set(xPos, yPos, zPos);
                heightTally += card.geometry.parameters.height;
                group.add(card);
            }
        }
       group.rotateOnAxis(new THREE.Vector3(0, 1, 0),  Math.PI / 2);
        group.position.x = Utils.locationInSong(0, 38, 0);
        group.position.z = -4;
        scene.add(group);
    }



    update(cameraPosition, fpsAdjustment) {

    }

}

export default Sheet;