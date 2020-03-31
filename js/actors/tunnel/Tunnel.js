import * as THREE from "../../../lib/three/build/three.module.js";
import * as Utils from "../../Utils.js";
import Actor from "../Actor.js";
import Card from "./Card.js";


class Tunnel extends Actor {
    constructor(scene, clock, loader) {
        super(scene, clock, loader);
        this.innerCards = [];
        this.outerCards = [];

        this.createSpiral(this.innerCards, 5, Utils.locationInSong(1, 0, 0), 2, 0);
        // this.createSpiral(this.outerCards, 9, Utils.locationInSong(1, 0, 2), 3, 2);

        // this.createSpiral(this.inner, 5, Utils.locationInSong(1, 0, 0), 3, 0);
        // this.createSpiral(this.outer, 3, Utils.locationInSong(1, 0, 2), 1, 2);
    }

    createSpiral(cards, radius, startX, scale, offset) {
        //let texture = loader.load('images/girls/Bo Derek/Bo Derek.jpg');
        let keys = Object.keys(this.loader.images);


        // let edgeMaterial = new THREE.MeshBasicMaterial({
        //     color:  0xFFFFFF, // top
        //     fog: true,
        // });

        for (let i = 0; i < 90; i++) {
            let sideColor = new THREE.Color("hsl(" + (i * 10) % 256 + ", 100%, 50%)");

            let edgeMaterial = new THREE.MeshBasicMaterial({
                color: sideColor, // top
                fog: true,
            });

            let key = keys[(i + offset) % keys.length];
            let textureA = this.loader.images[key];
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
                let center = new THREE.Group();
                let end = new THREE.Group();
                let picture = new THREE.Mesh(geometryA, cardMaterialA);
                picture.rotation.x = Math.PI / 2;
                picture.visible = false;
                end.add(picture);
                end.position.set(i * 4 + startX + j * .25, 0, radius);
                center.add(end);
                center.rotation.x = rotationAmount + Math.PI;

                let card = new Card(picture, end, center);
                cards.push(card);

                this.scene.add(center);
            }
        }
    }

    update(cameraPosition, fpsAdjustment) {
        this.outerCards.forEach(card => {
            // card.end.position.z = Math.sin((card.end.position.x + this.clock.eighthsFraction) * Math.PI / 4) * 2 + 9;
            // card.center.position.x = -2 * this.clock.eighthsFraction;
        });
        let effectIndex = this.clock.bar % 4;
        // if (this.clock.eighthsFraction >= 32.5) {
            this.innerCards.forEach(card => {
                if (cameraPosition >= Utils.locationInSong(1, 0, 0) - 0.1) {
                    card.picture.visible = true;
                }
                // if (this.clock.quarter > 64 + 16) {
                    if (effectIndex === 0) {
                        card.picture.rotateOnAxis(new THREE.Vector3(0, 0, 1), -1 * Math.PI / 180 * fpsAdjustment);
                    }
                    if (effectIndex === 1) {
                        card.picture.rotateOnAxis(new THREE.Vector3(0, 1, 0), -1 * Math.PI / 180 * fpsAdjustment);
                        // mesh.translateY(Math.sin(clock.eighthsFraction + mesh.position.x) / 16);
                    }
                    if (effectIndex === 2) {
                        card.picture.rotateOnAxis(new THREE.Vector3(0, 0, 1), -1 * Math.PI / 180 * fpsAdjustment);
                        // mesh.rotateZ(0.1);
                    }
                    if (effectIndex === 3) {
                        card.picture.rotateOnAxis(new THREE.Vector3(0, 1, 1), -1 * Math.PI / 180 * fpsAdjustment);
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