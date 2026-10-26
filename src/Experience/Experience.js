import * as THREE from 'three/webgpu';
import { Time } from './Utils/Time.js';
import { Sizes } from './Utils/Sizes.js';
import {Camera} from './Camera.js';
import {Renderer} from './Renderer.js';
import {World} from './World/World.js';
import {Resources} from './Utils/Resources.js';
export class Experience {
    static getinstance(){
        return Experience.instance;
    };
    constructor() {
        if (Experience.instance) {
            return Experience.instance;
        }
        Experience.instance = this;
        this.init();
    }
    async init() {
        this.canvasElement = document.getElementById('experience-canvas');
        console.log(this);
    

        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes= new Sizes();
        this.camera= new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources();
        this.world = new World();

        await this.renderer.init();

        this.time.on('update', () => {this.update()});
        this.sizes.on('resize', () => {this.resize()});
    }

    resize() {
        this.camera.resize();
        this.renderer.resize();
    }    
    update() {
    this.renderer.update();
    this.camera.update();
    }
}