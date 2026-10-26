// @ts-ignore three/webgpu currently has no declaration file.
import * as THREE from 'three/webgpu';
import {Experience} from './Experience.js';
export class Renderer {
    constructor() {
        this.experience = Experience.getinstance();
        this.init();
    }
async init() {
    this.renderer = new THREE.WebGPURenderer({
        canvas: this.experience.canvasElement,
        antialias: true,
    });
    await this.renderer.init();


    this.renderer.setSize(this.experience.sizes.width, this.experience.sizes.height);
    this.renderer.setPixelRatio(this.experience.sizes.pixelRatio);
    this.renderer.toneMapping = THREE.CineonToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
}

    resize() {
this.renderer.setSize(this.experience.sizes.width, this.experience.sizes.height);
    this.renderer.setPixelRatio(this.experience.sizes.pixelRatio);
    }
    update() {
        this.renderer.render(this.experience.scene, this.experience.camera.instance);
    }
}