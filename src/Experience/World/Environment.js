import * as THREE from 'three/webgpu';
import { Experience } from '../Experience.js';

export class Environment {
    constructor() {
        this.experience = Experience.getinstance();
        this.chadcafe = this.experience.resources.chadcafe;

        this.debug = true; // set to false to hide helpers
        this.shadowsApplied = false;

        this.init();
        this.setupShadows();
    }

init() {
    // Soft base light: keep this moderate so shadows stay visible
    this.ambientLight = new THREE.AmbientLight('#fff2f2', 1);
    this.experience.scene.add(this.ambientLight);

    // Sky/ground fill light: brightens the scene naturally without flattening shadows
    this.hemiLight = new THREE.HemisphereLight('#ffffff', '#8a7f72',2.4);
    this.experience.scene.add(this.hemiLight);
    this.hemiLight.position.set(20, 2, 1);
    
    // this.hemiHelper = new THREE.HemisphereLightHelper(this.hemiLight, 1);
    this.experience.scene.add(this.hemiHelper);

    // Main sun: the strongest light, and the only one that casts shadows
    this.sunLight = new THREE.DirectionalLight('#ffffff', 5);
    this.sunLight.castShadow = true;
    this.sunLight.position.set(5, 18, -3);

    this.sunLight.target.position.set(0, 0, 3);
    this.experience.scene.add(this.sunLight.target);

    this.sunLight.shadow.mapSize.set(4096, 4096);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.shadow.bias = -0.0005;

    const cam = this.sunLight.shadow.camera;
    cam.left = -40;
    cam.right = 40;
    cam.top = 40;
    cam.bottom = -40;
    cam.near = 0.5;
    cam.far = 100;
    cam.updateProjectionMatrix();

    this.experience.scene.add(this.sunLight);

    if (this.debug) {
        this.shadowCameraHelper = new THREE.CameraHelper(cam);
        this.experience.scene.add(this.shadowCameraHelper);

        this.lightHelper = new THREE.DirectionalLightHelper(this.sunLight, 15);
        this.experience.scene.add(this.lightHelper);
    }
}

    setupShadows() {
        // Traverse the real scene, so it works even if the model was cloned
        let meshCount = 0;
        const materialTypes = new Set();

        this.experience.scene.traverse((child) => {
            if (!child.isMesh) return;
            meshCount++;

            child.castShadow = true;
            child.receiveShadow = true;

            const mats = Array.isArray(child.material) ? child.material : [child.material];
            const converted = mats.map((mat) => {
                materialTypes.add(mat.type);

                // Unlit materials can't show shadows, so swap them for a lit one
                if (mat.isMeshBasicMaterial || mat.type === 'MeshBasicNodeMaterial') {
                    const lit = new THREE.MeshLambertMaterial({
                        map: mat.map,
                        color: mat.color,
                        transparent: mat.transparent,
                        opacity: mat.opacity,
                        alphaTest: mat.alphaTest,
                        side: mat.side,
                    });
                    lit.name = mat.name;
                    return lit;
                }
                return mat;
            });

            child.material = Array.isArray(child.material) ? converted : converted[0];
        });

        console.log('[Environment] meshes:', meshCount, 'material types:', [...materialTypes]);
        console.log('[Environment] renderer shadowMap.enabled:', this.experience.renderer?.instance?.shadowMap?.enabled);

        this.shadowsApplied = meshCount > 0;
    }

    update() {
        // If the model wasn't in the scene yet in the constructor, retry once it is
        if (!this.shadowsApplied) this.setupShadows();

        if (this.debug && this.shadowCameraHelper) {
            this.shadowCameraHelper.update();
        }
    }

    resize() {
    }
}