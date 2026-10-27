import * as THREE from 'three/webgpu';
import {Experience} from '../Experience.js';
export class ChadeCafe {
    constructor() {
        this.experience = Experience.getinstance();

        this.chadcafe = this.experience.resources.items.chadcafe.scene;


        this.init();
    }
    init() {
        // this.experience.scene.add(this.chadcafe);
        this.initCafe();
        this.initPlane();
        this.initBgOrb();
    }
    initCafe() {
        this.experience.scene.add(this.chadcafe);
    }
    initPlane() {
        const geometry = new THREE.PlaneGeometry( 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.FrontSide } );
        const plane = new THREE.Mesh( geometry, material );
        this.experience.scene.add(plane);

    }    
    initBgOrb() {
        // const geometry = new THREE.SphereGeometry( 40, 32, 16 );
        // const material = new THREE.MeshBasicMaterial( { color: 0xffff00,side: THREE.BackSide } );
        // const sphere = new THREE.Mesh( geometry, material );
        // this.experience.scene.add( sphere );
    }
        
    update() {
        
    }
    resize() {

    }
}