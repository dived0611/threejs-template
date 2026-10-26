import {EventEmitter} from "events";
import {Loaders} from './Loaders.js';
import assets from './assets.js';
export class Resources  extends EventEmitter {
    constructor() {
        super();
    this.loaders = new Loaders().loaders;
    this.assets = assets;

    this.items = {};
    this.queue = this.assets.length;
    this.loaded = 0;
    this.startLoading();
    }
    startLoading() {
        for(const asset of this.assets) {
            if(asset.type === 'gltfModel') {
                this.loaders.gltfLoader.load(asset.path, (file) => {
                    this.singleAssetLoaded(asset, file);
                });
            } 
            }
    }
    singleAssetLoaded(asset, file) {
        console.log(this.items);
        this.items[asset.name] = file;
        this.loaded++;
        if(this.loaded === this.queue) {
            this.emit('ready');
        }
}};