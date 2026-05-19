const Validates = {
    empty (id) {
        return Game.field[id].length == 0;
    },
    
    full (id) {
        return Game.field[id].length == Game.length;
    },
    
    solved (id) {
        return this.full(id) && Game.field[id].every(brick => brick == Game.field[id][0]);
    },
    
    same (id) {
        return Game.field[Game.selected][0] == Game.field[id][0];
    },

    win () {
        return Game.field.every((tower, index) => Validates.solved(index) || Validates.empty(index));
    }
}