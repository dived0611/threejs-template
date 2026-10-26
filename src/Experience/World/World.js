import * as THREE from 'three/webgpu';
import {Experience} from '../Experience.js';
export class World {
    constructor() {
        this.experience = Experience.getinstance();
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        this.experience.scene.add( cube );
        this.init();
    }
    init() {

    }
    update() {
        
    }
    resize() {

    }
}