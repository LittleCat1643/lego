function main() {
    Progress.load();
    Sections.draw();

    changeScene(homeScene);
}

document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

document.addEventListener('DOMContentLoaded', () => {
    main();
});