import * as THREE from "../lib/three/build/three.module.js";

class Loader {

    constructor(callback) {
        this.loader = new THREE.TextureLoader();
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
            "Victoria Principal",
            "Jacqueline Bisett",
            "Lola Falana",
            "Jane Seymour",
            "Cybill Shepherd",
        ];
        this.names2 = names2;
        this.pushImages(imageList, "images/girls2/", names2);


        imageList.push("images/title card.png");

        this.makeup = [
            "images/makeup/ad1.jpg",
            "images/makeup/ad2.jpg",
            "images/makeup/ad3.jpg",
            "images/makeup/ad4.jpg",
            "images/makeup/brush.png",
            "images/makeup/brush2.png",
            "images/makeup/brush3.png",
            "images/makeup/lipstic1.png",
            "images/makeup/lipstic2.png",
            "images/makeup/mascara1.png",
            "images/makeup/mascara2.png"
        ];
        imageList = imageList.concat(this.makeup);

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
        imageList.push("images/sunset.png");
        imageList.push("images/blank.png");
        imageList.push("images/mom/IMG_0066.JPG");
        this.imageList = imageList;


        this.images = {};
        this.index = 0;
        this.loadImage(callback);
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


    // loads an image then calls itself.
    // if no more images to load, callback is called.
    // Probably a good async way to do this, but no time to learn that right now!
    loadImage(callback) {

        if (this.index < this.imageList.length) {
            let path = this.imageList[this.index];
            let self = this;
            this.loader.load(path, function(texture) {
                texture.minFilter = THREE.LinearFilter;
                console.log("loaded: " + path + " (" + texture.image.width + "x" + texture.image.height + ")");
                self.images[path] = texture;
                self.loadImage(callback);
            });
            this.index++;
        } else {
            callback();
        }
    }

}

export default Loader;