import * as THREE from "../../lib/three/build/three.module.js";
import * as Utils from "../Utils.js";
import Actor from "./Actor.js";


class Buildings extends Actor {

    constructor(scene, clock, loader) {
        super(scene, clock, loader);
        let shinyMaterial = new THREE.MeshPhongMaterial({
            color: 0x95D1F9,
            // color: 0x000044,
            // roughness: 1,
            reflectivity: 1,
            flatShading: true
        });

        this. materials = [
            shinyMaterial,
            new THREE.MeshPhongMaterial({
                //color: 0x95D1F9,
                color: 0x00FF00,
                // roughness: 1,
                reflectivity: 1,
                flatShading: true
            }),
            new THREE.MeshPhongMaterial({
                //color: 0x95D1F9,
                color: 0xFF0000,
                // roughness: 1,
                reflectivity: 1,
                flatShading: true
            }),
            new THREE.MeshPhongMaterial({
                //color: 0x95D1F9,
                color: 0x0000FF,
                // roughness: 1,
                reflectivity: 1,
                flatShading: true
            }),
            new THREE.MeshPhongMaterial({
                //color: 0x95D1F9,
                color: 0xFF00FF,
                // roughness: 1,
                reflectivity: 1,
                flatShading: true
            }),
            new THREE.MeshPhongMaterial({
                //color: 0x95D1F9,
                color: 0x00FFfF,
                // roughness: 1,
                reflectivity: 1,
                flatShading: true
            })
        ];

        let arenaSize = 50;
        let canyonWidth = 6;
        let leftBound = -canyonWidth;
        let rightBound = canyonWidth;
        let pathOffset = Utils.pathPosition();
        let xLoc = Utils.locationInSong(0,20,0);
        this.xLoc = xLoc;
        let buildings = [];
        let group = new THREE.Group();
        for (let i = 0; i < 200; i++) {
            let cubeX = Utils.randomInt(arenaSize) + xLoc;
            let cubeY = Utils.randomInt(arenaSize) - arenaSize / 2;
            if (cubeY > leftBound && cubeY < rightBound) continue;
            let height = Utils.randomInt(6) + 1;
            //let geometry = new THREE.BoxGeometry(1, 1, height);
            let geometry = new THREE.OctahedronBufferGeometry(1,0);
            geometry.scale(1, 1, height);
            let building = new THREE.Mesh(geometry, shinyMaterial);

            building.position.x = cubeX;
            building.position.y = cubeY;
            building.position.z =  pathOffset;
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
        base.position.set(xLoc + arenaSize / 2, 0, 50 / -2 + pathOffset - 0.01);
        group.add(base);

        group.visible = false;
        this.group = group;
        scene.add(group);
    }



    update(cameraPosition, fpsAdjustment) {
        if (cameraPosition > Utils.locationInSong(0, 20, 0) - 0.1) {
            this.group.visible = true;
            if (this.clock.isNewQuarter) {
                this.buildings.forEach(building => {
                    building.material = this.materials[Utils.randomInt(this.materials.length)];
                })
            }
        }
    }

}

export default Buildings;