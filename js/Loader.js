import * as THREE from "../lib/three/build/three.module.js";

class Loader {

    constructor(callback, loadingManager) {
        this.loader = new THREE.TextureLoader(loadingManager);
        let imageList = [];

        let names = [
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
            "Dolly Parton",
            "Pam Grier",
            "Raquel Welch",
            "Sally Field",
            "Stevie Nicks",
            "Susan Dey",
        ];
        this.names = names;
        this.pushImages(imageList, "images/girls/", names);



        let names2 = [
            "Lola Falana",
            "Victoria Principal",
            "Jacqueline Bisett",
            "Jane Seymour",
            "Cybill Shepherd",
        ];
        this.names2 = names2;
        this.pushImages(imageList, "images/girls2/", names2);


        imageList.push("images/title card.png");

        this.emojis = [
            "images/emoji/beating-heart.png",
            "images/emoji/blue-heart.png",
            "images/emoji/butterfly.png",
            "images/emoji/cloud.png",
            "images/emoji/daffodil.png",
            "images/emoji/growing-heart.png",
            "images/emoji/heart-eyes.png",
            "images/emoji/high-heel.png",
            "images/emoji/kiss.png",
            "images/emoji/lips.png",
            "images/emoji/orange-heart.png",
            "images/emoji/pink-bow.png",
            "images/emoji/pink-flower.png",
            "images/emoji/purple-heart.png",
            "images/emoji/rocket.png",
            "images/emoji/sparkle-heart.png",
            "images/emoji/star.png",
            "images/emoji/sun.png",
            "images/emoji/ufo.png"
        ];
        imageList = imageList.concat(this.emojis);

        this.happyEmoji = [
            "images/emoji/beating-heart.png",
            "images/emoji/blue-heart.png",
            "images/emoji/butterfly.png",
            "images/emoji/daffodil.png",
            "images/emoji/growing-heart.png",
            "images/emoji/heart-eyes.png",
            "images/emoji/kiss.png",
            "images/emoji/orange-heart.png",
            "images/emoji/pink-bow.png",
            "images/emoji/pink-flower.png",
            "images/emoji/purple-heart.png",
            "images/emoji/sparkle-heart.png",
            "images/emoji/star.png",
            "images/emoji/sun.png"
        ];

        imageList.push("images/rainbow.png");
        imageList.push("images/sunrise.png");
        imageList.push("images/sunset.png");
        imageList.push("images/blank.png");
        imageList.push("images/mom/IMG_0066.JPG");
        this.imageList = imageList;
        this.images = {};
        this.index = 0;

        let self = this;
        imageList.forEach(imagePath => {
            this.loader.load(imagePath, function(texture) {
                texture.minFilter = THREE.LinearFilter;
                self.images[imagePath] = texture;
                self.index += 1;
                // console.log(imagePath);
                if (self.index === self.imageList.length) {
                    callback();
                }
            });
        });

    }

    getSize() {
        return this.imageList.length;
    }

    pushImages(imageList, path, names) {
        for (let i = 0; i < names.length; i++) {
            let girl = names[i];
            for (let j = 1; j <= 4; j++) {
                imageList.push(path + girl + "/" + j + ".jpg");
            }
        }
        for (let i = 0; i < names.length; i++) {
            let girl = names[i];
            imageList.push(path + girl + "/main.png")
        }
    }

    get(path) {
        return this.images[path];
    }

    getPlane(path, scale) {
        let texture = this.get(path);
        let material = new THREE.MeshLambertMaterial({
            map: texture,
            fog: true,
            side: THREE.DoubleSide,
            transparent: true
        });
        // preserve ratio
        let geometry = new THREE.PlaneGeometry(scale * texture.image.width / texture.image.height, scale);
        let mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.y = -Math.PI / 2;
        mesh.rotation.x = Math.PI / 2;
        mesh.receiveShadow = false;
        mesh.castShadow = false;
        return mesh;
    }

}

export default Loader;