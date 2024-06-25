class LoadingManager {
    constructor() {
        this.totalImages = 0;
        this.loadedImages = 0;
        this.callback = null;
    }

    addImages(count) {
        this.totalImages += count;
    }

    imageLoaded() {
        this.loadedImages++;
        if (this.loadedImages === this.totalImages && this.callback) {
            this.callback();
        }
    }

    onAllImagesLoaded(callback) {
        this.callback = callback;
    }
}
