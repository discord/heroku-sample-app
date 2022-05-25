module.exports = {

    async bake(item) {

        if (item == "bread") {
            const items = ["white bread", "wheat bread", "sweet roll", "banana bread", "pineapple bread", "hawaiian bread", "sourdough bread", "dutch bread", "spicy bread", "corn bread", "brioche bread", "rye bread", "pumpernickle bread"]
            const item = items[Math.floor(Math.random() * items.length)]

            return item;
        }

        if (item == "cookie") {
            const items = ["snickerdoodle cookie", "chocolate chip cookie", "oatmeal raisin cookie", "gingersnap cookie", "shortbread cookie", "peanut butter cookie", "sugar cookie", "gingerbread cookie", "white chocolate macadamia nut cookie"]
            const item = items[Math.floor(Math.random() * items.length)]

            return item;
        }

        if (item == "cake"){
            const items = ["pound cake", "sponge cake", "genoise cake", "angel food cake", "carrot cake", "fruit cake", "red velvet cake", "chocolate cake", "vanilla cake", "black forest gateau", "pineapple upsidedown cake"]
            const item = items[Math.floor(Math.random() * items.length)]

            return item;
        }

        if (item == "pie") {
            const items = ["pecan pie", "key lime pie", "lemon meringue pie", "raspberry tart", "pumpkin pie", "cherry pie", "coconut cream pie", "rhubarb pie", "blackberry pie", "blueberry pie", "raspberry pie", "strawberry pie", "peanut better pie"]
            const item = items[Math.floor(Math.random() * items.length)]

            return item;
        }

    }
}