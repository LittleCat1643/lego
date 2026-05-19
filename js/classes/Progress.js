const Progress = {
    progress: [],

    load () {
        const storage = localStorage.getItem('progress');

        if (storage) {
            this.progress = JSON.parse(storage);
        } else {
            this.progress = new Array(levels.length).fill(0);
        }

        this.save();
    },

    save () {
        localStorage.setItem('progress', JSON.stringify(this.progress));
    }
}