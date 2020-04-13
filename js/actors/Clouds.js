import * as THREE from "../../lib/three/build/three.module.js";
import * as Utils from "../Utils.js";
import Actor from "./Actor.js";


class Clouds extends Actor {

    constructor(scene, clock, loader) {
        super(scene, clock, loader);

        let clouds = [];
        let span = 200;
        for (let i = 0; i < 25; i++) {
            let size = Math.random() * 15 + 5;
            let cloud = loader.getPlane("images/emoji/cloud.png", size);
            let x = Math.random() * 5;
            let y = Math.random() * span - span / 2;
            let z = Math.random() * 100 - 50;

            if (Math.sqrt(z * z + y * y) < 15) continue;
            cloud.position.set(x, y, z);
            cloud.material.opacity = 0.7;
            let object = {
                cloud: cloud,
                velocity: size / 175 + .01
            };
            clouds.push(object);
            scene.add(cloud);
        }
        this.clouds = clouds;
        this.span = span;
    }



    update(cameraPosition, fpsAdjustment) {
        this.clouds.forEach(object => {
            object.cloud.position.y += object.velocity;
            object.cloud.position.x = cameraPosition + 50;
            if (object.cloud.position.y > this.span / 2) object.cloud.position.y -= this.span;

            // fades to noting at center of screen so as to not visually interfere with the
            // foreground elements
            if (cameraPosition > Utils.locationInSong(1, 0, 0)) {
                let fromCenter = Math.abs(object.cloud.position.y);
                let radius = 60;
                if (fromCenter < radius) {
                    let factor = Math.max(fromCenter - 20, 0) / radius;
                    object.cloud.material.opacity = 0.7 * factor;
                }
            }
        });
    }

}

export default Clouds;