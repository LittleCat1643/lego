const colors = ['red', 'green', 'blue', 'yellow', 'white', 'brown', 'gray', 'pink', 'cyan', 'salad'];

const Game = {
    level: 0,
    field: [],
    length: 0,
    selected: null,

    stars () {
        Progress.progress[Game.level - 1] = 3;
        Progress.save();
    },

    start (level) {
        const levelData = levels[level];
    
        DOMElements.level.textContent = 'Уровень #' + (level + 1);
    
        this.level = levelData.id;
        this.field = levelData.map;
        this.length = levelData.height;
    
        Canvas.render();
        Scenes.change(DOMScenes.game);
    },

    finish () {
        confetti({ particleCount: 300, spread: 100, origin: { y: 0.5 } });

        this.stars();
        Sections.draw();
        Tiers.draw();
        Game.start(Game.level);
    }
}