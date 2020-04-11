import * as THREE from "../../../lib/three/build/three.module.js";
import * as Utils from "../../Utils.js";
import Actor from "../Actor.js";
import Card from "./Card.js";


class TunnelSection extends Actor {

    constructor(scene, clock, loader, girl, xPos) {
        super(scene, clock, loader);

        let config = {
            xPos: 0,
            isGirl: true,
            visibleAt: 0,
            outer: {
                exists: true,
                isEmoji: false,
                isRotatingOnSpine: false,
                isOscilating: false,
                isFlipping: true
            },
            inner: {
                exists: true,
                isEmoji: true,
                isRotatingOnSpine: false,
                isOscilating: false,
                isFlipping: true
            }
        };
        this.config = config;


        // loading girlImages
        let girlImages = [];
        if (config.isGirl) {
            for (let j = 1; j <= 4; j++) {
                let image = loader.get("images/girls/" + girl + "/" + j + ".jpg");
                girlImages.push(image);
            }
        }
        this.girlImages = girlImages;

        // loading emoji paths
        let emojiPaths = [];
        if (config.outer.isEmoji || config.inner.isEmoji) {
            for (let j = 1; j <= 4; j++) {
                let imagePath = loader.happyEmoji[Utils.randomInt(loader.happyEmoji.length)];
                emojiPaths.push(imagePath);
            }
        }
        this.emojiPaths = emojiPaths;

        let mainImage = loader.get("images/girls/" + girl + "/main.png");



        this.mainImage = mainImage;
        // random color
        this.sideColor = new THREE.Color("hsl(" + Utils.randomInt(255) + ", 100%, 50%)");

        this.innerCards = [];
        this.outerCards = [];
        this.innerSpine = this.createSpiral(this.innerCards, 5, xPos, 2, 0, true);
        this.outerSpine = this.createSpiral(this.outerCards, 9, xPos + Utils.locationInSong(0, 0, 2), 3, 0, false);
    }

    createSpiral(cards, radius, startX, scale, offset, isEmoji) {

        let edgeMaterial = new THREE.MeshBasicMaterial({
            color: this.sideColor, // top
            fog: true,
        });

        let spine = new THREE.Group();
        for (let i = 0; i < 4; i++) {

            let textureA = this.girlImages[(i + offset) % 4];
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
                    let path = this.emojiPaths[(i + offset) % 4];
                    picture = this.loader.getPlane(path, scale);
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
        // hiding at beginning
        if (cameraPosition >= Utils.locationInSong(1, 0, 0) - 0.1) {
            this.innerSpine.visible = true;
        }

        // outer cards
        if (cameraPosition >= Utils.locationInSong(0, 12, 0) - 0.1) {
            this.outerSpine.visible = true;
            if (cameraPosition >= Utils.locationInSong(36, 0, 0) - 0.1) {
                this.outerSpine.rotation.x += .005 * fpsAdjustment;
            }
        }
        this.outerCards.forEach(card => {
            this.outerSpine.visible = false;
            let a = Utils.locationInSong(0, 40, 0) - 0.1;
            let b = Utils.locationInSong(0, 42, 0) - 0.1;
            let c = Utils.locationInSong(0, 44, 0) - 0.1;
            let d = Utils.locationInSong(0, 46, 0) - 0.1;
            if (cameraPosition >= a && cameraPosition < b) {
                card.end.position.z = Math.sin((card.end.position.x + this.clock.eighthsFraction) * Math.PI / 4) * 2 + 9;
            }
            if (cameraPosition >= b && cameraPosition < c) {
                card.end.position.z = 9
            }
            if (cameraPosition >= c && cameraPosition < d) {
                card.end.position.z = Math.sin((card.end.position.x + this.clock.eighthsFraction) * Math.PI / 4) * 2 + 9;
            }
            if (cameraPosition > d) {
                card.end.position.z = 9
            }
        });


        // inner cards
        let effectIndex = this.clock.bar % 2;
        this.innerCards.forEach(card => {

            if (effectIndex === 0) {
                card.picture.rotateOnAxis(new THREE.Vector3(0, 0, 1), -1 * Math.PI / 180 * fpsAdjustment);
            }
            if (effectIndex === 1) {
                card.picture.rotateOnAxis(new THREE.Vector3(0, 1, 0), -1 * Math.PI / 180 * fpsAdjustment);
                // mesh.translateY(Math.sin(clock.eighthsFraction + mesh.position.x) / 16);
            }
            if (effectIndex === 2) {
                // card.picture.translateY(Math.sin(this.clock.eighthsFraction + card.picture.position.x) / 16);
            }

            // mesh.position.x -= .1;
        });
        // }
    }

}

export default TunnelSection;