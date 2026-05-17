const colors = ['red', 'green', 'blue', 'yellow', 'white', 'brown', 'gray', 'pink', 'cyan', 'salad'];

const gameCanvas = document.querySelector('.game > .canvas');

let levelNumber = 0;
let levelField = [];
let towerLength = 0;
let selectedTower = null;

function createTower(index) {
    const tower = document.createElement('div');

    tower.setAttribute('class', 'tower');
    tower.setAttribute('id', index);

    return tower;
}

function createBrick(index) {
    const brick = document.createElement('div');

    brick.setAttribute('class', 'brick');
    brick.setAttribute('id', index);

    return brick;
}

function createImage(value) {
    const image = document.createElement('img');

    image.setAttribute('class', 'image');
    image.setAttribute('src', `assets/bricks/${colors[value]}.png`);

    return image;
}

function elementsSizes() {
    const brickWidth = 64 - 3 * levelField.length;
    const brickHeight = brickWidth;
    const brickMarginTop = -Math.floor(brickHeight / 7);
    const brickSelect = -Math.floor(brickHeight / 2);

    const towerPadding = Math.floor(brickHeight / 4);
    const towerPaddingTop = towerPadding - brickMarginTop;
    const towerMarginBottom = towerPadding * 4;
    const towerMargin = towerPadding;
    const towerWidth = brickWidth + towerPadding * 2;
    const towerHeight = (brickHeight + brickMarginTop) * towerLength + towerPadding * 2 - brickMarginTop;
    const towerBorderRadius = Math.floor(towerWidth / 6);
    const towerSelect = -Math.floor(towerHeight / 10);

    const imageWidth = brickWidth;
    const imageHeight = imageWidth;

    const canvasHeight = towerHeight * 2 + towerMargin * 4;

    gameCanvas.style.setProperty('--canvas-height', canvasHeight + 'px');
    
    gameCanvas.style.setProperty('--brick-width', brickWidth + 'px');
    gameCanvas.style.setProperty('--brick-height', brickHeight + 'px');
    gameCanvas.style.setProperty('--brick-margin-top', brickMarginTop + 'px');
    gameCanvas.style.setProperty('--brick-select', brickSelect + 'px');
    
    gameCanvas.style.setProperty('--tower-padding', towerPadding + 'px');
    gameCanvas.style.setProperty('--tower-padding-top', towerPaddingTop + 'px');
    gameCanvas.style.setProperty('--tower-margin-bottom', towerMarginBottom + 'px');
    gameCanvas.style.setProperty('--tower-margin', towerMargin + 'px');
    gameCanvas.style.setProperty('--tower-width', towerWidth + 'px');
    gameCanvas.style.setProperty('--tower-height', towerHeight + 'px');
    gameCanvas.style.setProperty('--tower-border-radius', towerBorderRadius + 'px');
    gameCanvas.style.setProperty('--tower-select', towerSelect + 'px');
    
    gameCanvas.style.setProperty('--image-width', imageWidth + 'px');
    gameCanvas.style.setProperty('--image-height', imageHeight + 'px');
}

function getTower(tower) {
    return gameCanvas.querySelector(`#${CSS.escape(tower)}.tower`);
}

function isTowerEmpty(towerIndex) {
    const currentTower = levelField[towerIndex];

    return currentTower.length == 0;
}

function isTowerFull(towerIndex) {
    const currentTower = levelField[towerIndex];

    return currentTower.length == towerLength;
}

function isTowerSolved(towerIndex) {
    const currentTower = levelField[towerIndex];

    return isTowerFull(towerIndex) && currentTower.every(brick => brick == currentTower[0]);
}

function isSameColors(towerIndex) {
    const firstTower = levelField[selectedTower];
    const secondTower = levelField[towerIndex];

    return firstTower[0] == secondTower[0];
}

function selectTower(towerIndex) {
    selectedTower = towerIndex;

    getTower(towerIndex).classList.add('selected');
}

function cancelTower(tower) {
    selectedTower = null;

    getTower(tower).classList.remove('selected');
}

function errorTower(towerIndex) {
    cancelTower(towerIndex);

    getTower(towerIndex).classList.add('error');

    setTimeout(() => {
        getTower(towerIndex).classList.remove('error');
    }, 250);
}

function moveBricks(towerIndex) {
    const firstTower = levelField[selectedTower];
    const secondTower = levelField[towerIndex];

    secondTower.splice(0, 0, firstTower.splice(0, 1)[0]);

    cancelTower(selectedTower);
    renderField();
}

function earnStars() {
    progress[levelNumber - 1] = 3;
    
    Progress.save();
}

function checkWin() {
    isWin = true;

    levelField.forEach((tower, index) => {
        if (isWin) {
            isWin = isTowerSolved(index) || isTowerEmpty(index);
        }
    });

    return isWin;
}

function levelCompleted() {
    earnStars();
    startLevel(levelNumber);
}

function clearCanvas() {
    gameCanvas.textContent = '';
}

function renderField() {
    clearCanvas();

    levelField.forEach((towerElement, towerIndex) => {
        const tower = createTower(towerIndex);

        function towerHandler(event) {
            event.preventDefault();
            
            if (!isTowerSolved(towerIndex)) {
                if (selectedTower === null) {
                    if (!isTowerEmpty(towerIndex)) {
                        selectTower(towerIndex);
                    }
                } else {
                    if (selectedTower != towerIndex) {
                        if (!isTowerFull(towerIndex) && (isTowerEmpty(towerIndex) || isSameColors(towerIndex))) {
                            moveBricks(towerIndex);
                        } else {
                            errorTower(selectedTower);
                        }
                    } else {
                        cancelTower(selectedTower);
                    }
                }
            }
        }

        tower.onclick = towerHandler;
        tower.ontouchstart = towerHandler;

        towerElement.forEach((brickElement, brickIndex) => {
            const brick = createBrick(brickIndex);
            const image = createImage(brickElement);

            brick.appendChild(image);
            tower.appendChild(brick);
        });

        gameCanvas.appendChild(tower);
    });

    elementsSizes();

    if (checkWin()) {
        levelCompleted();
    }
}