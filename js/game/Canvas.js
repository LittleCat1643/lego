const Canvas = {
    createTower (id) {
        const tower = document.createElement('div');
    
        tower.setAttribute('class', 'tower');
        tower.setAttribute('id', id);
    
        return tower;
    },
    
    createBrick (id) {
        const brick = document.createElement('div');
    
        brick.setAttribute('class', 'brick');
        brick.setAttribute('id', id);
    
        return brick;
    },
    
    createImage (color) {
        const image = document.createElement('img');
    
        image.setAttribute('class', 'image');
        image.setAttribute('src', `assets/bricks/${colors[color]}.png`);
    
        return image;
    },

    getTower (id) {
        return DOMElements.canvas.querySelector(`#${CSS.escape(id)}.tower`);
    },

    select (id) {
        Game.selected = id;
    
        this.getTower(id).classList.add('selected');

        Sounds.select();
    },
    
    cancel (id) {
        Game.selected = null;
    
        this.getTower(id).classList.remove('selected');
    },
    
    error (id) {
        this.cancel(id);
    
        this.getTower(id).classList.add('error');
    
        setTimeout(() => {
            this.getTower(id).classList.remove('error');
        }, 250);

        Sounds.error();
    },
    
    move (id) {
        const firstTower = Game.field[Game.selected];
        const secondTower = Game.field[id];
    
        secondTower.splice(0, 0, firstTower.splice(0, 1)[0]);
    
        this.cancel(Game.selected);
        Canvas.render();

        if (Validates.solved(id)) {
            Sounds.solved();
        }

        Sounds.move();
    },

    sizes () {
        const brickWidth = 64 - 3 * Game.field.length;
        const brickHeight = brickWidth;
        const brickMarginTop = -Math.floor(brickHeight / 7);
        const brickSelect = -Math.floor(brickHeight / 2);
        const towerPadding = Math.floor(brickHeight / 4);
        const towerPaddingTop = towerPadding - brickMarginTop;
        const towerMarginBottom = towerPadding * 4;
        const towerMargin = towerPadding;
        const towerWidth = brickWidth + towerPadding * 2;
        const towerHeight = (brickHeight + brickMarginTop) * Game.length + towerPadding * 2 - brickMarginTop;
        const towerBorderRadius = Math.floor(towerWidth / 6);
        const towerSelect = -Math.floor(towerHeight / 10);
        const imageWidth = brickWidth;
        const imageHeight = imageWidth;
        const canvasWidth = (Game.field.length > 4 ? Math.ceil(Game.field.length / 2) : 3) * (towerWidth + towerMargin * 2);
        const canvasHeight = towerHeight * 2 + towerMargin * 4;
    
        DOMElements.canvas.style.setProperty('--canvas-width', canvasWidth + 'px');
        DOMElements.canvas.style.setProperty('--canvas-height', canvasHeight + 'px');
        DOMElements.canvas.style.setProperty('--brick-width', brickWidth + 'px');
        DOMElements.canvas.style.setProperty('--brick-height', brickHeight + 'px');
        DOMElements.canvas.style.setProperty('--brick-margin-top', brickMarginTop + 'px');
        DOMElements.canvas.style.setProperty('--brick-select', brickSelect + 'px');
        DOMElements.canvas.style.setProperty('--tower-padding', towerPadding + 'px');
        DOMElements.canvas.style.setProperty('--tower-padding-top', towerPaddingTop + 'px');
        DOMElements.canvas.style.setProperty('--tower-margin-bottom', towerMarginBottom + 'px');
        DOMElements.canvas.style.setProperty('--tower-margin', towerMargin + 'px');
        DOMElements.canvas.style.setProperty('--tower-width', towerWidth + 'px');
        DOMElements.canvas.style.setProperty('--tower-height', towerHeight + 'px');
        DOMElements.canvas.style.setProperty('--tower-border-radius', towerBorderRadius + 'px');
        DOMElements.canvas.style.setProperty('--tower-select', towerSelect + 'px');
        DOMElements.canvas.style.setProperty('--image-width', imageWidth + 'px');
        DOMElements.canvas.style.setProperty('--image-height', imageHeight + 'px');
    },

    handler (event, tower) {
        event.preventDefault();
                
        if (!Validates.solved(tower)) {
            if (Game.selected === null) {
                if (!Validates.empty(tower)) {
                    this.select(tower);
                }
            } else {
                if (Game.selected != tower) {
                    if (!Validates.full(tower) && (Validates.empty(tower) || Validates.same(tower))) {
                        this.move(tower);
                    } else {
                        this.error(Game.selected);
                    }
                } else {
                    this.cancel(Game.selected);
                }
            }
        }
    },

    clear () {
        DOMElements.canvas.textContent = '';
    },

    render () {
        this.clear();
    
        Game.field.forEach((towerElement, towerIndex) => {
            const tower = Canvas.createTower(towerIndex);
    
            tower.onclick = (event) => {
                this.handler(event, towerIndex);
            }

            tower.ontouchstart = (event) => {
                this.handler(event, towerIndex);
            }
    
            towerElement.forEach((brickElement, brickIndex) => {
                const brick = Canvas.createBrick(brickIndex);
                const image = Canvas.createImage(brickElement);
    
                brick.appendChild(image);
                tower.appendChild(brick);
            });
    
            DOMElements.canvas.appendChild(tower);
        });
    
        this.sizes();
    
        if (Validates.win()) {
            Game.finish();
        }
    }
}