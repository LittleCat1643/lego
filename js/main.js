

function main() {
    drawSections();
    setSectionsHandlers();
    loadProgress();
    changeScene(homeScene);
}

document.addEventListener('DOMContentLoaded', () => {
    main();
});