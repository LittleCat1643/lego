function main() {
    Progress.load();
    Sections.draw();

    Scenes.change(DOMScenes.home);
}

document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

document.addEventListener('DOMContentLoaded', () => {
    main();
});