const DOMWrap = document.querySelector('.wrap');

const DOMScenes = {
    home: DOMWrap.querySelector('.home'),
    sections: DOMWrap.querySelector('.sections'),
    tiers: DOMWrap.querySelector('.tiers'),
    game: DOMWrap.querySelector('.game')
}

const DOMElements = {
    sections: DOMScenes.sections.querySelector('.layout'),
    tiers: DOMScenes.tiers.querySelector('.layout'),
    page: DOMScenes.tiers.querySelector('.footer > .page > span'),
    level: DOMScenes.game.querySelector('.header > .title > h1'),
    canvas: DOMScenes.game.querySelector('.canvas')
}

const DOMButtons = {
    backs: DOMWrap.querySelectorAll('.back > button'),

    play: DOMScenes.home.querySelector('.layout > .play > button'),
    settings: DOMScenes.home.querySelector('.layout > .settings > button'),
    settings: DOMScenes.home.querySelector('.layout > .settings > button'),
    before: DOMScenes.tiers.querySelector('.footer > .before > button'),
    next: DOMScenes.tiers.querySelector('.footer > .next > button'),
    pause: DOMScenes.game.querySelector('.header > .pause > button'),

    onclicks: {
        back () {
            switch (Scenes.current) {
                case DOMScenes.sections:
                    Scenes.change(DOMScenes.home);
                    break;
                case DOMScenes.tiers:
                    Scenes.change(DOMScenes.sections);
                    break;
                case DOMScenes.game:
                    Scenes.change(DOMScenes.tiers);
                    break;
            }
        },

        play () {
            Scenes.change(DOMScenes.sections);
        },

        settings () {
            localStorage.removeItem('progress');

            window.location.reload();
        },

        before () {
            if (Tiers.tier == 0) {
                Tiers.tier = 4;
            } else {
                Tiers.tier -= 1;
            }
        
            Tiers.draw();
        },
    
        next () {
            if (Tiers.tier == 4) {
                Tiers.tier = 0;
            } else {
                Tiers.tier += 1;
            }
        
            Tiers.draw();
        },

        pause () {
            Progress.progress = new Array(levels.length).fill(1);
            Progress.save();

            window.location.reload();
        }
    }
}

DOMButtons.backs.forEach(button => {
    button.onclick = () => {
        DOMButtons.onclicks.back();
    }
});

DOMButtons.play.onclick = () => {
    DOMButtons.onclicks.play();
}

DOMButtons.settings.onclick = () => {
    DOMButtons.onclicks.settings();
}

DOMButtons.before.onclick = () => {
    DOMButtons.onclicks.before();
}

DOMButtons.next.onclick = () => {
    DOMButtons.onclicks.next();
}

DOMButtons.pause.onclick = () => {
    DOMButtons.onclicks.pause();
}