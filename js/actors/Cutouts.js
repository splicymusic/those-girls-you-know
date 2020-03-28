import * as THREE from "../../lib/three/build/three.module.js";
import * as Utils from "../Utils.js";
import Actor from "./Actor.js";


class Cutouts extends Actor {

    constructor(scene, clock, loader) {
        super(scene, clock, loader);

        let texture = loader.girls["images/girls/Carrie Fisher/main.png"];
        // let texture = loader.load('images/girls/Diana Ross/1.png');
        // let texture = loader.load('images/those-girls.png');
        // let texture = loader.load('images/girls/Catherine Bach/1.png');
        texture.minFilter = THREE.LinearFilter;
        let material = new THREE.MeshLambertMaterial({
            map: texture,
            fog: true,
            side: THREE.DoubleSide,
            transparent: true
        });
        // preserve ratio
        let scale = 5;
        let geometry = new THREE.PlaneGeometry(scale * texture.image.width / texture.image.height, scale); // Stevie
        // let geometry = new THREE.PlaneGeometry(scale * 500 / 371, scale); // those girls
        // let geometry = new THREE.PlaneGeometry(scale * 570 / 799, scale); // diana
        // let geometry = new THREE.PlaneGeometry(scale * 374 / 684, scale); // catharine
        for (let i = 0; i < 16; i++) {
            let mesh = new THREE.Mesh(geometry, material);
            let loc = Utils.locationInSong(1 + Math.floor(i / 2), i % 2 * 2, 0);
            // // let loc = Utils.locationInSong(1 + i/2, 0, 0);
            // if (i % 2 === 1) {
            //     loc = Utils.locationInSong(1 + Math.floor(i/2), i % 2 * 2, 0);
            // }
            //
            mesh.position.set(loc, 0, .5);
            mesh.rotation.y = -Math.PI / 2;
            mesh.rotation.x = Math.PI / 2;
            mesh.receiveShadow = false;
            mesh.castShadow = false;
            scene.add(mesh);
        }

    }



    update(cameraPosition) {

    }

}

export default Cutouts;