import * as THREE from "../../lib/three/build/three.module.js";
import * as Utils from "../Utils.js";
import Actor from "./Actor.js";


class Sky extends Actor {

    constructor(scene, clock, loader) {
        super(scene, clock, loader);
        this.scene.background = new THREE.Color(0x85C1E9);
        this.scene.fog = new THREE.FogExp2('white', 0.05);
        this.colors = [];
        this.fogs = [];
        let maxColors = 255;
        for (let i = 0; i < maxColors; i++) {
            let hue = Math.floor(i / maxColors * 255);
            let color = new THREE.Color("hsl(" + hue + ", 100%, 70%)");
            this.colors.push(color);
            this.fogs.push(new THREE.FogExp2(color, 0.05));
        }
        scene.color = 0xFFFFFF;
        this.black = new THREE.Color('black');
        this.skyBlue = new THREE.Color(0x85C1E9);
    }


    update(cameraPosition, fpsAdjustment) {
        // TODO: WARNING this code hits FPS pretty hard

        if ( this.isBetween(16, 16 + 8) || this.isBetween(32, 40)) {
            // if (this.clock.frame % 16 === 0) {
                // if (this.isBetween(16.75, 17)) {
                //this.scene.background = new THREE.Color(0x85C1E9);

                let sinIndex = this.getIndex(true);
                let cosIndex = this.getIndex(false);

                // this.scene.background = this.colors[sinIndex];
                this.scene.background = this.black;
                this.scene.fog = this.fogs[cosIndex];
            // }
        } else {
            this.scene.background = new THREE.Color(0x85C1E9);
            this.scene.fog = new THREE.FogExp2('white', 0.05);
        }
    }

    getIndex(isSin) {
        let transform = null;
        if (isSin) {
            transform = Math.sin(this.clock.quarterFraction * Math.PI * 2);
        } else {
            transform = Math.cos(this.clock.quarterFraction * Math.PI * 2);
        }
        return  Math.round((transform + 1) / 2 * this.colors.length);
    }

    // getColor(isSin) {
    //     let transform = null;
    //     if (isSin) {
    //         transform = Math.sin(this.clock.quarterFraction * Math.PI * 2);
    //     } else {
    //         transform = Math.cos(this.clock.quarterFraction * Math.PI * 2);
    //     }
    //
    //     let hue = Math.round((transform + 1) / 2 * 255);
    //     return new THREE.Color("hsl(" + hue + ", 100%, 70%)");
    // }

    isBetween(a, b) {
        return this.clock.quarterFraction >= a && this.clock.quarterFraction < b;
    }

}

export default Sky;