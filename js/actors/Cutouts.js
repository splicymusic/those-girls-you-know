import * as THREE from "../../lib/three/build/three.module.js";
import * as Utils from "../Utils.js";
import Actor from "./Actor.js";


class Cutouts extends Actor {

    constructor(scene, clock, loader) {
        super(scene, clock, loader);

        let cutouts = [
            "images/title card.png",
            ];

        let girls = [
            "Barbi Benton",
            "Bo Derek",
            "Carrie Fisher",
            "Catherine Bach",
            "Charo",
            "Debbie Harry",
            "Diana Ross",
            "Faye Dunaway",
            "Jayne Kennedy",
            "Lynda Carter",
            "Michelle Pfeiffer",
            "Pam Grier",
            "Raquel Welch",
            "Sally Field",
            "Stevie Nicks",
            "Susan Dey",
        ];
        for (let i = 0; i < girls.length; i++) {
            let girl = girls[i];
                cutouts.push("images/girls/" + girl + "/main.png");
        }

        let scale = 4;

        for (let i = 0; i < 18; i++) {
            let texture = loader.images[cutouts[i % cutouts.length]];
            let material = new THREE.MeshLambertMaterial({
                map: texture,
                fog: true,
                side: THREE.DoubleSide,
                transparent: true
            });
            // preserve ratio
            console.log(cutouts[i % cutouts.length]);
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