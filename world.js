let world = {
    chunksArray: [],
    width: 0,
    height: 0,
    gravity: 0.03125,
    getBlock(x, y) {
        try {
            return this.chunksArray[Math.floor(x / 16)][Math.floor(y / 16)].blocksArray[Math.floor(x % 16)][Math.floor(y % 16)]
        }
        catch (err) {
            return "0"
        }
    },

    setBlock(block, x, y) {
        try {
            this.chunksArray[Math.floor(x / 16)][Math.floor(y / 16)].blocksArray[Math.floor(x % 16)][Math.floor(y % 16)] = block
        }
        catch (err) {
            console.log("Heh")
        }
    },

    getGroup(x, y) {
        try {
            return blocks.get(this.getBlock(x, y)).textureGroup
        }
        catch (err) {
            return null
        }
    }
}