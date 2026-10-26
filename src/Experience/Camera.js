import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {Experience} from './Experience.js';
export class Camera {
    constructor() {
        this.experience = Experience.getinstance();
        this.init();
        this.setOrbitControls();
    }
    init() {
        this.instance = new THREE.PerspectiveCamera(35, this.experience.sizes.aspect, 0.1, 1000);
        this.instance.position.set(18.10875104373519,2.1473161807098924,0.2723393809564907);
        
    }
    setOrbitControls() {
        this.controls = new OrbitControls(this.instance, this.experience.canvasElement);
        this.controls.enableDamping = true;
        this.controls.target.set(0,0,0
);
    }
    resize() {
        this.instance.aspect = this.experience.sizes.aspect;
        this.instance.updateProjectionMatrix();
    }
    update() {
        console.log(this.instance.position);
        this.controls.update();
    }
}