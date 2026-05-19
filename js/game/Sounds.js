const Sounds = {
    play (file) {
        new Audio(`assets/sounds/${file}.wav`).play();
    },
    
    select () {
        this.play('select');
    },

    move () {
        this.play('move');
    },
    
    error () {
        this.play('error');
    },
    
    solved () {
        this.play('solved');
    }
}