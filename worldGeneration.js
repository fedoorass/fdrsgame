function perlinGeneration(seed, width, height) {

    world.chunksArray = [...Array(width)].map(e => Array(height).fill([null]))

    noise.seed(seed)

    function generateChunk(x, y) {

        let blocksArray = [...Array(16)].map(e => Array(16).fill("0"))

        //Первичная генерация
        for (let bx = 0; bx < 16; bx++) {
            for (let by = 0; by < 16; by++) {
                let terrainHeight = ((noise.simplex2((x * 16 + bx) / 130, 0) + 1) / 2) ** 0.1
                let cavesValue = (noise.simplex2((x * 16 + bx) / 100, (y * 16 + by) / 100) + 1) / 2
                let cavesDirtValue = (noise.simplex2((x * 16 + bx) / 19, (y * 16 + by) / 19) + 1) / 2
                let cavesSpacesValue = (noise.simplex2((x * 16 + bx) / 24, (y * 16 + by) / 24) + 1) / 2
                let oreValue = (noise.simplex2((x * 16 + bx) / 12, (y * 16 + by) / 12) + 1) / 2

                //Кам
                if (y * 16 + by > Math.round(terrainHeight * 128 - 64)) {
                    if (0.3 > cavesValue || cavesValue > 0.4) {
                        blocksArray[bx][by] = "stone"
                    }
                }

                //Земля
                if (y * 16 + by > Math.round(terrainHeight * 128 - 64)) {
                    if (0.4 > cavesDirtValue && blocksArray[bx][by] == "stone") {
                        blocksArray[bx][by] = "dirt"
                    }
                }

                if (y * 16 + by > Math.round(terrainHeight * 128 - 64) && y * 16 + by <= Math.round(terrainHeight * 128 - 48)) {
                    if (0.3 > cavesValue || cavesValue > 0.4) {
                        blocksArray[bx][by] = "dirt"
                    }
                }

                //Трава
                if (y * 16 + by == Math.round(terrainHeight * 128 - 64) && y * 16 + by) {
                    if ((0.3 > cavesValue || cavesValue > 0.4) && (0.15 <= cavesSpacesValue && cavesSpacesValue <= 0.8)) {
                        blocksArray[bx][by] = "grass"
                    }
                }

                //Пустоты пещер
                if (y * 16 + by > Math.round(terrainHeight * 128 - 64)) {
                    if (0.15 > cavesSpacesValue || cavesSpacesValue > 0.8) {
                        blocksArray[bx][by] = "0"
                    }
                }

                //Руда
                if (y * 16 + by > Math.round(terrainHeight * 128 - 64)) {
                    if ((0.15 > oreValue) && blocksArray[bx][by] == "stone") {
                        blocksArray[bx][by] = "copper"
                    }
                }

                if (y * 16 + by > Math.round(terrainHeight * 128 - 64 + 32)) {
                    if ((0.15 > oreValue) && blocksArray[bx][by] == "copper") {
                        blocksArray[bx][by] = "iron"
                    }
                }

                if (y * 16 + by > Math.round(terrainHeight * 128 - 64 + 64)) {
                    if ((0.15 > oreValue) && blocksArray[bx][by] == "iron") {
                        blocksArray[bx][by] = "gold"
                    }
                }

                if (y * 16 + by > Math.round(terrainHeight * 128 - 64 + 92)) {
                    if ((0.15 > oreValue) && blocksArray[bx][by] == "gold") {
                        blocksArray[bx][by] = "diamonds"
                    }
                }

            }
        }


        //Сталактиты, сталогмиты, лианы
        for (let bx = 0; bx < 16; bx++) {
            for (let by = 0; by < 16; by++) {
                let terrainHeight = ((noise.simplex2((x * 16 + bx) / 130, 0) + 1) / 2) ** 0.1
                let decorValue = (noise.simplex2((x * 16 + bx), (y * 16 + by)) + 1) / 2
                if (y * 16 + by > Math.round(terrainHeight * 128 - 64)) {
                    if (decorValue < 0.5 && blocksArray[bx][by + 1] == "stone" && blocksArray[bx][by] == "0" && by < 15) {
                        blocksArray[bx][by] = "stalagmite"
                    }
                    if (decorValue < 0.5 && blocksArray[bx][by - 1] == "stone" && blocksArray[bx][by] == "0" && by > 0) {
                        blocksArray[bx][by] = "stalactite"
                    }
                    if (decorValue < 0.2 && blocksArray[bx][by - 1] == "stone" && blocksArray[bx][by] == "stalactite" && by > 0) {
                        blocksArray[bx][by] = "lianas"
                    }
                }
            }
        }

        //Сундуки
        for (let bx = 0; bx < 16; bx++) {
            for (let by = 0; by < 16; by++) {
                let terrainHeight = ((noise.simplex2((x * 16 + bx) / 130, 0) + 1) / 2) ** 0.1
                let woodenChestValue = (noise.simplex2((x * 16 + bx), (y * 16 + by)) + 1) / 2
                if (y * 16 + by > Math.round(terrainHeight * 128 - 64) && by < 15) {
                    if (woodenChestValue < 0.1 && blocksArray[bx][by + 1] == "stone" && blocks.get(blocksArray[bx][by]).material == "transperent") {
                        blocksArray[bx][by] = "woodenChest"
                    }
                }
            }
        }

        if (x == 0) {
            for (let by = 0; by < 16; by++) {
                blocksArray[0][by] = "barrier"
            }
        }
        if (y == 0) {
            for (let bx = 0; bx < 16; bx++) {
                blocksArray[bx][0] = "barrier"
            }
        }

        if (x == width - 1) {
            for (let by = 0; by < 16; by++) {
                blocksArray[15][by] = "barrier"
            }
        }
        if (y == height - 1) {
            for (let bx = 0; bx < 16; bx++) {
                blocksArray[bx][15] = "barrier"
            }
        }

        return new chunk(blocksArray, x, y)

    }

    for (let x = 0; x < world.chunksArray.length; x++) {
        for (let y = 0; y < world.chunksArray[x].length; y++) {
            world.chunksArray[x][y] = generateChunk(x, y)
        }
    }
    for (let x = 0; x < world.chunksArray.length; x++) {
        for (let y = 0; y < world.chunksArray[x].length; y++) {
            world.chunksArray[x][y].update()
        }
    }
    world.width = width * 16
    world.height = height * 16
}