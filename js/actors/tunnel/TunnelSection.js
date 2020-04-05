import * as THREE from "../../../lib/three/build/three.module.js";
import * as Utils from "../../Utils.js";
import Actor from "../Actor.js";
import Card from "./Card.js";


class TunnelSection extends Actor {

    constructor(scene, clock, loader, girl, xPos) {
        super(scene, clock, loader);
        let cardImages = [];
        for (let j = 1; j <= 4; j++) {
            let image = loader.get("images/girls/" + girl + "/" + j + ".jpg");
            cardImages.push(image);
        }
        let mainImage = loader.get("images/girls/" + girl + "/main.png");

        this.girl = girl;
        this.xPos = xPos;
        this.cardImages = cardImages;
        this.mainImage = mainImage;
        this.innerCards = [];
        this.outerCards = [];


        this.sideColor = new THREE.Color("hsl(" + Utils.randomInt(255) + ", 100%, 50%)");

        this.innerSpine = this.createSpiral(this.innerCards, 5, xPos, 2, 0);
        this.outerSpine = this.createSpiral(this.outerCards, 9, xPos + Utils.locationInSong(0, 0, 2), 3, 0);
    }

    createSpiral(cards, radius, startX, scale, offset) {

        let edgeMaterial = new THREE.MeshBasicMaterial({
            color: this.sideColor, // top
            fog: true,
        });

        let spine = new THREE.Group();
        for (let i = 0; i < 4; i++) {

            let textureA = this.cardImages[(i + offset) % 4];
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
                // picture.visible = false;
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
            this.innerSpine.visible = true;
        }
        // outer spine
        if (cameraPosition >= Utils.locationInSong(0, 12, 0) - 0.1) {
            this.outerSpine.visible = true;
            if (cameraPosition >= Utils.locationInSong(36, 0, 0) - 0.1) {
                this.outerSpine.rotation.x += .005 * fpsAdjustment;
            }
        }
        this.outerCards.forEach(card => {
            // card.end.position.z = Math.sin((card.end.position.x + this.clock.eighthsFraction) * Math.PI / 4) * 2 + 9;
            // card.center.position.x = -2 * this.clock.eighthsFraction;
        });
        let effectIndex = this.clock.bar % 4;
        // if (this.clock.eighthsFraction >= 32.5) {
        this.innerCards.forEach(card => {
            // if (cameraPosition >= Utils.locationInSong(1, 0, 0) - 0.1) {
            //     card.picture.visible = true;
            // }
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

            // mesh.position.x -= .1;
        });
        // }
    }

}

export default TunnelSection;