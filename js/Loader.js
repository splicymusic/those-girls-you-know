import * as THREE from "../lib/three/build/three.module.js";

class Loader {

    constructor(callback) {
        this.loader = new THREE.TextureLoader();
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
            "Michelle Pfeiffer",
            "Pam Grier",
            "Raquel Welch",
            "Sally Field",
            "Stevie Nicks",
            "Susan Dey",
        ];
        this.names = names;
        let imageList = [];
        for (let i = 0; i < names.length; i++) {
            let girl = names[i];
            for (let j = 1; j <= 4; j++) {
                imageList.push("images/girls/" + girl + "/" + j + ".jpg");
            }
        }
        for (let i = 0; i < names.length; i++) {
            let girl = names[i];
            imageList.push("images/girls/" + girl + "/main.png")
        }
        imageList.push("images/title card.png");
        this.imageList = imageList;
        /*
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
            "images/makeup/mascara2.png",
         */

        this.images = {};
        this.index = 0;
        this.loadGirl(callback);
    }

    get(path) {
        return this.images[path];
    }


    // loads an image then calls itself.
    // if no more images to load, callback is called.
    // Probably a good async way to do this, but no time to learn that right now!
    loadGirl(callback) {

        if (this.index < this.imageList.length) {
            let path = this.imageList[this.index];
            let self = this;
            this.loader.load(path, function(texture) {
                texture.minFilter = THREE.LinearFilter;
                console.log("loaded: " + path + " (" + texture.image.width + "x" + texture.image.height + ")");
                self.images[path] = texture;
                self.loadGirl(callback);
            });
            this.index++;
        } else {
            callback();
        }
    }

}

export default Loader;