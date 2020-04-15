import * as THREE from "../../../lib/three/build/three.module.js";
import * as Utils from "../../Utils.js";
import Actor from "../Actor.js";


class Burst extends Actor {

    constructor(scene, clock, loader, xPos, yPos, zPosSuggested) {
        super(scene, clock, loader);
        this.xPos = xPos;
        this.xOffset = Utils.locationInSong(0, 2, 0);
        let group = new THREE.Group();
        let stars = [];
        let amount = 50;
        for(let i = 0; i < amount; i++) {
            let zPos = zPosSuggested + Math.random() * .3;
            let rotationAmount = 2 * Math.PI / amount * i;
            let imagePath = loader.happyEmoji[Utils.randomInt(loader.happyEmoji.length)];
            // let imagePath = "images/emoji/star.png";
            let star = loader.getPlane(imagePath, 1);

            stars.push(star);
            let center = new THREE.Group();
            center.add(star);
            center.rotation.x = rotationAmount;
            center.position.set(xPos, yPos, zPos);
            group.add(center);
        }
        scene.add(group);
        group.visible = false;
        this.group = group;
        this.stars = stars;
        this.triggered = false;
    }

    trigger() {
        this.group.visible = true;
        this.triggered = true;
    }



    update(cameraPosition, fpsAdjustment) {
        if (this.triggered) {
            this.stars.forEach(star => {
                // star shoot out
                star.position.z += 0.5 * fpsAdjustment;
                // star fade
                if (star.material.opacity > 0.01) {
                    //star.material.opacity *= 0.8 * fpsAdjustment;
                    let factor = (this.xPos - cameraPosition ) / 16;
                    star.material.opacity *= Math.max(factor, 0);
                } else {
                    star.visible = false;
                }

            });
        }
    }

}

export default Burst;