import * as THREE from "../../lib/three/build/three.module.js";
import * as Utils from "../Utils.js";
import Actor from "./Actor.js";


class Stars extends Actor {

    constructor(scene, clock, loader) {
        super(scene, clock, loader);

        let vertices = [];

        for (let i = 0; i < 50000; i++) {

            let x = Math.random() * 1000 + Utils.locationInSong(0, 0, 18);
            let y = Math.random() * 100 - 50;
            let z = Math.random() * 100 - 50;

            if (Math.sqrt(z * z + y * y) < 15) continue;

            vertices.push(x, y, z);

        }

        let geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        // let randomColor = new THREE.Color("hsl(" + randomInt(255) + ", 100%, 50%)");
        let material = new THREE.PointsMaterial({
            color: 0xFFFF00,
            size: 0.3
        });

        this.points = new THREE.Points(geometry, material);
        this.points.position.x = Utils.locationInSong(1, 0, 0);

        scene.add(this.points);
    }



    update(cameraPosition, fpsAdjustment) {
        this.points.rotation.x = Math.PI * this.clock.eighthsFraction / 180;
    }

}

export default Stars;