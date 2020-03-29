import * as THREE from "../../../lib/three/build/three.module.js";
import * as Utils from "../../Utils.js";
import Actor from "../Actor.js";
import Card from "./Card.js";


class Tunnel extends Actor {
    constructor(scene, clock, loader) {
        super(scene, clock, loader);
        this.innerCards = [];
        this.innerEnds = [];
        this.innerCenters = [];
        this.outerCards = [];
        this.outerEnds = [];
        this.outerCenters = [];

        this.createSpiral(this.innerCards, this.innerEnds, this.innerCenters, 5, Utils.locationInSong(1, 0, 0), 2, 0);
        // this.createSpiral(this.outerCards, this.outerEnds, this.outerCenters, 9, Utils.locationInSong(1, 0, 2), 3, 2);

        // this.createSpiral(this.inner, 5, Utils.locationInSong(1, 0, 0), 3, 0);
        // this.createSpiral(this.outer, 3, Utils.locationInSong(1, 0, 2), 1, 2);
    }

    createSpiral(cards, ends, centers, radius, startX, scale, offset) {
        //let texture = loader.load('images/girls/Bo Derek/Bo Derek.jpg');
        let keys = Object.keys(this.loader.girls);


        let edgeMaterial = new THREE.MeshBasicMaterial({
            color:  0xFFFFFF, // top
            fog: true,
        });

        for (let i = 0; i < 100; i++) {
            // let sideColor = new THREE.Color("hsl(" + (i * 10) % 256 + ", 100%, 50%)");
            // // let sideColor = 0xFFFFFF;
            //
            // let edgeMaterial = new THREE.MeshBasicMaterial({
            //     color: sideColor, // top
            //     fog: true,
            // });

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
                let center = new THREE.Group();
                let end = new THREE.Group();
                let card = new THREE.Mesh(geometryA, cardMaterialA);
                card.rotation.x = Math.PI / 2;
                end.add(card);
                end.position.set(i * 4 + startX + j * .25, 0, radius);
                center.add(end);
                center.rotation.x = rotationAmount + Math.PI;
                cards.push(card);
                ends.push(end);
                centers.push(center);
                this.scene.add(center);
            }
        }
    }

    update(cameraPosition, fpsAdjustment) {
        this.outerCards.forEach(end => {
            end.position.z = Math.sin((end.position.x) * Math.PI / 4) * 10;
        });
        let effectIndex = this.clock.bar % 4;
        // if (this.clock.eighthsFraction >= 32.5) {
            this.innerCards.forEach(mesh => {
                mesh.visible = true;
                // if (this.clock.quarter > 64 + 16) {
                    if (effectIndex === 0) {
                        mesh.rotateOnAxis(new THREE.Vector3(0, 0, 1), -1 * Math.PI / 180 * fpsAdjustment);
                    }
                    if (effectIndex === 1) {
                        mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), -1 * Math.PI / 180 * fpsAdjustment);
                        // mesh.translateY(Math.sin(clock.eighthsFraction + mesh.position.x) / 16);
                    }
                    if (effectIndex === 2) {
                        mesh.rotateOnAxis(new THREE.Vector3(0, 0, 1), -1 * Math.PI / 180 * fpsAdjustment);
                        // mesh.rotateZ(0.1);
                    }
                    if (effectIndex === 3) {
                        mesh.rotateOnAxis(new THREE.Vector3(0, 1, 1), -1 * Math.PI / 180 * fpsAdjustment);
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