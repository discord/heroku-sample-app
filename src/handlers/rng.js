module.exports = {

    async calculate(diff) {

        if (diff == 1) {
            const qualities = ["ruined", "good", "amazing", "burnt", "great", "edible"]
            const quality = qualities[Math.floor(Math.random() * qualities.length)]

            return quality;
        }

        if (diff == 2) {
            const qualities = ["good", "alright", "edible", "neutral", "ruined", "poor", "burnt", "great", "glorious", "gross"]
            const quality = qualities[Math.floor(Math.random() * qualities.length)]

            return quality;
        }

        if (diff == 3) {
            const qualities = ["glorious", "ruined", "poor", "ruined", "gross", "desecrated", "defiled", "destroyed", "perfect", "golden", "terrible", "dubious", "burnt"]
            const quality = qualities[Math.floor(Math.random() * qualities.length)]

            return quality;
        }
    }
}