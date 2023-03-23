if (block.x % 16 < options.lightingRadius) {
    world.chunksArray[Math.floor(block.x / 16) - 1][Math.floor(block.y / 16)].updateImage()
    if (block.y % 16 < options.lightingRadius) {
        world.chunksArray[Math.floor(block.x / 16) - 1][Math.floor(block.y / 16) - 1].updateImage()
    }
    else if (block.y % 16 >= 16 - options.lightingRadius) {
        world.chunksArray[Math.floor(block.x / 16) - 1][Math.floor(block.y / 16) + 1].updateImage()
    }
}
else if (block.x % 16 >= 16 - options.lightingRadius) {
    world.chunksArray[Math.floor(block.x / 16) + 1][Math.floor(block.y / 16)].updateImage()
    if (block.y % 16 < options.lightingRadius) {
        world.chunksArray[Math.floor(block.x / 16) + 1][Math.floor(block.y / 16) - 1].updateImage()
    }
    else if (block.y % 16 >= 16 - options.lightingRadius) {
        world.chunksArray[Math.floor(block.x / 16) + 1][Math.floor(block.y / 16) + 1].updateImage()
    }
}
if (block.y % 16 < options.lightingRadius) {
    world.chunksArray[Math.floor(block.x / 16)][Math.floor(block.y / 16) - 1].updateImage()
}
else if (block.y % 16 >= 16 - options.lightingRadius) {
    world.chunksArray[Math.floor(block.x / 16)][Math.floor(block.y / 16) + 1].updateImage()
}