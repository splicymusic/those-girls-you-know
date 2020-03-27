import * as THREE from "../../lib/three/build/three.module.js";
import * as Utils from "../Utils.js";
import Group from "./Group.js";

class Tunnel extends Group {
    constructor(scene, clock, loader) {
        super(scene, clock, loader);
        this.inner = [];

        //let texture = loader.load('images/girls/Bo Derek/Bo Derek.jpg');
        let keys = Object.keys(loader.girls);


        // preserve ratio
        let scale = 2;
        let sideColor = 0x85C1E9;

        let edgeMaterial = new THREE.MeshBasicMaterial({
            color: sideColor, // top
            fog: true,
        });

        let innerStart = Utils.locationInSong(1, 0, 0);
        let outerStart = Utils.locationInSong(1, 0, 2);
        for (let i = 0; i < 100; i++) {
            let keyA = keys[i % keys.length];
            let textureA = loader.girls[keyA];
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
                mesh.position.set(i * 4 + innerStart + j * .25, 0, 5);
                // mesh.position.set(i * 4 + innerStart, 0, 5);
                mesh.rotation.x = Math.PI / 2;
                pivot.add(mesh);
                pivot.rotation.x = rotationAmount + Math.PI;
                // mesh.visible = false;
                this.inner.push(mesh);
                scene.add(pivot);
            }

            let keyB = keys[(i + 2) % keys.length];
            let textureB = loader.girls[keyB];
            let geometryB = new THREE.BoxBufferGeometry(.1, 3, 3 * textureB.image.width / textureB.image.height);
            let cardMaterialB = [
                new THREE.MeshBasicMaterial({
                    map: textureB, //left
                    fog: true,
                }),
                new THREE.MeshBasicMaterial({
                    map: textureB, //right
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
                let mesh = new THREE.Mesh(geometryB, cardMaterialB);
                // mesh.position.set(i * 4 + outerStart + j / 4, 0, 9);
                mesh.position.set(i * 4 + outerStart, 0, 9);
                mesh.rotation.x = Math.PI / 2;
                pivot.add(mesh);
                pivot.rotation.x = rotationAmount + Math.PI / 16 + Math.PI;
                scene.add(pivot);
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