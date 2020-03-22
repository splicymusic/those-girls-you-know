

class Clock {
    constructor(sections, bars, eighths) {
        this.start = Date.now();
        // the length of time for one section (4 bars)
        this.sectionSeconds = 11.163;
        this.barSeconds = this.sectionSeconds / 4;
        this.eighthSeconds = this.barSeconds / 8;
        this.startSeconds = this.calculateTime(sections, bars, eighths);
        this.startMillis = Math.round(this.startSeconds * 1000);
        this.seconds = this.startSeconds;
        this.millis = this.startMillis;
    }

    update() {
        let now = Date.now();
        // where we are in the song
        this.seconds = (now - this.start) / 1000 + this.startSeconds;
        this.millis = (now - this.start) + this.startMillis;
        this.eighthsFraction = this.seconds / this.eighthSeconds;
        this.eighths =  Math.floor(this.seconds / this.eighthSeconds);
        this.bars = Math.floor(this.seconds / this.barSeconds);
        this.sections = Math.floor(this.seconds / this.sectionSeconds);
    }

    calculateTime(sections, bars, eighths) {
        return sections * this.sectionSeconds + bars * this.barSeconds + eighths * this.eighthSeconds;
    }
}

export default Clock;