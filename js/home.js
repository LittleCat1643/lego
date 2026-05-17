const playButton = homeScene.querySelector('.layout > .play > button');
const settingsButton = homeScene.querySelector('.layout > .settings > button');
const logo = homeScene.querySelector('.header > .logo > img');

playButton.onclick = () => {
    changeScene(sectionsScene);
}

settingsButton.onclick = () => {
    progress = new Array(levels.length).fill(1);
    Progress.save();
    window.location.reload();
}

logo.onclick = () => {
    localStorage.removeItem('progress');
    window.location.reload();
}