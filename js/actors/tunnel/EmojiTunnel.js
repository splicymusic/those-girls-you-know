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
        for (let j = 1; j <= tunnelLength; j++) {
            let imagePath = loader.happyEmoji[Utils.randomInt(loader.happyEmoji.length)];
            emojiPaths.push(imagePath);
        }
        this.emojiPaths = emojiPaths;
        this.innerCards = [];
        this.innerSpine = this.createSpiral(this.innerCards, 5, 2);
    }

    createSpiral(cards, radius, scale) {

        let spine = new THREE.Group();
        for (let i = 0; i < this.tunnelLength; i++) {

            let path = this.emojiPaths[Utils.randomInt(this.emojiPaths.length)];
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
            this.innerSpine.visible = true;
        }
        if (cameraPosition >= b && cameraPosition < c) {
            this.innerSpine.visible = false;
        }
        if (cameraPosition >= c) {
            this.innerSpine.visible = true;
        }

        // inner cards
        let effectIndex = this.clock.bar % 1;
        this.innerCards.forEach(card => {

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