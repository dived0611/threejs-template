import {EventEmitter} from "events";
export class Sizes  extends EventEmitter {
    constructor() {
        super();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);
        this.aspect = this.width / this.height;
         window.addEventListener('resize', () => {

            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.pixelRatio = Math.min(window.devicePixelRatio, 2);
            this.aspect = this.width / this.height;
            this.emit('resize');
        });

    }
}