const sectionsContent = sectionsScene.querySelector('.layout');
const levelsContent = levelsScene.querySelector('.layout');
const beforeButton = levelsScene.querySelector('.footer > .before > button');
const nextButton = levelsScene.querySelector('.footer > .next > button');
const pageNumber = levelsScene.querySelector('.footer > .page > span');

let progress = [];

let currentSection = 0;
let currentPage = 0;

function getProgress() {
    if (localStorage.getItem('progress')) {
        return JSON.parse(localStorage.getItem('progress'));
    } else {
        return new Array(1000).fill(0);
    }
}

function loadProgress() {
    if (localStorage.getItem('progress')) {
        progress = JSON.parse(localStorage.getItem('progress'));
    } else {
        localStorage.setItem('progress', JSON.stringify(new Array(1000).fill(0)));
    }
}

function saveProgress() {
    localStorage.setItem('progress', JSON.stringify(progress));
}

function getSectionStars(index) {
    const progressArray = getProgress();

    const start = index * 100;
    const end = start + 100;

    return progressArray.slice(start, end);
}

function getSectionPage(section, page) {
    const sectionArray = getSectionStars(index);

    const start = page * 20;
    const end = start + 20;

    return sectionArray.slice(start, end);
}

function getSectionCount(index) {
    const sectionArray = getSectionStars(index);

    let starsCount = 0;

    for (let index = 0; index < sectionArray.length; index++) {
        starsCount += sectionArray[index];
    }

    return starsCount;
}

function getSectionPercent(index) {
    const sectionArray = getSectionStars(index);

    return sectionArray.filter(level => level != 0).length;
}

function writeSection(index, stars) {
    const sectionDiv = document.createElement('div');
    const numberDiv = document.createElement('div');
    const percentDiv = document.createElement('div');
    const starsDiv = document.createElement('div');
    const numberSpan = document.createElement('span');
    const percentSpan = document.createElement('span');
    const starsSpan = document.createElement('span');
    const starsImg = document.createElement('img');

    sectionDiv.setAttribute('class', 'section');
    numberDiv.setAttribute('class', 'number');
    percentDiv.setAttribute('class', 'percent');
    starsDiv.setAttribute('class', 'stars');
    starsImg.setAttribute('src', 'assets/ui/star.png');

    numberSpan.textContent = index + 1;
    percentSpan.textContent = getSectionPercent(index) + '%';
    starsSpan.textContent = stars + '/' + 300;

    numberDiv.appendChild(numberSpan);
    percentDiv.appendChild(percentSpan);
    starsDiv.appendChild(starsImg);
    starsDiv.appendChild(starsSpan);
    sectionDiv.appendChild(numberDiv);
    sectionDiv.appendChild(percentDiv);
    sectionDiv.appendChild(starsDiv);
    sectionsContent.appendChild(sectionDiv);
}

function writeLevel(index, stars, closed) {
    const levelDiv = document.createElement('div');
    const numberDiv = document.createElement('div');
    const starsDiv = document.createElement('div');
    const numberSpan = document.createElement('span');
    const starsImgs = Array.from({ length: 3 }, () => document.createElement('img'));

    levelDiv.setAttribute('class', 'level');
    numberDiv.setAttribute('class', 'number');
    starsDiv.setAttribute('class', 'stars');

    if (closed) {
        levelDiv.classList.add('closed');

        levelDiv.style.background = 'url(assets/bricks/secret.png)';
    } else {
        levelDiv.style.background = 'url(assets/bricks/' + colors[currentSection] + '.png)';
        
        starsImgs.forEach((img, star) => {
            if (star < stars) {
                img.setAttribute('src', 'assets/ui/star.png');
            } else {
                img.setAttribute('src', 'assets/ui/black.png');
            }
        });

        levelDiv.onclick = () => {
            startLevel(index);
        }
    }

    numberSpan.textContent = index + 1;

    numberDiv.appendChild(numberSpan);

    starsImgs.forEach(img => {
        starsDiv.appendChild(img);
    });

    levelDiv.appendChild(numberDiv);
    levelDiv.appendChild(starsDiv);
    levelsContent.appendChild(levelDiv);
}

function setSectionsHandlers() {
    const sectionsElements = sectionsContent.querySelectorAll('.section');

    sectionsElements.forEach((section, index) => {
        section.onclick = () => {
            currentSection = index;
    
            drawLevel();
            changeScene(levelsScene);
        }
    });
}

beforeButton.onclick = () => {
    if (currentPage == 0) {
        currentPage = 4;
    } else {
        currentPage -= 1;
    }

    drawLevel();
}

nextButton.onclick = () => {
    if (currentPage == 4) {
        currentPage = 0;
    } else {
        currentPage += 1;
    }

    drawLevel();
}

function clearLevelsContent() {
    levelsContent.textContent = '';
}

function writePageNumber() {
    pageNumber.textContent = currentPage + 1 + ' / 5';
}

function drawSections() {
    for (let index = 0; index < 10; index++) {
        writeSection(index, getSectionCount(index));
    }
}

function drawLevel() {
    clearLevelsContent();
    writePageNumber();

    const levelsProgress = getProgress();

    const sectionPlus = currentSection * 100;
    const pageStart = sectionPlus + currentPage * 20;
    const pageEnd = pageStart + 20;

    for (let index = pageStart; index < pageEnd; index++) {
        let closed = true;

        if (levelsProgress[index - 1] != 0) {
            closed = false;
        }

        writeLevel(index, levelsProgress[index], closed);
    }
}

function startLevel(level) {
    const levelData = levels[level];

    levelNumber = levelData.id;
    levelField = levelData.map;
    towerLength = levelData.height;

    renderField();
    changeScene(gameScene);
}