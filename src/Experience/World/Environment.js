import * as THREE from 'three/webgpu';
import { Experience } from '../Experience.js';

export class Environment {
    constructor() {
        this.experience = Experience.getinstance();
        this.chadcafe = this.experience.resources.chadcafe;

        this.init();
    }

    init() {
        this.ambientLight = new THREE.AmbientLight('#ffffff', 1);
        this.experience.scene.add(this.ambientLight);

        this.sunLight = new THREE.DirectionalLight('#ffffff', 3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(5, 12, -3);

        const lightHelper = new THREE.DirectionalLightHelper(this.sunLight, 15);
        this.experience.scene.add(lightHelper);

        this.experience.scene.add(this.sunLight);
    }

    update() {
    }

    resize() {
    }
}