import * as THREE from "../../lib/three/build/three.module.js";
import * as Utils from "../Utils.js";
import Actor from "./Actor.js";


class Balls extends Actor {

    constructor(scene, clock, loader) {
        super(scene, clock, loader);
        let shinyMaterial = new THREE.MeshPhongMaterial({
            //color: 0x95D1F9,
            color: 0x000044,
            // roughness: 1,
            reflectivity: 1,
            flatShading: true
        });

        // this. materials = [
        //     new THREE.MeshPhongMaterial({
        //         //color: 0x95D1F9,
        //         color: 0x00FF00,
        //         // roughness: 1,
        //         reflectivity: 1,
        //         flatShading: true
        //     }),
        //     new THREE.MeshPhongMaterial({
        //         //color: 0x95D1F9,
        //         color: 0xFF0000,
        //         // roughness: 1,
        //         reflectivity: 1,
        //         flatShading: true
        //     }),
        //     new THREE.MeshPhongMaterial({
        //         //color: 0x95D1F9,
        //         color: 0x0000FF,
        //         // roughness: 1,
        //         reflectivity: 1,
        //         flatShading: true
        //     }),
        //     new THREE.MeshPhongMaterial({
        //         //color: 0x95D1F9,
        //         color: 0xFF00FF,
        //         // roughness: 1,
        //         reflectivity: 1,
        //         flatShading: true
        //     }),
        //     new THREE.MeshPhongMaterial({
        //         //color: 0x95D1F9,
        //         color: 0x00FFfF,
        //         // roughness: 1,
        //         reflectivity: 1,
        //         flatShading: true
        //     })
        // ];

        this.materials = [];
        let maxColors = 16;
        for (let i = 0; i < maxColors; i++) {
            let hue = Math.floor(i / maxColors * 255);
            let color = new THREE.Color("hsl(" + hue + ", 100%, 70%)");
            let material = new THREE.MeshPhongMaterial({
                color: color,
                reflectivity: 1,
                flatShading: true
            });
            this.materials.push(material);
        }

        let arenaSize = 50;
        let canyonWidth = 4;
        let leftBound = -canyonWidth;
        let rightBound = canyonWidth;
        let pathOffset = 2;
        let xLoc = Utils.locationInSong(0, 30, 0);
        this.xLoc = xLoc;
        let buildings = [];
        let group = new THREE.Group();
        for (let i = 0; i < 200; i++) {
            let cubeX = Utils.randomInt(arenaSize) + xLoc;
            let cubeY = Utils.randomInt(arenaSize) - arenaSize / 2;
            if (cubeY > leftBound && cubeY < rightBound) continue;
            let radius = Math.random() + 0.5;
            let geometry = new THREE.SphereBufferGeometry(radius, 32, 32);
            let building = new THREE.Mesh(geometry, shinyMaterial);

            building.position.x = cubeX;
            building.position.y = cubeY;
            building.position.z = -pathOffset;
            // building.position.z = height / 2 - pathOffset;
            buildings.push(building);
            group.add(building);
        }
        this.buildings = buildings;

        // base
        let baseMaterial = new THREE.MeshBasicMaterial({
            color: 0xc1b3d7,
            // color: 0x000044,
            // roughness: 1,
            flatShading: true,
            transparent: true,
            opacity: 0.5
        });
        let baseBox = new THREE.BoxGeometry(arenaSize, arenaSize, 50);
        let base = new THREE.Mesh(baseBox, baseMaterial);
        base.position.set(xLoc + arenaSize / 2, 0, 50 / -2 - pathOffset - 0.01);
        // group.add(base);

        group.visible = false;
        this.group = group;
        scene.add(group);
    }


    update(cameraPosition, fpsAdjustment) {
        if (cameraPosition > Utils.locationInSong(0, 20, 0) - 0.1) {
            this.group.visible = true;
            if (this.clock.isNewQuarter) {
                this.buildings.forEach(building => {
                    let number = Math.round(building.position.x / 16 + this.clock.eigth);
                    let index = number % this.materials.length;
                    building.material = this.materials[index];
                    //building.material = this.materials[Utils.randomInt(this.materials.length)];
                });
            }
        }
        this.buildings.forEach(building => {
            building.position.z = Math.sin((building.position.y + this.clock.eighthsFraction) * Math.PI / 4) * 8 - 2;
        });

    }

}

export default Balls;