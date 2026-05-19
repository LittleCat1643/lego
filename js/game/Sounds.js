const Sounds = {
    sounds: {
        select: null,
        move: null,
        error: null,
        solved: null
    },

    load () {
        this.sounds.select = new Audio('assets/sfx/select.wav');
        this.sounds.move = new Audio('assets/sfx/select.wav');
        this.sounds.error = new Audio('assets/sfx/select.wav');
        this.sounds.solved = new Audio('assets/sfx/select.wav');
    },
    
    select () {
        this.sounds.select.play('select');
    },

    move () {
        this.sounds.move.play('move');
    },
    
    error () {
        this.sounds.error.play('error');
    },
    
    solved () {
        this.sounds.solved.play('solved');
    }
}