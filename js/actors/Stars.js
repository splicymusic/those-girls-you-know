import * as THREE from "../../lib/three/build/three.module.js";
import * as Utils from "../Utils.js";
import Actor from "./Actor.js";


class Stars extends Actor {

    constructor(scene, clock, loader) {
        super(scene, clock, loader);

        let vertices = [];

        for (let i = 0; i < 100000; i++) {

            let x = Math.random() * 1000 - 50;
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

        scene.add(this.points);
    }



    update(cameraPosition) {
        this.points.rotation.x = Math.PI * this.clock.eighthsFraction / 180;
    }

}

export default Stars;