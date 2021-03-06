

class Clock {
    constructor(sections, bars, eighths) {
        // the length of time for one section (4 bars)
        this.sectionSeconds = 11.163;
        this.wholeSeconds = this.sectionSeconds / 4;
        this.quarterSeconds = this.wholeSeconds / 4;
        this.eighthSeconds = this.wholeSeconds / 8;
        this.startSeconds = this.calculateTime(sections, bars, eighths);
        this.startMillis = Math.round(this.startSeconds * 1000);
        this.seconds = this.startSeconds;
        this.millis = this.startMillis;
        this.frame = 0;
        this.whole = 0;
        this.half = 0;
        this.quarter = 0;
        this.eigth = 0;
        this.isNewQuarter = false;
        this.isNewEigth = false;
    }

    start() {
        this.start = Date.now();
    }

    update() {
        let now = Date.now();
        this.frame ++;
        // where we are in the song
        this.seconds = (now - this.start) / 1000 + this.startSeconds;
        this.millis = (now - this.start) + this.startMillis;
        this.eighthsFraction = this.seconds / this.eighthSeconds;
        this.quarterFraction = this.seconds / this.quarterSeconds;

        let newQuarter = Math.floor(this.seconds / this.quarterSeconds);
        if (newQuarter !== this.quarter) {
            this.quarter =  newQuarter;
            this.isNewQuarter = true;
        } else {
            this.isNewQuarter = false;
        }

        let newEigth = Math.floor(this.seconds / this.eighthSeconds);
        if (newEigth !== this.eigth) {
            this.eigth =  newEigth;
            this.isNewEigth = true;
        } else {
            this.isNewEigth = false;
        }
        this.whole = Math.floor(this.seconds / this.wholeSeconds);
        this.half = Math.floor(this.quarter / 2);
        this.section = Math.floor(this.seconds / this.sectionSeconds);
    }

    calculateTime(sections, bars, eighths) {
        return sections * this.sectionSeconds + bars * this.wholeSeconds + eighths * this.eighthSeconds;
    }
}

export default Clock;

