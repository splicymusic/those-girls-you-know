import * as THREE from "../../../lib/three/build/three.module.js";
import * as Utils from "../../Utils.js";
import Actor from "../Actor.js";
import TunnelSection from "./TunnelSection.js";


class Tunnel extends Actor {
    constructor(scene, clock, loader, x) {
        super(scene, clock, loader);

        let sections = [];
        for (let i = 0; i < loader.names.length; i++) {
            let name = loader.names[i];
            let xPos = x + Utils.locationInSong(0, i * 2, 6);
            sections.push(new TunnelSection(scene, clock, loader, name, xPos));
        }

        this.sections = sections;
    }

    update(cameraPosition, fpsAdjustment) {
        this.sections.forEach(section => {
            section.update(cameraPosition, fpsAdjustment);
        });
    }


}

export default Tunnel