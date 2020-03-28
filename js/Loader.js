import * as THREE from "../lib/three/build/three.module.js";

class Loader {

    constructor(callback) {
        this.loader = new THREE.TextureLoader();
        this.array = [
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
            "images/girls/Candice Bergen/1.jpg",
            "images/girls/Candice Bergen/2.jpg",
            "images/girls/Candice Bergen/3.jpg",
            "images/girls/Candice Bergen/4.jpg",
            // "images/girls/Candice Bergen/5.jpg",
            "images/girls/Stevie Nicks/main.png",
            "images/girls/Carrie Fisher/main.png",
        ];
        this.girls = {};
        this.index = 0;
        this.loadGirl(callback);
    }


    // loads an image then calls itself.
    // if no more images to load, callback is called.
    // Probably a good async way to do this, but no time to learn that right now!
    loadGirl(callback) {

        if (this.index < this.array.length) {
            let path = this.array[this.index];
            let self = this;
            this.loader.load(path, function(texture) {
                texture.minFilter = THREE.LinearFilter;
                console.log("loaded: " + path + " (" + texture.image.width + "x" + texture.image.height + ")");
                self.girls[path] = texture;
                self.loadGirl(callback);
            });
            this.index++;
        } else {
            callback();
        }
    }

}

export default Loader;