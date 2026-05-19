const Scenes = {
    current: null,
    
    hide (scene) {
        if (this.current !== null) {
            scene.style.display = 'none';
        }
    },
    
    show (scene) {
        scene.style.display = 'flex';
    },
    
    change (scene) {
        this.hide(this.current);
        this.show(scene);

        this.current = scene;
    }
}