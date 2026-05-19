const Tiers = {
    tier: 0,

    print (index, stars, closed) {
        const tierDiv = document.createElement('div');
        const numberDiv = document.createElement('div');
        const starsDiv = document.createElement('div');
        const numberSpan = document.createElement('span');
        const starsImgs = Array.from({ length: 3 }, () => document.createElement('img'));
    
        tierDiv.setAttribute('class', 'tier');
        tierDiv.setAttribute('role', 'button');
        tierDiv.setAttribute('tabindex', '0');
        numberDiv.setAttribute('class', 'number');
        starsDiv.setAttribute('class', 'stars');

        if (!closed) {
            tierDiv.style.background = `url(assets/bricks/${colors[Sections.section]}.png)`;

            tierDiv.onclick = () => {
                Game.start(index);
            }
        } else {
            tierDiv.style.background = 'url(assets/bricks/secret.png)';

            tierDiv.classList.add('closed');
        }

        numberSpan.textContent = index + 1;
        
        starsImgs.forEach((img, count) => {
            if (count < stars) {
                img.setAttribute('src', 'assets/ui/star.png');
            } else {
                img.setAttribute('src', 'assets/ui/black.png');
            }

            starsDiv.appendChild(img);
        });

        numberDiv.appendChild(numberSpan); 
        tierDiv.appendChild(numberDiv);
        tierDiv.appendChild(starsDiv);
        DOMElements.tiers.appendChild(tierDiv);
    },

    clear () {
        DOMElements.tiers.textContent = '';
    },
    
    number () {
        DOMElements.page.textContent = Tiers.tier + 1 + ' / 5';
    },

    draw () {
        this.clear();
        this.number();
    
        const sectionPlus = Sections.section * 100;
        const pageStart = sectionPlus + Tiers.tier * 20;
        const pageEnd = pageStart + 20;
    
        for (let index = pageStart; index < pageEnd; index++) {
            let closed = true;
    
            if (Progress.progress[index - 1] != 0) {
                closed = false;
            }
    
            this.print(index, Progress.progress[index], closed);
        }
    }
}