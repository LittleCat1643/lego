const sectionsContent = sectionsScene.querySelector('.layout');
const levelsContent = levelsScene.querySelector('.layout');
const beforeButton = levelsScene.querySelector('.footer > .before > button');
const nextButton = levelsScene.querySelector('.footer > .next > button');
const pageNumber = levelsScene.querySelector('.footer > .page > span');
const levelTitle = gameScene.querySelector('.header > .title > h1');

let progress = [];

let currentSection = 0;
let currentPage = 0;

const Progress = {
    load () {
        const storage = localStorage.getItem('progress');

        if (storage) {
            progress = JSON.parse(storage);
        } else {
            progress = new Array(levels.length).fill(0);
        }

        this.save();
    },

    save () {
        localStorage.setItem('progress', JSON.stringify(progress));
    }
}

const Sections = {
    stars (section) {
        const start = section * 100;
        const end = start + 100;
    
        return progress.slice(start, end);
    },

    page (section, page) {
        const stars = this.stars(section);
    
        const start = page * 20;
        const end = start + 20;
    
        return stars.slice(start, end);
    },

    count (section) {
        const stars = this.stars(section);
    
        return stars.reduce((sum, value) => sum + value);
    },

    percent (section) {
        const count = this.count(section);
    
        return Math.floor(count / 300 * 100);
    },

    print (index, stars, closed) {
        const sectionDiv = document.createElement('div');

        if (!closed) {
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
    
            numberDiv.style.background = `url(assets/bricks/${colors[index]}.png)`;
            numberSpan.textContent = index + 1;
            percentSpan.textContent = Sections.percent(index) + '%';
            starsSpan.textContent = stars + '/' + 300;
    
            sectionDiv.addEventListener('click', () => {
                currentSection = index;
                currentPage = 0;
        
                drawLevel();
                changeScene(levelsScene);
            });
    
            numberDiv.appendChild(numberSpan);
            percentDiv.appendChild(percentSpan);
            starsDiv.appendChild(starsImg);
            starsDiv.appendChild(starsSpan);
            sectionDiv.appendChild(numberDiv);
            sectionDiv.appendChild(percentDiv);
            sectionDiv.appendChild(starsDiv);
        } else {
            const numberDiv = document.createElement('div');
            const percentDiv = document.createElement('div');
            const numberSpan = document.createElement('span');
            const percentSpan = document.createElement('span');
            const closedImg = document.createElement('img');
        
            sectionDiv.setAttribute('class', 'section');
            numberDiv.setAttribute('class', 'number');
            percentDiv.setAttribute('class', 'percent');
            closedImg.setAttribute('src', 'assets/ui/closed.png');
    
            sectionDiv.classList.add('closed');
    
            numberDiv.style.background = 'url(assets/bricks/secret.png)';
            numberSpan.textContent = index + 1;
            percentSpan.textContent = 'Закрыто';
    
            numberDiv.appendChild(closedImg);
            percentDiv.appendChild(percentSpan);
            sectionDiv.appendChild(numberDiv);
            sectionDiv.appendChild(percentDiv);
        }
    
        sectionsContent.appendChild(sectionDiv);
    },

    draw () {
        for (let index = 0; index < levels.length / 100; index++) {
            let closed = true;
    
            if (progress[index * 100 - 1] != 0) {
                closed = false;
            }
    
            this.print(index, this.count(index), closed);
        }
    }
}

function writeLevel(index, stars, closed) {
    const levelDiv = document.createElement('div');
    const numberDiv = document.createElement('div');
    const starsDiv = document.createElement('div');
    const numberSpan = document.createElement('span');
    const starsImgs = Array.from({ length: 3 }, () => document.createElement('img'));

    levelDiv.setAttribute('class', 'level');
    levelDiv.setAttribute('role', 'button');
    levelDiv.setAttribute('tabindex', '0');
    numberDiv.setAttribute('class', 'number');
    starsDiv.setAttribute('class', 'stars');

    if (closed) {
        levelDiv.classList.add('closed');
        levelDiv.style.background = 'url(assets/bricks/secret.png)';
    } else {
        levelDiv.style.background = `url(assets/bricks/${colors[currentSection]}.png)`;
        
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

function drawLevel() {
    clearLevelsContent();
    writePageNumber();

    const sectionPlus = currentSection * 100;
    const pageStart = sectionPlus + currentPage * 20;
    const pageEnd = pageStart + 20;

    for (let index = pageStart; index < pageEnd; index++) {
        let closed = true;

        if (progress[index - 1] != 0) {
            closed = false;
        }

        writeLevel(index, progress[index], closed);
    }
}

function startLevel(level) {
    const levelData = levels[level];

    levelTitle.textContent = 'Уровень #' + (level + 1);

    levelNumber = levelData.id;
    levelField = levelData.map;
    towerLength = levelData.height;

    renderField();
    changeScene(gameScene);
}