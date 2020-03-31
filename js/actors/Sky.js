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

        this.scene.background = this.skyBlue;
        this.scene.fog = new THREE.FogExp2('white', 0.05);
        this.colors = [];
        this.darks = [];
        this.fogs = [];
        let maxColors = 255;
        for (let i = 0; i < maxColors; i++) {
            let hue = Math.floor(i / maxColors * 255);
            let color = new THREE.Color("hsl(" + hue + ", 100%, 70%)");
            this.colors.push(color);
            this.fogs.push(new THREE.FogExp2(color, 0.05));
            let dark = new THREE.Color("hsl(" + hue + ", 100%, 10%)");
            this.darks.push(dark);
        }
        scene.color = 0xFFFFFF;

        this.isStrobing = false;
    }


    update(cameraPosition, fpsAdjustment) {
        // TODO: WARNING this code hits FPS pretty hard
        // NOTE: FPS hit not as bad when not an outer tunnel

        if (cameraPosition >= Utils.locationInSong(0, 20, 0)) {
            this.scene.background = this.black;
        }

        // solo
        if (cameraPosition >= Utils.locationInSong(0, 26, 0)) {
            this.scene.background = this.white;
        }

        if (cameraPosition >= Utils.locationInSong(0, 30, 0)) {
            this.scene.background = this.black;
        }

        // calm before the storm
        if (cameraPosition >= Utils.locationInSong(0, 36, 0)) {
            this.scene.background = this.purple;
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
        return Math.round((transform + 1) / rate * this.colors.length);
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