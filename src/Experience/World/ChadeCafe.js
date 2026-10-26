import * as THREE from 'three/webgpu';
import {Experience} from '../Experience.js';
export class ChadeCafe {
    constructor() {
        this.experience = Experience.getinstance();

        this.chadcafe = this.experience.resources.items.chadcafe.scene;


        this.init();
    }
    init() {
        this.experience.scene.add(this.chadcafe);
    }
    update() {
        
    }
    resize() {

    }
}