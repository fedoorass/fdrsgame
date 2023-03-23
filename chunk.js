let options = {
    drawBlocks: true,
    drawAdaptive: true,
    drawLighting: true,
    lightingRadius: 6,
    drawBackground: false,
    drawCollision: false,
    drawChunksBorders: true,
    drawCollisionChunks: false,
    maxVelocity: 2
}

class chunk {
    constructor(blocksArray, x, y) {
        this.blocksArray = blocksArray
        this.collisionRects = []
        this.image = new Image()
        this.x = x
        this.y = y
    }

    updateBlocks() {
        for (let x = 0; x < 16; x++) {
            for (let y = 0; y < 16; y++) {
                if (this.blocksArray[x][y] != "0") {
                    if (blocks.get(this.blocksArray[x][y]).binding == "bottom" && this.blocksArray[x][y + 1] == "0") {
                        this.blocksArray[x][y] = 0
                    }
                    else if (blocks.get(this.blocksArray[x][y]).binding == "top" && this.blocksArray[x][y - 1] == "0") {
                        this.blocksArray[x][y] = 0
                    }
                }
            }
        }
    }

    updateCollisionRects() {

        this.collisionRects.length = 0

        let solidArray = this.blocksArray.map(x => x.map(y => { if (y == "0" || blocks.get(y).material == "transperent") { return 0 } else { return 1 } }))

        let getNeighbors = function (x, y) {
            let neighbors = { left: false, right: false, up: false, down: false }
            if (x > 0) { neighbors.left = solidArray[x - 1][y] }
            if (x < 15) { neighbors.right = solidArray[x + 1][y] }
            if (y > 0) { neighbors.up = solidArray[x][y - 1] }
            if (y < 15) { neighbors.down = solidArray[x][y + 1] }
            return neighbors
        }
        let findCorners = function () {
            let corners = []
            for (let i = 0; i < 16; i++) {
                for (let j = 0; j < 16; j++) {
                    if (solidArray[j][i] == 1) {
                        let n = getNeighbors(j, i)
                        for (let k in n) {
                            if (n[k] == 0) {
                                n[k] = false
                            }
                        }
                        let direction = false
                        if (n.right && n.down && !n.up && !n.left) { direction = 'left up' }
                        if (n.left && n.down && !n.up && !n.right) { direction = 'right up' }
                        if (n.right && n.up && !n.down && !n.left) { direction = 'left down' }
                        if (n.left && n.up && !n.down && !n.right) { direction = 'right down' }
                        if (n.left && !n.up && !n.down && !n.right) { direction = 'right' }
                        if (n.right && !n.up && !n.down && !n.left) { direction = 'left' }
                        if (n.up && !n.right && !n.down && !n.left) { direction = 'down' }
                        if (n.down && !n.right && !n.up && !n.left) { direction = 'up' }
                        if (direction) {
                            corners.push({ x: j, y: i, direction: direction })
                        }
                    }
                }
            }
            return corners
        }

        let findEndTile = function (x, y, direction) {
            let currentTile = solidArray[x][y]
            let i = 0
            if (direction == 'right' || direction == 'left') {
                while (currentTile == 1) {
                    if (direction == 'right') {
                        if (x + i < 16) {
                            currentTile = solidArray[x + i][y]
                        }
                        else {
                            currentTile = 0
                        }
                    }
                    else if (direction == 'left') {
                        if (x - i >= 0) {
                            currentTile = solidArray[x - i][y]
                        }
                        else {
                            currentTile = 0
                        }
                    }
                    i++
                }
                if (direction == 'right') {
                    return [x + i - 2, y]
                }
                else if (direction == 'left') {
                    return [x - i + 2, y]
                }
            }

            else if (direction == 'up' || direction == 'down') {
                while (currentTile == 1) {
                    if (direction == 'up') {
                        if (y - i >= 0) {
                            currentTile = solidArray[x][y - i]
                        }
                        else {
                            currentTile = 0
                        }
                    }
                    else if (direction == 'down') {
                        if (y + i < 16) {
                            currentTile = solidArray[x][y + i]
                        }
                        else {
                            currentTile = 0
                        }
                    }
                    i++
                }
                if (direction == 'up') {
                    return [x, y - i + 2]
                }
                else if (direction == 'down') {
                    return [x, y + i - 2]
                }
            }
        }

        let getNUnfilled = function () {
            let r = 0
            for (let i = 0; i < 16; i++) {
                for (let j = 0; j < 16; j++) {
                    if (solidArray[j][i] == 1) {
                        r = r + 1
                    }
                }
            }
            return r
        }

        let rectangles = []
        while (findCorners().length > 0) {
            let corners = findCorners()
            for (let corner of corners) {
                if (solidArray[corner.x][corner.y] == 1) {
                    let direction = false
                    if (corner.direction == 'left up') {
                        direction = 'right'
                    }
                    else if (corner.direction == 'right up') {
                        direction = 'left'
                    }
                    if (corner.direction == 'left down') {
                        direction = 'right'
                    }
                    else if (corner.direction == 'right down') {
                        direction = 'left'
                    }
                    if (corner.direction == 'left') {
                        direction = 'right'
                    }
                    else if (corner.direction == 'right') {
                        direction = 'left'
                    }
                    if (corner.direction == 'up') {
                        direction = 'down'
                    }
                    else if (corner.direction == 'down') {
                        direction = 'up'
                    }

                    if (corner.direction == 'left up' || corner.direction == 'right up') {
                        let x1 = findEndTile(corner.x, corner.y, direction)[0]
                        let y1 = findEndTile(corner.x, corner.y, direction)[1]
                        let x2 = findEndTile(corner.x, corner.y + 1, direction)[0]
                        let y2 = findEndTile(corner.x, corner.y + 1, direction)[1]
                        let i = 0
                        let move = x2 == x1
                        while (move && y2 < 15 && solidArray[corner.x][corner.y + 1 + i] != 0) {
                            let x_ = findEndTile(corner.x, corner.y + 1 + i, direction)[0]
                            let y_ = findEndTile(corner.x, corner.y + 1 + i, direction)[1]
                            if (x_ != x1) {
                                move = false
                            }
                            else {
                                x2 = x_
                                y2 = y_
                            }
                            i++
                        }

                        solidArray[corner.x][corner.y] = 0
                        if (i == 0) {
                            if (direction == 'left') {
                                for (let i = corner.x; i >= x1; i--) {
                                    solidArray[i][corner.y] = 0
                                }
                            }
                            else {
                                for (let i = corner.x; i <= x1; i++) {
                                    solidArray[i][corner.y] = 0
                                }
                            }
                            rectangles.push({ x1: corner.x, y1: corner.y, x2: x1, y2: y1 })
                        }
                        else {
                            if (direction == 'left') {
                                for (let i = corner.x; i >= x2; i--) {
                                    for (let j = corner.y; j <= y2; j++) {
                                        solidArray[i][j] = 0
                                    }
                                }
                            }
                            else {
                                for (let i = corner.x; i <= x2; i++) {
                                    for (let j = corner.y; j <= y2; j++) {
                                        solidArray[i][j] = 0
                                    }
                                }
                            }
                            rectangles.push({ x1: corner.x, y1: corner.y, x2: x2, y2: y2 })
                        }
                    }

                    else if (corner.direction == 'left down' || corner.direction == 'right down') {
                        let x1 = findEndTile(corner.x, corner.y, direction)[0]
                        let y1 = findEndTile(corner.x, corner.y, direction)[1]
                        let x2 = findEndTile(corner.x, corner.y - 1, direction)[0]
                        let y2 = findEndTile(corner.x, corner.y - 1, direction)[1]

                        let i = 0
                        let move = (x2 == x1)
                        while (move && y2 > 0 && solidArray[corner.x][corner.y - 1 - i] != 0) {
                            let x_ = findEndTile(corner.x, corner.y - 1 - i, direction)[0]
                            let y_ = findEndTile(corner.x, corner.y - 1 - i, direction)[1]
                            if (x_ != x1) {
                                move = false
                            }
                            else {
                                x2 = x_
                                y2 = y_
                            }
                            i = i + 1
                        }

                        solidArray[corner.x][corner.y] = 0

                        if (i == 0) {
                            if (direction == 'left') {
                                for (let i = corner.x; i >= x1; i--) {
                                    solidArray[i][corner.y] = 0
                                }
                            }
                            else {
                                for (let i = corner.x; i <= x1; i++) {
                                    solidArray[i][corner.y] = 0
                                }
                            }
                            rectangles.push({ x1: corner.x, y1: corner.y, x2: x1, y2: y1 })
                        }
                        else {
                            if (direction == 'left') {
                                for (let i = corner.x; i >= x2; i--) {
                                    for (let j = corner.y; j >= y2; j--) {
                                        solidArray[i][j] = 0
                                    }
                                }
                            }
                            else {
                                for (let i = corner.x; i <= x2; i++) {
                                    for (let j = corner.y; j >= y2; j--) {
                                        solidArray[i][j] = 0
                                    }
                                }
                            }
                            rectangles.push({ x1: corner.x, y1: corner.y, x2: x2, y2: y2 })
                        }
                    }

                    else if (corner.direction == 'right' || corner.direction == 'left') {
                        let x1 = findEndTile(corner.x, corner.y, direction)[0]
                        let y1 = findEndTile(corner.x, corner.y, direction)[1]
                        solidArray[corner.x][corner.y] = 0
                        if (direction == 'left') {
                            for (let i = corner.x; i >= x1; i--) {
                                solidArray[i][corner.y] = 0
                            }
                        }
                        else {
                            for (let i = corner.x; i <= x1; i++) {
                                solidArray[i][corner.y] = 0
                            }
                        }
                        rectangles.push({ x1: corner.x, y1: corner.y, x2: x1, y2: y1 })
                    }

                    else if (corner.direction == 'down' || corner.direction == 'up') {
                        let x1 = findEndTile(corner.x, corner.y, direction)[0]
                        let y1 = findEndTile(corner.x, corner.y, direction)[1]
                        solidArray[corner.x][corner.y] = 0
                        if (direction == 'up') {
                            for (let i = corner.y; i >= y1; i--) {
                                solidArray[corner.x][i] = 0
                            }
                        }
                        else {
                            for (let i = corner.y; i <= y1; i++) {
                                solidArray[corner.x][i] = 0
                            }
                        }
                        rectangles.push({ x1: corner.x, y1: corner.y, x2: x1, y2: y1 })
                    }
                }
            }
        }

        while (getNUnfilled() > 0) {
            for (let i = 0; i < 16; i++) {
                for (let j = 0; j < 16; j++) {
                    if (solidArray[j][i] == 1) {
                        solidArray[j][i] = 0
                        rectangles.push({ x1: j, y1: i, x2: j, y2: i })
                    }
                }
            }
        }

        for (let rectangle of rectangles) {
            let ensure = function (v1, v2) {
                if (v1 < v2) {
                    return [v1, v2]
                }
                else {
                    return [v2, v1]
                }
            }
            let x1 = ensure(rectangle.x1, rectangle.x2)[0]
            let x2 = ensure(rectangle.x1, rectangle.x2)[1]
            let y1 = ensure(rectangle.y1, rectangle.y2)[0]
            let y2 = ensure(rectangle.y1, rectangle.y2)[1]
            let w = x2 - x1 + 1
            let h = y2 - y1 + 1
            let x = x1
            let y = y1
            this.collisionRects.push({ x: x, y: y, w: w, h: h })
        }
    }

    updateImage() {
        let tempCVS = document.createElement("canvas")
        let tempCTX = tempCVS.getContext("2d")
        tempCVS.width = 128
        tempCVS.height = 128

        if (options.drawBlocks) {
            for (let x = 0; x < this.blocksArray.length; x++) {
                for (let y = 0; y < this.blocksArray[x].length; y++) {
                    if (this.blocksArray[x][y] != "0") {
                        if (options.drawAdaptive) {
                            if (blocks.get(this.blocksArray[x][y]).textureType == "simple") {
                                tempCTX.drawImage(blocks.get(this.blocksArray[x][y]).texture.middle, x * 8, y * 8, 8, 8)
                            } else if (blocks.get(this.blocksArray[x][y]).textureType == "adaptive") {

                                let curGroup = blocks.get(this.blocksArray[x][y]).textureGroup

                                if (world.getGroup(this.x * 16 + x - 1, this.y * 16 + y) == curGroup) {
                                    if (world.getGroup(this.x * 16 + x + 1, this.y * 16 + y) == curGroup) {
                                        if (world.getGroup(this.x * 16 + x, this.y * 16 + y - 1) == curGroup) {
                                            if (world.getGroup(this.x * 16 + x, this.y * 16 + y + 1) == curGroup) {
                                                tempCTX.drawImage(blocks.get(this.blocksArray[x][y]).texture.middle, x * 8, y * 8, 8, 8)
                                            }
                                            else if (world.getGroup(this.x * 16 + x, this.y * 16 + y + 1) != curGroup) {
                                                tempCTX.drawImage(blocks.get(this.blocksArray[x][y]).texture.bottom, x * 8, y * 8, 8, 8)
                                            }
                                        }
                                        else {
                                            if (world.getGroup(this.x * 16 + x, this.y * 16 + y + 1) == curGroup) {
                                                tempCTX.drawImage(blocks.get(this.blocksArray[x][y]).texture.top, x * 8, y * 8, 8, 8)
                                            }
                                            else if (world.getGroup(this.x * 16 + x, this.y * 16 + y + 1) != curGroup) {
                                                tempCTX.drawImage(blocks.get(this.blocksArray[x][y]).texture.topBottom, x * 8, y * 8, 8, 8)
                                            }
                                        }
                                    }
                                    else {
                                        if (world.getGroup(this.x * 16 + x, this.y * 16 + y - 1) == curGroup) {
                                            if (world.getGroup(this.x * 16 + x, this.y * 16 + y + 1) == curGroup) {
                                                tempCTX.drawImage(blocks.get(this.blocksArray[x][y]).texture.right, x * 8, y * 8, 8, 8)
                                            }
                                            else if (world.getGroup(this.x * 16 + x, this.y * 16 + y + 1) != curGroup) {
                                                tempCTX.drawImage(blocks.get(this.blocksArray[x][y]).texture.rightBottomCorner, x * 8, y * 8, 8, 8)
                                            }
                                        }
                                        else {
                                            if (world.getGroup(this.x * 16 + x, this.y * 16 + y + 1) != curGroup) {
                                                tempCTX.drawImage(blocks.get(this.blocksArray[x][y]).texture.topBottomRight, x * 8, y * 8, 8, 8)
                                            }
                                            else if (world.getGroup(this.x * 16 + x, this.y * 16 + y + 1) == curGroup) {
                                                tempCTX.drawImage(blocks.get(this.blocksArray[x][y]).texture.rightTopCorner, x * 8, y * 8, 8, 8)
                                            }
                                        }
                                    }
                                }
                                else {
                                    if (world.getGroup(this.x * 16 + x + 1, this.y * 16 + y) == curGroup) {
                                        if (world.getGroup(this.x * 16 + x, this.y * 16 + y - 1) == curGroup) {
                                            if (world.getGroup(this.x * 16 + x, this.y * 16 + y + 1) == curGroup) {
                                                tempCTX.drawImage(blocks.get(this.blocksArray[x][y]).texture.left, x * 8, y * 8, 8, 8)
                                            }
                                            else if (world.getGroup(this.x * 16 + x, this.y * 16 + y + 1) != curGroup) {
                                                tempCTX.drawImage(blocks.get(this.blocksArray[x][y]).texture.leftBottomCorner, x * 8, y * 8, 8, 8)
                                            }
                                        }
                                        else {
                                            if (world.getGroup(this.x * 16 + x, this.y * 16 + y + 1) != curGroup) {
                                                tempCTX.drawImage(blocks.get(this.blocksArray[x][y]).texture.topBottomLeft, x * 8, y * 8, 8, 8)
                                            }
                                            else if (world.getGroup(this.x * 16 + x, this.y * 16 + y + 1) == curGroup) {
                                                tempCTX.drawImage(blocks.get(this.blocksArray[x][y]).texture.leftTopCorner, x * 8, y * 8, 8, 8)
                                            }
                                        }

                                    }
                                    else {
                                        if (world.getGroup(this.x * 16 + x, this.y * 16 + y - 1) == curGroup) {
                                            if (world.getGroup(this.x * 16 + x, this.y * 16 + y + 1) == curGroup) {
                                                tempCTX.drawImage(blocks.get(this.blocksArray[x][y]).texture.leftRight, x * 8, y * 8, 8, 8)
                                            }
                                            else if (world.getGroup(this.x * 16 + x, this.y * 16 + y + 1) != curGroup) {
                                                tempCTX.drawImage(blocks.get(this.blocksArray[x][y]).texture.leftRightBottom, x * 8, y * 8, 8, 8)
                                            }
                                        }
                                        else {
                                            if (world.getGroup(this.x * 16 + x, this.y * 16 + y + 1) == curGroup) {
                                                tempCTX.drawImage(blocks.get(this.blocksArray[x][y]).texture.leftRightTop, x * 8, y * 8, 8, 8)
                                            }

                                            else if (world.getGroup(this.x * 16 + x, this.y * 16 + y + 1) != curGroup) {
                                                tempCTX.drawImage(blocks.get(this.blocksArray[x][y]).texture.single, x * 8, y * 8, 8, 8)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            tempCTX.drawImage(blocks.get(this.blocksArray[x][y]).texture.middle, x * 8, y * 8, 8, 8)
                        }
                    }
                }
            }
        }

        //Освещение
        if (options.drawLighting) {
            let lightingRadius = options.lightingRadius
            let lightingMap = [...Array(16 + lightingRadius * 2)].map(e => Array(16 + lightingRadius * 2).fill(1))
            for (let x = -lightingRadius; x < 16 + lightingRadius; x++) {
                for (let y = -lightingRadius; y < 16 + lightingRadius; y++) {
                    if (world.getBlock(this.x * 16 + x, this.y * 16 + y) == "0") {
                        lightingMap[x + lightingRadius][y + lightingRadius] = -2
                    }
                }
            }


            for (let i = 0; i < lightingRadius; i++) {
                for (let x = 1; x < lightingMap.length - 1; x++) {
                    for (let y = 1; y < lightingMap[x].length - 1; y++) {
                        lightingMap[x][y] = ((lightingMap[x][y] + lightingMap[x - 1][y] + lightingMap[x][y - 1] + lightingMap[x + 1][y] + lightingMap[x][y + 1]) / 5)
                    }
                }
            }

            tempCTX.globalCompositeOperation = "source-atop"
            for (let x = 0; x < 16; x++) {
                for (let y = 0; y < 16; y++) {
                    if (this.blocksArray[x][y] != "0") {
                        tempCTX.fillStyle = "rgba(0, 0, 0, " + Math.max(Math.min(lightingMap[x + lightingRadius][y + lightingRadius] ** 3, 1), 0) + ")"
                        tempCTX.fillRect(x * 8, y * 8, 8, 8)
                    }
                }
            }
        }

        //Границы (ключ переломлен пополам..)
        if (options.drawChunksBorders) {
            tempCTX.globalCompositeOperation = "source-over"
            tempCTX.fillStyle = "rgba(255, 0, 0, 0.1)"
            tempCTX.fillRect(0, 0, 128, 1)
            tempCTX.fillRect(0, 0, 1, 128)
        }

        this.image.src = tempCVS.toDataURL()
        tempCVS.remove()
    }



    update() {
        this.updateBlocks()
        this.updateImage()
        this.updateCollisionRects()
    }

}