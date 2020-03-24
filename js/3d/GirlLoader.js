import * as THREE from "../../lib/three/build/three.module.js";

class GirlLoader {

    constructor(callback) {
        this.loader = new THREE.TextureLoader();
        this.array = [
            "images/girls/Bo Derek/Bo Derek.jpg",
            "images/girls/Barbi Benton/1.jpg",
            "images/girls/Barbi Benton/2.jpg",
            "images/girls/Barbi Benton/3.jpg"
        ];
        this.girls = {};
        this.index = 0;
        this.loadGirl(callback);
    }


    // loads an image then calls itself.
    // if no more images to load, callback is called
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

export default GirlLoader;