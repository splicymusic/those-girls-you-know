import * as THREE from "../../lib/three/build/three.module.js";
import * as Utils from "../Utils.js";
import Actor from "./Actor.js";


class Sky extends Actor {

    constructor(scene, clock, loader) {
        super(scene, clock, loader);

        this.black = new THREE.Color('black');
        this.skyBlue = new THREE.Color(0x85C1E9);
        this.orange = new THREE.Color('orange');
        this.purple = new THREE.Color('purple');
        this.white = new THREE.Color('white');


        this.lightFog =  new THREE.FogExp2(0xDDDDFF, 0.05);
        this.blackFog = new THREE.FogExp2(0x000000, 0.05);
        this.colors = [];
        this.darks = [];
        this.fogs = [];
        let maxColors = 256;
        for (let i = 0; i < maxColors; i++) {
            let hue = Math.floor(i / maxColors * 255);
            let color = new THREE.Color("hsl(" + hue + ", 100%, 70%)");
            this.colors.push(color);
            this.fogs.push(new THREE.FogExp2(color, 0.05));
            let dark = new THREE.Color("hsl(" + hue + ", 100%, 10%)");
            this.darks.push(dark);
        }
        this.scene.background = this.skyBlue;
        this.scene.fog = this.lightFog
        this.scene.color = 0xFFFFFF;

    }


    update(cameraPosition, fpsAdjustment) {
        // TODO: WARNING this code hits FPS pretty hard
        // NOTE: FPS hit not as bad when not an outer tunnel

        if (cameraPosition >= Utils.locationInSong(0, 20, 0)) {
            this.scene.background = this.skyBlue;
        }

        // solo
        if (cameraPosition >= Utils.locationInSong(0, 26, 0) - 0.1) {
            this.scene.background = this.skyBlue;
        }

        if (cameraPosition >= Utils.locationInSong(0, 30, 0) - 0.1) {
            this.scene.background = this.black;
            if (this.clock.isNewQuarter) {
                this.scene.fog = this.fogs[Utils.randomInt(this.fogs.length)];
            }
        }

        // calm before the storm
        if (cameraPosition >= Utils.locationInSong(0, 36, 0) - 0.1) {
            this.scene.fog = this.lightFog;
            this.scene.background = this.black;
        }

        if (cameraPosition >= Utils.locationInSong(0, 38, 0) - 0.1) {
            this.scene.fog = this.blackFog;
        }

        // bass comes in
        if (cameraPosition >= Utils.locationInSong(0, 39.5, 0)) {
            let cosIndex = this.getIndex(false, 2);
            this.scene.fog = this.fogs[cosIndex];
        }

        // finale
        let sinIndex = this.getIndex(true, 8);
        if (cameraPosition >= Utils.locationInSong(0, 40, 0)) {
            this.scene.background = this.colors[sinIndex];
        }

        if (cameraPosition >= Utils.locationInSong(0, 41, 0)) {
            this.scene.background = this.darks[sinIndex];
        }

        if (cameraPosition >= Utils.locationInSong(0, 42, 0)) {
            this.scene.background = this.colors[sinIndex];
        }

        if (cameraPosition >= Utils.locationInSong(0, 43, 0)) {
            this.scene.background = this.darks[sinIndex];
        }

        if (cameraPosition >= Utils.locationInSong(0, 44, 0)) {
            this.scene.background = this.colors[sinIndex];
        }

        if (cameraPosition >= Utils.locationInSong(0, 45, 0)) {
            this.scene.background = this.darks[sinIndex];
        }
        if (cameraPosition >= Utils.locationInSong(0, 46, 0)) {
            this.scene.background = this.colors[sinIndex];
        }

        if (cameraPosition >= Utils.locationInSong(0, 47, 0)) {
            let sinIndex = this.getIndex(true, 2);
            this.scene.background = this.colors[sinIndex];
        }

        if (cameraPosition >= Utils.locationInSong(0, 48, 0)) {
            this.scene.background = this.black;
        }


    }

    getIndex(isSin, rate) {
        let transform = null;
        if (isSin) {
            transform = Math.sin(this.clock.quarterFraction * Math.PI * 2);
        } else {
            transform = Math.cos(this.clock.quarterFraction * Math.PI * 2);
        }
        let index = Math.round((transform + 1) / rate * this.colors.length);
        let max = this.colors.length - 1;
        return Math.min(index, max);
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