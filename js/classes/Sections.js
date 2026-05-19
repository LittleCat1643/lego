const Sections = {
    section: 0,

    stars (section) {
        const start = section * 100;
        const end = start + 100;
    
        return Progress.progress.slice(start, end);
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
                Sections.section = index;
                Tiers.tier = 0;
        
                Tiers.draw();
                Scenes.change(DOMScenes.tiers);
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
    
        DOMElements.sections.appendChild(sectionDiv);
    },

    clear () {
        DOMElements.sections.textContent = '';
    },

    draw () {
        this.clear();

        for (let index = 0; index < levels.length / 100; index++) {
            let closed = true;
    
            if (Progress.progress[index * 100 - 1] != 0) {
                closed = false;
            }
    
            this.print(index, this.count(index), closed);
        }
    }
}