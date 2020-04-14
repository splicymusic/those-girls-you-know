import * as THREE from "../../../lib/three/build/three.module.js";
import * as Utils from "../../Utils.js";
import Actor from "../Actor.js";
import Burst from "./Burst.js";


class Fireworks extends Actor {

    constructor(scene, clock, loader) {
        super(scene, clock, loader);
        this.burstsA = [];
        this.burst(scene, clock, loader, this.burstsA, Utils.locationInSong(0, 42, 0), 8);
        this.burstsB = [];
        this.burst(scene, clock, loader, this.burstsB, Utils.locationInSong(0, 44, 0), 8);
        this.burstsC = [];
        this.burst(scene, clock, loader, this.burstsC, Utils.locationInSong(0, 46, 0), 10);
        this.burstsD = [];
        this.burst(scene, clock, loader, this.burstsD, Utils.locationInSong(0, 48, 0), 10);
        this.burstsE = [];
        this.burst(scene, clock, loader, this.burstsE, Utils.locationInSong(0, 50, 0), 15);
    }

    burst(scene, clock, loader, group, xPos, amount) {
        for (let i = 0; i < amount; i++) {
            let yPos = Utils.randomInt(50) - 25;
            let zPos = Utils.randomInt(20) - 5;
            let burst = new Burst(scene, clock, loader, xPos, yPos, zPos);
            group.push(burst)
        }
    }



    update(cameraPosition, fpsAdjustment) {
        let a = Utils.locationInSong(0, 40, 0);
        let b = Utils.locationInSong(0, 42, 0);
        let c = Utils.locationInSong(0, 44, 0);
        let d = Utils.locationInSong(0, 46, 0);
        let e = Utils.locationInSong(0, 48, 0) - .1;
        if (cameraPosition >= a && cameraPosition < b) {
            this.burstsA.forEach(burst => {
                burst.trigger();
                burst.update(cameraPosition, fpsAdjustment);
            });
        }
        if (cameraPosition >= b && cameraPosition < c) {
            this.burstsB.forEach(burst => {
                burst.trigger();
                burst.update(cameraPosition, fpsAdjustment);
            });
        }
        if (cameraPosition >= c && cameraPosition < d) {
            this.burstsC.forEach(burst => {
                burst.trigger();
                burst.update(cameraPosition, fpsAdjustment);
            });
        }
        if (cameraPosition >= d && cameraPosition < e) {
            this.burstsD.forEach(burst => {
                burst.trigger();
                burst.update(cameraPosition, fpsAdjustment);
            });
        }
        if (cameraPosition > e) {
            this.burstsE.forEach(burst => {
                burst.trigger();
                burst.update(cameraPosition, fpsAdjustment);
            });
        }
    }

}

export default Fireworks;