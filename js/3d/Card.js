import * as THREE from "../../lib/three/build/three.module.js";

class Card {

    constructor(texture) {
        texture.minFilter = THREE.LinearFilter;
        let faceMaterial = new THREE.MeshBasicMaterial({
            map: texture, //left
            fog: true,
        });
        let edgeColor = 0x85C1E9;
        let edgeMaterial = new THREE.MeshBasicMaterial({
            color: edgeColor, // top
            fog: true,
        });

        let cubeMaterial = [
            faceMaterial, // left
            faceMaterial, // right
            edgeMaterial, //top
            edgeMaterial, //bottom
            edgeMaterial, //front
            edgeMaterial, //back
        ];

        let scale = 2;
        let geometry = new THREE.BoxBufferGeometry(.1, scale, scale * texture.image.width / texture.image.height);
        let mesh = new THREE.Mesh(geometry, cubeMaterial);
        mesh.rotation.x = Math.PI / 2;
        this.object = mesh;

    }
}

export default Card;