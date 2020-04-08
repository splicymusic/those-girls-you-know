import * as THREE from "../../lib/three/build/three.module.js";
import * as Utils from "../Utils.js";
import Actor from "./Actor.js";


class Clouds extends Actor {

    constructor(scene, clock, loader) {
        super(scene, clock, loader);

        let clouds = [];
        let span = 200;
        for (let i = 0; i < 25; i++) {
            let cloud = loader.getPlane("images/emoji/cloud.png", Math.random() * 15 + 5);
            let x = Math.random() * 5;
            let y = Math.random() * span - span / 2;
            let z = Math.random() * 100 - 50;

            if (Math.sqrt(z * z + y * y) < 15) continue;
            cloud.position.set(x, y, z);
            cloud.material.opacity = 0.7;
            clouds.push(cloud);
            scene.add(cloud);
        }
        this.clouds = clouds;
        this.span = span;
    }



    update(cameraPosition, fpsAdjustment) {
        this.clouds.forEach(cloud => {
            cloud.position.y += 0.025;
            cloud.position.x = cameraPosition + 50;
            if (cloud.position.y > this.span / 2) cloud.position.y -= this.span;

            // fades to noting at center of screen so as to not visually interfere with the
            // foreground elements
            let fromCenter = Math.abs(cloud.position.y);
            let radius = 60;
            if (fromCenter < radius) {
                let factor = Math.max(fromCenter - 20, 0) / radius;
                cloud.material.opacity = 0.7 * factor;
            }
        });
    }

}

export default Clouds;