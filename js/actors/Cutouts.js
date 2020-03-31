import * as THREE from "../../lib/three/build/three.module.js";
import * as Utils from "../Utils.js";
import Actor from "./Actor.js";


class Cutouts extends Actor {

    constructor(scene, clock, loader) {
        super(scene, clock, loader);

        let cutouts = [
            "images/title card.png",
            "images/girls/Barbi Benton/main.png",
            "images/girls/Charo/charo.png",
            "images/girls/Pam Grier/main.png",
            "images/girls/Catherine Bach/main.png",
            "images/girls/Stevie Nicks/main.png",
            "images/girls/Carrie Fisher/main.png",
            "images/girls/Diana Ross/1.png",
        ];

        let scale = 4;

        for (let i = 0; i < 23; i++) {
            let texture = loader.images[cutouts[i % cutouts.length]];
            let material = new THREE.MeshLambertMaterial({
                map: texture,
                fog: true,
                side: THREE.DoubleSide,
                transparent: true
            });
            // preserve ratio
            let geometry = new THREE.PlaneGeometry(scale * texture.image.width / texture.image.height, scale);
            let mesh = new THREE.Mesh(geometry, material);
            // let loc = Utils.locationInSong(1, 0, i );
            // mesh.position.set(loc, Math.random() * 10 - 5, 0);
            let loc = Utils.locationInSong(1 + Math.floor(i / 2), i % 2 * 2, 0);
            mesh.position.set(loc, 0, 0);
            mesh.rotation.y = -Math.PI / 2;
            mesh.rotation.x = Math.PI / 2;
            mesh.receiveShadow = false;
            mesh.castShadow = false;
            scene.add(mesh);
        }

    }



    update(cameraPosition, fpsAdjustment) {

    }

}

export default Cutouts;