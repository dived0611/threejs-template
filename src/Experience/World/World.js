import * as THREE from 'three/webgpu';
import {Experience} from '../Experience.js';
import {ChadeCafe} from './ChadeCafe.js';
import {Environment} from './Environment.js';
export class World {
    constructor() {
        this.experience = Experience.getinstance();
       this.experience.resources.on('ready', () => {
        this.chadcafe = new ChadeCafe();
        this.environment = new Environment();
       })


        this.init();
    }
    init() {

    }
    update() {
        
    }
    resize() {

    }
}