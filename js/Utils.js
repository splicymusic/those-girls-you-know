

export function locationInSong(sections, bars, eighths) {
    let sectionLength = 32;
    let barSeconds = sectionLength / 4;
    let eighthSeconds = barSeconds / 8;
    // adding 2 for the quarter note (two eights) that we come in on
    return sections * sectionLength + bars * barSeconds + eighths * eighthSeconds;
}


export function randomInt(max) {
    return Math.floor(Math.random() * max);
}

export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function pathPosition() {return -2.5;}