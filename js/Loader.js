import * as THREE from "../lib/three/build/three.module.js";

class Loader {

    constructor(callback) {
        this.loader = new THREE.TextureLoader();
        this.imageList = [

            "images/girls/Charo/1.jpg",
            "images/girls/Charo/2.jpg",
            "images/girls/Charo/3.jpg",
            "images/girls/Charo/4.jpg",
            // "images/girls/Bo Derek/Bo Derek.jpg",
            "images/girls/Barbi Benton/1.jpg",
            "images/girls/Barbi Benton/2.jpg",
            "images/girls/Barbi Benton/3.jpg",
            // "images/girls/Barbi Benton/4.jpg",
            "images/girls/Barbi Benton/5.jpg",

            "images/girls/Catherine Bach/1.jpg",
            "images/girls/Catherine Bach/2.jpg",
            "images/girls/Catherine Bach/3.jpg",
            "images/girls/Catherine Bach/4.png",

            // "images/girls/Catherine Bach/5.jpg",
            // "images/girls/Candice Bergen/1.jpg",
            // "images/girls/Candice Bergen/2.jpg",
            // "images/girls/Candice Bergen/3.jpg",
            // "images/girls/Candice Bergen/4.jpg",
            // "images/girls/Candice Bergen/5.jpg",



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

            "images/girls/Catherine Bach/main.png",
            "images/girls/Barbi Benton/main.png",
            "images/girls/Charo/charo.png",
            "images/girls/Stevie Nicks/main.png",
            "images/girls/Carrie Fisher/main.png",
            "images/girls/Diana Ross/1.png",
            "images/girls/Pam Grier/main.png",
            "images/title card.png",
        ];
        this.images = {};
        this.index = 0;
        this.loadGirl(callback);
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