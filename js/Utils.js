

export function locationInSong(sections, bars, eighths) {
    let sectionLength = 32;
    let barSeconds = sectionLength / 4;
    let eighthSeconds = barSeconds / 8;
    // adding 2 for the quarter note (two eights) that we come in on
    return sections * sectionLength + bars * barSeconds + eighths * eighthSeconds;
}


export function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}