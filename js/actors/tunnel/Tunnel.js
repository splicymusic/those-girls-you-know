import * as THREE from "../../../lib/three/build/three.module.js";
import * as Utils from "../../Utils.js";
import Actor from "../Actor.js";
import Card from "./Card.js";


class Tunnel extends Actor {
    constructor(scene, clock, loader) {
        super(scene, clock, loader);
        this.inner = [];
        this.outer = [];

        this.createSpiral(this.inner, 5, Utils.locationInSong(1, 0, 0), 2, 0);
        this.createSpiral(this.outer, 9, Utils.locationInSong(1, 0, 2), 3, 2);
    }

    createSpiral(array, radius, startX, scale, offset) {
        //let texture = loader.load('images/girls/Bo Derek/Bo Derek.jpg');
        let keys = Object.keys(this.loader.girls);

        // preserve ratio
        let sideColor = 0x85C1E9;

        let edgeMaterial = new THREE.MeshBasicMaterial({
            color: sideColor, // top
            fog: true,
        });

        for (let i = 0; i < 100; i++) {
            let key = keys[(i + offset) % keys.length];
            let textureA = this.loader.girls[key];
            let geometryA = new THREE.BoxBufferGeometry(.1, scale, scale * textureA.image.width / textureA.image.height);
            let cardMaterialA = [
                new THREE.MeshBasicMaterial({
                    map: textureA, //left
                    fog: true,
                }),
                new THREE.MeshBasicMaterial({
                    map: textureA, //right
                    fog: true,
                }),
                edgeMaterial,
                edgeMaterial,
                edgeMaterial,
                edgeMaterial
            ];

            for (let j = 0; j < 16; j++) {
                let rotationAmount = 2 * Math.PI / 16 * j;
                let pivot = new THREE.Group();
                let mesh = new THREE.Mesh(geometryA, cardMaterialA);
                mesh.position.set(i * 4 + startX + j * .25, 0, radius);
                // mesh.position.set(i * 4 + innerStart, 0, 5);
                mesh.rotation.x = Math.PI / 2;
                pivot.add(mesh);
                pivot.rotation.x = rotationAmount + Math.PI;
                // mesh.visible = false;
                array.push(mesh);
                this.scene.add(pivot);
            }

        }
    }

    update(cameraPosition) {
        let effectIndex = this.clock.bar % 4;
        // if (this.clock.eighthsFraction >= 32.5) {
            this.inner.forEach(mesh => {
                mesh.visible = true;
                // if (this.clock.quarter > 64 + 16) {
                    if (effectIndex === 0) {
                        mesh.rotateOnAxis(new THREE.Vector3(0, 0, 1), -1 * Math.PI / 180);
                    }
                    if (effectIndex === 1) {
                        mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), -1 * Math.PI / 180);
                        // mesh.translateY(Math.sin(clock.eighthsFraction + mesh.position.x) / 16);
                    }
                    if (effectIndex === 2) {
                        mesh.rotateOnAxis(new THREE.Vector3(0, 0, 1), -1 * Math.PI / 180);
                        // mesh.rotateZ(0.1);
                    }
                    if (effectIndex === 3) {
                        mesh.rotateOnAxis(new THREE.Vector3(0, 1, 1), -1 * Math.PI / 180);
                        // mesh.translateY(Math.sin(clock.eighthsFraction + mesh.position.x) / 16);
                    }
                    // mesh.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -1 * Math.PI / 180);
                    // mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), -1 * Math.PI / 180);
                    // mesh.translateY(Math.sin(this.clock.eighthsFraction + mesh.position.x) / 20);
                    // mesh.translateY(.05);
                // }

                // mesh.position.x -= .1;
            });
        // }
    }
}

export default Tunnel