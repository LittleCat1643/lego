const wrap = document.querySelector('.wrap');

const homeScene = wrap.querySelector('.home');
const sectionsScene = wrap.querySelector('.sections');
const levelsScene = wrap.querySelector('.levels');
const gameScene = wrap.querySelector('.game');

const backButtons = wrap.querySelectorAll('.back > button');

let currentScene = null;
let beforeScene = null;

function hideScene(scene) {
    if (currentScene !== null) {
        scene.style.display = 'none';
    }
}

function showScene(scene) {
    scene.style.display = 'flex';
}

function changeScene(scene) {
    hideScene(currentScene);
    showScene(scene);

    beforeScene = currentScene;
    currentScene = scene;
}

backButtons.forEach(button => {
    button.onclick = () => {
        if (currentScene == sectionsScene) {
            changeScene(homeScene);
        } else if (currentScene == levelsScene) {
            changeScene(sectionsScene);
        } else {
            changeScene(beforeScene);
        }
    }
});