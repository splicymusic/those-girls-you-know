import * as THREE from "../../../lib/three/build/three.module.js";
import * as Utils from "../../Utils.js";
import Actor from "../Actor.js";
import Card from "./Card.js";


class TunnelSection extends Actor {

    constructor(scene, clock, loader, xPos, isInner) {
        super(scene, clock, loader);

        let config = {
            girlImages: [],
            emojiPaths: [],
            sideColor: 0xFFFFFF,
            exists: true,
            isEmoji: false,
            isRotatingOnSpine: false,
            isOscilating: false,
            isFlipping: true
        };
        this.config = config;

        this.cards = [];

        if (isInner) {
            this.spine = this.createSpiral(this.cards, 5, xPos, 2, 0, true);
        } else {
            this.spine = this.createSpiral(this.cards, 9, xPos + Utils.locationInSong(0, 0, 2), 3, 0, false);
        }
    }

    createSpiral(cards, radius, startX, scale, offset, isEmoji) {

        let edgeMaterial = new THREE.MeshBasicMaterial({
            color: this.config.sideColor, // top
            fog: true,
        });

        let spine = new THREE.Group();
        for (let i = 0; i < 4; i++) {

            let textureA = this.config.girlImages[(i + offset) % 4];
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
                let picture;
                if (isEmoji) {
                    picture = this.loader.getPlane(this.config.emojiPaths[(i + offset) % 4], 2);
                } else {
                    picture = new THREE.Mesh(geometryA, cardMaterialA);
                    picture.rotation.x = Math.PI / 2;
                }
                end.add(picture);
                end.position.set(i * 4 + startX + j * .25, 0, radius);
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
        if (cameraPosition >= Utils.locationInSong(1, 0, 0) - 0.1) {
            this.spine.visible = true;
        }
        // outer spine
        if (cameraPosition >= Utils.locationInSong(0, 12, 0) - 0.1) {
            this.outerSpine.visible = true;
            if (cameraPosition >= Utils.locationInSong(36, 0, 0) - 0.1) {
                this.outerSpine.rotation.x += .005 * fpsAdjustment;
            }
        }

        this.innerCards.forEach(card => {
            if (this.config.isRotatingOnSpine) {
                this.outerSpine.rotation.x += .005 * fpsAdjustment;
            }

            if (this.config.isOscilating) {
                card.end.position.z = Math.sin((card.end.position.x + this.clock.eighthsFraction) * Math.PI / 4) * 2 + 9;
            }

            if (this.config.isFlipping) {
                let effectIndex = this.clock.bar % 2;
                if (effectIndex === 0) {
                    card.picture.rotateOnAxis(new THREE.Vector3(0, 0, 1), -1 * Math.PI / 180 * fpsAdjustment);
                }
                if (effectIndex === 1) {
                    card.picture.rotateOnAxis(new THREE.Vector3(0, 1, 0), -1 * Math.PI / 180 * fpsAdjustment);
                    // mesh.translateY(Math.sin(clock.eighthsFraction + mesh.position.x) / 16);
                }
            }
        });

    }

}

export default TunnelSection;