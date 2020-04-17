import * as THREE from "../../../lib/three/build/three.module.js";
import * as Utils from "../../Utils.js";
import Actor from "../Actor.js";
import Card from "./Card.js";


class EmojiTunnel extends Actor {

    constructor(scene, clock, loader, xPos, tunnelLength) {
        super(scene, clock, loader);
        this.xPos = xPos;
        this.tunnelLength = tunnelLength;

        let emojiPaths = [];
        for (let j = 0; j < tunnelLength; j++) {
            //let imagePath = loader.happyEmoji[Utils.randomInt(loader.happyEmoji.length)];
            let imagePath = loader.happyEmoji[j % loader.happyEmoji.length];
            emojiPaths.push(imagePath);
        }
        this.emojiPaths = emojiPaths;
        this.cards = [];
        this.radius = 5;
        this.spine = this.createSpiral(this.cards, this.radius, 2);
        this.haRotation = Math.PI;
    }

    createSpiral(cards, radius, scale) {
        let spine = new THREE.Group();
        for (let i = 0; i < this.tunnelLength; i++) {

            let path = this.emojiPaths[i];
            for (let j = 0; j < 16; j++) {
                let rotationAmount = 2 * Math.PI / 16 * j;
                let center = new THREE.Group();
                let end = new THREE.Group();
                let picture;

                picture = this.loader.getPlane(path, scale);

                end.add(picture);
                end.position.set(i * 4 + this.xPos + j * .25, 0, radius);
                center.add(end);
                center.rotation.x = rotationAmount + Math.PI;
                spine.add(center);
                let card = new Card(picture, end, center);
                cards.push(card);
            }
        }
        spine.visible = false;
        this.scene.add(spine);
        return spine;
    }

    update(cameraPosition, fpsAdjustment) {
        // hiding at beginning
        let a = Utils.locationInSong(1, 0, 0) - 0.1;
        let b = Utils.locationInSong(0, 36, 0) - 0.1;
        let c = Utils.locationInSong(0, 38, 0) - 0.1;
        if (cameraPosition >= a && cameraPosition < b) {
            this.spine.visible = true;
        }
        if (cameraPosition >= b && cameraPosition < c) {
            this.spine.visible = false;
        }
        if (cameraPosition >= c) {
            this.spine.visible = true;
        }

        // rotate on spine
        // if (cameraPosition >= Utils.locationInSong(0, 12, 0) - 0.1) {
        //         this.spine.rotation.x -= .002 * fpsAdjustment;
        // }

        // "ha" pulsations
        if (
            (cameraPosition >= Utils.locationInSong(0, 12, 2) && cameraPosition < Utils.locationInSong(0, 12, 6)) ||
            (cameraPosition >= Utils.locationInSong(0, 13, 4) && cameraPosition < Utils.locationInSong(0, 13, 6))
        ) {
            this.cards.forEach(card => {
                card.end.position.z = this.radius + Math.sin(cameraPosition * Math.PI) / 2;
            });
        }

        // finale pulsate
        // if (
        //     cameraPosition >= Utils.locationInSong(0, 40, 0)
        // ) {
        //     this.cards.forEach(card => {
        //         if (this.clock.half % 2 === 0) {
        //             card.end.position.z = this.radius + Math.sin(cameraPosition * Math.PI) / 8;
        //         }
        //     });
        // }
        // final "ha"
        if (
            (cameraPosition >= Utils.locationInSong(0, 15, 2) && cameraPosition < Utils.locationInSong(0, 15, 7))
        ) {
            let rotationAmount = -1 * Math.PI / 90 * fpsAdjustment;
            let vector = new THREE.Vector3(0, 0, 1);
            this.cards.forEach(card => {
                if (this.haRotation > 0) {
                    card.end.rotateOnAxis(vector, rotationAmount);
                } else {
                    if (this.haRotation !== 0) {
                        card.end.rotateOnAxis(vector, -1 * this.haRotation);
                    }
                }
            });

            if (this.haRotation > 0) {
                this.haRotation += rotationAmount;
            } else {
                if (this.haRotation !== 0) {
                    this.haRotation = 0;
                }
            }

        }


        // rotate individual emojis
        let effectIndex = this.clock.whole % 1;
        this.cards.forEach(card => {

            if (effectIndex === 0) {
                card.picture.rotateOnAxis(new THREE.Vector3(0, 0, 1), -1 * Math.PI / 180 * fpsAdjustment);
            }
            if (effectIndex === 1) {
                card.picture.rotateOnAxis(new THREE.Vector3(0, 1, 0), -1 * Math.PI / 180 * fpsAdjustment);
                // mesh.translateY(Math.sin(clock.eighthsFraction + mesh.position.x) / 16);
            }
            if (effectIndex === 2) {
                card.picture.rotateOnAxis(new THREE.Vector3(1, 0, 0), -1 * Math.PI / 180 * fpsAdjustment);
                // card.picture.translateY(Math.sin(this.clock.eighthsFraction + card.picture.position.x) / 16);
            }

        });
    }

}

export default EmojiTunnel;